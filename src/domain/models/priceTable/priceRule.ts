// Định nghĩa cấu trúc cho một "Quy Tắc Giá"
export interface PriceRule {
  id: string;
  priceTableId: string;
  dayFilter: string[] | null; // CẬP NHẬT: Từ number | null sang string[] | null
startTime: string | null; // Ví dụ: "15:00:00"
  endTime: string | null;   // Ví dụ: "20:00:00"
  pricePerUnit: number; // CẬP NHẬT: Tên trường là 'price' (thay vì pricePerHour)
  unit: string; // CẬP NHẬT: Thêm trường 'unit' (ví dụ: "HOUR")
  date: string | null; // ISO date string
  isDeleted: boolean;
}
