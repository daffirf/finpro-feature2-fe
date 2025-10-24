/**
 * Custom Hook for Tenant Room Management
 * Handles CRUD operations for tenant rooms
 */

import { useState, useEffect } from 'react';
import { 
  getMyRooms,
  getRoomsByProperty,
  createRoom, 
  updateRoom, 
  deleteRoom,
  CreateRoomPayload,
  UpdateRoomPayload,
  RoomResponse
} from '@/lib/api/tenant.api';

export const useTenantRooms = (propertyId?: number) => {
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch rooms (all or by property)
  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      let response;
      if (propertyId) {
        response = await getRoomsByProperty(propertyId);
      } else {
        response = await getMyRooms();
      }
      
      setRooms(response.data || response.rooms || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal memuat rooms');
      console.error('Error fetching rooms:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Create new room
  const addRoom = async (data: CreateRoomPayload) => {
    try {
      setError(null);
      const response = await createRoom(data);
      await fetchRooms(); // Refresh list
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal menambahkan room';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Update existing room
  const editRoom = async (roomId: number, data: UpdateRoomPayload) => {
    try {
      setError(null);
      const response = await updateRoom(roomId, data);
      await fetchRooms(); // Refresh list
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal mengupdate room';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Delete room
  const removeRoom = async (roomId: number) => {
    try {
      setError(null);
      await deleteRoom(roomId);
      await fetchRooms(); // Refresh list
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal menghapus room';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Load rooms on mount or when propertyId changes
  useEffect(() => {
    fetchRooms();
  }, [propertyId]);

  return {
    rooms,
    isLoading,
    error,
    fetchRooms,
    addRoom,
    editRoom,
    removeRoom
  };
};

