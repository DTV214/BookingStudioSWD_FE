// Định nghĩa cấu trúc cho một "Bảng Giá"
export type PriceTableStatus = "COMING_SOON" | "IS_HAPPENING" | "ENDED";

export interface PriceTable {
  id: string;
  startDate: string; // ISO date string, e.g., "2023-11-01"
  endDate: string | null;
  priority: number;
  status: PriceTableStatus;
  // Thêm các trường khác nếu API trả về
}
