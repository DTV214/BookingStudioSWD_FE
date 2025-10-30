import React from "react";
import Link from "next/link";
import { DashboardData } from "@/infrastructure/AdminAPI/DashBoard/types";
import RevenueChart from "./RevenueChart";

type Booking = {
  id: string;
  customer: string;
  time: string;
  studio: string;
  status: string;
};

type StudioStatus = {
  name: string;
  status: "Occupied" | "Vacant" | "Needs Cleaning" | "Occupied Soon";
};

type Stats = {
  bookingsToday: number;
  revenueToday: number;
  notifications: number;
};

export type DashProps = {
  stats: Stats;
  bookings: Booking[];
  bookingsByStudio: Record<string, number>;
  studios: StudioStatus[];
  notifications: string[];
  // New API data
  dashboardData?: DashboardData;
};

export default function DashBoardForm({
  stats,
  bookings,
  bookingsByStudio,
  studios,
  notifications,
  dashboardData,
}: DashProps) {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Dashboard</h2>
        <nav>
          <ul>
            <li className="active">
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/bookinglist">Booking Management</Link>
            </li>
            <li>
              <Link href="/admin/account">Account Management</Link>
            </li>
            <li>
              <Link href="/admin/studios">Studios</Link>
            </li>
            <li>
              <Link href="/admin/studio-types">Studio Types</Link>
            </li>
            <li>
              <Link href="/admin/location">Location Management</Link>
            </li>
            <li>
              <Link href="/admin/service">Service Management</Link>
            </li>
            <li>
              <Link href="/admin/pricing">Pricing Management</Link>
            </li>
            <li>
              <Link href="/admin/notifications">Notifications</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <section className="dashboard-root">
        {/* HEADER */}
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="dashboard-search">
            <input aria-label="Search" placeholder="Search" />
          </div>
        </header>

        {/* METRICS ROW */}
        <div className="metrics-row">
          <div className="metric-card">
            <div className="metric-title">Total Accounts</div>
            <div className="metric-value">{dashboardData?.totalAccounts || stats.bookingsToday}</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">Total Studios</div>
            <div className="metric-value">{dashboardData?.totalStudios || 0}</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">Total Bookings</div>
            <div className="metric-value">{dashboardData?.totalBookings || stats.bookingsToday}</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">Total Revenue</div>
            <div className="metric-value">{dashboardData?.totalRevenue ? `${dashboardData.totalRevenue.toLocaleString()} đ` : `${stats.revenueToday} đ`}</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">Total Payments</div>
            <div className="metric-value">{dashboardData?.totalPayments || 0}</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">New Notifications</div>
            <div className="metric-value">{stats.notifications}</div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="main-grid">

          {/* Booking Status Stats */}
          {dashboardData?.bookingStatusStats && (
            <div className="card booking-status-card">
              <h3>Booking Status Statistics</h3>
              <div className="status-stats-grid">
                <div className="status-stat-item">
                  <div className="status-label">In Progress</div>
                  <div className="status-value">{dashboardData.bookingStatusStats.IN_PROGRESS}</div>
                </div>
                <div className="status-stat-item">
                  <div className="status-label">Completed</div>
                  <div className="status-value">{dashboardData.bookingStatusStats.COMPLETED}</div>
                </div>
                <div className="status-stat-item">
                  <div className="status-label">Cancelled</div>
                  <div className="status-value">{dashboardData.bookingStatusStats.CANCELLED}</div>
                </div>
                <div className="status-stat-item">
                  <div className="status-label">Awaiting Refund</div>
                  <div className="status-value">{dashboardData.bookingStatusStats.AWAITING_REFUND}</div>
                </div>
              </div>
            </div>
          )}

          {/* Top Service */}
          {dashboardData?.topServiceName && (
            <div className="card top-service-card">
              <h3>Top Service</h3>
              <div className="top-service-info">
                <div className="service-name">{dashboardData.topServiceName}</div>
                <div className="service-usage">Used {dashboardData.topServiceUsage} times</div>
              </div>
            </div>
          )}

          {/* Revenue Chart */}
          {dashboardData?.revenueByMonth && (
            <div className="card revenue-chart-card" style={{ gridColumn: '1 / -1' }}>
              <RevenueChart revenueByMonth={dashboardData.revenueByMonth} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
