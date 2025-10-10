import { profileService } from "@/infrastructure/api/service/profileService";
import { storage } from "@/infrastructure/utils/storage";
import type { Profile } from "@/domain/models/profile";
import type { ApiResponse } from "@/domain/models/common";

export const updateProfileUseCase = async (
  data: Partial<Profile>
): Promise<ApiResponse<Profile>> => {
  const token = storage.getToken();
  if (!token) throw new Error("Không tìm thấy token!");

  const res = await profileService.updateProfile(token, data);

  if (res?.code !== 200) {
    throw new Error(res.message || "Cập nhật thất bại");
  }

  return res;
};
