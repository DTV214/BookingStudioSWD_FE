// Booking Management API Exports
export { bookingManagementService } from './bookingService';
export { 
  useBookings, 
  useBookingStatistics, 
  useCalendarBookings,
  type UseBookingsReturn,
  type UseBookingStatisticsReturn,
  type UseCalendarBookingsReturn
} from './bookingHooks';

export type {
  Booking,
  BookingListResponse,
  BookingDetailResponse,
  BookingStatusUpdateRequest,
  BookingStatusUpdateResponse,
  BookingQueryParams,
  BookingStatistics,
  BookingStatisticsResponse,
  CalendarBooking,
  CalendarResponse
} from './types';
