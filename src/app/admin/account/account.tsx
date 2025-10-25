"use client";

import React, { useState, useEffect } from "react";
import AccountManagement from "@/components/AdminPage/AccountManagement";
import { AccountManagementAPI, AccountData, AccountStatistics, AccountCreateRequest, AccountUpdateRequest } from "@/infrastructure/AdminAPI/AccountManagementAPI";

export default function AccountContainer() {
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [statistics, setStatistics] = useState<AccountStatistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load accounts and statistics from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load accounts
        const accountsData = await AccountManagementAPI.getAllAccounts();
        setAccounts(accountsData);
        
        // Load statistics
        const statsData = await AccountManagementAPI.getAccountStatistics();
        setStatistics(statsData);
        
      } catch (err) {
        console.error('Error fetching account data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch account data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle account operations
  const handleCreateAccount = async (accountData: AccountCreateRequest) => {
    try {
      const newAccount = await AccountManagementAPI.createAccount(accountData);
      
      // Refresh data from server instead of local state update
      await handleRefreshData();
      
      return newAccount;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  };

  const handleUpdateAccount = async (accountId: string, accountData: AccountUpdateRequest) => {
    try {
      const updatedAccount = await AccountManagementAPI.updateAccount(accountId, accountData);
      
      // Refresh data from server instead of local state update
      await handleRefreshData();
      
      return updatedAccount;
    } catch (error) {
      console.error('Error updating account:', error);
      throw error;
    }
  };

  const handleBanAccount = async (accountId: string) => {
    try {
      await AccountManagementAPI.banAccount(accountId);
      
      // Refresh data from server instead of local state update
      await handleRefreshData();
    } catch (error) {
      console.error('Error banning account:', error);
      throw error;
    }
  };

  const handleUnbanAccount = async (accountId: string) => {
    try {
      await AccountManagementAPI.unbanAccount(accountId);
      
      // Refresh data from server instead of local state update
      await handleRefreshData();
    } catch (error) {
      console.error('Error unbanning account:', error);
      throw error;
    }
  };

  const handleDeleteAccount = async (accountId: string) => {
    try {
      await AccountManagementAPI.deleteAccount(accountId);
      
      // Refresh data from server instead of local state update
      await handleRefreshData();
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  };

  const handleRefreshData = async () => {
    try {
      console.log('=== REFRESH DATA START ===');
      setLoading(true);
      setError(null);
      
      const accountsData = await AccountManagementAPI.getAllAccounts();
      console.log('=== REFRESH DATA SUCCESS ===');
      console.log('Accounts data:', accountsData);
      console.log('Accounts count:', accountsData.length);
      setAccounts(accountsData);
      
      const statsData = await AccountManagementAPI.getAccountStatistics();
      setStatistics(statsData);
      
    } catch (err) {
      console.error('=== REFRESH DATA ERROR ===');
      console.error('Error refreshing data:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh data');
    } finally {
      setLoading(false);
      console.log('=== REFRESH DATA END ===');
    }
  };

  return (
    <AccountManagement 
      accounts={accounts}
      statistics={statistics}
      loading={loading}
      error={error}
      onCreateAccount={handleCreateAccount}
      onUpdateAccount={handleUpdateAccount}
      onBanAccount={handleBanAccount}
      onUnbanAccount={handleUnbanAccount}
      onDeleteAccount={handleDeleteAccount}
      onRefreshData={handleRefreshData}
    />
  );
}
