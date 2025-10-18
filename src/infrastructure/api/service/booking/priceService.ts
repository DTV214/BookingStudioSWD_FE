// src/infrastructure/api/service/price.service.ts

import { BaseResponse } from "@/domain/models/booking/BaseResponse";
import {
  PriceItemRequest,
  PriceItemResponse,
} from "@/domain/models/booking/Price";
import { httpClient } from "@/infrastructure/api/httpClient";
import { ENDPOINTS } from "@/infrastructure/lib/endpoints";

// Tính giá cho 1 slot
export const getPriceForItem = async (
  params: PriceItemRequest
): Promise<PriceItemResponse> => {
  const queryString = new URLSearchParams(
    params as unknown as Record<string, string>
  ).toString();
  const url = `${ENDPOINTS.PRICE_ITEMS}?${queryString}`;

  // SỬA LỖI 1:
  // httpClient.get của bạn đang trả về 'PriceItemResponse'
  // bên trong 'res.data', KHÔNG PHẢI 'BaseResponse'.
  // Chúng ta đổi generic type để TypeScript hiểu đúng.
  const res = await httpClient.get<PriceItemResponse>(url);

  console.log("res.data", res.data); // Sẽ là { totalPrice: ... }

  // SỬA LỖI 2: Trả về res.data
  return res.data;
};
