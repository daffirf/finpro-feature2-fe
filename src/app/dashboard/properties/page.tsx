/**
 * Property Management Page - Tenant Only
 * Halaman untuk tenant mengelola property mereka
 */

'use client';

import { useState } from 'react';
import { 
  DashboardPageLayout,
  PageHeader,
  StatsGrid,
  StatCard,
  ContentCard,
  ActionButton,
  EmptyState,
  PropertyCard, 
  PropertyFormModal 
} from '@/components/dashboard';
import { Building2, Plus, DoorOpen, CheckCircle } from 'lucide-react';
import { useTenantProperties } from '@/hooks/dashboard';

export default function PropertiesPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);

  // Use custom hook to fetch properties from backend
  const { 
    properties, 
    isLoading, 
    error, 
    addProperty, 
    editProperty, 
    removeProperty 
  } = useTenantProperties();

  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowModal(true);
  };

  const handleEditProperty = (id: number) => {
    const property = properties.find(p => p.id === id);
    setEditingProperty(property);
    setShowModal(true);
  };

  const handleDeleteProperty = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus property ini?')) {
      return;
    }

    try {
      await removeProperty(id);
      alert('Property berhasil dihapus');
    } catch (error: any) {
      alert(error.message || 'Gagal menghapus property');
    }
  };

  const handleSubmitProperty = async (data: any) => {
    try {
      const apiData = {
        name: data.name,
        description: data.description,
        address: data.address,
        city: data.city,
        province: data.province,
        category: data.category,
        imageUrls: data.images?.length > 0 
          ? data.images.map((_: File, index: number) => 
              `https://placehold.co/800x600/teal/white?text=Property+Image+${index + 1}`
            )
          : []
      };

      if (editingProperty) {
        await editProperty(editingProperty.id, apiData);
        alert('Property berhasil diupdate!');
      } else {
        await addProperty(apiData);
        alert('Property berhasil ditambahkan!');
      }
      setShowModal(false);
      setEditingProperty(null);
    } catch (error: any) {
      alert(error.message || 'Gagal menyimpan property');
    }
  };

  if (isLoading) {
    return (
      <DashboardPageLayout>
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat properties...</p>
          </div>
        </div>
      </DashboardPageLayout>
    );
  }

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
    <>
      <DashboardPageLayout>
        <div className="p-8">
          <PageHeader
            icon={Building2}
            title="Property Management"
            description="Kelola semua properti Anda di satu tempat"
            action={
              <ActionButton
                icon={Plus}
                label="Tambah Property"
                onClick={handleAddProperty}
              />
            }
          />

          <StatsGrid columns={3}>
            <StatCard
              title="Total Property"
              value={properties.length}
              icon={Building2}
              borderColor="border-l-teal-500"
              iconBgColor="bg-teal-100"
              iconColor="text-teal-600"
            />
            <StatCard
              title="Total Rooms"
              value={properties.reduce((sum, p) => sum + (p.totalRooms || 0), 0)}
              icon={DoorOpen}
              borderColor="border-l-blue-500"
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <StatCard
              title="Active Rooms"
              value={properties.reduce((sum, p) => sum + (p.activeRooms || 0), 0)}
              icon={CheckCircle}
              borderColor="border-l-green-500"
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
            />
          </StatsGrid>

          <ContentCard title="Daftar Property" noPadding>
            {properties.length === 0 ? (
              <div className="p-6">
                <EmptyState
                  icon={Building2}
                  title="Belum Ada Property"
                  description="Mulai dengan menambahkan property pertama Anda"
                  actionLabel="Tambah Property Sekarang"
                  actionHref="#"
                />
              </div>
            ) : (
              <div>
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={{
                      ...property,
                      status: property.published ? 'active' : 'inactive',
                      image: property.imageUrls?.[0] || '/placeholder-property.jpg'
                    }}
                    onEdit={handleEditProperty}
                    onDelete={handleDeleteProperty}
                  />
                ))}
              </div>
            )}
          </ContentCard>
        </div>
      </DashboardPageLayout>

      <PropertyFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitProperty}
        initialData={editingProperty}
      />
    </>
  );
}

