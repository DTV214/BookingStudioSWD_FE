import { BaseResponse } from "@/domain/models/booking/BaseResponse";
import {
  BookingRequest,
  BookingResponse,
} from "@/domain/models/booking/Booking";
import { httpClient } from "@/infrastructure/api/httpClient";
import { ENDPOINTS } from "@/infrastructure/lib/endpoints";

export const createBooking = async (
  bookingData: BookingRequest
): Promise<BookingResponse> => {
  // SỬA LỖI 1: Bỏ <BaseResponse>
  // vì httpClient.post sẽ trả về BookingResponse trực tiếp trong res.data
  const res = await httpClient.post<BookingResponse>(
    ENDPOINTS.BOOKINGS,
    bookingData
  );

  // SỬA LỖI 2: Trả về res.data
  return res.data;
};
