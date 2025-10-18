// src/domain/usecases/booking/calculateSlotPrice.usecase.ts

import { PriceItemRequest } from "@/domain/models/booking/Price";
import { getPriceForItem } from "@/infrastructure/api/service/booking/priceService";

export const calculateSlotPriceUseCase = async (params: PriceItemRequest) => {
  const response = await getPriceForItem(params);
  // Trả về giá base
  return response.totalPrice;
};
