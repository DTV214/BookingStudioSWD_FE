import { Service } from "@/domain/models/booking/Service"; // Import từ domain
import { httpClient } from "@/infrastructure/api/httpClient";
import { ENDPOINTS } from "@/infrastructure/lib/endpoints";

// Kiểu dữ liệu này không cần dùng ở đây nữa
// interface ServiceApiResponse {
//   code: number;
//   message: string;
//   data: Service[];
// }

/**
 * Service này chịu trách nhiệm gọi các API liên quan đến "Service"
 */
export const serviceService = {
  /**
   * Lấy tất cả service từ backend
   */
  getAllServices: async (): Promise<Service[]> => {
    try {
      // SỬA LỖI: Kiểu generic là Service[] (dữ liệu bạn muốn trong 'data')
      const response = await httpClient.get<Service[]>(ENDPOINTS.SERVICES);

      console.log("response.data", response.data); // Bây giờ response.data là mảng Service[]

      // ĐÚNG: Trả về mảng data
      return response.data;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error; // Re-throw để use case xử lý
    }
  },

  /**
   * Lấy tất cả service CÓ SẴN (AVAILABLE)
   */
  getAvailableServices: async (): Promise<Service[]> => {
    try {
      // SỬA LỖI: Kiểu generic là Service[]
      const response = await httpClient.get<Service[]>(ENDPOINTS.SERVICES);

      // SỬA LỖI: Lọc trực tiếp từ response.data (vì nó là mảng Service[])
      const availableServices = response.data.filter(
        (service: Service) => service.status === "AVAILABLE"
      );

      return availableServices;
    } catch (error) {
      console.error("Error fetching available services:", error);
      throw error;
    }
  },
};
