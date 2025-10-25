"use client";

import React, { useState } from "react";
import Link from "next/link";

// Interface for Studio Assignment data
interface StudioAssign {
  id: string;
  bookingId: string;
  studioId: string;
  studioName: string;
  customerName: string;
  customerPhone: string;
  startTime: string;
  endTime: string;
  additionTime: number; // Additional time in minutes
  status: 'COMING_SOON' | 'IS_HAPPENING' | 'ENDED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

interface Props {
  studioAssignments: StudioAssign[];
  onUpdateStatus: (id: string, status: StudioAssign['status']) => Promise<void>;
  onUpdateTime: (id: string, startTime: string, endTime: string, additionTime: number) => Promise<void>;
  onRefresh: () => Promise<void>;
}

// StudioAssign component for admin studio assignment management
export default function StudioAssign({ 
  studioAssignments, 
  onUpdateStatus, 
  onUpdateTime,
  onRefresh 
}: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<StudioAssign | null>(null);
  const [editData, setEditData] = useState({
    startTime: '',
    endTime: '',
    additionTime: 0
  });

  // Handle edit assignment
  const handleEditAssignment = (assignment: StudioAssign) => {
    setSelectedAssignment(assignment);
    setEditData({
      startTime: assignment.startTime,
      endTime: assignment.endTime,
      additionTime: assignment.additionTime || 0
    });
    setIsEditModalOpen(true);
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    if (!selectedAssignment) return;
    
    try {
      await onUpdateTime(
        selectedAssignment.id,
        editData.startTime,
        editData.endTime,
        editData.additionTime
      );
      setIsEditModalOpen(false);
      setSelectedAssignment(null);
      alert('Assignment updated successfully!');
    } catch (error) {
      console.error('Error updating assignment:', error);
      alert('Failed to update assignment. Please try again.');
    }
  };

  // Handle update status
  const handleUpdateStatus = async (id: string, status: StudioAssign['status']) => {
    try {
      await onUpdateStatus(id, status);
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  // Get status display text and color
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'COMING_SOON':
        return { text: 'COMING_SOON', color: 'bg-yellow-100 text-yellow-800', dotColor: 'bg-yellow-400' };
      case 'IS_HAPPENING':
        return { text: 'IS_HAPPENING', color: 'bg-green-100 text-green-800', dotColor: 'bg-green-400' };
      case 'ENDED':
        return { text: 'ENDED', color: 'bg-blue-100 text-blue-800', dotColor: 'bg-blue-400' };
      case 'CANCELLED':
        return { text: 'CANCELLED', color: 'bg-red-100 text-red-800', dotColor: 'bg-red-400' };
      default:
        return { text: status, color: 'bg-gray-100 text-gray-800', dotColor: 'bg-gray-400' };
    }
  };

  // Format datetime for display
  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link href="/admin/dashboard" className="menu-link">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/bookinglist" className="menu-link">Bookings List</Link>
            </li>
            <li>
              <Link href="/admin/account" className="menu-link">Account Management</Link>
            </li>
            <li>
              <Link href="/admin/studios" className="menu-link">Studios</Link>
            </li>
            <li>
              <Link href="/admin/studio-types" className="menu-link">Studio Types</Link>
            </li>
            <li>
              <Link href="/admin/location" className="menu-link">Location Management</Link>
            </li>
            <li>
              <Link href="/admin/service" className="menu-link">Service Management</Link>
            </li>
            <li>
              <Link href="/admin/pricing" className="menu-link">Pricing Management</Link>
            </li>
            <li>
              <Link href="/admin/studio-assign" className="menu-link">Studio Assign</Link>
            </li>
            <li>
              <Link href="/admin/notifications" className="menu-link">Notifications</Link>
            </li>
            <li>
              <Link href="/admin/profile-setting" className="menu-link">Profile & Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <section className="dashboard-root">
        {/* HEADER */}
        <header className="dashboard-header">
          <h1>Studio Assign Management</h1>
          <div className="dashboard-search">
            <input aria-label="Search" placeholder="Search" />
          </div>
        </header>

        {/* Studio Assign Content */}
        <div className="service-tailwind-container">
          {/* Refresh Button */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Studio Assignments</h2>
            <button
              onClick={onRefresh}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>

          {/* Studio Assignments Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                Assignment List
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Studio</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">End Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Additional Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studioAssignments.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                          </svg>
                          <p className="text-lg font-medium text-gray-900 mb-1">No assignments found</p>
                          <p className="text-sm text-gray-500">Assignments will appear here when created</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    studioAssignments.map((assignment, index) => {
                      const statusDisplay = getStatusDisplay(assignment.status);
                      return (
                        <tr key={assignment.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {assignment.studioName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">{assignment.customerName}</div>
                            <div className="text-sm text-gray-500">{assignment.customerPhone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatDateTime(assignment.startTime)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatDateTime(assignment.endTime)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {assignment.additionTime > 0 ? `${assignment.additionTime} min` : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDisplay.color}`}>
                              <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusDisplay.dotColor}`}></div>
                              {statusDisplay.text}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditAssignment(assignment)}
                                className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-colors duration-150"
                                title="Edit Assignment"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                </svg>
                              </button>
                              <select
                                value={assignment.status}
                                onChange={(e) => handleUpdateStatus(assignment.id, e.target.value as StudioAssign['status'])}
                                className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="COMING_SOON">COMING_SOON</option>
                                <option value="IS_HAPPENING">IS_HAPPENING</option>
                                <option value="ENDED">ENDED</option>
                                <option value="CANCELLED">CANCELLED</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Assignment Modal */}
      {isEditModalOpen && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Assignment</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Studio</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedAssignment.studioName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedAssignment.customerName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="datetime-local"
                  value={editData.startTime}
                  onChange={(e) => setEditData({...editData, startTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="datetime-local"
                  value={editData.endTime}
                  onChange={(e) => setEditData({...editData, endTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Time (minutes)</label>
                <input
                  type="number"
                  value={editData.additionTime}
                  onChange={(e) => setEditData({...editData, additionTime: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
