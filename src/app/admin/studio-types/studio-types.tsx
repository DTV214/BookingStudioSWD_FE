// src/app/admin/studio-types/studio-types.tsx
"use client";

import React, { useMemo } from "react";
import StudioTypesForm from "@/components/AdminPage/Studio-Types";
import { StudioType } from "@/domain/models/studio-type/studioType";
import { useStudioTypes } from "@/infrastructure/AdminAPI/Studio-TypesAPI/studioTypesHooks";

export default function StudioTypesContainer() {
  const { studioTypes, loading, error, createStudioType, updateStudioType, deleteStudioType } = useStudioTypes();

  const handleCreate = async (payload: Omit<StudioType, "id">) => {
    return await createStudioType(payload);
  };

  const handleUpdate = async (id: string, payload: Partial<StudioType>) => {
    return await updateStudioType(id, payload);
  };

  const handleDelete = async (id: string) => {
    await deleteStudioType(id);
    return true;
  };

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
              <li className="active"><a href="/admin/studio-types" className="menu-link">Studio Types</a></li>
              <li><a href="/admin/location" className="menu-link">Location Management</a></li>
              <li><a href="/admin/service" className="menu-link">Service Management</a></li>
              <li><a href="/admin/notifications" className="menu-link">Notifications</a></li>
              <li><a href="/admin/profile-setting" className="menu-link">Profile & Settings</a></li>
            </ul>
          </nav>
        </aside>
        <section className="dashboard-root">
          <header className="dashboard-header">
            <h1>Studio Types</h1>
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
              <li><a href="/admin/bookinglist" className="menu-link">Bookings List</a></li>
              <li><a href="/admin/account" className="menu-link">Account Management</a></li>
              <li><a href="/admin/studios" className="menu-link">Studios</a></li>
              <li className="active"><a href="/admin/studio-types" className="menu-link">Studio Types</a></li>
              <li><a href="/admin/location" className="menu-link">Location Management</a></li>
              <li><a href="/admin/service" className="menu-link">Service Management</a></li>
              <li><a href="/admin/notifications" className="menu-link">Notifications</a></li>
              <li><a href="/admin/profile-setting" className="menu-link">Profile & Settings</a></li>
            </ul>
          </nav>
        </aside>
        <section className="dashboard-root">
          <header className="dashboard-header">
            <h1>Studio Types</h1>
          </header>
          <div className="max-w-2xl mx-auto p-4">
            <div className="rounded-md bg-red-50 text-red-700 p-4">{error}</div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <StudioTypesForm
      studioTypes={studioTypes}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}


