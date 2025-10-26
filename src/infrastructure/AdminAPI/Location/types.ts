export interface LocationAPIResponse {
  code: number;
  message: string;
  data: LocationData[];
}

export interface LocationData {
  id: string;
  locationName: string;
  address: string;
  contactNumber: string;
  longitude: string;
  latitude: string;
  isDeleted: boolean;
}

export interface LocationQueryParams {
  // Query parameters for location API
  page?: number;
  limit?: number;
  search?: string;
}
