import { PriceRule } from "@/domain/models/priceTable/priceRule";
import { httpClient } from "@/infrastructure/api/httpClient";
import { ENDPOINTS } from "@/infrastructure/lib/endpoints";

// interface ApiResponse<T> { ... }

const priceRuleService = {
  /**
   * Lấy danh sách các Quy Tắc Giá (PriceRule)
   * Cần cả studioTypeId và priceTableId
   */
  async getRules(
    studioTypeId: string,
    priceTableId: string
  ): Promise<PriceRule[]> {
    const url = ENDPOINTS.PRICE_RULES.GET_RULES(studioTypeId, priceTableId);

    // 1. Sửa kiểu generic: Mong đợi res.data là PriceRule[]
    const res = await httpClient.get<PriceRule[]>(url);

    console.log("res data của price rule", res.data);

    // 2. Sửa return: Trả về res.data trực tiếp
    return res.data;
  },
};

export default priceRuleService;
