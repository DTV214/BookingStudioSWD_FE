// src/infrastructure/AdminAPI/LocationAPI/locationService.ts

import { httpClient } from '@/infrastructure/api/httpClient';

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

export class LocationService {
  static async getAllLocations(): Promise<LocationResponse> {
    try {
      const response = await httpClient.get<LocationData[]>('/api/locations');
      return {
        code: 200,
        message: 'Success',
        data: response.data || []
      };
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  }

  static async getLocationById(id: string): Promise<LocationData> {
    try {
      const response = await httpClient.get<LocationData>(`/api/locations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching location by ID:', error);
      throw error;
    }
  }

  static async createLocation(locationData: Omit<LocationData, 'id' | 'isDeleted' | 'longitude' | 'latitude'>): Promise<LocationData> {
    try {
      console.log('Creating location with data:', locationData);
      
      const response = await httpClient.post<LocationData>('/api/locations', locationData);
      
      console.log('Create location API response:', response);
      
      return response.data;
    } catch (error) {
      console.error('Error creating location:', error);
      throw error;
    }
  }

  static async updateLocation(id: string, locationData: Partial<Omit<LocationData, 'id' | 'isDeleted' | 'longitude' | 'latitude'>>): Promise<LocationData> {
    try {
      const response = await httpClient.put<LocationData>(`/api/locations/${id}`, locationData);
      return response.data;
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  }

  static async deleteLocation(id: string): Promise<void> {
    try {
      await httpClient.delete(`/api/locations/${id}`);
    } catch (error) {
      console.error('Error deleting location:', error);
      throw error;
    }
  }
}