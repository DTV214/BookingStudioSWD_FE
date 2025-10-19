// src/infrastructure/api/service/studio.service.ts

import { BaseResponse } from "@/domain/models/booking/BaseResponse";
import { StudioType } from "@/domain/models/studio-type/studioType";
import { httpClient } from "@/infrastructure/api/httpClient";
import { ENDPOINTS } from "@/infrastructure/lib/endpoints";
import { Location } from "@/domain/models/studio-type/location";

export const getStudioTypes = async (): Promise<StudioType[]> => {
  // SỬA LỖI 1: Bỏ <BaseResponse>
  // vì httpClient.get sẽ trả về mảng StudioType[] trực tiếp trong res.data
  const res = await httpClient.get<StudioType[]>(ENDPOINTS.STUDIO_TYPES);

  // console.log("res.data.data của getStudioTypes", res.data.data); // Sẽ là undefined
  console.log("res.data của getStudioTypes", res.data); // Sẽ là mảng [...]

  // SỬA LỖI 2: Trả về res.data
  return res.data;
};
// Lấy danh sách Locations theo Type ID
export const getLocationsForType = async (
  typeId: string
): Promise<Location[]> => {
  const queryString = new URLSearchParams({ typeId: typeId }).toString();
  const url = `${ENDPOINTS.LOCATIONS}?${queryString}`;

  // SỬA LỖI 1: Bỏ <BaseResponse>
  // Vì API này trả về mảng Location[] trực tiếp
  const res = await httpClient.get<Location[]>(url);

  // Sẽ là undefined
  console.log("res.data của getLocationsForType", res.data); // Sẽ là mảng [...]

  // SỬA LỖI 2: Trả về res.data
  return res.data;
};
