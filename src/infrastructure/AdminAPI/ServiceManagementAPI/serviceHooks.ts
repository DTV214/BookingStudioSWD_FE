import { useState, useEffect } from 'react';
import { ServiceService, ServiceData, ServiceResponse } from './serviceService';

export const useServices = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ServiceService.getAllServices();
      
      if (response.code === 200 && response.data) {
        setServices(response.data);
        console.log('Services fetched successfully:', response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch services');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch services';
      setError(errorMessage);
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const createService = async (serviceData: Omit<ServiceData, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newService = await ServiceService.createService(serviceData);

      if (newService && newService.id) {
        setServices(prev => {
          const exists = prev.some(service => service.id === newService.id);
          if (exists) {
            return prev;
          }
          return [...prev, newService];
        });
        console.log('Service created successfully:', newService);
      } else {
        console.error('Invalid service response:', newService);
        await fetchServices(); // Fallback: refetch all services
      }

      return newService;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create service';
      setError(errorMessage);
      console.error('Error creating service:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (id: string, serviceData: Partial<Omit<ServiceData, 'id'>>) => {
    try {
      setLoading(true);
      const updatedService = await ServiceService.updateService(id, serviceData);
      setServices(prev => 
        prev.map(service => 
          service.id === id ? updatedService : service
        )
      );
      console.log('Service updated successfully:', updatedService);
      return updatedService;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update service';
      setError(errorMessage);
      console.error('Error updating service:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      setLoading(true);
      await ServiceService.deleteService(id);
      setServices(prev => prev.filter(service => service.id !== id));
      console.log('Service deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete service';
      setError(errorMessage);
      console.error('Error deleting service:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    services,
    loading,
    error,
    fetchServices,
    createService,
    updateService,
    deleteService,
  };
};
