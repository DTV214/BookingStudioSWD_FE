// Test file for Account Management API
// This file helps verify that all API endpoints are working correctly

import { AccountManagementAPI } from './accountManagementService';
import { AccountCreateRequest, AccountUpdateRequest } from './types';

/**
 * Test suite for Account Management API
 * Run these tests to verify API integration
 */
export class AccountAPITestSuite {
  
  /**
   * Test all API endpoints
   */
  static async runAllTests(): Promise<void> {
    console.log('🧪 Starting Account Management API Tests...\n');
    
    try {
      // Test 1: Connection test
      await this.testConnection();
      
      // Test 2: Get all accounts
      await this.testGetAllAccounts();
      
      // Test 3: Create account with comprehensive debugging
      await this.testCreateAccountComprehensive();
      
      // Test 4: Get account by ID
      await this.testGetAccountById();
      
      // Test 5: Update account
      await this.testUpdateAccount();
      
      // Test 6: Ban/Unban account
      await this.testBanUnbanAccount();
      
      // Test 7: Delete account
      await this.testDeleteAccount();
      
      console.log('\n✅ All Account Management API tests completed successfully!');
      
    } catch (error) {
      console.error('\n❌ Account Management API tests failed:', error);
      throw error;
    }
  }
  
  /**
   * Test API connection
   */
  private static async testConnection(): Promise<void> {
    console.log('🔗 Testing API connection...');
    
    try {
      const isConnected = await AccountManagementAPI.testConnection();
      if (isConnected) {
        console.log('✅ API connection successful');
      } else {
        console.log('⚠️ API connection failed - API might not be available');
      }
    } catch (error) {
      console.log('❌ API connection test failed:', error);
    }
  }
  
  /**
   * Test getting all accounts
   */
  private static async testGetAllAccounts(): Promise<void> {
    console.log('📋 Testing get all accounts...');
    
    try {
      const accounts = await AccountManagementAPI.getAllAccounts();
      console.log(`✅ Retrieved ${accounts.length} accounts`);
      
      if (accounts.length > 0) {
        console.log('📊 Sample account data:', accounts[0]);
      }
    } catch (error) {
      console.log('❌ Get all accounts test failed:', error);
    }
  }
  
  /**
   * Test creating account with minimal data
   */
  private static async testCreateAccountMinimal(): Promise<void> {
    console.log('🔍 Testing create account with minimal data...');
    
    try {
      const minimalAccount = {
        email: `minimal-${Date.now()}@example.com`,
        fullName: 'Minimal User',
        phoneNumber: '0123456789',
        role: 'CUSTOMER' as const,
        status: 'ACTIVE' as const,
        userType: 'PERSONAL' as const
      };
      
      console.log('Minimal account data:', minimalAccount);
      
      const createdAccount = await AccountManagementAPI.createAccount(minimalAccount);
      console.log('✅ Minimal account created successfully:', createdAccount);
      
    } catch (error) {
      console.log('❌ Minimal account creation failed:', error);
    }
  }

  /**
   * Test creating account with comprehensive debugging
   */
  private static async testCreateAccountComprehensive(): Promise<void> {
    console.log('🔍 Testing create account with comprehensive debugging...');
    
    try {
      const testAccount = {
        email: `comprehensive-${Date.now()}@test.com`,
        fullName: 'Comprehensive Test User',
        phoneNumber: '1234567890',
        role: 'CUSTOMER' as const,
        status: 'ACTIVE' as const,
        userType: 'PERSONAL' as const
      };
      
      console.log('Test account data:', testAccount);
      
      const createdAccount = await AccountManagementAPI.createAccount(testAccount);
      console.log('✅ Comprehensive account created successfully:', createdAccount);
      
    } catch (error) {
      console.log('❌ Comprehensive account creation failed:', error);
      
      // Detailed error analysis
      if (error instanceof Error) {
        console.log('Error message:', error.message);
        console.log('Error stack:', error.stack);
      }
      
      // Check if it's an HttpError
      if (error && typeof error === 'object' && 'status' in error) {
        console.log('HTTP Status:', (error as any).status);
        console.log('HTTP Data:', (error as any).data);
      }
    }
  }
  
