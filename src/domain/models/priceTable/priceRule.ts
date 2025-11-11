// Định nghĩa cấu trúc cho một "Quy Tắc Giá"
export interface PriceRule {
  id: string;
  priceTableId: string;
  dayFilter: string[] | null; // CẬP NHẬT: Từ number | null sang string[] | null
  startTime: number[] | null; // Ví dụ: [10, 0, 0]
  endTime: number[] | null; // Ví dụ: [14, 0, 0]
  pricePerUnit: number; // CẬP NHẬT: Tên trường là 'price' (thay vì pricePerHour)
  unit: string; // CẬP NHẬT: Thêm trường 'unit' (ví dụ: "HOUR")
  date: string | null; // ISO date string
  isDeleted: boolean;
}
