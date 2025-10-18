// src/domain/usecases/booking/createBooking.usecase.ts

import { BookingRequest } from "@/domain/models/booking/Booking";
import { createBooking } from "@/infrastructure/api/service/booking/bookingService";


export const createBookingUseCase = async (bookingData: BookingRequest) => {
  // Logic nghiệp vụ (ví dụ: kiểm tra lần cuối) có thể thêm ở đây
  return await createBooking(bookingData);
};
