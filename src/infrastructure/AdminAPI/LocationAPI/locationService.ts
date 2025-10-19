// src/infrastructure/AdminAPI/LocationAPI/locationService.ts

export interface LocationResponse {
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

const API_BASE_URL = 'https://bookingstudioswd-be.onrender.com';

export class LocationService {
  private static async fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  static async getAllLocations(): Promise<LocationResponse> {
    const url = `${API_BASE_URL}/api/locations`;
    return this.fetchWithErrorHandling<LocationResponse>(url, {
      method: 'GET',
    });
  }

  static async getLocationById(id: string): Promise<LocationData> {
    const url = `${API_BASE_URL}/api/locations/${id}`;
    return this.fetchWithErrorHandling<LocationData>(url, {
      method: 'GET',
    });
  }

  static async createLocation(locationData: Omit<LocationData, 'id' | 'isDeleted' | 'longitude' | 'latitude'>): Promise<LocationData> {
    const url = `${API_BASE_URL}/api/locations`;
    console.log('Creating location with data:', locationData);
    
    const response = await this.fetchWithErrorHandling<any>(url, {
      method: 'POST',
      body: JSON.stringify(locationData),
    });
    
    console.log('Create location API response:', response);
    
    // Handle different response formats
    if (response.data) {
      console.log('Using response.data:', response.data);
      return response.data;
    } else if (response.id) {
      console.log('Using response directly:', response);
      return response;
    } else {
      console.error('Invalid response format:', response);
      throw new Error('Invalid response format from create location API');
    }
  }

  static async updateLocation(id: string, locationData: Partial<Omit<LocationData, 'id' | 'isDeleted' | 'longitude' | 'latitude'>>): Promise<LocationData> {
    const url = `${API_BASE_URL}/api/locations/${id}`;
    const response = await this.fetchWithErrorHandling<any>(url, {
      method: 'PUT',
      body: JSON.stringify(locationData),
    });
    
    // Handle different response formats
    if (response.data) {
      return response.data;
    } else if (response.id) {
      return response;
    } else {
      throw new Error('Invalid response format from update location API');
    }
  }

  static async deleteLocation(id: string): Promise<void> {
    const url = `${API_BASE_URL}/api/locations/${id}`;
    return this.fetchWithErrorHandling<void>(url, {
      method: 'DELETE',
    });
  }
}
