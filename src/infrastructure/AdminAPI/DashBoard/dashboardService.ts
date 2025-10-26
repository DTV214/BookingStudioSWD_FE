// Dashboard API Service
import { httpClient } from '@/infrastructure/api/httpClient';
import { DashboardData } from './types';

export class DashboardService {
  private static readonly BASE_URL = '/api/admin/dashboard';

  /**
   * Lấy dữ liệu dashboard admin
   * GET /api/admin/dashboard
   */
  static async getDashboardData(): Promise<DashboardData> {
    try {
      console.log('=== FETCHING DASHBOARD DATA ===');
      console.log('API URL:', this.BASE_URL);
      
      const response = await httpClient.get<DashboardData>(this.BASE_URL);
      
      console.log('Dashboard API response:', response);
      
      if (response.code === 200) {
        console.log('Dashboard data fetched successfully:', response.data);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        status: error && typeof error === 'object' && 'status' in error ? (error as Record<string, unknown>).status : 'No status'
      });
      throw error;
    }
  }

  /**
   * Test kết nối API dashboard
   */
  static async testConnection(): Promise<boolean> {
    try {
      console.log('=== TESTING DASHBOARD API CONNECTION ===');
      console.log('Testing connection to:', this.BASE_URL);
      
      const response = await httpClient.get<DashboardData>(this.BASE_URL);
      console.log('Dashboard connection test response:', response);
      
      const isConnected = response.code === 200;
      console.log('Dashboard connection test result:', isConnected);
      
      return isConnected;
    } catch (error) {
      console.error('Dashboard API connection test failed:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        status: error && typeof error === 'object' && 'status' in error ? (error as Record<string, unknown>).status : 'No status'
      });
      return false;
    }
  }
}

