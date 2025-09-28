// src/components/AdminPage/BookingListForm.tsx
import React from "react";
import Link from "next/link";

type Booking = {
  id: string;
  customer: string;
  time: string;
  studio: string;
  status: "Checked In" | "Confirmed" | "Pending" | "Cancelled";
};

type StudioStatus = {
  name: string;
  status: "Occupied" | "Vacant" | "Needs Cleaning" | "Occupied Soon";
};

type Props = {
  bookings: Booking[];
  bookingsByStudio: Record<string, number>;
  studios: StudioStatus[];
};

export default function BookingListForm({
  bookings,
  bookingsByStudio,
  studios,
}: Props) {
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
            <li className="active">
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
          <h1>Bookings List</h1>
          <div className="header-controls">
            <input className="search-input" placeholder="Search" />
            <Link href="/admin/bookings/new" className="btn primary">
              + New Booking
            </Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="booking-grid">
          {/* Table */}
          <div className="card bookings-card">
            <h2>Bookings</h2>
            <table className="bookings-table">
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
                    <td>
                      <Link href={`/admin/bookings/${b.id}`} className="link">
                        {b.customer}
                      </Link>
                    </td>
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

          {/* Right column */}
          <aside className="right-column">
            <div className="card bookings-by-studio-card">
              <h3>Bookings by Studio</h3>
              <div className="simple-bar-chart">
                {Object.entries(bookingsByStudio).map(([studio, count]) => (
                  <div key={studio} className="bar-row">
                    <div className="bar-label">{studio}</div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{ width: `${Math.min(100, count * 30)}%` }}
                      />
                    </div>
                    <div className="bar-count">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card studio-status-card">
              <h3>Studio Status</h3>
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
