// src/infrastructure/AdminAPI/Studio-TypesAPI/studioTypesHooks.ts

import { useEffect, useState } from 'react';
import { StudioType } from '@/domain/models/studio-type/studioType';
import { StudioTypesService } from './studioTypesService';

export const useStudioTypes = () => {
  const [studioTypes, setStudioTypes] = useState<StudioType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await StudioTypesService.getAll();
      setStudioTypes(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch studio types');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const createStudioType = async (payload: Omit<StudioType, 'id'>) => {
    const created = await StudioTypesService.create(payload);
    setStudioTypes(prev => [created, ...prev]);
    return created;
  };

  const updateStudioType = async (id: string, payload: Partial<StudioType>) => {
    const updated = await StudioTypesService.update(id, payload);
    setStudioTypes(prev => prev.map(x => x.id === id ? updated : x));
    return updated;
  };

  const deleteStudioType = async (id: string) => {
    await StudioTypesService.delete(id);
    setStudioTypes(prev => prev.filter(x => x.id !== id));
  };

  return {
    studioTypes,
    loading,
    error,
    fetchAll,
    createStudioType,
    updateStudioType,
    deleteStudioType,
  };
};


