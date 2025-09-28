// src/app/components/AdminPage/NotificationsForm.tsx

import React from "react";
import Link from "next/link";

// 1. Định nghĩa kiểu dữ liệu Notification
type NotificationData = {
  name: string; // Tên thông báo
  status: string; // Nội dung chi tiết / trạng thái
  location: string; // Thời gian hoặc địa điểm
};

// 2. Props cho component
type Props = {
  notifications: NotificationData[]; // Mảng notification nhận từ container
};

/**
 * 3. Presentation component: chỉ render UI dựa trên props
 */
export default function NotificationsForm({ notifications }: Props) {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link href="/admin/dashboard" className="menu-link">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/bookinglist" className="menu-link">
                Bookings List
              </Link>
            </li>
            <li>
              <Link href="/admin/customers" className="menu-link">
                Customers
              </Link>
            </li>
            <li>
              <Link href="/admin/studios" className="menu-link">
                Studios
              </Link>
            </li>
            <li className="active">
              <Link href="/admin/notifications" className="menu-link">
                Notifications
              </Link>
            </li>
            <li>
              <Link href="/admin/profile" className="menu-link">
                Profile & Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <section className="notification-root">
        {/* Header */}
        <div className="notification-header">
          <h1>Notifications</h1>
          <div className="header-controls">
            <input className="search-input" placeholder="Search" />
          </div>
        </div>

        {/* Table hiển thị notifications */}
        <div className="notification-card">
          <table className="notification-table" role="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((n, idx) => (
                <tr key={idx}>
                  <td>{n.name}</td>
                  <td>{n.status}</td>
                  <td>{n.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
