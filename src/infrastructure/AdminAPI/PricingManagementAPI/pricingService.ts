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

// Price Rule interfaces
// API Response interface (what we receive from backend)
export interface PriceRuleAPIResponse {
  id: string;
  priceTableItemId: string;
  dayFilter: string[]; // Backend returns dayFilter
  startTime: string;
  endTime: string;
  pricePerUnit: number;
  unit: string;
  date: string;
}

// Frontend interface (what we use in components)
export interface PriceRule {
  id: string;
  priceTableItemId: string;
  daysOfWeek: string[]; // Frontend uses daysOfWeek
  startTime: string;
  endTime: string;
  pricePerUnit: number;
  unit: string;
  date: string;
}

export interface PriceRuleResponse {
  code: number;
  message: string;
  data: PriceRuleAPIResponse[];
}

// Price Item interfaces
export interface PriceItem {
  id: string | null; // Allow null for price items
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

// Request body for creating/updating price items
export interface PriceItemPayload {
  priceTableId: string;
  studioTypeName: string;
  defaultPrice: number;
}

// Request body for creating/updating price rules
export interface PriceRulePayload {
  priceTableItemId: string;
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
  pricePerUnit: number;
  unit: string;
  date: string;
}

const API_BASE_URL = 'https://api.eccubestudio.click';

// Helper function to transform API response to frontend format
const transformPriceRule = (apiRule: PriceRuleAPIResponse): PriceRule => {
  return {
    id: apiRule.id,
    priceTableItemId: apiRule.priceTableItemId,
    daysOfWeek: apiRule.dayFilter, // Transform dayFilter to daysOfWeek
    startTime: apiRule.startTime,
    endTime: apiRule.endTime,
    pricePerUnit: apiRule.pricePerUnit,
    unit: apiRule.unit,
    date: apiRule.date
  };
};

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

  // Step 8: Get price rules by item ID
  static async getPriceRulesByItemId(itemId: string): Promise<PriceRule[]> {
    console.log('Service: Fetching price rules for itemId:', itemId);
    
    if (!itemId || itemId === 'null' || itemId === 'undefined') {
      throw new Error('Item ID is required and cannot be null');
    }
    
    const url = `${API_BASE_URL}/api/price-rules/item/${itemId}`;
    console.log('Service: Fetching price rules from URL:', url);
    
    const response = await this.fetchWithErrorHandling<PriceRuleResponse>(url, {
      method: 'GET',
    });

    console.log('Service: Price rules by item ID API response:', response);
    
    // Transform API response to frontend format
    const transformedRules = response.data.map(transformPriceRule);
    console.log('Service: Transformed price rules:', transformedRules);
    
    return transformedRules;
  }

  // Step 9: Delete price table
  static async deletePriceTable(id: string): Promise<void> {
    const url = `${API_BASE_URL}/api/price-tables/${id}`;
    console.log('Deleting price table:', id);
    
    await this.fetchWithErrorHandling<void>(url, {
      method: 'DELETE',
    });

    console.log('Price table deleted successfully');
  }

  // Step 10: Create new price item
  static async createPriceItem(priceItemData: PriceItemPayload): Promise<PriceItem> {
    const url = `${API_BASE_URL}/api/price-items`;
    console.log('Creating price item with data:', priceItemData);
    
    const response = await this.fetchWithErrorHandling<PriceItem>(url, {
      method: 'POST',
      body: JSON.stringify(priceItemData),
    });

    console.log('Create price item API response:', response);
    return response;
  }

  // Step 11: Update existing price item
  static async updatePriceItem(id: string, priceItemData: Partial<PriceItemPayload>): Promise<PriceItem> {
    const url = `${API_BASE_URL}/api/price-items/${id}`;
    console.log('Updating price item:', id, 'with data:', priceItemData);
    
    const response = await this.fetchWithErrorHandling<PriceItem>(url, {
      method: 'PUT',
      body: JSON.stringify(priceItemData),
    });

    console.log('Update price item API response:', response);
    return response;
  }

  // Step 12: Delete price item
  static async deletePriceItem(id: string): Promise<void> {
    const url = `${API_BASE_URL}/api/price-items/${id}`;
    console.log('Deleting price item:', id);
    
    await this.fetchWithErrorHandling<void>(url, {
      method: 'DELETE',
    });

    console.log('Price item deleted successfully');
  }

  // Step 13: Create new price rule
  static async createPriceRule(priceRuleData: PriceRulePayload): Promise<PriceRule> {
    const url = `${API_BASE_URL}/api/price-rules`;
    console.log('Creating price rule with data:', priceRuleData);
    
    const response = await this.fetchWithErrorHandling<PriceRuleAPIResponse>(url, {
      method: 'POST',
      body: JSON.stringify(priceRuleData),
    });

    console.log('Create price rule API response:', response);
    
    // Transform API response to frontend format
    const transformedRule = transformPriceRule(response);
    console.log('Create price rule transformed response:', transformedRule);
    
    return transformedRule;
  }

  // Step 14: Update existing price rule
  static async updatePriceRule(id: string, priceRuleData: Partial<PriceRulePayload>): Promise<PriceRule> {
    const url = `${API_BASE_URL}/api/price-rules/${id}`;
    console.log('Updating price rule:', id, 'with data:', priceRuleData);
    
    const response = await this.fetchWithErrorHandling<PriceRuleAPIResponse>(url, {
      method: 'PUT',
      body: JSON.stringify(priceRuleData),
    });

    console.log('Update price rule API response:', response);
    
    // Transform API response to frontend format
    const transformedRule = transformPriceRule(response);
    console.log('Update price rule transformed response:', transformedRule);
    
    return transformedRule;
  }

  // Step 15: Delete price rule
  static async deletePriceRule(id: string): Promise<void> {
    const url = `${API_BASE_URL}/api/price-rules/${id}`;
    console.log('Deleting price rule:', id);
    
    await this.fetchWithErrorHandling<void>(url, {
      method: 'DELETE',
    });

    console.log('Price rule deleted successfully');
  }
}
