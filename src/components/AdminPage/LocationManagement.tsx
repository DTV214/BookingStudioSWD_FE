"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Location {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'inactive';
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  locations: Location[];
}

// LocationManagement component for admin location management
export default function LocationManagement({ locations }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isMapVisible, setIsMapVisible] = useState(false);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setIsMapVisible(true);
  };

  const handleCloseMap = () => {
    setIsMapVisible(false);
    setSelectedLocation(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
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
              <Link href="/admin/customers" className="menu-link">Customers</Link>
            </li>
            <li>
              <Link href="/admin/studios" className="menu-link">Studios</Link>
            </li>
            <li className="active">
              <Link href="/admin/location" className="menu-link">Location Management</Link>
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
          <h1>Location Management</h1>
          <div className="dashboard-search">
            <input 
              aria-label="Search" 
              placeholder="Search by name" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* Location Content with Tailwind CSS */}
        <div className="location-tailwind-container">
          {/* Add Location Button */}
          <div className="mb-6 flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200 shadow-lg hover:shadow-xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              <span>+ Add Location</span>
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Locations Table */}
            <div className="xl:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Locations List
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLocations.map((location) => (
                      <tr key={location.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
                          onClick={() => handleLocationClick(location)}
                        >
                          {location.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {location.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                          {location.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            location.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              location.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                            }`}></div>
                            {location.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button 
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors duration-150"
                              onClick={() => handleLocationClick(location)}
                              title="Xem bản đồ"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                              </svg>
                            </button>
                            <button 
                              className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50 transition-colors duration-150"
                              title="Chỉnh sửa"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors duration-150"
                              title="Xóa"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3,6 5,6 21,6"/>
                                <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Map View */}
            <div className="xl:col-span-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                    </svg>
                    Map View
                  </h3>
                  {selectedLocation && (
                    <button 
                      className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors duration-150"
                      onClick={handleCloseMap}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                {selectedLocation ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-gray-800 text-lg mb-2">{selectedLocation.name}</h4>
                      <p className="text-gray-600 text-sm mb-3">{selectedLocation.address}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
                        <div>
                          <span className="font-medium">Lat:</span> {selectedLocation.latitude}
                        </div>
                        <div>
                          <span className="font-medium">Lng:</span> {selectedLocation.longitude}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          selectedLocation.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                        }`}></div>
                        <span className={`text-sm font-medium ${
                          selectedLocation.status === 'active' ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {selectedLocation.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                      <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto text-blue-500 mb-3">
                        <circle cx="50" cy="50" r="40" fill="#e3f2fd" stroke="#2196f3"/>
                        <circle cx="50" cy="50" r="8" fill="#2196f3"/>
                        <path d="M30 30L70 30M30 70L70 70M30 30L30 70M70 30L70 70" stroke="#2196f3" strokeWidth="1"/>
                      </svg>
                      <p className="text-sm text-gray-600 font-medium">Interactive Map</p>
                      <p className="text-xs text-gray-500 mt-1">Click to zoom and explore</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-gray-400 mb-4">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <p className="text-gray-500 text-sm font-medium">Click on a location ID</p>
                    <p className="text-gray-400 text-xs mt-1">to view on map</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
