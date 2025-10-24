/**
 * Room Management Page - Tenant Only
 * Halaman untuk tenant mengelola room dari property mereka
 */

'use client';

import { TenantRoute } from '@/components/auth';
import { DashboardSidebar, StatCard, EmptyState, RoomCard } from '@/components/dashboard';
import { DoorOpen, Plus, DollarSign, CheckCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useCurrencyFormatter } from '@/hooks/dashboard';

function RoomsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  const { formatCurrency } = useCurrencyFormatter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const handleEditRoom = (id: number) => {
    alert('Fitur edit room akan segera tersedia');
  };

  const handleDeleteRoom = (id: number) => {
    alert('Fitur hapus room akan segera tersedia');
  };

  // TODO: Fetch real room data dari API berdasarkan propertyId
  const rooms = [
    {
      id: 1,
      name: 'Deluxe Room',
      description: 'Kamar luas dengan pemandangan laut',
      basePrice: 500000,
      capacity: 2,
      totalUnits: 10,
      availableUnits: 8,
      status: 'active',
      images: []
    },
    {
      id: 2,
      name: 'Suite Room',
      description: 'Kamar mewah dengan fasilitas lengkap',
      basePrice: 1000000,
      capacity: 4,
      totalUnits: 5,
      availableUnits: 3,
      status: 'active',
      images: []
    }
  ];

  return (
    <TenantRoute>
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar onLogout={handleLogout} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => router.back()}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                      <DoorOpen className="w-8 h-8 text-teal-600" />
                      Room Management
                    </h1>
                  </div>
                  <p className="text-gray-600 ml-12">
                    Kelola kamar untuk property Anda
                  </p>
                </div>
                
                <button
                  className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all"
                  onClick={() => alert('Fitur tambah room akan segera tersedia')}
                >
                  <Plus className="w-5 h-5" />
                  Tambah Room
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                value={rooms.reduce((sum, r) => sum + r.totalUnits, 0)}
                icon={DoorOpen}
                borderColor="border-l-purple-500"
                iconBgColor="bg-purple-100"
                iconColor="text-purple-600"
              />
              <StatCard
                title="Available"
                value={rooms.reduce((sum, r) => sum + r.availableUnits, 0)}
                icon={CheckCircle}
                borderColor="border-l-green-500"
                iconBgColor="bg-green-100"
                iconColor="text-green-600"
              />
              <StatCard
                title="Avg. Price"
                value={formatCurrency(
                  rooms.length > 0 
                    ? rooms.reduce((sum, r) => sum + r.basePrice, 0) / rooms.length 
                    : 0
                )}
                icon={DollarSign}
                borderColor="border-l-yellow-500"
                iconBgColor="bg-yellow-100"
                iconColor="text-yellow-600"
              />
            </div>

            {/* Rooms List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Daftar Room</h2>
              </div>

              {rooms.length === 0 ? (
                <EmptyState
                  icon={DoorOpen}
                  title="Belum Ada Room"
                  description="Mulai dengan menambahkan room untuk property ini"
                  actionLabel="Tambah Room Sekarang"
                  actionHref="#"
                />
              ) : (
                <div>
                  {rooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      onEdit={handleEditRoom}
                      onDelete={handleDeleteRoom}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </TenantRoute>
  );
}

export default function RoomsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    }>
      <RoomsPageContent />
    </Suspense>
  );
}

