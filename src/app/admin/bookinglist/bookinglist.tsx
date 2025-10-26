"use client";

import React, { useState, useEffect } from "react";
import BookingListForm from "../../../components/AdminPage/BookingListForm";
import { useBookings, useBookingStatistics } from "../../../infrastructure/AdminAPI/BookingManagementAPI/bookingHooks";
import type { BookingQueryParams } from "../../../infrastructure/AdminAPI/BookingManagementAPI/types";

// UI Types (for presentation layer)
export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface Studio {
  name: string;
  address: string;
  date: string;
  time: string;
  duration: string;
}

export interface Service {
  name: string;
  price: number;
}

export interface Pricing {
  studioPrice: number;
  servicePrice: number;
  overtimeFee: number;
  total: number;
}

export interface BookingHistory {
  date: string;
  action: string;
  updatedBy: string;
}

export interface Booking {
  id: string;
  customer: Customer;
  studio: Studio;
  services: Service[];
  pricing: Pricing;
  notes?: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  bookingType: 'studio_only' | 'studio_with_services' | 'services_only';
  approvedBy?: string;
  history: BookingHistory[];
  createdAt: string;
}

export interface BookingStatistics {
  totalBookings: number;
  pendingBookings: number;
  approvedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  bookingsByStudio: Record<string, number>;
  bookingsByMonth: Record<string, number>;
  bookingsByStatus: { status: string; count: number }[];
}

// Transform API Booking to UI Booking format
const transformApiBookingToUiBooking = (apiBooking: {
  id: string;
  bookingDate: string;
  updateDate: string;
  note: string;
  total: number;
  status: string;
  bookingType: string;
  accountEmail: string;
  accountName: string;
  studioTypeName: string;
}): Booking => {
  return {
    id: apiBooking.id,
    customer: {
      name: apiBooking.accountName || 'N/A',
      email: apiBooking.accountEmail || 'N/A',
      phone: 'N/A' // API doesn't provide phone
    },
    studio: {
      name: apiBooking.studioTypeName || 'N/A',
      address: 'N/A', // API doesn't provide address
      date: new Date(apiBooking.bookingDate).toISOString().split('T')[0],
      time: new Date(apiBooking.bookingDate).toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      duration: 'N/A' // API doesn't provide duration
    },
    services: [], // API doesn't provide services details
    pricing: {
      studioPrice: apiBooking.total || 0,
      servicePrice: 0,
      overtimeFee: 0,
      total: apiBooking.total || 0
    },
    notes: apiBooking.note || '',
    status: mapApiStatusToUiStatus(apiBooking.status),
    approvedBy: 'Admin', // Default value
    history: [
      {
        date: new Date(apiBooking.bookingDate).toLocaleString('vi-VN'),
        action: 'Tạo đơn đặt',
        updatedBy: apiBooking.accountName || 'Customer'
      },
      {
        date: new Date(apiBooking.updateDate).toLocaleString('vi-VN'),
        action: 'Cập nhật trạng thái',
        updatedBy: 'Admin'
      }
    ],
    createdAt: apiBooking.bookingDate,
    bookingType: mapApiBookingTypeToUiBookingType(apiBooking.bookingType)
  };
};

// Map API status to UI status
const mapApiStatusToUiStatus = (apiStatus: string): 'pending' | 'approved' | 'completed' | 'cancelled' => {
  switch (apiStatus) {
    case 'PENDING': return 'pending';
    case 'IN_PROGRESS': return 'approved';
    case 'COMPLETED': return 'completed';
    case 'CANCELLED': return 'cancelled';
    default: return 'pending';
  }
};

// Map API booking type to UI booking type
const mapApiBookingTypeToUiBookingType = (apiBookingType: string): 'studio_only' | 'studio_with_services' | 'services_only' => {
  switch (apiBookingType) {
    case 'PAY_FULL': return 'studio_with_services';
    case 'PAY_PARTIAL': return 'studio_with_services';
    case 'FREE': return 'studio_only';
    default: return 'studio_only';
  }
};

// Transform API statistics to UI statistics
const transformApiStatisticsToUiStatistics = (apiStats: {
  totalBookings?: number;
  pendingBookings?: number;
  approvedBookings?: number;
  completedBookings?: number;
  cancelledBookings?: number;
  totalRevenue?: number;
  bookingsByStudio?: Record<string, number>;
  bookingsByMonth?: Record<string, number>;
  bookingsByStatus?: Record<string, number>;
}): BookingStatistics => {
  return {
    totalBookings: apiStats.totalBookings || 0,
    pendingBookings: apiStats.pendingBookings || 0,
    approvedBookings: apiStats.approvedBookings || 0,
    completedBookings: apiStats.completedBookings || 0,
    cancelledBookings: apiStats.cancelledBookings || 0,
    totalRevenue: apiStats.totalRevenue || 0,
    bookingsByStudio: apiStats.bookingsByStudio || {},
    bookingsByMonth: apiStats.bookingsByMonth || {},
    bookingsByStatus: Object.entries(apiStats.bookingsByStatus || {}).map(([status, count]) => ({
      status,
      count: count as number
    }))
  };
};

