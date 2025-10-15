import { StudioType } from "@/domain/models/studio-type/studioType";
import studioTypeService from "@/infrastructure/api/service/studioTypeService";

/**
 * Lấy danh sách tất cả loại studio
 */
export async function getStudioTypes(): Promise<StudioType[]> {
  try {
    const data = await studioTypeService.getStudioTypes();
    if (!Array.isArray(data)) {
      console.warn("Dữ liệu studio types không hợp lệ:", data);
      return [];
    }
    return data;
  } catch (err) {
    console.error("Lỗi khi lấy danh sách loại studio:", err);
    return [];
  }
}
