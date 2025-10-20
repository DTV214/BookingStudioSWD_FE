// src/infrastructure/AdminAPI/Studio-TypesAPI/studioTypesService.ts

import { StudioType } from "@/domain/models/studio-type/studioType";

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

const API_BASE_URL = "https://bookingstudioswd-be.onrender.com";

export class StudioTypesService {
  private static async fetchWithErrorHandling<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error("StudioTypes API Error:", error);
      throw error;
    }
  }

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
    const url = `${API_BASE_URL}/api/studio-types`;
    const res = await this.fetchWithErrorHandling<StudioTypesResponse>(url, {
      method: "GET",
    });
    const list = Array.isArray(res.data) ? res.data : [];
    return list.map(this.toModel);
  }

  static async getById(id: string): Promise<StudioType> {
    const url = `${API_BASE_URL}/api/studio-types/${id}`;
    const res = await this.fetchWithErrorHandling<StudioTypeItemResponse>(url, {
      method: "GET",
    });
    return this.toModel(res.data);
  }

  static async create(
    payload: Omit<StudioType, "id">
  ): Promise<StudioType> {
    const url = `${API_BASE_URL}/api/studio-types`;
    const res = await this.fetchWithErrorHandling<StudioTypeItemResponse>(url, {
      method: "POST",
      body: JSON.stringify({
        name: payload.name,
        description: payload.description,
        minArea: payload.minArea,
        maxArea: payload.maxArea,
        bufferTime:
          payload.bufferTime && payload.bufferTime !== ""
            ? Number(payload.bufferTime)
            : null,
        services: payload.services ?? [],
      }),
    });

    // Đảm bảo kiểu rõ ràng
    const dto: StudioTypeDto = res.data;
    return this.toModel(dto);
  }

  static async update(
    id: string,
    payload: Partial<StudioType>
  ): Promise<StudioType> {
    const url = `${API_BASE_URL}/api/studio-types/${id}`;
    const res = await this.fetchWithErrorHandling<StudioTypeItemResponse>(url, {
      method: "PUT",
      body: JSON.stringify({
        name: payload.name,
        description: payload.description,
        minArea: payload.minArea,
        maxArea: payload.maxArea,
        bufferTime:
          payload.bufferTime && payload.bufferTime !== ""
            ? Number(payload.bufferTime)
            : null,
        services: payload.services ?? [],
      }),
    });

    const dto: StudioTypeDto = res.data;
    return this.toModel(dto);
  }

  static async delete(id: string): Promise<void> {
    const url = `${API_BASE_URL}/api/studio-types/${id}`;
    await this.fetchWithErrorHandling<void>(url, { method: "DELETE" });
  }
}
