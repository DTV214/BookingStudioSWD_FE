// Booking Management API Service
import { 
  BookingListResponse, 
  BookingDetailResponse, 
  BookingStatusUpdateRequest, 
  BookingStatusUpdateResponse,
  BookingQueryParams,
  BookingStatistics,
  BookingStatisticsResponse,
  CalendarResponse,
  StudioAssignListResponse,
  StudioAssignDetailResponse,
  StudioAssignUpdateRequest,
  StudioAssignUpdateResponse,
  StudioAssignStatusUpdateRequest,
  ServiceAssignListResponse,
  Booking
} from './types';
import { httpClient } from '@/infrastructure/api/httpClient';

class BookingManagementService {

  // Get all bookings with optional filters
  async getAllBookings(params?: BookingQueryParams): Promise<Booking[]> {
    const queryString = new URLSearchParams();
    
    if (params?.status) queryString.append('status', params.status);
    if (params?.bookingType) queryString.append('bookingType', params.bookingType);
    if (params?.startDate) queryString.append('startDate', params.startDate);
    if (params?.endDate) queryString.append('endDate', params.endDate);
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.limit) queryString.append('limit', params.limit.toString());

    const endpoint = `/api/bookings${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    
    try {
      const response = await httpClient.get<BookingListResponse>(endpoint);
      console.log('response của getAllBookings', response);
      console.log('response.data của getAllBookings', response.data);
      console.log("✅ getAllBookings result:", response);

      return response.data.data; // Trả về mảng bookings trực tiếp
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  // Get booking by ID
  async getBookingById(id: string): Promise<BookingDetailResponse> {
    try {
      const response = await httpClient.get<BookingDetailResponse>(`/api/bookings/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking by ID:', error);
      throw error;
    }
  }

  // Update booking status
  async updateBookingStatus(
    id: string, 
    statusData: BookingStatusUpdateRequest
  ): Promise<BookingStatusUpdateResponse> {
    try {
      const response = await httpClient.put<BookingStatusUpdateResponse>(`/api/bookings/${id}/status`, statusData);
      return response.data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  }

  // Get booking statistics
  async getBookingStatistics(params?: {
    startDate?: string;
    endDate?: string;
    studioType?: string;
  }): Promise<BookingStatisticsResponse> {
    try {
      // First try to get all bookings and calculate statistics from them
      console.log('🔍 Calculating statistics from bookings data...');
      const allBookings = await this.getAllBookings();
      console.log('allBookings của getBookingStatistics', allBookings);
      // Calculate statistics from bookings data
      const bookings = allBookings || [];

      const totalBookings = bookings.length;
      const pendingBookings = bookings.filter(b => b.status === 'PENDING').length;
      const completedBookings = bookings.filter(b => b.status === 'COMPLETED').length;
      const cancelledBookings = bookings.filter(b => b.status === 'CANCELLED').length;
      const totalRevenue = bookings.reduce((sum, b) => sum + (b.total || 0), 0);
      
      // Group by studio
      const bookingsByStudio: { [key: string]: number } = {};
      bookings.forEach(booking => {
        const studio = booking.studioTypeName || 'Unknown';
        bookingsByStudio[studio] = (bookingsByStudio[studio] || 0) + 1;
      });
      
      // Group by status
      const bookingsByStatus: { [key: string]: number } = {};
      bookings.forEach(booking => {
        const status = booking.status;
        bookingsByStatus[status] = (bookingsByStatus[status] || 0) + 1;
      });
      
      // Group by month (simplified)
      const bookingsByMonth: { [key: string]: number } = {};
      bookings.forEach(booking => {
        const date = new Date(booking.bookingDate);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        bookingsByMonth[monthKey] = (bookingsByMonth[monthKey] || 0) + 1;
      });
      
      const statisticsData: BookingStatistics = {
        totalBookings,
        pendingBookings,
        completedBookings,
        cancelledBookings,
        totalRevenue,
        bookingsByMonth,
        bookingsByStudio,
        bookingsByStatus
      };
      
      console.log('📊 Calculated statistics:', statisticsData);
      
      return {
        code: 200,
        message: 'Success',
        data: statisticsData
      };
      
    } catch (error) {
      console.error('❌ Error calculating booking statistics:', error);
      
      // Fallback: Return empty statistics data
      console.log('🔄 Using fallback statistics data');
      const fallbackData: BookingStatisticsResponse = {
        code: 200,
        message: 'Success (Fallback)',
        data: {
          totalBookings: 0,
          pendingBookings: 0,
          completedBookings: 0,
          cancelledBookings: 0,
          totalRevenue: 0,
          bookingsByMonth: {},
          bookingsByStudio: {},
          bookingsByStatus: {}
        }
      };
      return fallbackData;
    }
  }

  // Get calendar bookings
  async getCalendarBookings(params: {
    startDate: string;
    endDate: string;
    view?: 'day' | 'week' | 'month';
  }): Promise<CalendarResponse> {
    const queryString = new URLSearchParams();
    queryString.append('startDate', params.startDate);
    queryString.append('endDate', params.endDate);
    if (params.view) queryString.append('view', params.view);

    const endpoint = `/api/bookings/calendar?${queryString.toString()}`;
    
    try {
      const response = await httpClient.get<CalendarResponse>(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching calendar bookings:', error);
      throw error;
    }
  }

  // Approve booking
  async approveBooking(id: string, note?: string): Promise<BookingStatusUpdateResponse> {
    return this.updateBookingStatus(id, {
      status: 'IN_PROGRESS',
      note: note || 'Booking approved by admin'
    });
  }

  // Cancel booking
  async cancelBooking(id: string, note?: string): Promise<BookingStatusUpdateResponse> {
    return this.updateBookingStatus(id, {
      status: 'CANCELLED',
      note: note || 'Booking cancelled by admin'
    });
  }

  // Complete booking
  async completeBooking(id: string, note?: string): Promise<BookingStatusUpdateResponse> {
    return this.updateBookingStatus(id, {
      status: 'COMPLETED',
      note: note || 'Booking completed'
    });
  }

  // Studio Assign Methods
  // Get all studio assigns
  async getAllStudioAssigns(): Promise<StudioAssignListResponse> {
    try {
      const response = await httpClient.get<StudioAssignListResponse>('/api/studio-assigns');
      return response.data;
    } catch (error) {
      console.error('Error fetching studio assigns:', error);
      throw error;
    }
  }

  // Get studio assigns by booking ID
  async getStudioAssignsByBookingId(bookingId: string): Promise<StudioAssignListResponse> {
    try {
      const response = await httpClient.get<StudioAssignListResponse>(`/api/studio-assigns/booking/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching studio assigns by booking ID:', error);
      throw error;
    }
  }

  // Get studio assign by ID
  async getStudioAssignById(id: string): Promise<StudioAssignDetailResponse> {
    try {
      const response = await httpClient.get<StudioAssignDetailResponse>(`/api/studio-assigns/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching studio assign by ID:', error);
      throw error;
    }
  }

  // Update studio assign
  async updateStudioAssign(
    id: string,
    updateData: StudioAssignUpdateRequest
  ): Promise<StudioAssignUpdateResponse> {
    try {
      const response = await httpClient.put<StudioAssignUpdateResponse>(`/api/studio-assigns/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating studio assign:', error);
      throw error;
    }
  }

  // Update studio assign status only
  async updateStudioAssignStatus(
    id: string,
    statusData: StudioAssignStatusUpdateRequest
  ): Promise<StudioAssignUpdateResponse> {
    try {
      const response = await httpClient.put<StudioAssignUpdateResponse>(`/api/studio-assigns/status/${id}`, statusData);
      return response.data;
    } catch (error) {
      console.error('Error updating studio assign status:', error);
      throw error;
    }
  }

  // Service Assign Methods
  // Get all service assigns
  async getAllServiceAssigns(): Promise<ServiceAssignListResponse> {
    try {
      const response = await httpClient.get<ServiceAssignListResponse>('/api/service-assigns');
      return response.data;
    } catch (error) {
      console.error('Error fetching service assigns:', error);
      throw error;
    }
  }

  // Get service assigns by studio assign ID
  async getServiceAssignsByStudioAssignId(studioAssignId: string): Promise<ServiceAssignListResponse> {
    try {
      const response = await httpClient.get<ServiceAssignListResponse>(`/api/service-assigns/studio-assign/${studioAssignId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service assigns by studio assign ID:', error);
      throw error;
    }
  }
}

export const bookingManagementService = new BookingManagementService();