export default function BookingListContainer() {
  const [queryParams] = useState<BookingQueryParams>({});
  const [uiBookings, setUiBookings] = useState<Booking[]>([]);
  const [uiStatistics, setUiStatistics] = useState<BookingStatistics>({
    totalBookings: 0,
    pendingBookings: 0,
    approvedBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    bookingsByStudio: {},
    bookingsByMonth: {},
    bookingsByStatus: []
  });

  // Use API hooks
  const { 
    bookings: apiBookings, 
    loading: bookingsLoading, 
    error: bookingsError,
    updateBookingStatus: apiUpdateBookingStatus
  } = useBookings(queryParams);

  // Temporarily disable statistics API call to avoid 400 error
  // const { 
  //   statistics: apiStatistics, 
  //   loading: statisticsLoading, 
  //   error: statisticsError 
  // } = useBookingStatistics();
  
  const apiStatistics = null;
  const statisticsLoading = false;
  const statisticsError = null;

  // Transform API data to UI format
  useEffect(() => {
    if (apiBookings) {
      const transformedBookings = apiBookings.map(transformApiBookingToUiBooking);
      setUiBookings(transformedBookings);
    }
  }, [apiBookings]);

  useEffect(() => {
    if (apiStatistics) {
      const transformedStatistics = transformApiStatisticsToUiStatistics(apiStatistics);
      setUiStatistics(transformedStatistics);
    } else {
      // Use mock statistics data when API is not available
      const mockStatistics: BookingStatistics = {
        totalBookings: uiBookings.length,
        pendingBookings: uiBookings.filter(b => b.status === 'pending').length,
        approvedBookings: uiBookings.filter(b => b.status === 'approved').length,
        completedBookings: uiBookings.filter(b => b.status === 'completed').length,
        cancelledBookings: uiBookings.filter(b => b.status === 'cancelled').length,
        totalRevenue: uiBookings.reduce((sum, b) => sum + b.pricing.total, 0),
        bookingsByStudio: uiBookings.reduce((acc, booking) => {
          const studioName = booking.studio.name;
          acc[studioName] = (acc[studioName] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        bookingsByMonth: {},
        bookingsByStatus: [
          { status: 'pending', count: uiBookings.filter(b => b.status === 'pending').length },
          { status: 'approved', count: uiBookings.filter(b => b.status === 'approved').length },
          { status: 'completed', count: uiBookings.filter(b => b.status === 'completed').length },
          { status: 'cancelled', count: uiBookings.filter(b => b.status === 'cancelled').length }
        ]
      };
      setUiStatistics(mockStatistics);
    }
  }, [apiStatistics, uiBookings]);

  // Handle booking status updates
  const handleUpdateBookingStatus = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      const apiStatus = mapUiStatusToApiStatus(newStatus);
      await apiUpdateBookingStatus(bookingId, {
        status: apiStatus,
        note: `Status updated to ${newStatus}`
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  // Map UI status to API status
  const mapUiStatusToApiStatus = (uiStatus: Booking['status']): 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' => {
    switch (uiStatus) {
      case 'pending': return 'PENDING';
      case 'approved': return 'IN_PROGRESS';
      case 'completed': return 'COMPLETED';
      case 'cancelled': return 'CANCELLED';
      default: return 'PENDING';
    }
  };

  // Handle booking updates
  const handleUpdateBooking = async (updatedBooking: Booking) => {
    try {
      const apiStatus = mapUiStatusToApiStatus(updatedBooking.status);
      await apiUpdateBookingStatus(updatedBooking.id, {
        status: apiStatus,
        note: updatedBooking.notes || 'Booking updated'
      });
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  // Loading state
  if (bookingsLoading || statisticsLoading) {
  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Đang tải dữ liệu...</p>
            </div>
          </div>
    );
  }

  // Error state
  if (bookingsError || statisticsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Lỗi tải dữ liệu</h2>
          <p className="text-gray-600 mb-4">
            {bookingsError || statisticsError}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
    </div>
  );
}

  return (
    <BookingListForm
      bookings={uiBookings}
      statistics={uiStatistics}
      onUpdateBookingStatus={handleUpdateBookingStatus}
      onUpdateBooking={handleUpdateBooking}
      loading={bookingsLoading || statisticsLoading}
      error={bookingsError || statisticsError}
    />
  );
}