import { PriceRule } from "@/domain/models/priceTable/priceRule";
import priceRuleService from "@/infrastructure/api/service/priceTable/priceRuleService";

/**
 * Usecase để lấy và xử lý các quy tắc giá
 */
export async function getPriceRulesUseCase(
  studioTypeId: string,
  priceTableId: string
): Promise<PriceRule[]> {
  try {
    // 1. Gọi đến lớp Infrastructure (Service)
    const rules = await priceRuleService.getRules(studioTypeId, priceTableId);

    // 2. Xử lý logic nghiệp vụ (Domain)
    // Ví dụ: Lọc ra các rules đã bị xóa (isDeleted)
    const activeRules = rules.filter((rule) => !rule.isDeleted);

    return activeRules;
  } catch (error) {
    console.error("Usecase error fetching price rules:", error);
    // Ném lỗi để component có thể bắt
    throw new Error("Failed to get price rules.");
  }
}
