"use client";

import React from "react";
import ServiceManagement from "@/components/AdminPage/ServiceManagement";
import { useServices } from "@/infrastructure/AdminAPI/ServiceManagementAPI";

export default function ServiceContainer() {
  const { services, loading, error, createService, updateService, deleteService } = useServices();

  if (loading) {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h2 className="logo">Dashboard</h2>
          <nav>
            <ul>
              <li><a href="/admin/dashboard" className="menu-link">Dashboard</a></li>
              <li><a href="/admin/bookinglist" className="menu-link">Booking Management</a></li>
              <li><a href="/admin/account" className="menu-link">Account Management</a></li>
              <li><a href="/admin/studios" className="menu-link">Studios</a></li>
              <li><a href="/admin/studio-types" className="menu-link">Studio Types</a></li>
              <li><a href="/admin/location" className="menu-link">Location Management</a></li>
              <li className="active"><a href="/admin/service" className="menu-link">Service Management</a></li>
              <li><a href="/admin/pricing" className="menu-link">Pricing Management</a></li>
              <li><a href="/admin/notifications" className="menu-link">Notifications</a></li>
            </ul>
          </nav>
        </aside>
        <section className="dashboard-root">
          <header className="dashboard-header">
            <h1>Service Management</h1>
            <div className="dashboard-search">
              <input aria-label="Search" placeholder="Search" />
            </div>
          </header>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h2 className="logo">Dashboard</h2>
          <nav>
            <ul>
              <li><a href="/admin/dashboard" className="menu-link">Dashboard</a></li>
              <li><a href="/admin/bookinglist" className="menu-link">Booking Management</a></li>
              <li><a href="/admin/account" className="menu-link">Account Management</a></li>
              <li><a href="/admin/studios" className="menu-link">Studios</a></li>
              <li><a href="/admin/studio-types" className="menu-link">Studio Types</a></li>
              <li><a href="/admin/location" className="menu-link">Location Management</a></li>
              <li className="active"><a href="/admin/service" className="menu-link">Service Management</a></li>
              <li><a href="/admin/pricing" className="menu-link">Pricing Management</a></li>
              <li><a href="/admin/notifications" className="menu-link">Notifications</a></li>
            </ul>
          </nav>
        </aside>
        <section className="dashboard-root">
          <header className="dashboard-header">
            <h1>Service Management</h1>
            <div className="dashboard-search">
              <input aria-label="Search" placeholder="Search" />
            </div>
          </header>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-600 text-lg font-semibold mb-2">Error Loading Services</div>
              <div className="text-gray-600">{error}</div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <ServiceManagement
      services={services}
      onCreateService={createService}
      onUpdateService={updateService}
      onDeleteService={deleteService}
    />
  );
}
