import { ENDPOINTS } from "@/infrastructure/lib/endpoints";
import {
  BookingHistoryItem,
  PaymentDetail,
  ServiceAssign,
  StudioAssignDetail,
} from "@/domain/models/booking/BookingHistory";
// 1. SỬA IMPORT: Dùng 'ApiResponse' từ 'common.ts' (giả sử)
//    hoặc từ file mà 'httpClient' của bạn định nghĩa
import { ApiResponse } from "@/domain/models/common";
import { httpClient } from "@/infrastructure/api/httpClient";

/**
 * Service để xử lý các nghiệp vụ liên quan đến lịch sử booking
 */
export const bookingHistoryService = {
  /**
   * Gọi API GET /api/bookings/profile
   */
  // 2. SỬA KIỂU TRẢ VỀ: Dùng 'ApiResponse'
  getUserBookings: async (): Promise<ApiResponse<BookingHistoryItem[]>> => {
    // 3. SỬA KIỂU GENERIC: 'T' là kiểu của 'data', không phải toàn bộ response
    const res = await httpClient.get<BookingHistoryItem[]>(
      ENDPOINTS.USER_BOOKINGS.GET_BY_PROFILE
    );
    console.log("bookingHistoryService NHẬN ĐƯỢC (res):", res); // <-- Sẽ in ra object { code, message, data }

    // 4. SỬA RETURN: Trả về toàn bộ 'res', KHÔNG PHẢI 'res.data'
    return res;
  },

  /**
   * Gọi API GET /api/studio-assigns/booking/{bookingId}
   */
  // 5. SỬA TƯƠNG TỰ
  getBookingDetails: async (
    bookingId: string
  ): Promise<ApiResponse<StudioAssignDetail[]>> => {
    const res = await httpClient.get<StudioAssignDetail[]>(
      ENDPOINTS.USER_BOOKINGS.GET_DETAILS(bookingId)
    );
    console.log("getBookingDetails NHẬN ĐƯỢC (res):", res);

    // 6. SỬA RETURN
    return res;
  },
  getServicesForSlot: async (
    studioAssignId: string
  ): Promise<ApiResponse<ServiceAssign[]>> => {
    const res = await httpClient.get<ServiceAssign[]>(
      ENDPOINTS.USER_BOOKINGS.GET_SERVICES_FOR_SLOT(studioAssignId)
    );
    return res;
  },
  getPaymentsForBooking: async (
    bookingId: string
  ): Promise<ApiResponse<PaymentDetail[]>> => {
    const res = await httpClient.get<PaymentDetail[]>(
      ENDPOINTS.USER_BOOKINGS.GET_PAYMENTS_FOR_BOOKING(bookingId)
    );
    return res;
  },
  cancelBooking: async (
    bookingId: string,
    note: string
  ): Promise<ApiResponse<null>> => {
    // API này trả về data: null (theo image_5502c6.png)
    const res = await httpClient.post<null>(
      ENDPOINTS.USER_BOOKINGS.CANCEL_BOOKING(bookingId, note)
      // Không cần body, dữ liệu gửi qua params
    );
    return res;
  },
};
