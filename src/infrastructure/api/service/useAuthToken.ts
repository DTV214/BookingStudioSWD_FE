/**
 * useAuthToken Hook - Quản lý JWT token và authentication state
 * 
 * Hook này cung cấp:
 * - Quản lý token state
 * - Tự động refresh token
 * - Xử lý token expiration
 * - Integration với AuthContext
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { storage } from '@/infrastructure/utils/storage';
import { JWTUtil } from '@/infrastructure/utils/jwt';
import { TokenInterceptor } from '../tokenInterceptor';

interface UseAuthTokenOptions {
  enableAutoRefresh?: boolean;
  refreshThresholdMinutes?: number;
  onTokenExpired?: () => void;
  onTokenRefreshed?: (newToken: string) => void;
}

export const useAuthToken = (options: UseAuthTokenOptions = {}) => {
  const { user, token, setToken, logout } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<number | null>(null);

  const {
    enableAutoRefresh = true,
    refreshThresholdMinutes = 5,
    onTokenExpired,
    onTokenRefreshed
  } = options;

  /**
   * Kiểm tra token có hợp lệ không
   */
  const isTokenValid = useCallback((tokenToCheck?: string): boolean => {
    const currentToken = tokenToCheck || token;
    if (!currentToken) return false;
    return JWTUtil.isValidToken(currentToken);
  }, [token]);

  /**
   * Kiểm tra token có sắp hết hạn không
   */
  const isTokenExpiringSoon = useCallback((tokenToCheck?: string): boolean => {
    const currentToken = tokenToCheck || token;
    if (!currentToken) return false;
    return JWTUtil.isTokenExpiringSoon(currentToken, refreshThresholdMinutes);
  }, [token, refreshThresholdMinutes]);

  /**
   * Lấy thông tin user từ token
   */
  const getUserFromToken = useCallback((tokenToCheck?: string) => {
    const currentToken = tokenToCheck || token;
    if (!currentToken) return null;
    return JWTUtil.getUserFromToken(currentToken);
  }, [token]);

  /**
   * Refresh token
   */
  const refreshToken = useCallback(async (): Promise<string | null> => {
    if (!token) {
      console.warn('No token to refresh');
      return null;
    }

    setIsRefreshing(true);

    try {
      // Sử dụng token interceptor để refresh
      const interceptor = TokenInterceptor.getInstance({
        enableAutoRefresh: true,
        refreshThresholdMinutes,
        onTokenExpired: () => {
          console.warn('Token refresh failed, logging out');
          logout();
          onTokenExpired?.();
        },
        onRefreshSuccess: (newToken) => {
          setToken(newToken);
          setLastRefreshTime(Date.now());
          onTokenRefreshed?.(newToken);
        }
      });

      // Thử refresh token
      const newToken = await interceptor.refreshToken();
      
      if (newToken) {
        setToken(newToken);
        setLastRefreshTime(Date.now());
        onTokenRefreshed?.(newToken);
        return newToken;
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      onTokenExpired?.();
      return null;
    } finally {
      setIsRefreshing(false);
    }
  }, [token, setToken, logout, refreshThresholdMinutes, onTokenExpired, onTokenRefreshed]);

  /**
   * Xử lý token expiration
   */
  const handleTokenExpiration = useCallback(() => {
    console.warn('Token expired, attempting refresh...');
    
    if (enableAutoRefresh) {
      refreshToken();
    } else {
      logout();
      onTokenExpired?.();
    }
  }, [enableAutoRefresh, refreshToken, logout, onTokenExpired]);

  /**
   * Kiểm tra và xử lý token tự động
   */
  const checkAndHandleToken = useCallback(async () => {
    if (!token) return;

    if (!isTokenValid()) {
      console.warn('Token is invalid');
      handleTokenExpiration();
      return;
    }

    if (isTokenExpiringSoon()) {
      console.log('Token is expiring soon, refreshing...');
      await refreshToken();
    }
  }, [token, isTokenValid, isTokenExpiringSoon, handleTokenExpiration, refreshToken]);

  /**
   * Effect để kiểm tra token định kỳ
   */
  useEffect(() => {
    if (!token || !enableAutoRefresh) return;

    // Kiểm tra ngay lập tức
    checkAndHandleToken();

    // Kiểm tra định kỳ mỗi 1 phút
    const interval = setInterval(checkAndHandleToken, 60000);

    return () => clearInterval(interval);
  }, [token, enableAutoRefresh, checkAndHandleToken]);

  /**
   * Effect để xử lý khi token thay đổi
   */
  useEffect(() => {
    if (token) {
      // Lưu token vào storage
      storage.setToken(token);
      
      // Kiểm tra token validity
      if (!isTokenValid()) {
        console.warn('Invalid token detected, clearing...');
        logout();
      }
    } else {
      // Xóa token khỏi storage
      storage.removeToken();
    }
  }, [token, isTokenValid, logout]);

  /**
   * Lấy token hiện tại
   */
  const getCurrentToken = useCallback((): string | null => {
    return token || storage.getToken();
  }, [token]);

  /**
   * Xác thực token đầy đủ
   */
  const authenticateToken = useCallback(() => {
    const currentToken = getCurrentToken();
    if (!currentToken) {
      return { isValid: false, user: null, error: 'No token available' };
    }
    return JWTUtil.authenticateToken(currentToken);
  }, [getCurrentToken]);

  /**
   * Logout và clear token
   */
  const logoutAndClear = useCallback(() => {
    storage.clearAll();
    logout();
  }, [logout]);

  return {
    // Token state
    token: getCurrentToken(),
    isTokenValid: isTokenValid(),
    isTokenExpiringSoon: isTokenExpiringSoon(),
    isRefreshing,
    lastRefreshTime,
    
    // User info
    user,
    isAuthenticated: Boolean(user && token),
    
    // Token operations
    refreshToken,
    getCurrentToken,
    authenticateToken,
    logout: logoutAndClear,
    
    // Token validation
    getUserFromToken: getUserFromToken,
    
    // Manual checks
    checkAndHandleToken
  };
};

export default useAuthToken;
