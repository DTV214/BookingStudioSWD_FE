/**
 * Token Interceptor - Xử lý tự động refresh token và redirect
 * 
 * File này xử lý:
 * - Tự động refresh token khi hết hạn
 * - Redirect về trang login khi cần
 * - Xử lý lỗi 401 Unauthorized
 */

import { storage } from '@/infrastructure/utils/storage';
import { JWTUtil } from '@/infrastructure/utils/jwt';
import { authService } from './service/authService';

// Interface cho token interceptor options
export interface TokenInterceptorOptions {
  enableAutoRefresh?: boolean;
  refreshThresholdMinutes?: number;
  onTokenExpired?: () => void;
  onRefreshSuccess?: (newToken: string) => void;
  onRefreshFailed?: () => void;
}

/**
 * Token Interceptor Class
 */
export class TokenInterceptor {
  private static instance: TokenInterceptor;
  private options: TokenInterceptorOptions;
  private isRefreshing = false;
  private refreshPromise: Promise<string | null> | null = null;

  constructor(options: TokenInterceptorOptions = {}) {
    this.options = {
      enableAutoRefresh: true,
      refreshThresholdMinutes: 5,
      ...options
    };
  }

  /**
   * Singleton pattern
   */
  static getInstance(options?: TokenInterceptorOptions): TokenInterceptor {
    if (!TokenInterceptor.instance) {
      TokenInterceptor.instance = new TokenInterceptor(options);
    }
    return TokenInterceptor.instance;
  }

  /**
   * Kiểm tra token có cần refresh không
   */
  private shouldRefreshToken(token: string): boolean {
    if (!this.options.enableAutoRefresh) return false;
    
    return JWTUtil.isTokenExpiringSoon(token, this.options.refreshThresholdMinutes || 5);
  }

  /**
   * Refresh token
   */
  public async refreshToken(): Promise<string | null> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performRefresh();

    try {
      const newToken = await this.refreshPromise;
      return newToken;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  /**
   * Thực hiện refresh token
   */
  private async performRefresh(): Promise<string | null> {
    try {
      const currentToken = storage.getToken();
      if (!currentToken) {
        throw new Error('No token to refresh');
      }

      // Thử refresh token bằng API
      const response = await authService.refreshToken(currentToken);
      
      if (response.data?.token) {
        const newToken = response.data.token;
        
        // Lưu token mới
        storage.setToken(newToken);
        
        // Gọi callback success
        this.options.onRefreshSuccess?.(newToken);
        
        console.log('Token refreshed successfully');
        return newToken;
      } else {
        throw new Error('No new token received');
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      
      // Gọi callback failed
      this.options.onRefreshFailed?.();
      
      // Xóa token cũ
      storage.clearAll();
      
      return null;
    }
  }

  /**
   * Xử lý request với token interceptor
   */
  async handleRequest<T>(
    requestFn: (token?: string) => Promise<T>,
    token?: string
  ): Promise<T> {
    const currentToken = token || storage.getToken();
    
    if (!currentToken) {
      throw new Error('No authentication token available');
    }

    // Kiểm tra token có cần refresh không
    if (this.shouldRefreshToken(currentToken)) {
      console.log('Token is expiring soon, attempting refresh...');
      
      const newToken = await this.refreshToken();
      if (newToken) {
        // Sử dụng token mới
        return requestFn(newToken);
      } else {
        // Refresh thất bại, thử với token cũ
        console.warn('Token refresh failed, using current token');
      }
    }

    try {
      return await requestFn(currentToken);
    } catch (error: unknown) {
      // Xử lý lỗi 401
      if (error && typeof error === 'object' && 'status' in error && error.status === 401) {
        console.log('Received 401, attempting token refresh...');
        
        const newToken = await this.refreshToken();
        if (newToken) {
          // Thử lại request với token mới
          return requestFn(newToken);
        } else {
          // Refresh thất bại, gọi callback expired
          this.options.onTokenExpired?.();
          throw error;
        }
      }
      
      throw error;
    }
  }

  /**
   * Xử lý lỗi 401 từ response
   */
  handle401Error(): void {
    console.warn('Handling 401 error - Token expired or invalid');
    
    // Xóa token cũ
    storage.clearAll();
    
    // Gọi callback expired
    this.options.onTokenExpired?.();
  }

  /**
   * Cập nhật options
   */
  updateOptions(newOptions: Partial<TokenInterceptorOptions>): void {
    this.options = { ...this.options, ...newOptions };
  }

  /**
   * Reset interceptor
   */
  reset(): void {
    this.isRefreshing = false;
    this.refreshPromise = null;
  }
}

/**
 * Hàm tiện ích để tạo interceptor với options mặc định
 */
export const createTokenInterceptor = (options?: TokenInterceptorOptions): TokenInterceptor => {
  return new TokenInterceptor(options);
};

/**
 * Hàm tiện ích để xử lý request với interceptor
 */
export const withTokenInterceptor = async <T>(
  requestFn: (token?: string) => Promise<T>,
  token?: string,
  options?: TokenInterceptorOptions
): Promise<T> => {
  const interceptor = TokenInterceptor.getInstance(options);
  return interceptor.handleRequest(requestFn, token);
};

// Export default
export default TokenInterceptor;
