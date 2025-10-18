// src/domain/usecases/booking/getLocations.usecase.ts

import { getLocationsForType } from "@/infrastructure/api/service/booking/studioService";

// SỬA LỖI: Thêm "return"
export const getLocationsUseCase = async (typeId: string) => {
  return await getLocationsForType(typeId); // <-- Đã thêm "return"
};
