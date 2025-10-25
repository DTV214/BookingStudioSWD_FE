// Booking Management Hooks
"use client";

import { useState, useEffect, useCallback } from 'react';
import { bookingManagementService } from './bookingService';
import type { 
  Booking,
  BookingQueryParams,
  BookingStatusUpdateRequest,
  BookingStatistics,
  CalendarBooking
} from './types';

export interface UseBookingsReturn {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateBookingStatus: (id: string, statusData: BookingStatusUpdateRequest) => Promise<void>;
  approveBooking: (id: string, note?: string) => Promise<void>;
  cancelBooking: (id: string, note?: string) => Promise<void>;
  completeBooking: (id: string, note?: string) => Promise<void>;
}

export function useBookings(params?: BookingQueryParams): UseBookingsReturn {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingManagementService.getAllBookings(params);
      setBookings(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateBookingStatus = useCallback(async (id: string, statusData: BookingStatusUpdateRequest) => {
    try {
      await bookingManagementService.updateBookingStatus(id, statusData);
      // Refresh bookings after status update
      await fetchBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update booking status');
      throw err;
    }
  }, [fetchBookings]);

  const approveBooking = useCallback(async (id: string, note?: string) => {
    try {
      await bookingManagementService.approveBooking(id, note);
      await fetchBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve booking');
      throw err;
    }
  }, [fetchBookings]);

  const cancelBooking = useCallback(async (id: string, note?: string) => {
    try {
      await bookingManagementService.cancelBooking(id, note);
      await fetchBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel booking');
      throw err;
    }
  }, [fetchBookings]);

  const completeBooking = useCallback(async (id: string, note?: string) => {
    try {
      await bookingManagementService.completeBooking(id, note);
      await fetchBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete booking');
      throw err;
    }
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings,
    updateBookingStatus,
    approveBooking,
    cancelBooking,
    completeBooking,
  };
}

export interface UseBookingStatisticsReturn {
  statistics: BookingStatistics | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useBookingStatistics(params?: {
  startDate?: string;
  endDate?: string;
  studioType?: string;
}): UseBookingStatisticsReturn {
  const [statistics, setStatistics] = useState<BookingStatistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingManagementService.getBookingStatistics(params);
      setStatistics(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch booking statistics');
      console.error('Error fetching booking statistics:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return {
    statistics,
    loading,
    error,
    refetch: fetchStatistics,
  };
}

export interface UseCalendarBookingsReturn {
  calendarBookings: CalendarBooking[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCalendarBookings(params: {
  startDate: string;
  endDate: string;
  view?: 'day' | 'week' | 'month';
}): UseCalendarBookingsReturn {
  const [calendarBookings, setCalendarBookings] = useState<CalendarBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCalendarBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingManagementService.getCalendarBookings(params);
      setCalendarBookings(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch calendar bookings');
      console.error('Error fetching calendar bookings:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchCalendarBookings();
  }, [fetchCalendarBookings]);

  return {
    calendarBookings,
    loading,
    error,
    refetch: fetchCalendarBookings,
  };
}
