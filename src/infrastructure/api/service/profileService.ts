// src/infrastructure/api/service/profileService.ts

import { ApiResponse } from "@/domain/models/common";
import { Profile } from "@/domain/models/profile";
import { httpClient } from "@/infrastructure/api/httpClient";
import { ENDPOINTS } from "@/infrastructure/lib/endpoints";


export const profileService = {
  async getProfile(token: string): Promise<ApiResponse<Profile>> {
    return httpClient.get<Profile>(ENDPOINTS.PROFILE, token);
  },

  async updateProfile(
    token: string,
    data: Partial<Profile>
  ): Promise<ApiResponse<Profile>> {
    return httpClient.put<Profile>(ENDPOINTS.ACCOUNT, data, token);
  },

  async createProfile(
    token: string,
    data: Partial<Profile>
  ): Promise<ApiResponse<Profile>> {
    return httpClient.post<Profile>(ENDPOINTS.ACCOUNT, data, token);
  },

  async deleteProfile(token: string): Promise<ApiResponse<null>> {
    return httpClient.delete<null>(ENDPOINTS.ACCOUNT, token);
  },
};
