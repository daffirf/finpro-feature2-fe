/**
 * Room Management Page - Tenant Only
 * Halaman untuk tenant mengelola semua room dari semua property mereka
 */

'use client';

import { 
  DashboardPageLayout,
  PageHeader,
  StatsGrid,
  StatCard,
  ContentCard,
  ActionButton,
  EmptyState,
  RoomCard 
} from '@/components/dashboard';
import { DoorOpen, Plus, DollarSign, CheckCircle } from 'lucide-react';
import { useCurrencyFormatter, useTenantRooms } from '@/hooks/dashboard';

export default function RoomsPage() {
  const { formatCurrency } = useCurrencyFormatter();
  
  // Use custom hook to fetch rooms from backend
  const { 
    rooms, 
    isLoading, 
    error, 
    editRoom, 
    removeRoom 
  } = useTenantRooms();

  const handleEditRoom = async (id: number) => {
    // TODO: Implement edit room modal
    alert('Fitur edit room akan segera tersedia');
  };

  const handleDeleteRoom = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus room ini?')) {
      return;
    }

    try {
      await removeRoom(id);
      alert('Room berhasil dihapus');
    } catch (error: any) {
      alert(error.message || 'Gagal menghapus room');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <DashboardPageLayout>
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat rooms...</p>
          </div>
        </div>
      </DashboardPageLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <DashboardPageLayout>
        <div className="p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout>
      <div className="p-8">
        <PageHeader
          icon={DoorOpen}
          title="Room Management"
          description="Kelola semua room dari semua property Anda"
          action={
            <ActionButton
              icon={Plus}
              label="Tambah Room"
              onClick={() => alert('Fitur tambah room akan segera tersedia')}
            />
          }
        />

        <StatsGrid>
          <StatCard
            title="Total Rooms"
            value={rooms.length}
            icon={DoorOpen}
            borderColor="border-l-blue-500"
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Total Units"
            value={rooms.reduce((sum, r) => sum + (r.totalUnits || 0), 0)}
            icon={DoorOpen}
            borderColor="border-l-purple-500"
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Available"
            value={rooms.reduce((sum, r) => sum + (r.availableUnits || 0), 0)}
            icon={CheckCircle}
            borderColor="border-l-green-500"
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            title="Avg. Price"
            value={formatCurrency(
              rooms.length > 0 
                ? rooms.reduce((sum, r) => sum + (Number(r.basePrice) || 0), 0) / rooms.length 
                : 0
            )}
            icon={DollarSign}
            borderColor="border-l-yellow-500"
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
        </StatsGrid>

        <ContentCard 
          title="Semua Room" 
          headerAction={
            <div className="text-sm text-gray-600">
              {rooms.length} rooms dari {new Set(rooms.map(r => r.propertyName)).size} properties
            </div>
          }
          noPadding
        >
          {rooms.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={DoorOpen}
                title="Belum Ada Room"
                description="Mulai dengan menambahkan room untuk property Anda"
                actionLabel="Tambah Room Sekarang"
                actionHref="#"
              />
            </div>
          ) : (
            <div>
              {rooms.map((room) => (
                <div key={room.id} className="border-b last:border-b-0">
                  {(rooms.indexOf(room) === 0 || rooms[rooms.indexOf(room) - 1].propertyName !== room.propertyName) && (
                    <div className="bg-gray-50 px-6 py-3 border-b">
                      <p className="text-sm font-semibold text-gray-700">
                        📍 {room.propertyName}
                      </p>
                    </div>
                  )}
                  <RoomCard
                    room={{
                      ...room,
                      images: room.imageUrls || []
                    }}
                    onEdit={handleEditRoom}
                    onDelete={handleDeleteRoom}
                  />
                </div>
              ))}
            </div>
          )}
        </ContentCard>
      </div>
    </DashboardPageLayout>
  );
}

