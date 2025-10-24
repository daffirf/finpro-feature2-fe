/**
 * Peak Season Management Page - Tenant Only
 * Halaman untuk tenant mengatur harga berdasarkan tanggal tertentu
 */

'use client';

import { useState } from 'react';
import { TenantRoute } from '@/components/auth';
import { 
  DashboardPageLayout,
  PageHeader,
  StatsGrid,
  StatCard,
  ContentCard,
  PeakSeasonFormModal 
} from '@/components/dashboard';
import { TrendingUp, Plus, Edit, Trash2, Calendar, DollarSign, Percent } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCurrencyFormatter, usePeakSeasons } from '@/hooks/dashboard';

export default function PeakSeasonPage() {
  const router = useRouter();
  const { formatCurrency } = useCurrencyFormatter();
  const [showModal, setShowModal] = useState(false);
  const [editingSeason, setEditingSeason] = useState<any>(null);

  // Use custom hook to fetch peak seasons from backend
  const { 
    peakSeasons, 
    isLoading, 
    error, 
    addPeakSeason, 
    editPeakSeason, 
    removePeakSeason 
  } = usePeakSeasons();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const handleAddPeakSeason = () => {
    setEditingSeason(null);
    setShowModal(true);
  };

  const handleEditPeakSeason = (id: number) => {
    const season = peakSeasons.find(s => s.id === id);
    setEditingSeason(season);
    setShowModal(true);
  };

  const handleDeletePeakSeason = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus peak season ini?')) {
      return;
    }

    try {
      await removePeakSeason(id);
      alert('Peak season berhasil dihapus');
    } catch (error: any) {
      alert(error.message || 'Gagal menghapus peak season');
    }
  };

  const handleSubmitPeakSeason = async (data: any) => {
    try {
      if (editingSeason) {
        await editPeakSeason(editingSeason.id, data);
        alert('Peak season berhasil diupdate!');
      } else {
        await addPeakSeason(data);
        alert('Peak season berhasil ditambahkan!');
      }
      setShowModal(false);
      setEditingSeason(null);
    } catch (error: any) {
      alert(error.message || 'Gagal menyimpan peak season');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const getMultiplierColor = (multiplier: number) => {
    if (multiplier >= 2.0) return 'text-red-600';
    if (multiplier >= 1.5) return 'text-orange-600';
    return 'text-yellow-600';
  };

  // Show loading state
  if (isLoading) {
    return (
      <TenantRoute>
        <DashboardPageLayout>
          <div className="p-8 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat peak seasons...</p>
            </div>
          </div>
        </DashboardPageLayout>
      </TenantRoute>
    );
  }

  // Show error state
  if (error) {
    return (
      <TenantRoute>
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
      </TenantRoute>
    );
  }

  return (
    <TenantRoute>
      <DashboardPageLayout>
        <div className="p-8">
          <PageHeader
            icon={TrendingUp}
            title="Peak Season Rate Management"
            description="Atur harga khusus untuk tanggal-tanggal tertentu (musim ramai, hari libur, dll)"
            action={
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-teal-600 hover:to-teal-700 transition-all"
                onClick={handleAddPeakSeason}
              >
                <Plus className="w-5 h-5" />
                Tambah Peak Season
              </button>
            }
          />

          <StatsGrid columns={3}>
            <StatCard
              title="Total Peak Seasons"
              value={peakSeasons.length}
              icon={Calendar}
              borderColor="border-l-teal-500"
              iconBgColor="bg-teal-100"
              iconColor="text-teal-600"
            />
            <StatCard
              title="Active Periods"
              value={peakSeasons.filter(p => p.status === 'active').length}
              icon={TrendingUp}
              borderColor="border-l-green-500"
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
            />
            <StatCard
              title="Avg. Price Increase"
              value={`${Math.round((peakSeasons.reduce((sum, p) => sum + p.priceMultiplier, 0) / peakSeasons.length - 1) * 100)}%`}
              icon={Percent}
              borderColor="border-l-purple-500"
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
          </StatsGrid>

          {/* Peak Seasons List */}
          <ContentCard title="Daftar Peak Season Rates" noPadding>

          {peakSeasons.length === 0 ? (
            <div className="p-6">
              <div className="text-center py-8">
                <TrendingUp className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Belum Ada Peak Season
                </h3>
                <p className="text-gray-600 mb-4">
                  Mulai dengan menambahkan periode peak season pertama Anda
                </p>
                <button
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                  onClick={handleAddPeakSeason}
                >
                  Tambah Peak Season
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {peakSeasons.map((season) => (
                <div
                  key={season.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    {/* Season Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {season.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          season.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {season.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-6 mb-3">
                        {/* Date Range */}
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <Calendar className="w-4 h-4" />
                            Periode
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(season.startDate)}
                          </p>
                          <p className="text-sm text-gray-600">
                            sampai {formatDate(season.endDate)}
                          </p>
                          <p className="text-xs text-teal-600 font-medium mt-1">
                            {calculateDays(season.startDate, season.endDate)} hari
                          </p>
                        </div>

                        {/* Price Multiplier */}
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <DollarSign className="w-4 h-4" />
                            Kenaikan Harga
                          </div>
                          <p className={`text-2xl font-bold ${getMultiplierColor(season.priceMultiplier)}`}>
                            {season.priceMultiplier}x
                          </p>
                          <p className="text-xs text-gray-600">
                            +{Math.round((season.priceMultiplier - 1) * 100)}% dari harga normal
                          </p>
                        </div>

                        {/* Property */}
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Berlaku Untuk
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            {season.propertyName || 'All Properties'}
                          </p>
                        </div>
                      </div>

                      {/* Example Calculation */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs">
                        <p className="text-gray-700">
                          <span className="font-semibold">Contoh:</span> Jika harga normal Rp 500.000/malam, 
                          maka di periode ini menjadi{' '}
                          <span className="font-bold text-orange-600">
                            {formatCurrency(500000 * season.priceMultiplier)}/malam
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                        onClick={() => handleEditPeakSeason(season.id)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                        onClick={() => {
                          if (confirm('Apakah Anda yakin ingin menghapus peak season ini?')) {
                            handleDeletePeakSeason(season.id);
                          }
                        }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          </ContentCard>
        </div>
      </DashboardPageLayout>

      {/* Peak Season Form Modal */}
      <PeakSeasonFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitPeakSeason}
        initialData={editingSeason}
        properties={[
          { id: 1, name: 'Villa Sunset Bali' },
          { id: 2, name: 'Hotel Grand Jakarta' }
        ]}
      />
    </TenantRoute>
  );
}

