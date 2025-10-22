import { httpClient } from "@/infrastructure/api/httpClient";
import { 
  LocationAPIResponse, 
  LocationData, 
  LocationQueryParams 
} from './types';

export class LocationAPI {
  /**
   * Lấy danh sách tất cả locations
   */
  static async getAllLocations(params?: LocationQueryParams): Promise<LocationData[]> {
    try {
      const queryParams = new URLSearchParams();
      // Add any query parameters if needed
      
      const url = `/api/locations${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await httpClient.get<LocationData[]>(url);
      
      if (response.code === 200) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch locations');
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  }

  /**
   * Lấy thông tin location theo ID
   */
  static async getLocationById(id: string): Promise<LocationData> {
    try {
      const response = await httpClient.get<LocationData[]>(`/api/locations/${id}`);
      
      if (response.code === 200) {
        return response.data[0]; // API trả về array, lấy phần tử đầu tiên
      } else {
        throw new Error(response.message || 'Failed to fetch location');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  }
}
