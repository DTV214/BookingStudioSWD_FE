export interface StudioAssignRequest {
  startTime: string; // ISO 8601 format
  hour: number;
  serviceIds: string[];
}

export interface BookingRequest {
  studioTypeId: string;
  locationId: string;
  note: string;
  phoneNumber: string;
  bookingType: string;
  paymentMethod: string;
  studioAssignRequests: StudioAssignRequest[];
}

export interface BookingResponse {
  // Dựa trên response 200 OK
  id: string; // Giả định backend trả về ID của booking
  data: string; // URL hoặc thông tin khác liên quan đến booking
  message: string;
}
