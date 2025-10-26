// Booking Management API Service
import { 
  BookingListResponse, 
  BookingDetailResponse, 
  BookingStatusUpdateRequest, 
  BookingStatusUpdateResponse,
  BookingQueryParams,
  BookingStatisticsResponse,
  CalendarResponse,
  StudioAssignListResponse,
  StudioAssignDetailResponse,
  StudioAssignUpdateRequest,
  StudioAssignUpdateResponse,
  StudioAssignStatusUpdateRequest,
  ServiceAssignListResponse
} from './types';

const API_BASE_URL = 'https://api.eccubestudio.click/api';

class BookingManagementService {
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get all bookings with optional filters
  async getAllBookings(params?: BookingQueryParams): Promise<BookingListResponse> {
    const queryString = new URLSearchParams();
    
    if (params?.status) queryString.append('status', params.status);
    if (params?.bookingType) queryString.append('bookingType', params.bookingType);
    if (params?.startDate) queryString.append('startDate', params.startDate);
    if (params?.endDate) queryString.append('endDate', params.endDate);
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.limit) queryString.append('limit', params.limit.toString());

    const endpoint = `/bookings${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    
    return this.makeRequest<BookingListResponse>(endpoint, {
      method: 'GET',
    });
  }

  // Get booking by ID
  async getBookingById(id: string): Promise<BookingDetailResponse> {
    return this.makeRequest<BookingDetailResponse>(`/bookings/${id}`, {
      method: 'GET',
    });
  }

  // Update booking status
  async updateBookingStatus(
    id: string, 
    statusData: BookingStatusUpdateRequest
  ): Promise<BookingStatusUpdateResponse> {
    return this.makeRequest<BookingStatusUpdateResponse>(`/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    });
  }

  // Get booking statistics
  async getBookingStatistics(params?: {
    startDate?: string;
    endDate?: string;
    studioType?: string;
  }): Promise<BookingStatisticsResponse> {
    const queryString = new URLSearchParams();
    
    if (params?.startDate) queryString.append('startDate', params.startDate);
    if (params?.endDate) queryString.append('endDate', params.endDate);
    if (params?.studioType) queryString.append('studioType', params.studioType);

    const endpoint = `/bookings/statistics${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    
    return this.makeRequest<BookingStatisticsResponse>(endpoint, {
      method: 'GET',
    });
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

    const endpoint = `/bookings/calendar?${queryString.toString()}`;
    
    return this.makeRequest<CalendarResponse>(endpoint, {
      method: 'GET',
    });
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
    return this.makeRequest<StudioAssignListResponse>('/studio-assigns', {
      method: 'GET',
    });
  }

  // Get studio assigns by booking ID
  async getStudioAssignsByBookingId(bookingId: string): Promise<StudioAssignListResponse> {
    return this.makeRequest<StudioAssignListResponse>(`/studio-assigns/booking/${bookingId}`, {
      method: 'GET',
    });
  }

  // Get studio assign by ID
  async getStudioAssignById(id: string): Promise<StudioAssignDetailResponse> {
    return this.makeRequest<StudioAssignDetailResponse>(`/studio-assigns/${id}`, {
      method: 'GET',
    });
  }

  // Update studio assign
  async updateStudioAssign(
    id: string,
    updateData: StudioAssignUpdateRequest
  ): Promise<StudioAssignUpdateResponse> {
    return this.makeRequest<StudioAssignUpdateResponse>(`/studio-assigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  // Update studio assign status only
  async updateStudioAssignStatus(
    id: string,
    statusData: StudioAssignStatusUpdateRequest
  ): Promise<StudioAssignUpdateResponse> {
    return this.makeRequest<StudioAssignUpdateResponse>(`/studio-assigns/status/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(statusData),
    });
  }

  // Service Assign Methods
  // Get all service assigns
  async getAllServiceAssigns(): Promise<ServiceAssignListResponse> {
    return this.makeRequest<ServiceAssignListResponse>('/service-assigns', {
      method: 'GET',
    });
  }

  // Get service assigns by studio assign ID
  async getServiceAssignsByStudioAssignId(studioAssignId: string): Promise<ServiceAssignListResponse> {
    return this.makeRequest<ServiceAssignListResponse>(`/service-assigns/studio-assign/${studioAssignId}`, {
      method: 'GET',
    });
  }
}

export const bookingManagementService = new BookingManagementService();
