/**
 * Authentication Service
 * 
 * Service này xử lý các API liên quan đến authentication:
 * - Đăng nhập
 * - Đăng ký
 * - Refresh token
 * - Đăng xuất
 * - Xác thực token
 */

import { ApiResponse } from "@/domain/models/common";
import { httpClient } from "@/infrastructure/api/httpClient";
import { ENDPOINTS } from "@/infrastructure/lib/endpoints";
import { JWTUtil, JWTOptions } from "@/infrastructure/utils/jwt";
import { UserData } from "@/infrastructure/utils/storage";

// Interface cho request đăng nhập
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Interface cho request đăng ký
export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone?: string;
}

// Interface cho response đăng nhập
export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role?: string;
    userType?: string;
    status?: string;
  };
  expiresIn: number; // Thời gian hết hạn (seconds)
}

// Interface cho response đăng ký
export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}

// Interface cho refresh token request
export interface RefreshTokenRequest {
  refreshToken: string;
}

// Interface cho refresh token response
export interface RefreshTokenResponse {
  token: string;
  expiresIn: number;
}

/**
 * Authentication Service
 */
export const authService = {
  /**
   * Đăng nhập user
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await httpClient.post<LoginResponse>(
        ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      // Lưu token vào localStorage nếu đăng nhập thành công
      if (response.data?.token) {
        // Có thể thêm logic xử lý rememberMe ở đây
        // if (credentials.rememberMe) {
        //   // Lưu token với thời gian dài hơn
        // }
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Đăng ký user mới
   */
  async register(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    try {
      const response = await httpClient.post<RegisterResponse>(
        ENDPOINTS.AUTH.REGISTER,
        userData
      );

      return response;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  /**
   * Refresh token
   */
  async refreshToken(refreshToken: string): Promise<ApiResponse<RefreshTokenResponse>> {
    try {
      const response = await httpClient.post<RefreshTokenResponse>(
        ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );

      return response;
    } catch (error) {
      console.error('Refresh token error:', error);
      throw error;
    }
  },

  /**
   * Đăng xuất
   */
  async logout(): Promise<ApiResponse<null>> {
    try {
      const response = await httpClient.post<null>(
        ENDPOINTS.AUTH.LOGOUT,
        {}
      );

      return response;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  /**
   * Xác thực token hiện tại
   */
  async validateToken(token: string): Promise<ApiResponse<{ valid: boolean; user?: UserData }>> {
    try {
      const response = await httpClient.get<{ valid: boolean; user?: UserData }>(
        ENDPOINTS.AUTH.VALIDATE,
        token
      );

      return response;
    } catch (error) {
      console.error('Validate token error:', error);
      throw error;
    }
  },

  /**
   * Đổi mật khẩu
   */
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.put<{ message: string }>(
        ENDPOINTS.AUTH.CHANGE_PASSWORD,
        data
      );

      return response;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },

  /**
   * Quên mật khẩu
   */
  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.post<{ message: string }>(
        ENDPOINTS.AUTH.FORGOT_PASSWORD,
        { email }
      );

      return response;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  /**
   * Reset mật khẩu
   */
  async resetPassword(data: {
    token: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await httpClient.post<{ message: string }>(
        ENDPOINTS.AUTH.RESET_PASSWORD,
        data
      );

      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }
};

/**
 * JWT Helper Functions
 * Các hàm tiện ích để xử lý JWT token
 */
export const jwtHelpers = {
  /**
   * Tạo token cho user sau khi đăng nhập thành công
   */
  createUserToken(userData: {
    id: string;
    email: string;
    fullName: string;
    role?: string;
    userType?: string;
    status?: string;
  }, options?: JWTOptions): string {
    return JWTUtil.createLoginToken({
      id: userData.id,
      email: userData.email,
      role: userData.role,
      userType: userData.userType,
      status: userData.status
    }, options);
  },

  /**
   * Kiểm tra token có hợp lệ không
   */
  isTokenValid(token: string): boolean {
    return JWTUtil.isValidToken(token);
  },

  /**
   * Lấy thông tin user từ token
   */
  getUserFromToken(token: string) {
    return JWTUtil.getUserFromToken(token);
  },

  /**
   * Kiểm tra token có sắp hết hạn không
   */
  isTokenExpiringSoon(token: string, thresholdMinutes: number = 5): boolean {
    return JWTUtil.isTokenExpiringSoon(token, thresholdMinutes);
  },

  /**
   * Refresh token
   */
  refreshUserToken(token: string, options?: JWTOptions): string | null {
    return JWTUtil.refreshToken(token, options);
  },

  /**
   * Xác thực token và trả về thông tin đầy đủ
   */
  authenticateUserToken(token: string) {
    return JWTUtil.authenticateToken(token);
  }
};

// Export default
export default authService;

