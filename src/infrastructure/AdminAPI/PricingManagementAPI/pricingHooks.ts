import { useState, useEffect } from 'react';
import { PricingService, PricingData, PricingResponse } from './pricingService';

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
  const createPriceTable = async (priceData: Omit<PricingData, 'id'>) => {
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
  const updatePriceTable = async (id: string, priceData: Partial<Omit<PricingData, 'id'>>) => {
    try {
      setLoading(true);
      const updatedPriceTable = await PricingService.updatePriceTable(id, priceData);
      setPriceTables(prev => 
        prev.map(priceTable => 
          priceTable.id === id ? updatedPriceTable : priceTable
        )
      );
      console.log('Price table updated successfully:', updatedPriceTable);
      return updatedPriceTable;
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
