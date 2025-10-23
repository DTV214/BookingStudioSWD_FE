// Pricing API Response Types
export interface PricingResponse {
  code: number;
  message: string;
  data: PricingData[];
}

export interface PricingData {
  id: string;
  startDate: string | null; // ISO date string, e.g., "2025-04-30" or null
  endDate: string | null; // ISO date string, e.g., "2027-04-30" or null
  priority: number | null; // 0, 1, 2, etc. or null
  status: 'COMING_SOON' | 'IS_HAPPENING' | 'ENDED' | null;
}

// Price Item interfaces
export interface PriceItem {
  id: string;
  priceTableId: string;
  studioTypeName: string; // Changed from studioTypeId to studioTypeName
  defaultPrice: number;
}

export interface PriceItemResponse {
  code: number;
  message: string;
  data: PriceItem[];
}

// Request body for creating/updating price tables
export interface PriceTablePayload {
  startDate: string;
  endDate?: string | null;
  priority: number;
  status: 'COMING_SOON' | 'IS_HAPPENING' | 'ENDED';
}

const API_BASE_URL = 'https://api.eccubestudio.click';

export class PricingService {
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
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  // Step 1: Fetch all price tables from API
  static async getAllPriceTables(): Promise<PricingResponse> {
    const url = `${API_BASE_URL}/api/price-tables`;
    console.log('Fetching price tables from:', url);
    
    const response = await this.fetchWithErrorHandling<PricingResponse>(url, {
      method: 'GET',
    });

    console.log('Price tables API response:', response);
    return response;
  }

  // Step 2: Get price items by table ID
  static async getPriceItemsByTableId(tableId: string): Promise<PriceItemResponse> {
    console.log('Service: Received tableId:', tableId);
    console.log('Service: Type of tableId:', typeof tableId);
    
    if (!tableId) {
      throw new Error('Table ID is required');
    }
    
    const url = `${API_BASE_URL}/api/price-items/table/${tableId}`;
    console.log('Service: Fetching price items from URL:', url);
    
    const response = await this.fetchWithErrorHandling<PriceItemResponse>(url, {
      method: 'GET',
    });

    console.log('Service: Price items API response:', response);
    return response;
  }

  // Step 3: Create new price table
  static async createPriceTable(priceData: PriceTablePayload): Promise<PricingData> {
    const url = `${API_BASE_URL}/api/price-tables`;
    console.log('Creating price table with data:', priceData);
    
    const response = await this.fetchWithErrorHandling<PricingData>(url, {
      method: 'POST',
      body: JSON.stringify(priceData),
    });

    console.log('Create price table API response:', response);
    return response;
  }

  // Step 4: Update existing price table
  static async updatePriceTable(id: string, priceData: Partial<PriceTablePayload>): Promise<PricingData> {
    const url = `${API_BASE_URL}/api/price-tables/${id}`;
    console.log('Updating price table:', id, 'with data:', priceData);
    
    const response = await this.fetchWithErrorHandling<PricingData>(url, {
      method: 'PUT',
      body: JSON.stringify(priceData),
    });

    console.log('Update price table API response:', response);
    return response;
  }

  // Step 5: Delete price table
  static async deletePriceTable(id: string): Promise<void> {
    const url = `${API_BASE_URL}/api/price-tables/${id}`;
    console.log('Deleting price table:', id);
    
    await this.fetchWithErrorHandling<void>(url, {
      method: 'DELETE',
    });

    console.log('Price table deleted successfully');
  }
}
