import studioTypeService from "@/infrastructure/api/service/studioTypeService";
import { Location } from "@/domain/models/studio-type/location";

/**
 * Lấy danh sách vị trí (location) theo loại studio
 * @param typeId - ID của loại studio
 */
export async function getLocationsByType(typeId: string): Promise<Location[]> {
  try {
    const data = await studioTypeService.getLocationsByType(typeId);
    if (!Array.isArray(data)) {
      console.warn(
        `Dữ liệu locations của typeId=${typeId} không hợp lệ:`,
        data
      );
      return [];
    }
    return data;
  } catch (err) {
    console.error(`Lỗi khi lấy danh sách location cho typeId=${typeId}:`, err);
    return [];
  }
}