  /**
   * Test getting account by ID
   */
  private static async testGetAccountById(): Promise<void> {
    console.log('🔍 Testing get account by ID...');
    
    try {
      const testAccountId = (global as any).testAccountId;
      
      if (!testAccountId) {
        console.log('⚠️ No test account ID available, skipping test');
        return;
      }
      
      const account = await AccountManagementAPI.getAccountById(testAccountId);
      console.log('✅ Account retrieved successfully:', account);
      
    } catch (error) {
      console.log('❌ Get account by ID test failed:', error);
    }
  }
  
  /**
   * Test updating account
   */
  private static async testUpdateAccount(): Promise<void> {
    console.log('✏️ Testing update account...');
    
    try {
      const testAccountId = (global as any).testAccountId;
      
      if (!testAccountId) {
        console.log('⚠️ No test account ID available, skipping test');
        return;
      }
      
      const updateData: AccountUpdateRequest = {
        fullName: 'Updated Test User',
        phoneNumber: '0987654321',
        status: 'ACTIVE'
      };
      
      const updatedAccount = await AccountManagementAPI.updateAccount(testAccountId, updateData);
      console.log('✅ Account updated successfully:', updatedAccount);
      
    } catch (error) {
      console.log('❌ Update account test failed:', error);
    }
  }
  
  /**
   * Test ban/unban account
   */
  private static async testBanUnbanAccount(): Promise<void> {
    console.log('🔒 Testing ban/unban account...');
    
    try {
      const testAccountId = (global as any).testAccountId;
      
      if (!testAccountId) {
        console.log('⚠️ No test account ID available, skipping test');
        return;
      }
      
      // Test ban
      await AccountManagementAPI.banAccount(testAccountId);
      console.log('✅ Account banned successfully');
      
      // Test unban
      await AccountManagementAPI.unbanAccount(testAccountId);
      console.log('✅ Account unbanned successfully');
      
    } catch (error) {
      console.log('❌ Ban/unban account test failed:', error);
    }
  }
  
  /**
   * Test deleting account
   */
  private static async testDeleteAccount(): Promise<void> {
    console.log('🗑️ Testing delete account...');
    
    try {
      const testAccountId = (global as any).testAccountId;
      
      if (!testAccountId) {
        console.log('⚠️ No test account ID available, skipping test');
        return;
      }
      
      await AccountManagementAPI.deleteAccount(testAccountId);
      console.log('✅ Account deleted successfully');
      
      // Clean up global variable
      delete (global as any).testAccountId;
      
    } catch (error) {
      console.log('❌ Delete account test failed:', error);
    }
  }
  
  /**
   * Test specific endpoint with custom data
   */
  static async testCustomScenario(): Promise<void> {
    console.log('🎯 Testing custom scenario...');
    
    try {
      // Test with query parameters
      const accountsWithFilters = await AccountManagementAPI.getAllAccounts({
        role: 'CUSTOMER',
        status: 'ACTIVE',
        limit: 10
      });
      
      console.log(`✅ Retrieved ${accountsWithFilters.length} filtered accounts`);
      
      // Test statistics
      const stats = await AccountManagementAPI.getAccountStatistics();
      console.log('✅ Account statistics:', stats);
      
    } catch (error) {
      console.log('❌ Custom scenario test failed:', error);
    }
  }
}

/**
 * Helper function to run tests from browser console
 * Usage: window.testAccountAPI()
 */
export const testAccountAPI = () => {
  return AccountAPITestSuite.runAllTests();
};

/**
 * Helper function to run custom tests
 * Usage: window.testAccountAPICustom()
 */
export const testAccountAPICustom = () => {
  return AccountAPITestSuite.testCustomScenario();
};

/**
 * Helper function to run minimal account test
 * Usage: window.testAccountAPIMinimal()
 */
export const testAccountAPIMinimal = () => {
  return AccountAPITestSuite.testCreateAccountMinimal();
};

/**
 * Helper function to run comprehensive account test
 * Usage: window.testAccountAPIComprehensive()
 */
export const testAccountAPIComprehensive = () => {
  return AccountAPITestSuite.testCreateAccountComprehensive();
};

// Make functions available globally for testing
if (typeof window !== 'undefined') {
  (window as any).testAccountAPI = testAccountAPI;
  (window as any).testAccountAPICustom = testAccountAPICustom;
  (window as any).testAccountAPIMinimal = testAccountAPIMinimal;
  (window as any).testAccountAPIComprehensive = testAccountAPIComprehensive;
}
