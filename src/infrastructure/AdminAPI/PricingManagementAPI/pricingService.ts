import { httpClient } from '@/infrastructure/api/httpClient';

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
  studioTypeId: string;
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

  // Step 1: Fetch all price tables from API
  static async getAllPriceTables(): Promise<PricingResponse> {
    console.log('Fetching price tables from API');
    
    try {
      const response = await httpClient.get<PricingData[]>('/api/price-tables');
      console.log('Price tables response:', response);
      
      // Transform response to match expected format
      return {
        code: 200,
        message: 'Success',
        data: response.data || []
      };
    } catch (error) {
      console.error('Error fetching price tables:', error);
      throw error;
    }
  }

  // Step 2: Get price items by table ID
  static async getPriceItemsByTableId(tableId: string): Promise<PriceItemResponse> {
    console.log('Service: Received tableId:', tableId);
    console.log('Service: Type of tableId:', typeof tableId);
    
    if (!tableId) {
      throw new Error('Table ID is required');
    }
    
    try {
      const response = await httpClient.get<PriceItem[]>(`/api/price-items/table/${tableId}`);
      console.log('Service: Price items API response:', response);
      
      // Transform response to match expected format
      return {
        code: 200,
        message: 'Success',
        data: response.data || []
      };
    } catch (error) {
      console.error('Error fetching price items:', error);
      throw error;
    }
  }

  // Step 3: Create new price table
  static async createPriceTable(priceData: PriceTablePayload): Promise<PricingData> {
    console.log('Creating price table with data:', priceData);
    
    try {
      const response = await httpClient.post<PricingData>('/api/price-tables', priceData);
      console.log('Create price table API response:', response);
      return response.data;
    } catch (error) {
      console.error('Error creating price table:', error);
      throw error;
    }
  }

  // Step 4: Update existing price table
  static async updatePriceTable(id: string, priceData: Partial<PriceTablePayload>): Promise<PricingData> {
    console.log('Updating price table:', id, 'with data:', priceData);
    
    try {
      const response = await httpClient.put<PricingData>(`/api/price-tables/${id}`, priceData);
      console.log('Update price table API response:', response);
      return response.data;
    } catch (error) {
      console.error('Error updating price table:', error);
      throw error;
    }
  }

  // Step 8: Get price rules by item ID
  static async getPriceRulesByItemId(itemId: string): Promise<PriceRule[]> {
    console.log('Service: Fetching price rules for itemId:', itemId);
    
    if (!itemId || itemId === 'null' || itemId === 'undefined') {
      throw new Error('Item ID is required and cannot be null');
    }
    
    try {
      const response = await httpClient.get<PriceRuleAPIResponse[]>(`/api/price-rules/item/${itemId}`);
      console.log('Service: Price rules by item ID API response:', response);
      
      // Transform API response to frontend format
      const transformedRules = response.data.map(transformPriceRule);
      console.log('Service: Transformed price rules:', transformedRules);
      
      return transformedRules;
    } catch (error) {
      console.error('Error fetching price rules:', error);
      throw error;
    }
  }

  // Step 9: Delete price table
  static async deletePriceTable(id: string): Promise<void> {
    console.log('Deleting price table:', id);
    
    try {
      await httpClient.delete<void>(`/api/price-tables/${id}`);
      console.log('Price table deleted successfully');
    } catch (error) {
      console.error('Error deleting price table:', error);
      throw error;
    }
  }

  // Step 10: Create new price item
  static async createPriceItem(priceItemData: PriceItemPayload): Promise<PriceItem> {
    console.log('Creating price item with data:', priceItemData);
    
    // Validate required fields
    if (!priceItemData.priceTableId) {
      throw new Error('Price Table ID is required');
    }
    if (!priceItemData.studioTypeId || priceItemData.studioTypeId.trim() === '') {
      throw new Error('Studio Type ID is required');
    }
    if (priceItemData.defaultPrice === undefined || priceItemData.defaultPrice === null) {
      throw new Error('Default Price is required');
    }
    if (priceItemData.defaultPrice < 0) {
      throw new Error('Default Price must be a positive number');
    }
    
    try {
      // Transform data to match backend expectations
      const requestPayload = {
        priceTableId: priceItemData.priceTableId,
        studioTypeId: priceItemData.studioTypeId,
        defaultPrice: priceItemData.defaultPrice
      };
      
      console.log('Sending payload to backend:', JSON.stringify(requestPayload, null, 2));
      
      const response = await httpClient.post<PriceItem>('/api/price-items', requestPayload);
      console.log('Create price item API response:', response);
      return response.data;
    } catch (error) {
      console.error('Error creating price item:', error);
      console.error('Request data that failed:', JSON.stringify(priceItemData, null, 2));
      
      // Enhanced error handling
      if (error instanceof Error) {
        if (error.message.includes('400')) {
          throw new Error(`Validation Error: ${error.message}. Please check that all required fields are filled correctly.`);
        } else if (error.message.includes('403')) {
          throw new Error('Access Denied: You do not have permission to create price items.');
        } else if (error.message.includes('500')) {
          throw new Error('Server Error: Please try again later.');
        }
      }
      
      throw error;
    }
  }

  // Step 11: Update existing price item
  static async updatePriceItem(id: string, priceItemData: Partial<PriceItemPayload>): Promise<PriceItem> {
    console.log('Updating price item:', id, 'with data:', priceItemData);
    
    try {
      const response = await httpClient.put<PriceItem>(`/api/price-items/${id}`, priceItemData);
      console.log('Update price item API response:', response);
      return response.data;
    } catch (error) {
      console.error('Error updating price item:', error);
      throw error;
    }
  }

  // Step 12: Delete price item
  static async deletePriceItem(id: string): Promise<void> {
    console.log('Deleting price item:', id);
    
    try {
      await httpClient.delete<void>(`/api/price-items/${id}`);
      console.log('Price item deleted successfully');
    } catch (error) {
      console.error('Error deleting price item:', error);
      throw error;
    }
  }

  // Step 13: Create new price rule
  static async createPriceRule(priceRuleData: PriceRulePayload): Promise<PriceRule> {
    console.log('Creating price rule with data:', priceRuleData);
    
    try {
      const response = await httpClient.post<PriceRuleAPIResponse>('/api/price-rules', priceRuleData);
      console.log('Create price rule API response:', response);
      
      // Transform API response to frontend format
      const transformedRule = transformPriceRule(response.data);
      console.log('Create price rule transformed response:', transformedRule);
      
      return transformedRule;
    } catch (error) {
      console.error('Error creating price rule:', error);
      throw error;
    }
  }

  // Step 14: Update existing price rule
  static async updatePriceRule(id: string, priceRuleData: Partial<PriceRulePayload>): Promise<PriceRule> {
    console.log('Updating price rule:', id, 'with data:', priceRuleData);
    
    try {
      const response = await httpClient.put<PriceRuleAPIResponse>(`/api/price-rules/${id}`, priceRuleData);
      console.log('Update price rule API response:', response);
      
      // Transform API response to frontend format
      const transformedRule = transformPriceRule(response.data);
      console.log('Update price rule transformed response:', transformedRule);
      
      return transformedRule;
    } catch (error) {
      console.error('Error updating price rule:', error);
      throw error;
    }
  }

  // Step 15: Delete price rule
  static async deletePriceRule(id: string): Promise<void> {
    console.log('Deleting price rule:', id);
    
    try {
      await httpClient.delete<void>(`/api/price-rules/${id}`);
      console.log('Price rule deleted successfully');
    } catch (error) {
      console.error('Error deleting price rule:', error);
      throw error;
    }
  }
}
