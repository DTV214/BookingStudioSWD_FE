// src/infrastructure/AdminAPI/Studio/studioAPI.ts
import { httpClient } from '@/infrastructure/api/httpClient';
import { 
  StudioData, 
  StudioCreateRequest, 
  StudioUpdateRequest, 
  StudioQueryParams 
} from './types';

// const BASE_URL = 'https://bookingstudioswd-be.onrender.com/api'; // Unused constant

export class StudioAPI {
  /**
   * Test API connection với một request đơn giản
   */
  static async testConnection(): Promise<boolean> {
    try {
      console.log('=== TESTING API CONNECTION ===');
      console.log('Testing connection to:', 'https://bookingstudioswd-be.onrender.com/api/studios');
      
      const response = await httpClient.get<StudioData[]>("/api/studios");
      console.log('Connection test response:', response);
      
      const isConnected = response.code === 200;
      console.log('Connection test result:', isConnected);
      
      return isConnected;
    } catch (error) {
      console.error('API connection test failed:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        status: error && typeof error === 'object' && 'status' in error ? (error as Record<string, unknown>).status : 'No status'
      });
      return false;
    }
  }

  /**
   * Test tạo studio với dữ liệu mẫu
   */
  static async testCreateStudio(): Promise<boolean> {
    try {
      const testData: StudioCreateRequest = {
        studioName: "Test Studio",
        description: "This is a test studio for debugging purposes",
        acreage: 50,
        startTime: "08:00:00",
        endTime: "18:00:00",
        status: "AVAILABLE",
        locationId: "Test Location ID",
        studioTypeId: "Test Studio Type ID"
      };

      console.log('=== TEST CREATE STUDIO ===');
      console.log('Test data:', JSON.stringify(testData, null, 2));

      const response = await httpClient.post<StudioData[]>(`/api/studios`, testData);
      console.log('Test response:', JSON.stringify(response, null, 2));
      
      return response.code === 200 || response.code === 201;
    } catch (error) {
      console.error('Test create studio failed:', error);
      return false;
    }
  }

  /**
   * Lấy danh sách tất cả studios
   */
  static async getAllStudios(params?: StudioQueryParams): Promise<StudioData[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.studioTypeId) {
        queryParams.append('studioTypeId', params.studioTypeId);
      }
      
      const url = `/api/studios${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await httpClient.get<StudioData[]>(url);
      
      if (response.code === 200) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch studios');
      }
    } catch (error) {
      console.error('Error fetching studios:', error);
      throw error;
    }
  }

  /**
   * Lấy thông tin studio theo ID
   */
  static async getStudioById(id: string): Promise<StudioData> {
    try {
      const response = await httpClient.get<StudioData[]>(`/api/studios/${id}`);
      
      if (response.code === 200) {
        // Check if data exists and is valid
        if (!response.data) {
          throw new Error('No data returned from fetch API');
        }
        
        // Handle both array and object responses
        if (Array.isArray(response.data)) {
          if (response.data.length === 0) {
            throw new Error('Empty array returned from fetch API');
          }
          return response.data[0]; // API trả về array, lấy phần tử đầu tiên
        } else if (typeof response.data === 'object') {
          // Backend trả về object trực tiếp
          return response.data as StudioData;
        } else {
          throw new Error('Invalid data format returned from fetch API');
        }
      } else {
        throw new Error(response.message || 'Failed to fetch studio');
      }
    } catch (error) {
      console.error('Error fetching studio:', error);
      throw error;
    }
  }

  /**
   * Tạo studio mới với file upload
   */
  static async createStudio(studioData: StudioCreateRequest, imageFile?: File): Promise<StudioData> {

    console.log('=== CREATE STUDIO DEBUG ===');
    console.log('Image file:', imageFile);
    try {
      // Validate required fields before sending
      if (!studioData.studioName || studioData.studioName.trim() === '') {
        throw new Error('Studio name is required');
      }
      if (studioData.studioName.trim().length < 3) {
        throw new Error('Studio name must be at least 3 characters');
      }
      
      if (!studioData.description || studioData.description.trim() === '') {
        throw new Error('Description is required');
      }
      if (studioData.description.trim().length < 10) {
        throw new Error('Description must be at least 10 characters');
      }
      
      // Image URL validation removed - using imageFile instead
      // if (!studioData.imageUrl || studioData.imageUrl.trim() === '') {
      //   throw new Error('Image URL is required');
      // }
      
      if (!studioData.locationId || studioData.locationId.trim() === '') {
        throw new Error('Location ID is required');
      }
      
      if (!studioData.studioTypeId || studioData.studioTypeId.trim() === '') {
        throw new Error('Studio type ID is required');
      }
      
      if (typeof studioData.acreage !== 'number' || studioData.acreage <= 0) {
        throw new Error('Acreage must be a positive number');
      }
      
      if (!studioData.startTime || !studioData.endTime) {
        throw new Error('Start time and end time are required');
      }
      
      // Validate time logic
      if (studioData.startTime >= studioData.endTime) {
        throw new Error('End time must be greater than start time');
      }
      
      // Validate status
      if (!studioData.status || !['AVAILABLE', 'MAINTENANCE'].includes(studioData.status)) {
        throw new Error('Status must be either AVAILABLE or MAINTENANCE');
      }

      console.log('=== CREATE STUDIO DEBUG ===');
      console.log('Request URL:', `/api/studios`);
      console.log('Request data:', JSON.stringify(studioData, null, 2));
      console.log('Data validation:', {
        studioName: studioData.studioName ? `OK (${studioData.studioName.length} chars)` : 'MISSING',
        description: studioData.description ? `OK (${studioData.description.length} chars)` : 'MISSING',
        acreage: typeof studioData.acreage === 'number' ? `OK (${studioData.acreage})` : 'INVALID',
        startTime: studioData.startTime ? `OK (${studioData.startTime})` : 'MISSING',
        endTime: studioData.endTime ? `OK (${studioData.endTime})` : 'MISSING',
        status: studioData.status ? `OK (${studioData.status})` : 'MISSING',
        locationId: studioData.locationId ? `OK (${studioData.locationId.length} chars)` : 'MISSING',
        studioTypeId: studioData.studioTypeId ? `OK (${studioData.studioTypeId.length} chars)` : 'MISSING'
      });

      // Prepare request data - use JSON format if no imageFile to avoid 413 error
      let response;
      if (!imageFile) {
        console.log('=== NO IMAGEFILE - USING JSON FORMAT ===');
        const requestData = {
          studioName: studioData.studioName,
          description: studioData.description,
          acreage: studioData.acreage,
          startTime: studioData.startTime,
          endTime: studioData.endTime,
          status: studioData.status,
          imageUrl: "https://via.placeholder.com/400x300?text=Studio+Image", // Use placeholder URL
          locationId: studioData.locationId,
          studioTypeId: studioData.studioTypeId
        };
        
        console.log('=== SENDING REQUEST (JSON MODE - NO IMAGEFILE) ===');
        console.log('Full request object:', {
          url: `/api/studios`,
          method: 'POST',
          data: requestData
        });

        response = await httpClient.post<StudioData[]>(`/api/studios`, requestData);
      } else {
        // Use FormData format with req and imageFile (as per Swagger UI)
        const formData = new FormData();
        
        // Create req object with all studio data (including image field)
        const reqData = {
          studioName: studioData.studioName,
          description: studioData.description,
          acreage: studioData.acreage,
          startTime: studioData.startTime,
          endTime: studioData.endTime,
          status: studioData.status,
          
          locationId: studioData.locationId,
          studioTypeId: studioData.studioTypeId
        };
        
        console.log('=== FORM DATA DEBUG (SWAGGER FORMAT) ===');
        console.log('reqData:', reqData);
        console.log('imageFile:', imageFile);
        
        // Add req as JSON string with proper Content-Type
        const reqBlob = new Blob([JSON.stringify(reqData)], { type: 'application/json' });
        formData.append('req', reqBlob, 'req.json');
        
        // Add imageFile with proper Content-Type
        formData.append('imageFile', imageFile);
        console.log('imageFile added to FormData:', imageFile.name, imageFile.size, imageFile.type);
        
        // Debug FormData contents
        console.log('FormData entries:');
        for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
            console.log(`${key}:`, {
              name: value.name,
              size: value.size,
              type: value.type,
              lastModified: value.lastModified
            });
          } else if (value && typeof value === 'object' && 'type' in value && 'size' in value) {
            console.log(`${key}:`, {
              type: (value as Blob).type,
              size: (value as Blob).size
            });
          } else {
            console.log(`${key}:`, value);
          }
        }

        console.log('=== SENDING REQUEST (FORM-DATA MODE - SWAGGER FORMAT) ===');
        console.log('Full request object:', {
          url: `/api/studios`,
          method: 'POST',
          data: formData,
          isFormData: formData instanceof FormData
        });

        // Debug: Check if FormData has proper Content-Type boundaries
        console.log('FormData toString():', formData.toString());
        
        response = await httpClient.post<StudioData[]>(`/api/studios`, formData);
      }
      console.log('=== RESPONSE RECEIVED ===');
      console.log('Response status:', response.code);
      console.log('Response message:', response.message);
      console.log('Response data:', JSON.stringify(response.data, null, 2));
      
      if (response.code === 200 || response.code === 201) {
        // Check if data exists and is valid
        if (!response.data) {
          throw new Error('No data returned from create API');
        }
        
        // Handle both array and object responses
        if (Array.isArray(response.data)) {
          if (response.data.length === 0) {
            throw new Error('Empty array returned from create API');
          }
          return response.data[0]; // API trả về array, lấy phần tử đầu tiên
        } else if (typeof response.data === 'object') {
          // Backend trả về object trực tiếp
          return response.data as StudioData;
        } else {
          throw new Error('Invalid data format returned from create API');
        }
      } else {
        throw new Error(response.message || 'Failed to create studio');
      }
    } catch (error) {
      console.error('=== CREATE STUDIO ERROR ===');
      console.error('Error details:', error);
      console.error('Error type:', typeof error);
      console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
      
      // Log thêm thông tin về HTTP error nếu có
      if (error && typeof error === 'object' && 'status' in error) {
        const errorObj = error as Record<string, unknown>;
        console.error('HTTP Status:', errorObj.status);
        console.error('HTTP Data:', errorObj.data);
      }
      
      if (error instanceof Error) {
        throw new Error(`Failed to create studio: ${error.message}`);
      }
      throw new Error('Unknown error occurred while creating studio');
    }
  }

  /**
   * Cập nhật studio với file upload
   */
  static async updateStudio(id: string, studioData: StudioUpdateRequest, imageFile?: File): Promise<StudioData> {
    try {
      // Prepare request data - use JSON format for onrender.com backend
      const requestData = {
        studioName: studioData.studioName,
        description: studioData.description,
        acreage: studioData.acreage,
        startTime: studioData.startTime,
        endTime: studioData.endTime,
        status: studioData.status,
        imageUrl: studioData.imageUrl, // Use imageUrl from converted data
        locationId: studioData.locationId,
        studioTypeId: studioData.studioTypeId
      };
      
      console.log('=== UPDATE STUDIO DEBUG ===');
      console.log('Studio ID:', id);
      console.log('Request data:', requestData);
      console.log('Image file:', imageFile);

      const response = await httpClient.put<StudioData[]>(`/api/studios/${id}`, requestData);
      
      console.log('=== UPDATE STUDIO RESPONSE ===');
      console.log('Response code:', response.code);
      console.log('Response message:', response.message);
      console.log('Response data:', response.data);
      
      if (response.code === 200) {
        // Check if data exists and is valid
        if (!response.data) {
          throw new Error('No data returned from update API');
        }
        
        // Handle both array and object responses
        if (Array.isArray(response.data)) {
          if (response.data.length === 0) {
            throw new Error('Empty array returned from update API');
          }
          return response.data[0]; // API trả về array, lấy phần tử đầu tiên
        } else if (typeof response.data === 'object') {
          // Backend trả về object trực tiếp
          return response.data as StudioData;
        } else {
          throw new Error('Invalid data format returned from update API');
        }
      } else {
        throw new Error(response.message || 'Failed to update studio');
      }
    } catch (error) {
      console.error('Error updating studio:', error);
      throw error;
    }
  }

  /**
   * Xóa studio
   */
  static async deleteStudio(id: string): Promise<boolean> {
    try {
      // First check if studio exists
      const studios = await this.getAllStudios();
      const studioExists = studios.some(studio => studio.id === id);
      
      if (!studioExists) {
        throw new Error(`Studio with ID ${id} not found`);
      }

      const response = await httpClient.delete<{ message: string }>(`/api/studios/${id}`);
      
      if (response.code === 200) {
        return true;
      } else {
        throw new Error(response.message || 'Failed to delete studio');
      }
    } catch (error) {
      console.error('Error deleting studio:', error);
      throw error;
    }
  }
}
