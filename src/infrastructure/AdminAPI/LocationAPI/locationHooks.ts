// src/infrastructure/AdminAPI/LocationAPI/locationHooks.ts

import { useState, useEffect } from 'react';
import { LocationService, LocationData, LocationResponse } from './locationService';

export const useLocations = () => {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: LocationResponse = await LocationService.getAllLocations();
      setLocations(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch locations');
      console.error('Error fetching locations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const createLocation = async (locationData: Omit<LocationData, 'id' | 'isDeleted' | 'longitude' | 'latitude'>) => {
    try {
      setLoading(true);
      setError(null);
      const newLocation = await LocationService.createLocation(locationData);
      
      // Ensure we have a valid location object
      if (newLocation && newLocation.id) {
        setLocations(prev => {
          // Check if location already exists to avoid duplicates
          const exists = prev.some(loc => loc.id === newLocation.id);
          if (exists) {
            return prev;
          }
          return [...prev, newLocation];
        });
        console.log('Location created successfully:', newLocation);
      } else {
        console.error('Invalid location response:', newLocation);
        // Fallback: refetch all locations
        await fetchLocations();
      }
      
      return newLocation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create location';
      setError(errorMessage);
      console.error('Error creating location:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateLocation = async (id: string, locationData: Partial<Omit<LocationData, 'id' | 'isDeleted' | 'longitude' | 'latitude'>>) => {
    try {
      setLoading(true);
      const updatedLocation = await LocationService.updateLocation(id, locationData);
      setLocations(prev => 
        prev.map(location => 
          location.id === id ? updatedLocation : location
        )
      );
      return updatedLocation;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update location');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteLocation = async (id: string) => {
    try {
      setLoading(true);
      await LocationService.deleteLocation(id);
      setLocations(prev => prev.filter(location => location.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete location');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    locations,
    loading,
    error,
    fetchLocations,
    createLocation,
    updateLocation,
    deleteLocation,
  };
};
