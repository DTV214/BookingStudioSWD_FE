"use client";

// Dashboard Status Component
import React from 'react';
import { useDashboardConnection } from '@/infrastructure/AdminAPI/DashBoard/dashboardHooks';

interface DashboardStatusProps {
  className?: string;
}

export default function DashboardStatus({ className = '' }: DashboardStatusProps) {
  const { isConnected, testing } = useDashboardConnection();

  if (testing) {
    return (
      <div className={`dashboard-status testing ${className}`}>
        <div className="status-indicator testing"></div>
        <span>Đang kiểm tra kết nối API...</span>
      </div>
    );
  }

  return (
    <div className={`dashboard-status ${isConnected ? 'connected' : 'disconnected'} ${className}`}>
      <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></div>
      <span>
        {isConnected ? 'Kết nối API thành công' : 'Không thể kết nối API'}
      </span>
    </div>
  );
}
