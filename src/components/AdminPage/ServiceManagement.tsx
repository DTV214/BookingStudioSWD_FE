"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ServiceData } from "@/infrastructure/AdminAPI/ServiceManagementAPI";

interface Props {
  services: ServiceData[];
  onCreateService: (serviceData: Omit<ServiceData, 'id'>) => Promise<ServiceData>;
  onUpdateService: (id: string, serviceData: Partial<Omit<ServiceData, 'id'>>) => Promise<ServiceData>;
  onDeleteService: (id: string) => Promise<void>;
}

// ServiceManagement component for admin service management
export default function ServiceManagement({ services, onCreateService, onUpdateService, onDeleteService }: Props) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceData | null>(null);
  const [newServiceData, setNewServiceData] = useState({
    serviceName: '',
    serviceFee: 0,
    description: '',
    status: 'AVAILABLE' as 'AVAILABLE' | 'UNAVAILABLE'
  });

  const handleAddService = async () => {
    try {
      console.log('Adding service with data:', newServiceData);
      const result = await onCreateService(newServiceData);
      console.log('Service added successfully:', result);

      setIsAddModalOpen(false);
      setNewServiceData({
        serviceName: '',
        serviceFee: 0,
        description: '',
        status: 'AVAILABLE'
      });
      alert('Service added successfully!');
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Failed to add service. Please try again.');
    }
  };

  const handleEditService = (service: ServiceData) => {
    setEditingService(service);
    setIsEditModalOpen(true);
  };

  const handleUpdateService = async () => {
    if (!editingService) return;
    
    try {
      await onUpdateService(editingService.id, {
        serviceName: editingService.serviceName,
        serviceFee: editingService.serviceFee,
        description: editingService.description,
        status: editingService.status
      });
      setIsEditModalOpen(false);
      setEditingService(null);
      alert('Service updated successfully!');
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service. Please try again.');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await onDeleteService(id);
        alert('Service deleted successfully!');
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service. Please try again.');
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
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
              <Link href="/admin/studio-assign" className="menu-link">
              Studio Assign
              </Link>
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
          <h1>Service Management</h1>
          <div className="dashboard-search">
            <input aria-label="Search" placeholder="Search" />
          </div>
        </header>

        {/* Service Content with Tailwind CSS */}
        <div className="service-tailwind-container">
          {/* Add Service Button */}
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              <span>+ Add Service</span>
            </button>
          </div>

          {/* Services Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                </svg>
                Services List
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                          </svg>
                          <p className="text-lg font-medium text-gray-900 mb-1">No services found</p>
                          <p className="text-sm text-gray-500">Services will appear here when added</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    services.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {service.serviceName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatPrice(service.serviceFee)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                          {service.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            service.status === 'AVAILABLE'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              service.status === 'AVAILABLE' ? 'bg-green-400' : 'bg-red-400'
                            }`}></div>
                            {service.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditService(service)}
                              className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-colors duration-150"
                              title="Edit Service"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-150"
                              title="Delete Service"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3,6 5,6 21,6"/>
                                <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Service</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                <input
                  type="text"
                  value={newServiceData.serviceName}
                  onChange={(e) => setNewServiceData({...newServiceData, serviceName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter service name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Fee</label>
                <input
                  type="number"
                  value={newServiceData.serviceFee}
                  onChange={(e) => setNewServiceData({...newServiceData, serviceFee: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter service fee"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newServiceData.description}
                  onChange={(e) => setNewServiceData({...newServiceData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter service description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newServiceData.status}
                  onChange={(e) => setNewServiceData({...newServiceData, status: e.target.value as 'AVAILABLE' | 'UNAVAILABLE'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="UNAVAILABLE">Unavailable</option>
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
                onClick={handleAddService}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {isEditModalOpen && editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Service</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                <input
                  type="text"
                  value={editingService.serviceName}
                  onChange={(e) => setEditingService({...editingService, serviceName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Fee</label>
                <input
                  type="number"
                  value={editingService.serviceFee}
                  onChange={(e) => setEditingService({...editingService, serviceFee: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editingService.status}
                  onChange={(e) => setEditingService({...editingService, status: e.target.value as 'AVAILABLE' | 'UNAVAILABLE'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="UNAVAILABLE">Unavailable</option>
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
                onClick={handleUpdateService}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
