// src/components/AdminPage/CustomersForm.tsx
import React from "react";
import Link from "next/link";

// Định nghĩa kiểu dữ liệu cho một Customer
type Customer = {
  name: string;
  email: string;
  phone: string;
};

// Kiểu props cho component CustomersForm
type Props = {
  customers: Customer[]; // nhận một danh sách customers
};

export default function CustomersForm({ customers }: Props) {
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
            <li className="active">
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
      <section className="customers-root">
        <header className="customers-header">
          <h1>Customers</h1>
        </header>

        <div className="card customers-card">
          <h2>Customer List</h2>
          <table className="customers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, idx) => (
                <tr key={idx}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
