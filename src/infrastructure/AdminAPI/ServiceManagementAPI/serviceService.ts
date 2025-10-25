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

const API_BASE_URL = 'https://api.eccubestudio.click';

export class ServiceService {
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

  static async getAllServices(): Promise<ServiceResponse> {
    const url = `${API_BASE_URL}/api/services`;
    console.log('Fetching services from:', url);
    
    const response = await this.fetchWithErrorHandling<ServiceResponse>(url, {
      method: 'GET',
    });

    console.log('Services API response:', response);
    return response;
  }

  static async getServiceById(id: string): Promise<ServiceData> {
    const url = `${API_BASE_URL}/api/services/${id}`;
    const response = await this.fetchWithErrorHandling<{ data: ServiceData }>(url, {
      method: 'GET',
    });
    return response.data;
  }

  static async createService(serviceData: Omit<ServiceData, 'id'>): Promise<ServiceData> {
    const url = `${API_BASE_URL}/api/services`;
    console.log('Creating service with data:', serviceData);
    
    const response = await this.fetchWithErrorHandling<{ data: ServiceData }>(url, {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });

    console.log('Create service API response:', response);
    return response.data;
  }

  static async updateService(id: string, serviceData: Partial<Omit<ServiceData, 'id'>>): Promise<ServiceData> {
    const url = `${API_BASE_URL}/api/services/${id}`;
    console.log('Updating service:', id, 'with data:', serviceData);
    
    const response = await this.fetchWithErrorHandling<{ data: ServiceData }>(url, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });

    console.log('Update service API response:', response);
    return response.data;
  }

  static async deleteService(id: string): Promise<void> {
    const url = `${API_BASE_URL}/api/services/${id}`;
    console.log('Deleting service:', id);
    
    await this.fetchWithErrorHandling<void>(url, {
      method: 'DELETE',
    });

    console.log('Service deleted successfully');
  }
}
