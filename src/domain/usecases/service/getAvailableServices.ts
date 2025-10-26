// src/usecases/service/getAvailableServices.ts

import { Service } from "@/domain/models/booking/Service";
import { serviceService } from "@/infrastructure/api/service/services/serviceService";

/**
 * Use case để lấy các dịch vụ có sẵn
 * Tầng UI (giao diện) sẽ gọi hàm này
 */
export const getAvailableServicesUseCase = async (): Promise<Service[]> => {
  // Trong tương lai, bạn có thể thêm logic nghiệp vụ ở đây
  // (ví dụ: sắp xếp, thêm/bớt trường...)

  // Hiện tại, chúng ta chỉ gọi và trả về
  return await serviceService.getAvailableServices();
};
