// Booking Management API Types

export interface Booking {
  id: string;
  bookingDate: string;
  updateDate: string;
  note: string;
  total: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  bookingType: 'PAY_FULL' | 'PAY_PARTIAL' | 'FREE';
  accountEmail: string;
  accountName: string;
  studioTypeName: string;
  updatedAmount?: number | null;
}

export interface BookingListResponse {
  code: number;
  message: string;
  data: Booking[];
}

export interface BookingDetailResponse {
  code: number;
  message: string;
  data: Booking;
}

export interface BookingStatusUpdateRequest {
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  note?: string;
}

export interface BookingStatusUpdateResponse {
  code: number;
  message: string;
  data: Booking;
}

export interface BookingQueryParams {
  status?: string;
  bookingType?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface BookingStatistics {
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  bookingsByMonth: { [key: string]: number };
  bookingsByStudio: { [key: string]: number };
  bookingsByStatus: { [key: string]: number };
}

export interface BookingStatisticsResponse {
  code: number;
  message: string;
  data: BookingStatistics;
}

export interface CalendarBooking {
  id: string;
  date: string;
  time: string;
  customer: string;
  studio: string;
  status: string;
  total: number;
}

export interface CalendarResponse {
  code: number;
  message: string;
  data: CalendarBooking[];
}
