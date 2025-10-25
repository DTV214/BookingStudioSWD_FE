"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Booking, BookingStatistics } from "@/app/admin/bookinglist/bookinglist"; // Import types from container

interface Props {
  bookings: Booking[];
  statistics: BookingStatistics;
  onUpdateBookingStatus: (bookingId: string, newStatus: Booking['status']) => void;
  onUpdateBooking: (updatedBooking: Booking) => void;
  loading?: boolean;
  error?: string | null;
}

export default function BookingListForm({
  bookings,
  statistics,
  onUpdateBookingStatus,
  onUpdateBooking,
  loading = false,
  error = null
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bookingTypeFilter, setBookingTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'calendar' | 'statistics'>('list');

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    setIsEditModalOpen(true);
  };

  const handleSaveBooking = (updatedBooking: Booking) => {
    onUpdateBooking(updatedBooking);
    setEditingBooking(null);
    setIsEditModalOpen(false);
  };


  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    onUpdateBookingStatus(bookingId, newStatus);
  };

  const getStatusDisplay = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return 'Đang chờ xử lý';
      case 'approved': return 'Đã duyệt';
      case 'completed': return 'Đã hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDotColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-400';
      case 'approved': return 'bg-blue-400';
      case 'completed': return 'bg-green-400';
      case 'cancelled': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };



  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesSearch = 
        booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.studio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      const matchesBookingType = bookingTypeFilter === "all" || booking.bookingType === bookingTypeFilter;
      const matchesDate = !dateFilter || booking.studio.date === dateFilter;

      return matchesSearch && matchesStatus && matchesBookingType && matchesDate;
    });
  }, [bookings, searchTerm, statusFilter, bookingTypeFilter, dateFilter]);


  // Show loading state
  if (loading) {
  return (
    <div className="dashboard-layout">
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
                  Booking Management
              </Link>
            </li>
            <li>
              <Link href="/admin/account" className="menu-link">
                Account Management
              </Link>
            </li>
            <li>
              <Link href="/admin/studios" className="menu-link">
                Studios
              </Link>
            </li>
            <li>
              <Link href="/admin/studio-types" className="menu-link">
                Studio Types
              </Link>
            </li>
            <li>
              <Link href="/admin/location" className="menu-link">
                Location Management
              </Link>
            </li>
            <li>
              <Link href="/admin/service" className="menu-link">
                Service Management
              </Link>
            </li>
              <li>
                <Link href="/admin/pricing" className="menu-link">
                  Pricing Management
                </Link>
              </li>
            <li>
              <Link href="/admin/notifications" className="menu-link">
                Notifications
              </Link>
            </li>
            </ul>
          </nav>
        </aside>

        <section className="dashboard-root">
          <header className="dashboard-header">
            <h1>Booking Management</h1>
          </header>
          
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Đang tải dữ liệu booking...</p>
            </div>
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
              <li>
                <Link href="/admin/dashboard" className="menu-link">
                  Dashboard
                </Link>
              </li>
              <li className="active">
                <Link href="/admin/bookinglist" className="menu-link">
                  Booking Management
                </Link>
              </li>
              <li>
                <Link href="/admin/account" className="menu-link">
                  Account Management
                </Link>
              </li>
              <li>
                <Link href="/admin/studios" className="menu-link">
                  Studios
                </Link>
              </li>
              <li>
                <Link href="/admin/studio-types" className="menu-link">
                  Studio Types
                </Link>
              </li>
              <li>
                <Link href="/admin/location" className="menu-link">
                  Location Management
                </Link>
              </li>
              <li>
                <Link href="/admin/service" className="menu-link">
                  Service Management
                </Link>
              </li>
              <li>
                <Link href="/admin/pricing" className="menu-link">
                  Pricing Management
                </Link>
              </li>
              <li>
                <Link href="/admin/notifications" className="menu-link">
                  Notifications
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <section className="dashboard-root">
          <header className="dashboard-header">
            <h1>Booking Management</h1>
          </header>
          
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Lỗi tải dữ liệu</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Thử lại
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
                Booking Management
              </Link>
            </li>
            <li>
              <Link href="/admin/account" className="menu-link">
                Account Management
              </Link>
            </li>
            <li>
              <Link href="/admin/studios" className="menu-link">
                Studios
              </Link>
            </li>
            <li>
              <Link href="/admin/studio-types" className="menu-link">
                Studio Types
              </Link>
            </li>
            <li>
              <Link href="/admin/location" className="menu-link">
                Location Management
              </Link>
            </li>
            <li>
              <Link href="/admin/service" className="menu-link">
                Service Management
              </Link>
            </li>
            <li>
              <Link href="/admin/pricing" className="menu-link">
                Pricing Management
              </Link>
            </li>
            <li>
              <Link href="/admin/notifications" className="menu-link">
                Notifications
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <section className="dashboard-root">
        <header className="dashboard-header">
          <h1>Booking Management</h1>
        </header>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('list')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'list'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Danh sách Booking
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'calendar'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Lịch Booking
              </button>
              <button
                onClick={() => setActiveTab('statistics')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'statistics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Thống kê
              </button>
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'list' && (
          <div className="booking-tailwind-container">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
            <input
                    type="text"
                    placeholder="Tìm theo tên, email, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tất cả</option>
                    <option value="pending">Đang chờ</option>
                    <option value="approved">Đã duyệt</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loại booking</label>
                  <select
                    value={bookingTypeFilter}
                    onChange={(e) => setBookingTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tất cả</option>
                    <option value="studio_only">Chỉ studio</option>
                    <option value="studio_with_services">Studio + dịch vụ</option>
                    <option value="services_only">Chỉ dịch vụ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ngày</label>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
              </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                  Danh sách Booking ({filteredBookings.length})
              </h2>
        </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Studio</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Services</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800 hover:underline"
                            onClick={() => handleViewBooking(booking)}>
                        {booking.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.customer.name}</div>
                        <div className="text-sm text-gray-500">{booking.customer.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.studio.name}</div>
                        <div className="text-sm text-gray-500">{booking.studio.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{booking.studio.date}</div>
                        <div className="text-gray-500">{booking.studio.time} ({booking.studio.duration})</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {booking.services.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {booking.services.slice(0, 2).map((service, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {service.name}
                              </span>
                            ))}
                            {booking.services.length > 2 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                +{booking.services.length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Không có</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                        {formatPrice(booking.pricing.total)}
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusDotColor(booking.status)}`}></div>
                          {getStatusDisplay(booking.status)}
                      </span>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                          <button
                              onClick={() => handleViewBooking(booking)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                              Xem
                          </button>
                          <button
                            onClick={() => handleEditBooking(booking)}
                              className="text-green-600 hover:text-green-800 font-medium"
                          >
                              Sửa
                          </button>
                            {booking.status === 'pending' && (
                              <button
                                onClick={() => handleStatusChange(booking.id, 'approved')}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Duyệt
                              </button>
                            )}
                            {booking.status === 'approved' && (
                              <button
                                onClick={() => handleStatusChange(booking.id, 'completed')}
                                className="text-green-600 hover:text-green-800 font-medium"
                              >
                                Hoàn thành
                              </button>
                            )}
                            {(booking.status === 'pending' || booking.status === 'approved') && (
                              <button
                                onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                className="text-red-600 hover:text-red-800 font-medium"
                              >
                                Hủy
                          </button>
                            )}
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
              </div>
            </div>
        )}

        {activeTab === 'calendar' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lịch Booking</h3>
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Calendar View</h3>
              <p className="mt-1 text-sm text-gray-500">Tính năng lịch booking sẽ được phát triển trong tương lai.</p>
            </div>
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Tổng Booking</p>
                    <p className="text-2xl font-semibold text-gray-900">{statistics.totalBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Đang chờ</p>
                    <p className="text-2xl font-semibold text-gray-900">{statistics.pendingBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Hoàn thành</p>
                    <p className="text-2xl font-semibold text-gray-900">{statistics.completedBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Tổng doanh thu</p>
                    <p className="text-2xl font-semibold text-gray-900">{formatPrice(statistics.totalRevenue)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bookings by Studio */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking theo Studio</h3>
              <div className="space-y-3">
                {Object.entries(statistics.bookingsByStudio).map(([name, count]) => (
                  <div key={name} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700">{name}</span>
                    <span className="text-gray-900 font-medium">{count} bookings</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View Modal */}
        {isViewModalOpen && selectedBooking && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Chi tiết Booking</h3>
                  <button
                    onClick={() => setIsViewModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Thông tin khách hàng</h4>
                    <p className="text-sm text-gray-600">Tên: {selectedBooking.customer.name}</p>
                    <p className="text-sm text-gray-600">Email: {selectedBooking.customer.email}</p>
                    <p className="text-sm text-gray-600">SĐT: {selectedBooking.customer.phone}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Thông tin loại studio</h4>
                    <p className="text-sm text-gray-600">Tên: {selectedBooking.studio.name}</p>
                    <p className="text-sm text-gray-600">Ngày: {selectedBooking.studio.date}</p>
                    <p className="text-sm text-gray-600">Giờ: {selectedBooking.studio.time}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Tổng tiền</h4>
                    <p className="text-sm font-bold text-gray-900">Tổng: {formatPrice(selectedBooking.pricing.total)}</p>
                  </div>
                  
                  {selectedBooking.notes && (
                    <div>
                      <h4 className="font-medium text-gray-900">Ghi chú</h4>
                      <p className="text-sm text-gray-600">{selectedBooking.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Edit Modal */}
        {isEditModalOpen && editingBooking && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Chỉnh sửa Booking</h3>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
                    <select
                      value={editingBooking.status}
                      onChange={(e) => setEditingBooking({...editingBooking, status: e.target.value as Booking['status']})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Đang chờ</option>
                      <option value="approved">Đã duyệt</option>
                      <option value="completed">Hoàn thành</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú</label>
                    <textarea
                      value={editingBooking.notes || ''}
                      onChange={(e) => setEditingBooking({...editingBooking, notes: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => handleSaveBooking(editingBooking)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <style jsx>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background-color: #f8f9fa; /* Light background for the whole layout */
        }

        .sidebar {
          width: 250px;
          background: #ffffff;
          border-right: 1px solid #e0e0e0;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 30px;
          color: #343a40;
        }

        .sidebar nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar nav li {
          margin-bottom: 8px;
        }

        .sidebar nav .menu-link {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          text-decoration: none;
          color: #495057;
          border-radius: 8px;
          transition: all 0.2s ease-in-out;
          font-size: 15px;
        }

        .sidebar nav .menu-link:hover {
          background-color: #e9ecef;
          color: #212529;
        }

        .sidebar nav li.active .menu-link {
          background-color: #007bff; /* Primary blue */
          color: white;
          font-weight: 600;
        }

        .sidebar nav li.active .menu-link svg {
          color: white;
        }

        .dashboard-root {
          flex: 1;
          padding: 30px;
          background-color: #f8f9fa;
        }

        .dashboard-header {
          margin-bottom: 30px;
          background-color: #ffffff;
          padding: 25px 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dashboard-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: #343a40;
        }

        .booking-tailwind-container {
          padding: 20px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        /* Custom Calendar Styling */
        .react-calendar-custom {
          width: 100%;
          max-width: 800px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          line-height: 1.125em;
        }

        .react-calendar-custom .react-calendar__navigation button {
          color: #007bff;
          min-width: 44px;
          background: none;
          font-size: 1.2em;
          margin-top: 8px;
        }

        .react-calendar-custom .react-calendar__navigation button:enabled:hover,
        .react-calendar-custom .react-calendar__navigation button:enabled:focus {
          background-color: #e6f2ff;
        }

        .react-calendar-custom .react-calendar__month-view__days__day--weekend {
          color: #dc3545; /* Red for weekends */
        }

        .react-calendar-custom .react-calendar__tile--active {
          background: #007bff;
          color: white;
          border-radius: 8px;
        }

        .react-calendar-custom .react-calendar__tile--active:enabled:hover,
        .react-calendar-custom .react-calendar__tile--active:enabled:focus {
          background: #0056b3;
        }

        .react-calendar-custom .react-calendar__tile {
          height: 70px; /* Adjust height for better spacing */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 0.9em;
          padding: 5px;
        }

        .react-calendar-custom .react-calendar__tile abbr {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
