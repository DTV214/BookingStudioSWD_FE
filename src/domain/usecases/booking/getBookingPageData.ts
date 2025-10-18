// src/domain/usecases/booking/getBookingPageData.usecase.ts

import { getStudioTypes } from "@/domain/usecases/studioType/getStudioTypes";
import { getAllServices } from "@/infrastructure/api/service/booking/itemService";


// Use case này gọi song song 2 API khi load trang
export const getBookingPageDataUseCase = async () => {
  const [studioTypes, services] = await Promise.all([
    getStudioTypes(),
    getAllServices(),
  ]);
  return { studioTypes, services };
};
