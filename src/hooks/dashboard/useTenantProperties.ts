import { useState, useEffect } from 'react';
import { 
  getMyProperties, 
  createProperty, 
  updateProperty, 
  deleteProperty,
  CreatePropertyPayload,
  UpdatePropertyPayload,
  PropertyResponse
} from '@/lib/api/tenant.api';

export const useTenantProperties = () => {
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response: any = await getMyProperties();
      setProperties(response.data || response.properties || []);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat properties');
      console.error('Error fetching properties:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addProperty = async (data: CreatePropertyPayload) => {
    try {
      setError(null);
      const response = await createProperty(data);
      await fetchProperties();
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Gagal menambahkan property';
      setError(errorMessage);
      throw err;
    }
  };

  const editProperty = async (propertyId: number, data: UpdatePropertyPayload) => {
    try {
      setError(null);
      const response = await updateProperty(propertyId, data);
      await fetchProperties();
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Gagal mengupdate property';
      setError(errorMessage);
      throw err;
    }
  };

  const removeProperty = async (propertyId: number) => {
    try {
      setError(null);
      await deleteProperty(propertyId);
      await fetchProperties();
    } catch (err: any) {
      const errorMessage = err.message || 'Gagal menghapus property';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    isLoading,
    error,
    fetchProperties,
    addProperty,
    editProperty,
    removeProperty
  };
};

