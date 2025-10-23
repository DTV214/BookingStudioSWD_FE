// Pricing API Response Types
export interface PricingResponse {
  code: number;
  message: string;
  data: PricingData[];
}

export interface PricingData {
  id: string;
  startDate: string; // ISO date string, e.g., "2025-04-30"
  endDate: string; // ISO date string, e.g., "2027-04-30"
  priority: number; // 0, 1, 2, etc.
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
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

  // Step 2: Get price table by ID
  static async getPriceTableById(id: string): Promise<PricingData> {
    const url = `${API_BASE_URL}/api/price-tables/${id}`;
    const response = await this.fetchWithErrorHandling<{ data: PricingData }>(url, {
      method: 'GET',
    });
    return response.data;
  }

  // Step 3: Create new price table
  static async createPriceTable(priceData: Omit<PricingData, 'id'>): Promise<PricingData> {
    const url = `${API_BASE_URL}/api/price-tables`;
    console.log('Creating price table with data:', priceData);
    
    const response = await this.fetchWithErrorHandling<{ data: PricingData }>(url, {
      method: 'POST',
      body: JSON.stringify(priceData),
    });

    console.log('Create price table API response:', response);
    return response.data;
  }

  // Step 4: Update existing price table
  static async updatePriceTable(id: string, priceData: Partial<Omit<PricingData, 'id'>>): Promise<PricingData> {
    const url = `${API_BASE_URL}/api/price-tables/${id}`;
    console.log('Updating price table:', id, 'with data:', priceData);
    
    const response = await this.fetchWithErrorHandling<{ data: PricingData }>(url, {
      method: 'PUT',
      body: JSON.stringify(priceData),
    });

    console.log('Update price table API response:', response);
    return response.data;
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
