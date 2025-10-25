"use client";

import React, { useState, useEffect } from "react";
import StudioAssign from "@/components/AdminPage/StudioAssign";

// Interface for Studio Assignment data
interface StudioAssignData {
  id: string;
  bookingId: string;
  studioId: string;
  studioName: string;
  customerName: string;
  customerPhone: string;
  startTime: string;
  endTime: string;
  additionTime: number;
  status: 'COMING_SOON' | 'IS_HAPPENING' | 'ENDED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export default function StudioAssignContainer() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studioAssignments, setStudioAssignments] = useState<StudioAssignData[]>([]);

  // Hardcoded data for now (will be replaced with API calls later)
  const mockData: StudioAssignData[] = [
    {
      id: '1',
      bookingId: 'B001',
      studioId: 'S001',
      studioName: 'Studio A - Wedding',
      customerName: 'Nguyễn Văn A',
      customerPhone: '0901234567',
      startTime: '2025-01-15T10:00:00',
      endTime: '2025-01-15T14:00:00',
      additionTime: 30,
      status: 'COMING_SOON',
      createdAt: '2025-01-10T09:00:00',
      updatedAt: '2025-01-10T09:00:00'
    },
    {
      id: '2',
      bookingId: 'B002',
      studioId: 'S002',
      studioName: 'Studio B - Portrait',
      customerName: 'Trần Thị B',
      customerPhone: '0912345678',
      startTime: '2025-01-15T15:00:00',
      endTime: '2025-01-15T18:00:00',
      additionTime: 0,
      status: 'IS_HAPPENING',
      createdAt: '2025-01-11T10:00:00',
      updatedAt: '2025-01-14T11:00:00'
    },
    {
      id: '3',
      bookingId: 'B003',
      studioId: 'S003',
      studioName: 'Studio C - Fashion',
      customerName: 'Lê Văn C',
      customerPhone: '0923456789',
      startTime: '2025-01-14T09:00:00',
      endTime: '2025-01-14T12:00:00',
      additionTime: 45,
      status: 'ENDED',
      createdAt: '2025-01-09T08:00:00',
      updatedAt: '2025-01-14T12:00:00'
    },
    {
      id: '4',
      bookingId: 'B004',
      studioId: 'S001',
      studioName: 'Studio A - Wedding',
      customerName: 'Phạm Thị D',
      customerPhone: '0934567890',
      startTime: '2025-01-16T10:00:00',
      endTime: '2025-01-16T14:00:00',
      additionTime: 0,
      status: 'CANCELLED',
      createdAt: '2025-01-12T09:00:00',
      updatedAt: '2025-01-13T10:00:00'
    }
  ];

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setStudioAssignments(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to load studio assignments');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle refresh data
  const handleRefresh = async () => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setStudioAssignments(mockData);
      setError(null);
    } catch (err) {
      setError('Failed to refresh studio assignments');
      console.error('Error refreshing data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle update status
  const handleUpdateStatus = async (id: string, status: StudioAssignData['status']) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state
      setStudioAssignments(prev =>
        prev.map(assignment =>
          assignment.id === id
            ? { ...assignment, status, updatedAt: new Date().toISOString() }
            : assignment
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
      throw err;
    }
  };

  // Handle update time
  const handleUpdateTime = async (id: string, startTime: string, endTime: string, additionTime: number) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state
      setStudioAssignments(prev =>
        prev.map(assignment =>
          assignment.id === id
            ? { ...assignment, startTime, endTime, additionTime, updatedAt: new Date().toISOString() }
            : assignment
        )
      );
    } catch (err) {
      console.error('Error updating time:', err);
      throw err;
    }
  };

  // Show loading state
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
              <li><a href="/admin/location" className="menu-link">Location Management</a></li>
              <li><a href="/admin/service" className="menu-link">Service Management</a></li>
              <li><a href="/admin/pricing" className="menu-link">Pricing Management</a></li>
              <li className="active"><a href="/admin/studio-assign" className="menu-link">Studio Assign</a></li>
              <li><a href="/admin/notifications" className="menu-link">Notifications</a></li>
              <li><a href="/admin/profile-setting" className="menu-link">Profile & Settings</a></li>
            </ul>
          </nav>
        </aside>
        <section className="dashboard-root">
          <header className="dashboard-header">
            <h1>Studio Assign Management</h1>
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

  // Show error state
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
              <li><a href="/admin/location" className="menu-link">Location Management</a></li>
              <li><a href="/admin/service" className="menu-link">Service Management</a></li>
              <li><a href="/admin/pricing" className="menu-link">Pricing Management</a></li>
              <li className="active"><a href="/admin/studio-assign" className="menu-link">Studio Assign</a></li>
              <li><a href="/admin/notifications" className="menu-link">Notifications</a></li>
              <li><a href="/admin/profile-setting" className="menu-link">Profile & Settings</a></li>
            </ul>
          </nav>
        </aside>
        <section className="dashboard-root">
          <header className="dashboard-header">
            <h1>Studio Assign Management</h1>
            <div className="dashboard-search">
              <input aria-label="Search" placeholder="Search" />
            </div>
          </header>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-600 text-lg font-semibold mb-2">Error Loading Studio Assignments</div>
              <div className="text-gray-600">{error}</div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Render the presentation component
  return (
    <StudioAssign
      studioAssignments={studioAssignments}
      onUpdateStatus={handleUpdateStatus}
      onUpdateTime={handleUpdateTime}
      onRefresh={handleRefresh}
    />
  );
}
