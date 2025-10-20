// src/app/admin/location/location.tsx
"use client";

import React from "react";
import LocationManagement from "@/components/AdminPage/LocationManagement";
import { useLocations } from "@/infrastructure/AdminAPI/LocationAPI";

export default function LocationContainer() {
  const { locations, loading, error, createLocation, updateLocation, deleteLocation } = useLocations();

  if (loading) {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <h2 className="logo">Dashboard</h2>
          <nav>
            <ul>
              <li><a href="/admin/dashboard" className="menu-link">Dashboard</a></li>
              <li><a href="/admin/bookinglist" className="menu-link">Bookings List</a></li>
              <li><a href="/admin/account" className="menu-link">Account Management</a></li>
              <li><a href="/admin/studios" className="menu-link">Studios</a></li>
          <li><a href="/admin/studio-types" className="menu-link">Studio Types</a></li>
              <li className="active"><a href="/admin/location" className="menu-link">Location Management</a></li>
              <li><a href="/admin/notifications" className="menu-link">Notifications</a></li>
              <li><a href="/admin/profile-setting" className="menu-link">Profile & Settings</a></li>
            </ul>
          </nav>
        </aside>
        <section className="dashboard-root">
          <header className="dashboard-header">
            <h1>Location Management</h1>
          </header>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading locations...</p>
            </div>
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
              <li><a href="/admin/bookinglist" className="menu-link">Bookings List</a></li>
              <li><a href="/admin/account" className="menu-link">Account Management</a></li>
              <li><a href="/admin/studios" className="menu-link">Studios</a></li>
          <li><a href="/admin/studio-types" className="menu-link">Studio Types</a></li>
              <li className="active"><a href="/admin/location" className="menu-link">Location Management</a></li>
              <li><a href="/admin/notifications" className="menu-link">Notifications</a></li>
              <li><a href="/admin/profile-setting" className="menu-link">Profile & Settings</a></li>
            </ul>
          </nav>
        </aside>
        <section className="dashboard-root">
          <header className="dashboard-header">
            <h1>Location Management</h1>
          </header>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-red-600 font-semibold">Error loading locations</p>
              <p className="text-gray-600 mt-2">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <LocationManagement 
      locations={locations} 
      onCreateLocation={createLocation}
      onUpdateLocation={updateLocation}
      onDeleteLocation={deleteLocation}
    />
  );
}
