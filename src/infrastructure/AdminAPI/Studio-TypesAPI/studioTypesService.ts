import { StudioType } from "@/domain/models/studio-type/studioType";
import { httpClient } from "@/infrastructure/api/httpClient";

export interface StudioTypeDto {
  id: string;
  name: string;
  description: string;
  minArea: number;
  maxArea: number;
  bufferTime?: number | string | null;
  isDeleted?: boolean;
  services?: string[];
}

export interface StudioTypesResponse {
  code: number;
  message: string;
  data: StudioTypeDto[];
}

export interface StudioTypeItemResponse {
  code: number;
  message: string;
  data: StudioTypeDto;
}

export class StudioTypesService {
  private static toModel(dto: StudioTypeDto): StudioType {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      minArea: dto.minArea,
      maxArea: dto.maxArea,
      bufferTime: dto.bufferTime != null ? String(dto.bufferTime) : null,
      services: dto.services ?? [],
    };
  }

  static async getAll(): Promise<StudioType[]> {
    const res = await httpClient.get<StudioTypeDto[]>("/api/studio-types");
    const list = Array.isArray(res.data) ? res.data : [];
    return list.map(this.toModel);
  }

  static async getById(id: string): Promise<StudioType> {
    const res = await httpClient.get<StudioTypeDto>(`/api/studio-types/${id}`);
    return this.toModel(res.data);
  }

  static async create(
    payload: Omit<StudioType, "id">
  ): Promise<StudioType> {
    const res = await httpClient.post<StudioTypeDto>("/api/studio-types", {
      name: payload.name,
      description: payload.description,
      minArea: payload.minArea,
      maxArea: payload.maxArea,
      bufferTime:
        payload.bufferTime && payload.bufferTime !== ""
          ? Number(payload.bufferTime)
          : null,
      services: payload.services ?? [],
    });

    return this.toModel(res.data);
  }

  static async update(
    id: string,
    payload: Partial<StudioType>
  ): Promise<StudioType> {
    const res = await httpClient.put<StudioTypeDto>(`/api/studio-types/${id}`, {
      name: payload.name,
      description: payload.description,
      minArea: payload.minArea,
      maxArea: payload.maxArea,
      bufferTime:
        payload.bufferTime && payload.bufferTime !== ""
          ? Number(payload.bufferTime)
          : null,
      services: payload.services ?? [],
    });

    return this.toModel(res.data);
  }

  static async delete(id: string): Promise<void> {
    await httpClient.delete<void>(`/api/studio-types/${id}`);
  }
}
