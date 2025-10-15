// src/infrastructure/api/service/studioTypeService.ts
import { StudioType } from "@/domain/models/studio-type/studioType";
import { Location } from "@/domain/models/studio-type/location";
import { Studio } from "@/domain/models/studio-type/studio";
import { httpClient } from "@/infrastructure/api/httpClient";

const studioTypeService = {
  async getStudioTypes(): Promise<StudioType[]> {
    const res = await httpClient.get<StudioType[]>("/api/studio-types");
    return res.data; // ✅ không cần .data.data nữa
  },

  async getLocationsByType(typeId: string): Promise<Location[]> {
    const res = await httpClient.get<Location[]>(
      `/api/locations?typeId=${typeId}`
    );
    return res.data; // ✅
  },

  async getStudiosByType(studioTypeId: string): Promise<Studio[]> {
    const res = await httpClient.get<Studio[]>(
      `/api/studios?studioTypeId=${studioTypeId}`
    );
    return res.data; // ✅
  },
};

export default studioTypeService;
