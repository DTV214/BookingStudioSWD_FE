// Booking Management Hooks
"use client";

import { useState, useEffect, useCallback } from 'react';
import { bookingManagementService } from './bookingService';
import type { 
  Booking,
  BookingQueryParams,
  BookingStatusUpdateRequest,
  BookingStatistics,
  CalendarBooking,
  StudioAssign,
  StudioAssignUpdateRequest,
  StudioAssignStatusUpdateRequest,
  ServiceAssign
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
      setBookings(response || []); // response bây giờ đã là mảng Booking[]
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

// Studio Assign Hooks
export interface UseStudioAssignsReturn {
  studioAssigns: StudioAssign[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateStudioAssign: (id: string, updateData: StudioAssignUpdateRequest) => Promise<void>;
  updateStudioAssignStatus: (id: string, statusData: StudioAssignStatusUpdateRequest) => Promise<void>;
}

export function useStudioAssigns(bookingId?: string): UseStudioAssignsReturn {
  const [studioAssigns, setStudioAssigns] = useState<StudioAssign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudioAssigns = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let response;
      if (bookingId) {
        response = await bookingManagementService.getStudioAssignsByBookingId(bookingId);
      } else {
        response = await bookingManagementService.getAllStudioAssigns();
      }
      setStudioAssigns(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch studio assigns');
      console.error('Error fetching studio assigns:', err);
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    fetchStudioAssigns();
  }, [fetchStudioAssigns]);

  const updateStudioAssign = useCallback(async (id: string, updateData: StudioAssignUpdateRequest) => {
    try {
      await bookingManagementService.updateStudioAssign(id, updateData);
      // Refresh studio assigns after update
      await fetchStudioAssigns();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update studio assign');
      throw err;
    }
  }, [fetchStudioAssigns]);

  const updateStudioAssignStatus = useCallback(async (id: string, statusData: StudioAssignStatusUpdateRequest) => {
    try {
      await bookingManagementService.updateStudioAssignStatus(id, statusData);
      // Refresh studio assigns after status update
      await fetchStudioAssigns();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update studio assign status');
      throw err;
    }
  }, [fetchStudioAssigns]);

  return {
    studioAssigns,
    loading,
    error,
    refetch: fetchStudioAssigns,
    updateStudioAssign,
    updateStudioAssignStatus,
  };
}

// Service Assign Hooks
export interface UseServiceAssignsReturn {
  serviceAssigns: ServiceAssign[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useServiceAssigns(studioAssignId?: string): UseServiceAssignsReturn {
  const [serviceAssigns, setServiceAssigns] = useState<ServiceAssign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServiceAssigns = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let response;
      if (studioAssignId) {
        response = await bookingManagementService.getServiceAssignsByStudioAssignId(studioAssignId);
      } else {
        response = await bookingManagementService.getAllServiceAssigns();
      }
      setServiceAssigns(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch service assigns');
      console.error('Error fetching service assigns:', err);
    } finally {
      setLoading(false);
    }
  }, [studioAssignId]);

  useEffect(() => {
    fetchServiceAssigns();
  }, [fetchServiceAssigns]);

  return {
    serviceAssigns,
    loading,
    error,
    refetch: fetchServiceAssigns,
  };
}
