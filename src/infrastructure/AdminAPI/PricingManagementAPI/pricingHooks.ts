import { useState, useEffect } from 'react';
import { PricingService, PricingData, PriceTablePayload, PriceItem } from './pricingService';

export const usePriceTables = () => {
  const [priceTables, setPriceTables] = useState<PricingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Fetch price tables from API
  const fetchPriceTables = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await PricingService.getAllPriceTables();
      
      if (response.code === 200 && response.data) {
        setPriceTables(response.data);
        console.log('Price tables fetched successfully:', response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch price tables');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch price tables';
      setError(errorMessage);
      console.error('Error fetching price tables:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceTables();
  }, []);

  // Step 2: Create new price table
  const createPriceTable = async (priceData: PriceTablePayload) => {
    try {
      setLoading(true);
      setError(null);
      const newPriceTable = await PricingService.createPriceTable(priceData);

      if (newPriceTable && newPriceTable.id) {
        setPriceTables(prev => {
          const exists = prev.some(priceTable => priceTable.id === newPriceTable.id);
          if (exists) {
            return prev;
          }
          return [...prev, newPriceTable];
        });
        console.log('Price table created successfully:', newPriceTable);
      } else {
        console.error('Invalid price table response:', newPriceTable);
        await fetchPriceTables(); // Fallback: refetch all price tables
      }

      return newPriceTable;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create price table';
      setError(errorMessage);
      console.error('Error creating price table:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Update existing price table
  const updatePriceTable = async (id: string, priceData: Partial<PriceTablePayload>) => {
    try {
      setLoading(true);
      const updatedPriceTable = await PricingService.updatePriceTable(id, priceData);
      
      // Ensure the updated data has all required fields
      const sanitizedData: PricingData = {
        id: updatedPriceTable.id || id,
        startDate: updatedPriceTable.startDate || priceData.startDate || '',
        endDate: updatedPriceTable.endDate || priceData.endDate || null,
        priority: updatedPriceTable.priority !== null ? updatedPriceTable.priority : (priceData.priority || 0),
        status: updatedPriceTable.status || priceData.status || 'COMING_SOON'
      };
      
      setPriceTables(prev => 
        prev.map(priceTable => 
          priceTable.id === id ? sanitizedData : priceTable
        )
      );
      console.log('Price table updated successfully:', sanitizedData);
      return sanitizedData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update price table';
      setError(errorMessage);
      console.error('Error updating price table:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Delete price table
  const deletePriceTable = async (id: string) => {
    try {
      setLoading(true);
      await PricingService.deletePriceTable(id);
      setPriceTables(prev => prev.filter(priceTable => priceTable.id !== id));
      console.log('Price table deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete price table';
      setError(errorMessage);
      console.error('Error deleting price table:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    priceTables,
    loading,
    error,
    fetchPriceTables,
    createPriceTable,
    updatePriceTable,
    deletePriceTable,
  };
};

// Step 2: Hook for managing price items
export const usePriceItems = () => {
  const [priceItems, setPriceItems] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Fetch price items by table ID
  const fetchPriceItemsByTableId = async (tableId: string) => {
    try {
      console.log('Hook: Fetching price items for tableId:', tableId);
      setLoading(true);
      setError(null);
      
      if (!tableId) {
        throw new Error('Table ID is required');
      }
      
      const response = await PricingService.getPriceItemsByTableId(tableId);
      console.log('Hook: API response received:', response);
      
      if (response.code === 200 && response.data) {
        setPriceItems(response.data);
        console.log('Hook: Price items set successfully:', response.data);
        return response.data;
      } else {
        console.error('Hook: API response error:', response);
        throw new Error(response.message || 'Failed to fetch price items');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch price items';
      setError(errorMessage);
      console.error('Hook: Error fetching price items:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };



  // Step 4: Fetch price rules by item ID
  const fetchPriceRulesByItemId = async (itemId: string) => {
    try {
      console.log('Hook: Fetching price rules for itemId:', itemId);
      setLoading(true);
      setError(null);
      
      if (!itemId || itemId === 'null' || itemId === 'undefined') {
        throw new Error('Item ID is required and cannot be null');
      }
      
      const response = await PricingService.getPriceRulesByItemId(itemId);
      console.log('Hook: Price rules by item ID fetched successfully:', response);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch price rules by item ID';
      setError(errorMessage);
      console.error('Hook: Error fetching price rules by item ID:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    priceItems,
    loading,
    error,
    fetchPriceItemsByTableId,
    fetchPriceRulesByItemId,
  };
};
