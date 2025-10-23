"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PricingData } from "@/infrastructure/AdminAPI/PricingManagementAPI";

interface Props {
  priceTables: PricingData[];
  onCreatePriceTable: (priceData: Omit<PricingData, 'id'>) => Promise<PricingData>;
  onUpdatePriceTable: (id: string, priceData: Partial<Omit<PricingData, 'id'>>) => Promise<PricingData>;
  onDeletePriceTable: (id: string) => Promise<void>;
}

// PricingManagement component for admin pricing management
export default function PricingManagement({ priceTables, onCreatePriceTable, onUpdatePriceTable, onDeletePriceTable }: Props) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPriceTable, setEditingPriceTable] = useState<PricingData | null>(null);
  const [newPriceData, setNewPriceData] = useState({
    startDate: '',
    endDate: '',
    priority: 0,
    status: 'COMING_SOON' as 'COMING_SOON' | 'IS_HAPPENING' | 'ENDED'
  });

  // Step 1: Handle create new price table
  const handleAddPriceTable = async () => {
    try {
      console.log('Adding price table with data:', newPriceData);
      const result = await onCreatePriceTable(newPriceData);
      console.log('Price table added successfully:', result);

      setIsAddModalOpen(false);
      setNewPriceData({
        startDate: '',
        endDate: '',
        priority: 0,
        status: 'COMING_SOON'
      });
      alert('Price table added successfully!');
    } catch (error) {
      console.error('Error adding price table:', error);
      alert('Failed to add price table. Please try again.');
    }
  };

  // Step 2: Handle edit price table
  const handleEditPriceTable = (priceTable: PricingData) => {
    setEditingPriceTable(priceTable);
    setIsEditModalOpen(true);
  };

  // Step 3: Handle update price table
  const handleUpdatePriceTable = async () => {
    if (!editingPriceTable) return;
    
    try {
      await onUpdatePriceTable(editingPriceTable.id, {
        startDate: editingPriceTable.startDate,
        endDate: editingPriceTable.endDate,
        priority: editingPriceTable.priority,
        status: editingPriceTable.status
      });
      setIsEditModalOpen(false);
      setEditingPriceTable(null);
      alert('Price table updated successfully!');
    } catch (error) {
      console.error('Error updating price table:', error);
      alert('Failed to update price table. Please try again.');
    }
  };

  // Step 4: Handle delete price table
  const handleDeletePriceTable = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this price table?')) {
      try {
        await onDeletePriceTable(id);
        alert('Price table deleted successfully!');
      } catch (error) {
        console.error('Error deleting price table:', error);
        alert('Failed to delete price table. Please try again.');
      }
    }
  };

  // Step 5: Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Step 6: Get status display text and color
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'COMING_SOON':
        return { text: 'COMING_SOON', color: 'bg-yellow-100 text-yellow-800', dotColor: 'bg-yellow-400' };
      case 'IS_HAPPENING':
        return { text: 'IS_HAPPENING', color: 'bg-green-100 text-green-800', dotColor: 'bg-green-400' };
      case 'ENDED':
        return { text: 'ENDED', color: 'bg-red-100 text-red-800', dotColor: 'bg-red-400' };
      default:
        return { text: status, color: 'bg-gray-100 text-gray-800', dotColor: 'bg-gray-400' };
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
          <h1>Pricing Management</h1>
          <div className="dashboard-search">
            <input aria-label="Search" placeholder="Search" />
          </div>
        </header>

        {/* Pricing Content with Tailwind CSS */}
        <div className="service-tailwind-container">
          {/* Add Price Table Button */}
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              <span>+ Add Price Table</span>
            </button>
          </div>

          {/* Price Tables Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
                Price Tables List
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {priceTables.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                          </svg>
                          <p className="text-lg font-medium text-gray-900 mb-1">No price tables found</p>
                          <p className="text-sm text-gray-500">Price tables will appear here when added</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    priceTables.map((priceTable, index) => {
                      const statusDisplay = getStatusDisplay(priceTable.status);
                      return (
                        <tr key={priceTable.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatDate(priceTable.startDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatDate(priceTable.endDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {priceTable.priority}
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
                                onClick={() => handleEditPriceTable(priceTable)}
                                className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-colors duration-150"
                                title="Edit Price Table"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeletePriceTable(priceTable.id)}
                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-150"
                                title="Delete Price Table"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3,6 5,6 21,6"/>
                                  <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                                </svg>
                              </button>
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

      {/* Add Price Table Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Price Table</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={newPriceData.startDate}
                  onChange={(e) => setNewPriceData({...newPriceData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={newPriceData.endDate}
                  onChange={(e) => setNewPriceData({...newPriceData, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <input
                  type="number"
                  value={newPriceData.priority}
                  onChange={(e) => setNewPriceData({...newPriceData, priority: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter priority (0, 1, 2...)"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newPriceData.status}
                  onChange={(e) => setNewPriceData({...newPriceData, status: e.target.value as 'COMING_SOON' | 'IS_HAPPENING' | 'ENDED'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="COMING_SOON">Coming Soon</option>
                  <option value="IS_HAPPENING">Is Happening</option>
                  <option value="ENDED">Ended</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPriceTable}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Price Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Price Table Modal */}
      {isEditModalOpen && editingPriceTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Price Table</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={editingPriceTable.startDate}
                  onChange={(e) => setEditingPriceTable({...editingPriceTable, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={editingPriceTable.endDate}
                  onChange={(e) => setEditingPriceTable({...editingPriceTable, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <input
                  type="number"
                  value={editingPriceTable.priority}
                  onChange={(e) => setEditingPriceTable({...editingPriceTable, priority: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingPriceTable.status}
                  onChange={(e) => setEditingPriceTable({...editingPriceTable, status: e.target.value as 'COMING_SOON' | 'IS_HAPPENING' | 'ENDED'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="COMING_SOON">Coming Soon</option>
                  <option value="IS_HAPPENING">Is Happening</option>
                  <option value="ENDED">Ended</option>
                </select>
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
                onClick={handleUpdatePriceTable}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Price Table
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
