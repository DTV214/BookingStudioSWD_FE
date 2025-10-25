"use client";

import React, { useState } from "react";
import Link from "next/link";
import BookingFilter from "./bookingfilter";
import BookingViewModal from "./bookingviewmodal";
import BookingEditModal from "./bookingeditmodal";
import BookingActionBar from "./bookingactionbar";

interface Customer {
  name: string;
  email: string;
  phone: string;
}

interface Studio {
  name: string;
  address: string;
  date: string;
  time: string;
  duration: string;
}

interface Service {
  name: string;
  price: number;
}

interface Pricing {
  studioPrice: number;
  servicePrice: number;
  overtimeFee: number;
  total: number;
}

interface BookingHistory {
  date: string;
  action: string;
  updatedBy: string;
}

interface Booking {
  id: string;
  customer: Customer;
  studio: Studio;
  services: Service[];
  pricing: Pricing;
  notes?: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  approvedBy?: string;
  history: BookingHistory[];
  createdAt: string;
}

interface Props {
  bookings: Booking[];
}

const BookingData: Booking[] = [
  {
    id: "BK001",
    customer: {
      name: "Nguyễn Thị Mai",
      email: "nguyenthimai@gmail.com",
      phone: "0123-456-789"
    },
    studio: {
      name: "Studio Luxury",
      address: "123 Nguyễn Huệ, Q1, TP.HCM",
      date: "2024-01-20",
      time: "09:00",
      duration: "3 giờ"
    },
    services: [
      { name: "Makeup", price: 500000 },
      { name: "Trang phục", price: 300000 },
      { name: "Máy quay", price: 800000 }
    ],
    pricing: {
      studioPrice: 2000000,
      servicePrice: 1600000,
      overtimeFee: 0,
      total: 3600000
    },
    notes: "Khách hàng muốn trang điểm tự nhiên, trang phục vintage",
    status: "approved",
    approvedBy: "Admin",
    history: [
      { date: "2024-01-15 10:00", action: "Tạo đơn đặt", updatedBy: "Nguyễn Thị Mai" },
      { date: "2024-01-15 14:30", action: "Duyệt đơn", updatedBy: "Admin" }
    ],
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "BK002",
    customer: {
      name: "Trần Văn Nam",
      email: "tranvannam@gmail.com",
      phone: "0987-654-321"
    },
    studio: {
      name: "Studio Modern",
      address: "456 Lê Lợi, Q3, TP.HCM",
      date: "2024-01-22",
      time: "14:00",
      duration: "2 giờ"
    },
    services: [
      { name: "Máy chụp hình", price: 600000 },
      { name: "Đạo cụ", price: 200000 }
    ],
    pricing: {
      studioPrice: 1500000,
      servicePrice: 800000,
      overtimeFee: 200000,
      total: 2500000
    },
    notes: "Chụp ảnh sản phẩm, cần ánh sáng tự nhiên",
    status: "pending",
    history: [
      { date: "2024-01-18 16:00", action: "Tạo đơn đặt", updatedBy: "Trần Văn Nam" }
    ],
    createdAt: "2024-01-18T16:00:00Z"
  },
  {
    id: "BK003",
    customer: {
      name: "Lê Thị Hoa",
      email: "lethihoa@gmail.com",
      phone: "0456-789-123"
    },
    studio: {
      name: "Studio Classic",
      address: "789 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM",
      date: "2024-01-25",
      time: "11:00",
      duration: "4 giờ"
    },
    services: [
      { name: "Makeup", price: 700000 },
      { name: "Trang phục", price: 500000 },
      { name: "Máy quay", price: 1000000 },
      { name: "Máy chụp hình", price: 800000 }
    ],
    pricing: {
      studioPrice: 3000000,
      servicePrice: 3000000,
      overtimeFee: 500000,
      total: 6500000
    },
    notes: "Quay video ca nhạc, cần trang điểm đậm",
    status: "completed",
    approvedBy: "Manager",
    history: [
      { date: "2024-01-20 09:00", action: "Tạo đơn đặt", updatedBy: "Lê Thị Hoa" },
      { date: "2024-01-20 11:30", action: "Duyệt đơn", updatedBy: "Manager" },
      { date: "2024-01-25 15:00", action: "Hoàn thành", updatedBy: "Staff" }
    ],
    createdAt: "2024-01-20T09:00:00Z"
  },
  {
    id: "BK004",
    customer: {
      name: "Phạm Minh Tuấn",
      email: "phamminhtuan@gmail.com",
      phone: "0321-654-987"
    },
    studio: {
      name: "Studio Premium",
      address: "321 Võ Văn Tần, Q3, TP.HCM",
      date: "2024-01-28",
      time: "16:00",
      duration: "2 giờ"
    },
    services: [],
    pricing: {
      studioPrice: 1800000,
      servicePrice: 0,
      overtimeFee: 0,
      total: 1800000
    },
    notes: "Chỉ thuê studio, không cần dịch vụ kèm theo",
    status: "cancelled",
    approvedBy: "Admin",
    history: [
      { date: "2024-01-22 14:00", action: "Tạo đơn đặt", updatedBy: "Phạm Minh Tuấn" },
      { date: "2024-01-22 16:00", action: "Duyệt đơn", updatedBy: "Admin" },
      { date: "2024-01-25 10:00", action: "Hủy đơn", updatedBy: "Phạm Minh Tuấn" }
    ],
    createdAt: "2024-01-22T14:00:00Z"
  },
  {
    id: "BK005",
    customer: {
      name: "Hoàng Thị Lan",
      email: "hoangthilan@gmail.com",
      phone: "0789-123-456"
    },
    studio: {
      name: "Studio Art",
      address: "654 Nguyễn Thị Minh Khai, Q1, TP.HCM",
      date: "2024-01-30",
      time: "10:00",
      duration: "3 giờ"
    },
    services: [
      { name: "Makeup", price: 600000 },
      { name: "Đạo cụ", price: 300000 }
    ],
    pricing: {
      studioPrice: 2200000,
      servicePrice: 900000,
      overtimeFee: 0,
      total: 3100000
    },
    notes: "Chụp ảnh nghệ thuật, cần đạo cụ đặc biệt",
    status: "pending",
    history: [
      { date: "2024-01-25 15:30", action: "Tạo đơn đặt", updatedBy: "Hoàng Thị Lan" }
    ],
    createdAt: "2024-01-25T15:30:00Z"
  }
];

