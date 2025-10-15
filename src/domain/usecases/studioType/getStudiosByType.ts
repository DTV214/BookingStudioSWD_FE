import studioTypeService from "@/infrastructure/api/service/studioTypeService";
import { Studio } from "@/domain/models/studio-type/studio";

/**
 * Lấy danh sách các studio theo loại studio
 * @param studioTypeId - ID của loại studio
 */
export async function getStudiosByType(
  studioTypeId: string
): Promise<Studio[]> {
  try {
    const data = await studioTypeService.getStudiosByType(studioTypeId);
    if (!Array.isArray(data)) {
      console.warn(
        `Dữ liệu studios của typeId=${studioTypeId} không hợp lệ:`,
        data
      );
      return [];
    }
    return data;
  } catch (err) {
    console.error(
      `Lỗi khi lấy danh sách studio cho typeId=${studioTypeId}:`,
      err
    );
    return [];
  }
}
