// src/domain/usecases/history-booking/getServiceAssigns.ts

import { ServiceAssign } from "@/domain/models/booking/BookingHistory";
import { bookingHistoryService } from "@/infrastructure/api/service/booking/bookingHistoryService";

/**
 * Use case để lấy danh sách dịch vụ của một slot (studioAssign)
 */
export const getServiceAssignsUseCase = async (
  studioAssignId: string
): Promise<ServiceAssign[]> => {
  try {
    const response = await bookingHistoryService.getServicesForSlot(
      studioAssignId
    );

    if (response && response.code === 200) {
      return (response.data as unknown as ServiceAssign[]) || [];
    } else {
      throw new Error(response?.message || "Failed to fetch services for slot");
    }
  } catch (error) {
    console.error("Error in getServiceAssignsUseCase:", error);
    throw error;
  }
};
