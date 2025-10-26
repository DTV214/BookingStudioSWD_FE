"use client";

// Dashboard Client Component
import React from 'react';
import DashBoardForm, { DashProps } from './DashBoardForm';
import { useDashboardData } from '@/infrastructure/AdminAPI/DashBoard/dashboardHooks';
import DashboardStatus from './DashboardStatus';

interface DashboardClientProps {
  fallbackData: DashProps;
}

export default function DashboardClient({ fallbackData }: DashboardClientProps) {
  const { data: dashboardData, loading, error } = useDashboardData();

  // Show loading state
  if (loading) {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h2 className="logo">Dashboard</h2>
          <nav>
            <ul>
              <li className="active">
                <a href="/admin/dashboard">Dashboard</a>
              </li>
              <li>
                <a href="/admin/bookinglist">Booking Management</a>
              </li>
              <li>
                <a href="/admin/account">Account Management</a>
              </li>
              <li>
                <a href="/admin/studios">Studios</a>
              </li>
              <li>
                <a href="/admin/studio-types">Studio Types</a>
              </li>
              <li>
                <a href="/admin/location">Location Management</a>
              </li>
              <li>
                <a href="/admin/service">Service Management</a>
              </li>
              <li>
                <a href="/admin/pricing">Pricing Management</a>
              </li>
              <li>
                <a href="/admin/notifications">Notifications</a>
              </li>
            </ul>
          </nav>
        </aside>

        <section className="dashboard-root">
          <header className="dashboard-header">
            <h1>Dashboard</h1>
            <div className="dashboard-search">
              <input aria-label="Search" placeholder="Search" />
            </div>
          </header>

          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Đang tải dữ liệu dashboard...</p>
            <DashboardStatus />
          </div>
        </section>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h2 className="logo">Dashboard</h2>
          <nav>
            <ul>
              <li className="active">
                <a href="/admin/dashboard">Dashboard</a>
              </li>
              <li>
                <a href="/admin/bookinglist">Booking Management</a>
              </li>
              <li>
                <a href="/admin/account">Account Management</a>
              </li>
              <li>
                <a href="/admin/studios">Studios</a>
              </li>
              <li>
                <a href="/admin/studio-types">Studio Types</a>
              </li>
              <li>
                <a href="/admin/location">Location Management</a>
              </li>
              <li>
                <a href="/admin/service">Service Management</a>
              </li>
              <li>
                <a href="/admin/pricing">Pricing Management</a>
              </li>
              <li>
                <a href="/admin/notifications">Notifications</a>
              </li>
            </ul>
          </nav>
        </aside>

        <section className="dashboard-root">
          <header className="dashboard-header">
            <h1>Dashboard</h1>
            <div className="dashboard-search">
              <input aria-label="Search" placeholder="Search" />
            </div>
          </header>

          <div className="error-container">
            <div className="error-message">
              <h3>Không thể tải dữ liệu dashboard</h3>
              <p>Lỗi: {error}</p>
              <p>Sử dụng dữ liệu mẫu...</p>
            </div>
            <DashboardStatus />
            <DashBoardForm {...fallbackData} />
          </div>
        </section>
      </div>
    );
  }

  // Show success state with real data
  const dataWithApi: DashProps = {
    ...fallbackData,
    dashboardData: dashboardData || undefined,
  };

  return <DashBoardForm {...dataWithApi} />;
}
