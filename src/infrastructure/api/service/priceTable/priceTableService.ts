import { PriceTable } from "@/domain/models/priceTable/priceTable";
import { httpClient } from "@/infrastructure/api/httpClient";
import { ENDPOINTS } from "@/infrastructure/lib/endpoints";

// Kiểu dữ liệu trả về từ API (dùng để tham khảo,
// nhưng httpClient sẽ tự động mở lớp này)
// interface ApiResponse<T> {
//   code: number;
//   message: string;
//   data: T;
// }

const priceTableService = {
  /**
   * Lấy danh sách các Bảng Giá (PriceTable) theo ID của loại studio
   */
  async getByStudioType(studioTypeId: string): Promise<PriceTable[]> {
    const url = ENDPOINTS.PRICE_TABLES.GET_BY_STUDIO_TYPE(studioTypeId);

    // 1. Sửa kiểu generic: Mong đợi res.data là PriceTable[]
    const res = await httpClient.get<PriceTable[]>(url);

    console.log("res data của price table", res.data);

    // 2. Sửa return: Trả về res.data trực tiếp
    return res.data;
  },
};

export default priceTableService;
