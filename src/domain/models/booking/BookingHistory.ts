// src/domain/models/booking/BookingHistory.ts

/**
 * Định nghĩa các trạng thái booking
 * Dựa trên file: image_3db0db.png
 */
export interface PaymentDetail {
  id: string;
  paymentMethod: string;
  status: string; // "SUCCESS"
  paymentType: string; // "FULL_PAYMENT"
  paymentDate: string | null; // API có thể trả null
  amount: number;
  paymentStatus: string; // "SUCCESS" (trùng lặp, nhưng vẫn định nghĩa)
  // 4 trường bị ẩn theo yêu cầu: bookingId, bookingStatus, accountEmail, accountName
}
export type BookingStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "AWAITING_REFUND"
  | string; // Thêm 'string' để linh hoạt nếu có status khác

/**
 * Đại diện cho 1 item trong danh sách lịch sử booking
 * Dựa trên API: GET /api/bookings (image_3dbb80.png)
 * Giả định API GET /api/bookings/profile trả về cấu trúc tương tự
 */
export interface BookingHistoryItem {
  id: string;
  bookingDate: string;
  updatedDate: string;
  note: string | null;
  status: BookingStatus;
  bookingType: string; // ví dụ: "PAY_FULL"
  accountEmail: string;
  studioTypeName: string;
  total: number;
}

/**
 * Đại diện cho chi tiết một lịch đặt (studio assign)
 * Dựa trên API: GET /api/studio-assigns (image_3dbbfe.png)
 * Dùng khi gọi API GET /api/studio-assigns/booking/{bookingId}
 */
export interface StudioAssignDetail {
  id: string;
  bookingId: string;
  studioName: string;
  startTime: string; // Dạng ISO 8601
  endTime: string; // Dạng ISO 8601
  serviceName: string;
  locationName: string;
  studioId: string;
  serviceId: string;
  positionIndex: number | null;
  status: string; // ví dụ: "COMING_SOON"
}
export interface ServiceAssign {
  id: string;
  studioAssignId: string;
  serviceId: string;
  serviceName: string;
  serviceFee: string; // "1.500đ"
  status: string; // "ACTIVE"
}
