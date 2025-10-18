export interface PriceItemRequest {
  startTime: string; // "2025-12-10T06:00"
  endTime: string;
  studioTypeId: string;
}
export interface PriceItemResponse {
  // Giả định response trả về giá base cho slot đó
  totalPrice: number;
  // ... hoặc cấu trúc chi tiết hơn nếu backend cung cấp
}
