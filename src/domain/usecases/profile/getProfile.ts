import { profileService } from "@/infrastructure/api/service/profileService";
import { storage } from "@/infrastructure/utils/storage";
import type { Profile } from "@/domain/models/profile";
import type { ApiResponse } from "@/domain/models/common";

export const getProfileUseCase = async (): Promise<Profile | null> => {
  const token = storage.getToken();
  if (!token) return null;

  const res: ApiResponse<Profile> = await profileService.getProfile(token);

  // API chuẩn của bạn có dạng { code: 200, data: {...} }
  if (res?.code === 200 && res.data) {
    return res.data;
  }

  console.warn("getProfileUseCase: Không nhận được dữ liệu hợp lệ", res);
  return null;
};
