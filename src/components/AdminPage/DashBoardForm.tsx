import React from "react";
import Link from "next/link";

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
};

export default function DashBoardForm({
  stats,
  bookings,
  bookingsByStudio,
  studios,
  notifications,
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
            <div className="metric-title">Today&apos;s Bookings</div>
            <div className="metric-value">{stats.bookingsToday}</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">Today&apos;s Revenue</div>
            <div className="metric-value">${stats.revenueToday}</div>
          </div>

          <div className="metric-card">
            <div className="metric-title">New Notifications</div>
            <div className="metric-value">{stats.notifications}</div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="main-grid">
          {/* Bookings table */}
          <div className="card bookings-card">
            <h2>Bookings</h2>
            <table className="bookings-table" role="table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Time</th>
                  <th>Studio</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.customer}</td>
                    <td>{b.time}</td>
                    <td>{b.studio}</td>
                    <td>
                      <span
                        className={`status-pill status-${b.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right column: Notifications + Studio Status */}
          <aside className="right-column">
            <div className="card notifications-card">
              <h3>Notifications</h3>
              <ul>
                {notifications.map((n, idx) => (
                  <li key={idx} className="notification-item">
                    <span className="notification-dot" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card studio-status-card">
              <h3>Studio Status</h3>
              <ul>
                {studios.map((s) => (
                  <li key={s.name} className="studio-item">
                    <span>{s.name}</span>
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

          {/* Chart area wide below table */}
          <div className="card chart-card">
            <h3>Bookings by Studio</h3>
            <div
              className="simple-bar-chart"
              role="img"
              aria-label="Bookings by studio"
            >
              {Object.entries(bookingsByStudio).map(([studioName, count]) => (
                <div key={studioName} className="bar-row">
                  <div className="bar-label">{studioName}</div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ width: `${Math.min(100, count * 25)}%` }}
                    />
                  </div>
                  <div className="bar-count">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
