// src/domain/usecases/booking/getUserBookings.usecase.ts

import { BookingHistoryItem } from "@/domain/models/booking/BookingHistory";
import { bookingHistoryService } from "@/infrastructure/api/service/booking/bookingHistoryService";

/**
 * Use case để lấy danh sách lịch sử booking của người dùng
 */
export const getUserBookingsUseCase = async (): Promise<
  BookingHistoryItem[]
> => {
  try {
    const response = await bookingHistoryService.getUserBookings();
    console.log("DEBUG: API Response:", JSON.stringify(response, null, 2));
    if (response && response.code === 200) {
      return (response.data as unknown as BookingHistoryItem[]) || [];
    } else {
      // Ném lỗi với message từ API (nếu có)
      throw new Error(response?.message || "Failed to fetch bookings");
    }
  } catch (error) {
    console.error("Error in getUserBookingsUseCase:", error);
    throw error;
  }
};
