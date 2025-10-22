// src/infrastructure/AdminAPI/Studio/types.ts
export interface StudioAPIResponse {
  code: number;
  message: string;
  data: StudioData[];
}

export interface StudioData {
  id: string;
  studioName: string;
  description: string;
  acreage: number;
  startTime: string;
  endTime: string;
  imageUrl: string;
  status: "AVAILABLE" | "MAINTENANCE";
  locationId: string;
  studioTypeId: string;
  locationName?: string; // Backend trả về trực tiếp
  studioTypeName?: string; // Backend trả về trực tiếp
}

export interface StudioCreateRequest {
  studioName: string;
  description: string;
  acreage: number;
  startTime: string;
  endTime: string;
  imageUrl?: string; // Optional for JSON format
  status: "AVAILABLE" | "MAINTENANCE";
  locationId: string;
  studioTypeId: string;
}

export interface StudioUpdateRequest extends StudioCreateRequest {
  id: string;
  imageUrl?: string; // Optional for update
}

export interface StudioQueryParams {
  studioTypeId?: string;
}
