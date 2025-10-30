import { httpClient } from '@/infrastructure/api/httpClient';

// Service API Response Types
export interface ServiceResponse {
  code: number;
  message: string;
  data: ServiceData[];
}

export interface ServiceData {
  id: string;
  serviceName: string;
  serviceFee: number;
  description: string;
  status: 'AVAILABLE' | 'UNAVAILABLE';
}

export class ServiceService {

  static async getAllServices(): Promise<ServiceResponse> {
    console.log('Fetching services from API');
    
    try {
      const response = await httpClient.get<ServiceData[]>('/api/services');
      console.log('Services API response:', response);
      
      return {
        code: 200,
        message: 'Success',
        data: response.data || []
      };
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  static async getServiceById(id: string): Promise<ServiceData> {
    try {
      const response = await httpClient.get<ServiceData>(`/api/services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service by ID:', error);
      throw error;
    }
  }

  static async createService(serviceData: Omit<ServiceData, 'id'>): Promise<ServiceData> {
    console.log('Creating service with data:', serviceData);
    
    try {
      const response = await httpClient.post<ServiceData>('/api/services', serviceData);
      console.log('Create service API response:', response);
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  }

  static async updateService(id: string, serviceData: Partial<Omit<ServiceData, 'id'>>): Promise<ServiceData> {
    console.log('Updating service:', id, 'with data:', serviceData);
    
    try {
      const response = await httpClient.put<ServiceData>(`/api/services/${id}`, serviceData);
      console.log('Update service API response:', response);
      return response.data;
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  }

  static async deleteService(id: string): Promise<void> {
    console.log('Deleting service:', id);
    
    try {
      await httpClient.delete<void>(`/api/services/${id}`);
      console.log('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  }
}
