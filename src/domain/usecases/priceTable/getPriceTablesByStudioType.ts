import { PriceTable } from "@/domain/models/priceTable/priceTable";
import priceTableService from "@/infrastructure/api/service/priceTable/priceTableService";


/**
 * Usecase để lấy và xử lý các bảng giá theo studio type
 */
export async function getPriceTablesByStudioTypeUseCase(
  studioTypeId: string
): Promise<PriceTable[]> {
  try {
    // 1. Gọi đến lớp Infrastructure (Service)
    const tables = await priceTableService.getByStudioType(studioTypeId);

    // 2. Xử lý logic nghiệp vụ (Domain)
    // Ví dụ: Sắp xếp các bảng giá theo độ ưu tiên (priority)
    const sortedTables = tables.sort((a, b) => a.priority - b.priority);

    return sortedTables;
  } catch (error) {
    console.error("Usecase error fetching price tables:", error);
    // Ném lỗi để component có thể bắt
    throw new Error("Failed to get price tables.");
  }
}
