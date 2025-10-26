// src/domain/usecases/history-booking/getPaymentsForBooking.ts

import { PaymentDetail } from "@/domain/models/booking/BookingHistory";
import { bookingHistoryService } from "@/infrastructure/api/service/booking/bookingHistoryService";

/**
 * Use case để lấy danh sách lịch sử thanh toán của một booking
 */
export const getPaymentsForBookingUseCase = async (
  bookingId: string
): Promise<PaymentDetail[]> => {
  try {
    const response = await bookingHistoryService.getPaymentsForBooking(
      bookingId
    );

    if (response && response.code === 200) {
      return (response.data as unknown as PaymentDetail[]) || [];
    } else {
      throw new Error(response?.message || "Failed to fetch payments");
    }
  } catch (error) {
    console.error("Error in getPaymentsForBookingUseCase:", error);
    throw error;
  }
};
