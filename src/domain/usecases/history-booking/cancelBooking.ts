import { bookingHistoryService } from "@/infrastructure/api/service/booking/bookingHistoryService";

/**
 * Use case để hủy một đơn booking
 */
export const cancelBookingUseCase = async (
  bookingId: string,
  note: string
): Promise<boolean> => {
  try {
    const response = await bookingHistoryService.cancelBooking(bookingId, note);

    // API trả về 200 là thành công (theo image_5502c6.png)
    if (response && response.code === 200) {
      return true;
    } else {
      throw new Error(response?.message || "Hủy đơn hàng thất bại");
    }
  } catch (error) {
    console.error("Error in cancelBookingUseCase:", error);
    throw error;
  }
};
