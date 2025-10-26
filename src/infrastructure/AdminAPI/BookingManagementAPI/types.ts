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

// Studio Assign Types
export interface StudioAssign {
  id: string;
  bookingId: string | null;
  studioId: string;
  studioName: string;
  locationName: string;
  startTime: string;
  endTime: string;
  studioAmount: number;
  serviceAmount: number;
  additionTime: number | null;
  status: 'COMING_SOON' | 'IS_HAPPENING' | 'ENDED' | 'CANCELLED' | 'AWAITING_REFUND';
  updatedAmount: number | null;
}

export interface StudioAssignListResponse {
  code: number;
  message: string;
  data: StudioAssign[];
}

export interface StudioAssignDetailResponse {
  code: number;
  message: string;
  data: StudioAssign;
}

export interface StudioAssignUpdateRequest {
  startTime?: string;
  endTime?: string;
  additionTime?: number;
  status?: 'COMING_SOON' | 'IS_HAPPENING' | 'ENDED' | 'CANCELLED' | 'AWAITING_REFUND';
}

export interface StudioAssignUpdateResponse {
  code: number;
  message: string;
  data: StudioAssign;
}

export interface StudioAssignStatusUpdateRequest {
  status: 'COMING_SOON' | 'IS_HAPPENING' | 'ENDED' | 'CANCELLED' | 'AWAITING_REFUND';
}

// Service Assign Types
export interface ServiceAssign {
  id: string;
  studioAssignId: string | null;
  serviceId: string;
  serviceName: string;
  serviceFee: number;
  status: 'ACTIVE' | 'CANCELLED' | 'AWAITING_REFUND';
}

export interface ServiceAssignListResponse {
  code: number;
  message: string;
  data: ServiceAssign[];
}
