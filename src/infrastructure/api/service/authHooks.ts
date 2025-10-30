/**
 * Authentication Hooks
 * 
 * Custom hooks để sử dụng authentication service trong React components
 */

import { useState, useCallback } from 'react';
import { authService, jwtHelpers, LoginRequest, RegisterRequest } from './authService';
import { storage } from '@/infrastructure/utils/storage';
import { useAuth } from '@/context/AuthContext';

/**
 * Hook để xử lý đăng nhập
 */
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setToken } = useAuth();

  const login = useCallback(async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      
      if (response.data) {
        const { token, user } = response.data;
        
        // Lưu token và user vào storage
        storage.setToken(token);
        storage.setUser(user);
        
        // Cập nhật context
        setToken(token);
        setUser(user);
        
        return { success: true, data: response.data };
      } else {
        throw new Error('Login failed: No data received');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setUser, setToken]);

  return { login, loading, error, clearError: () => setError(null) };
};

/**
 * Hook để xử lý đăng ký
 */
export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(async (userData: RegisterRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(userData);
      
      if (response.data) {
        return { success: true, data: response.data };
      } else {
        throw new Error('Registration failed: No data received');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { register, loading, error, clearError: () => setError(null) };
};

/**
 * Hook để xử lý đăng xuất
 */
export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const logoutUser = useCallback(async () => {
    setLoading(true);

    try {
      // Gọi API logout (optional)
      await authService.logout();
    } catch (err) {
      console.warn('Logout API call failed:', err);
      // Vẫn tiếp tục logout local
    } finally {
      // Xóa dữ liệu local
      storage.clearAll();
      logout();
      setLoading(false);
    }
  }, [logout]);

  return { logout: logoutUser, loading };
};

/**
 * Hook để xử lý refresh token
 */
export const useRefreshToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setToken } = useAuth();

  const refreshToken = useCallback(async (refreshToken: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.refreshToken(refreshToken);
      
      if (response.data) {
        const { token } = response.data;
        
        // Cập nhật token mới
        storage.setToken(token);
        setToken(token);
        
        return { success: true, data: response.data };
      } else {
        throw new Error('Token refresh failed: No data received');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Token refresh failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setToken]);

  return { refreshToken, loading, error, clearError: () => setError(null) };
};

/**
 * Hook để xử lý đổi mật khẩu
 */
export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = useCallback(async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.changePassword(data);
      
      if (response.data) {
        return { success: true, data: response.data };
      } else {
        throw new Error('Password change failed: No data received');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password change failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { changePassword, loading, error, clearError: () => setError(null) };
};

/**
 * Hook để xử lý quên mật khẩu
 */
export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forgotPassword = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.forgotPassword(email);
      
      if (response.data) {
        return { success: true, data: response.data };
      } else {
        throw new Error('Forgot password failed: No data received');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Forgot password failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { forgotPassword, loading, error, clearError: () => setError(null) };
};

/**
 * Hook để xử lý reset mật khẩu
 */
export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = useCallback(async (data: {
    token: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.resetPassword(data);
      
      if (response.data) {
        return { success: true, data: response.data };
      } else {
        throw new Error('Password reset failed: No data received');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { resetPassword, loading, error, clearError: () => setError(null) };
};

/**
 * Hook để xử lý JWT token
 */
export const useJWT = () => {
  const validateToken = useCallback((token: string) => {
    return jwtHelpers.isTokenValid(token);
  }, []);

  const getUserFromToken = useCallback((token: string) => {
    return jwtHelpers.getUserFromToken(token);
  }, []);

  const isTokenExpiringSoon = useCallback((token: string, thresholdMinutes: number = 5) => {
    return jwtHelpers.isTokenExpiringSoon(token, thresholdMinutes);
  }, []);

  const refreshUserToken = useCallback((token: string) => {
    return jwtHelpers.refreshUserToken(token);
  }, []);

  const authenticateUserToken = useCallback((token: string) => {
    return jwtHelpers.authenticateUserToken(token);
  }, []);

  return {
    validateToken,
    getUserFromToken,
    isTokenExpiringSoon,
    refreshUserToken,
    authenticateUserToken
  };
};

// All hooks are already exported inline above

