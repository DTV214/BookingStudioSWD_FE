"use client";

// Dashboard API Hooks
import { useState, useEffect } from 'react';
import { DashboardService } from './dashboardService';
import { DashboardData } from './types';

export interface UseDashboardDataReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook để lấy dữ liệu dashboard
 */
export function useDashboardData(): UseDashboardDataReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching dashboard data...');
      
      const dashboardData = await DashboardService.getDashboardData();
      setData(dashboardData);
      console.log('Dashboard data fetched successfully:', dashboardData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data';
      setError(errorMessage);
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Hook để test kết nối API dashboard
 */
export function useDashboardConnection() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [testing, setTesting] = useState(false);

  const testConnection = async () => {
    try {
      setTesting(true);
      console.log('Testing dashboard API connection...');
      
      const connected = await DashboardService.testConnection();
      setIsConnected(connected);
      console.log('Dashboard connection test result:', connected);
    } catch (error) {
      console.error('Dashboard connection test failed:', error);
      setIsConnected(false);
    } finally {
      setTesting(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return {
    isConnected,
    testing,
    testConnection,
  };
}