function BookingListForm({ bookings }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookingsList, setBookingsList] = useState<Booking[]>(bookings);

  const filteredBookings = bookingsList.filter(booking =>
    booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.studio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
    setIsEditModalOpen(true);
  };

  const handleSaveBooking = (updatedBooking: Booking) => {
    setBookingsList(prev => 
      prev.map(booking => 
        booking.id === updatedBooking.id ? updatedBooking : booking
      )
    );
    setIsEditModalOpen(false);
    setEditingBooking(null);
  };

  const handleAddNewBooking = () => {
    // TODO: Implement add new booking functionality
    console.log('Add new booking');
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending': return 'Đang chờ xử lý';
      case 'approved': return 'Đã duyệt';
      case 'completed': return 'Đã hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDotColor = (status: string) => {
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
                Bookings List
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
          <h1>Bookings List</h1>
        </header>

        {/* Booking Content with Tailwind CSS */}
        <div className="booking-tailwind-container">
          {/* Filter and Add Button */}
          <BookingFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddNewBooking={handleAddNewBooking}
          />

          {/* Bookings Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                Bookings List
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
                        <BookingActionBar
                          onViewDetails={() => handleViewBooking(booking)}
                          onEdit={() => handleEditBooking(booking)}
                          status={booking.status}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* View Modal */}
      <BookingViewModal
        booking={selectedBooking}
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedBooking(null);
        }}
      />

      {/* Edit Modal */}
      <BookingEditModal
        booking={editingBooking}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingBooking(null);
        }}
        onSave={handleSaveBooking}
      />
    </div>
  );
}

export default function BookingListContainer() {
  return <BookingListForm bookings={BookingData} />;
}
