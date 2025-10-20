// src/domain/usecases/booking/getBookingDetails.usecase.ts

import { StudioAssignDetail } from "@/domain/models/booking/BookingHistory";
import { bookingHistoryService } from "@/infrastructure/api/service/booking/bookingHistoryService";

/**
 * Use case để lấy chi tiết studio assign của một booking
 */
export const getBookingDetailsUseCase = async (
  bookingId: string
): Promise<StudioAssignDetail[]> => {
  try {
    // Kiểu 'response' đang bị suy luận sai từ hàm service
    const response = await bookingHistoryService.getBookingDetails(bookingId);

    if (response.code === 200) {
      // === SỬA LỖI TẠI ĐÂY ===
      // Chúng ta ép kiểu 'response.data' (đang bị hiểu là string)
      // sang 'unknown', rồi sang kiểu 'StudioAssignDetail[]'
      return (response.data as unknown as StudioAssignDetail[]) || [];
    } else {
      throw new Error(response.message || "Failed to fetch booking details");
    }
  } catch (error) {
    console.error("Error in getBookingDetailsUseCase:", error);
    throw error;
  }
};
