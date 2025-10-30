/**
 * JWT Utility - Xử lý mã hóa và giải mã JWT tokens
 * 
 * File này cung cấp các hàm tiện ích để:
 * - Tạo JWT token từ payload
 * - Giải mã JWT token để lấy thông tin
 * - Xác thực token có hợp lệ không
 * - Lấy thông tin user từ token
 */

import { jwtDecode } from 'jwt-decode';

// Interface cho payload JWT
export interface JWTPayload {
  sub: string; // User ID
  email: string;
  role?: string;
  userType?: string;
  status?: string;
  iat: number; // Issued at
  exp: number; // Expiration time
  [key: string]: unknown; // Cho phép thêm các field khác
}

// Interface cho decoded user data
export interface DecodedUser {
  sub: string;
  email: string;
  role?: string;
  userType?: string;
  status?: string;
  iat: number;
  exp: number;
}

// Interface cho JWT options
export interface JWTOptions {
  expiresIn?: string; // Thời gian hết hạn (vd: '1h', '7d', '30d')
  algorithm?: string; // Thuật toán mã hóa
  issuer?: string; // Người phát hành token
  audience?: string; // Đối tượng sử dụng token
}

/**
 * JWT Utility Class
 */
export class JWTUtil {
  /**
   * Tạo JWT token từ payload
   * Lưu ý: Trong môi trường production, nên sử dụng secret key từ environment variables
   */
  static createToken(payload: Omit<JWTPayload, 'iat' | 'exp'>, options?: JWTOptions): string {
    try {
      // Trong môi trường thực tế, bạn nên sử dụng thư viện như 'jsonwebtoken'
      // hoặc gọi API backend để tạo token
      
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = options?.expiresIn || '24h';
      
      // Parse expiresIn string thành seconds
      const exp = this.parseExpiresIn(expiresIn);
      
      const tokenPayload: JWTPayload = {
        sub: (payload as Record<string, unknown>).sub as string || (payload as Record<string, unknown>).userId as string || 'unknown',
        email: (payload as Record<string, unknown>).email as string || 'unknown@example.com',
        ...payload,
        iat: now,
        exp: now + exp
      };

      // Trong môi trường thực tế, sử dụng secret key để ký token
      // const token = jwt.sign(tokenPayload, secretKey, { algorithm: 'HS256' });
      
      // Tạm thời return base64 encoded payload (chỉ để demo)
      // Trong production, phải sử dụng thư viện JWT thực sự
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payloadEncoded = btoa(JSON.stringify(tokenPayload));
      const signature = btoa('signature'); // Trong thực tế, đây phải là signature thực
      
      return `${header}.${payloadEncoded}.${signature}`;
    } catch (error) {
      console.error('Error creating JWT token:', error);
      throw new Error('Failed to create JWT token');
    }
  }

  /**
   * Giải mã JWT token
   */
  static decodeToken(token: string): JWTPayload | null {
    try {
      const decoded = jwtDecode<JWTPayload>(token);
      return decoded;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  /**
   * Kiểm tra token có hợp lệ không
   */
  static isValidToken(token: string): boolean {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded) return false;

      // Kiểm tra thời gian hết hạn
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < now) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error validating JWT token:', error);
      return false;
    }
  }

  /**
   * Kiểm tra token có sắp hết hạn không (trong vòng 5 phút)
   */
  static isTokenExpiringSoon(token: string, thresholdMinutes: number = 5): boolean {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded || !decoded.exp) return false;

      const now = Math.floor(Date.now() / 1000);
      const thresholdSeconds = thresholdMinutes * 60;
      
      return (decoded.exp - now) <= thresholdSeconds;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return false;
    }
  }

  /**
   * Lấy thông tin user từ token
   */
  static getUserFromToken(token: string): DecodedUser | null {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded) return null;

      return {
        sub: decoded.sub,
        email: decoded.email,
        role: decoded.role,
        userType: decoded.userType,
        status: decoded.status,
        iat: decoded.iat,
        exp: decoded.exp
      };
    } catch (error) {
      console.error('Error getting user from token:', error);
      return null;
    }
  }

  /**
   * Refresh token (tạo token mới với thông tin cũ)
   */
  static refreshToken(token: string, options?: JWTOptions): string | null {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded) return null;

      // Tạo token mới với thông tin cũ
      const newPayload = {
        sub: decoded.sub,
        email: decoded.email,
        role: decoded.role,
        userType: decoded.userType,
        status: decoded.status
      };

      return this.createToken(newPayload, options);
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }

  /**
   * Parse expiresIn string thành seconds
   */
  private static parseExpiresIn(expiresIn: string): number {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1));

    switch (unit) {
      case 's': return value; // seconds
      case 'm': return value * 60; // minutes
      case 'h': return value * 60 * 60; // hours
      case 'd': return value * 60 * 60 * 24; // days
      case 'w': return value * 60 * 60 * 24 * 7; // weeks
      case 'M': return value * 60 * 60 * 24 * 30; // months (approximate)
      case 'y': return value * 60 * 60 * 24 * 365; // years (approximate)
      default: return 24 * 60 * 60; // default 24 hours
    }
  }

  /**
   * Tạo token cho user đăng nhập
   */
  static createLoginToken(userData: {
    id: string;
    email: string;
    role?: string;
    userType?: string;
    status?: string;
  }, options?: JWTOptions): string {
    const payload = {
      sub: userData.id,
      email: userData.email,
      role: userData.role,
      userType: userData.userType,
      status: userData.status
    };

    return this.createToken(payload, options);
  }

  /**
   * Xác thực token và trả về thông tin user
   */
  static authenticateToken(token: string): {
    isValid: boolean;
    user: DecodedUser | null;
    error?: string;
  } {
    try {
      if (!this.isValidToken(token)) {
        return {
          isValid: false,
          user: null,
          error: 'Token is invalid or expired'
        };
      }

      const user = this.getUserFromToken(token);
      if (!user) {
        return {
          isValid: false,
          user: null,
          error: 'Failed to extract user information from token'
        };
      }

      return {
        isValid: true,
        user
      };
    } catch (error) {
      return {
        isValid: false,
        user: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Export các hàm tiện ích để sử dụng dễ dàng
export const {
  createToken,
  decodeToken,
  isValidToken,
  isTokenExpiringSoon,
  getUserFromToken,
  refreshToken,
  createLoginToken,
  authenticateToken
} = JWTUtil;

// Export default
export default JWTUtil;

