// src/app/components/AdminPage/StudiosForm.tsx
import React from "react";
import Link from "next/link";

type Studio = {
  name: string;
  status: "Occupied" | "Vacant" | "Needs Cleaning" | "Occupied Soon" | "Free";
  location: string;
};

type Props = {
  studios: Studio[];
};

/**
 * Presentation component: chỉ nhận props và render UI.
 * Không có side effect / fetch / event handler nặng — phù hợp để giữ là Server Component.
 */
export default function StudiosForm({ studios }: Props) {
  return (
    <div className="dashboard-layout">
      {/* Sidebar (giữ y hệt form khác để consistent) */}
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
            <li className="active">
              <Link href="/admin/studios" className="menu-link">
                Studios
              </Link>
            </li>
            <li>
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
      <section className="booking-root">
        {/* Header */}
        <div className="booking-header">
          <h1>Studios</h1>
          <div className="header-controls">
            <input className="search-input" placeholder="Search studios..." />
            <Link href="/admin/studios/new" className="btn primary">
              + New Studio
            </Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="booking-grid">
          {/* Left: table of studios */}
          <div className="card bookings-card">
            <h2>Studio List</h2>

            <table className="bookings-table studios-table" role="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Location</th>
                </tr>
              </thead>

              <tbody>
                {studios.map((s) => (
                  <tr key={s.name}>
                    <td>{s.name}</td>
                    <td>
                      <span
                        className={
                          "studio-pill " +
                          `studio-${s.status
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`
                        }
                      >
                        {s.status}
                      </span>
                    </td>
                    <td>{s.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right column (optional small cards) */}
          <aside className="right-column">
            <div className="card studio-status-card">
              <h3>Summary</h3>
              <p>Total studios: {studios.length}</p>
              <ul className="studio-list">
                {studios.map((s) => (
                  <li key={s.name} className="studio-item">
                    <span className="studio-name">{s.name}</span>
                    <span
                      className={`studio-pill studio-${s.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {s.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
