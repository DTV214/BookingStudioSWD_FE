// src/infrastructure/api/service/service.service.ts
import { BaseResponse } from "@/domain/models/booking/BaseResponse";
import { Service } from "@/domain/models/booking/Service";

import { httpClient } from "@/infrastructure/api/httpClient";
import { ENDPOINTS } from "@/infrastructure/lib/endpoints";

// Lấy tất cả dịch vụ
export const getAllServices = async (): Promise<Service[]> => {
  // SỬA LỖI: Bỏ BaseResponse, vì API này trả về mảng Service[] trực tiếp
  const res = await httpClient.get<Service[]>(ENDPOINTS.SERVICES);

  // Dòng này bây. giờ đã chính xác
  console.log("res.data của itemService", res.data);

  return res.data;
};
