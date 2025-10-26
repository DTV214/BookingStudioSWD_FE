// Dashboard API Test Suite
import { DashboardService } from './dashboardService';

export class DashboardAPITestSuite {
  /**
   * Test kết nối API dashboard
   */
  static async testConnection(): Promise<boolean> {
    try {
      console.log('=== TESTING DASHBOARD API CONNECTION ===');
      const isConnected = await DashboardService.testConnection();
      console.log('Dashboard API connection test result:', isConnected);
      return isConnected;
    } catch (error) {
      console.error('Dashboard API connection test failed:', error);
      return false;
    }
  }

  /**
   * Test lấy dữ liệu dashboard
   */
  static async testGetDashboardData(): Promise<boolean> {
    try {
      console.log('=== TESTING GET DASHBOARD DATA ===');
      const dashboardData = await DashboardService.getDashboardData();
      console.log('Dashboard data fetched successfully:', dashboardData);
      
      // Validate response structure
      const requiredFields = [
        'totalAccounts',
        'totalStudios', 
        'totalBookings',
        'totalPayments',
        'totalRevenue',
        'bookingStatusStats',
        'topServiceName',
        'topServiceUsage'
      ];

      const missingFields = requiredFields.filter(field => !(field in dashboardData));
      if (missingFields.length > 0) {
        console.warn('Missing fields in dashboard data:', missingFields);
        return false;
      }

      console.log('Dashboard data validation passed');
      return true;
    } catch (error) {
      console.error('Dashboard data fetch test failed:', error);
      return false;
    }
  }

  /**
   * Chạy tất cả tests
   */
  static async runAllTests(): Promise<{
    connection: boolean;
    dataFetch: boolean;
    allPassed: boolean;
  }> {
    console.log('=== STARTING DASHBOARD API TEST SUITE ===');
    
    const connection = await this.testConnection();
    const dataFetch = await this.testGetDashboardData();
    const allPassed = connection && dataFetch;
    
    console.log('=== DASHBOARD API TEST RESULTS ===');
    console.log('Connection test:', connection ? 'PASSED' : 'FAILED');
    console.log('Data fetch test:', dataFetch ? 'PASSED' : 'FAILED');
    console.log('All tests passed:', allPassed ? 'YES' : 'NO');
    
    return {
      connection,
      dataFetch,
      allPassed
    };
  }
}

// Export for use in other files
export default DashboardAPITestSuite;

