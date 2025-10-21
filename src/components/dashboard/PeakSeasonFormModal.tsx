/**
 * Peak Season Form Modal - Create/Edit Peak Season Rate
 * Modal form untuk tenant mengatur harga di tanggal tertentu
 */

'use client';

import { useState, useEffect } from 'react';
import { X, TrendingUp, Calendar, DollarSign } from 'lucide-react';

interface PeakSeasonFormData {
  name: string;
  startDate: string;
  endDate: string;
  priceMultiplier: number;
  propertyId?: number;
  applyToAll: boolean;
}

interface PeakSeasonFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PeakSeasonFormData) => void;
  initialData?: Partial<PeakSeasonFormData>;
  isLoading?: boolean;
  properties?: Array<{ id: number; name: string }>;
}

export function PeakSeasonFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
  properties = []
}: PeakSeasonFormModalProps) {
  const [formData, setFormData] = useState<PeakSeasonFormData>({
    name: '',
    startDate: '',
    endDate: '',
    priceMultiplier: 1.5,
    applyToAll: true
  });

  const [priceIncrease, setPriceIncrease] = useState(50);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
        priceMultiplier: initialData.priceMultiplier || 1.5,
        propertyId: initialData.propertyId,
        applyToAll: initialData.applyToAll ?? true
      });
      setPriceIncrease(Math.round(((initialData.priceMultiplier || 1.5) - 1) * 100));
    }
  }, [initialData]);

  const handlePriceIncreaseChange = (value: number) => {
    setPriceIncrease(value);
    setFormData({ ...formData, priceMultiplier: 1 + (value / 100) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      priceMultiplier: 1.5,
      applyToAll: true
    });
    setPriceIncrease(50);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-teal-600" />
              {initialData ? 'Edit Peak Season' : 'Tambah Peak Season Baru'}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Season Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Peak Season <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Contoh: Tahun Baru 2025, Lebaran 2025"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Berikan nama yang mudah diingat untuk periode ini
              </p>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Tanggal Mulai <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tanggal Selesai <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  min={formData.startDate}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Price Multiplier */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                Kenaikan Harga <span className="text-red-500">*</span>
              </label>
              
              {/* Slider */}
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="5"
                  value={priceIncrease}
                  onChange={(e) => handlePriceIncreaseChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                
                {/* Display Value */}
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-3xl font-bold text-teal-600">
                      +{priceIncrease}%
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Harga naik menjadi {formData.priceMultiplier.toFixed(1)}x lipat
                    </p>
                  </div>
                </div>

                {/* Example Calculation */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Contoh Perhitungan:
                  </p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>Harga Normal: Rp 500.000/malam</p>
                    <p className="font-bold text-orange-600">
                      Harga Peak Season: Rp {(500000 * formData.priceMultiplier).toLocaleString('id-ID')}/malam
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply To */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Terapkan Ke:
              </label>
              
              <div className="space-y-3">
                {/* Apply to All */}
                <label className="flex items-start gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    checked={formData.applyToAll}
                    onChange={() => setFormData({ ...formData, applyToAll: true, propertyId: undefined })}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Semua Property</p>
                    <p className="text-xs text-gray-600">Peak season akan diterapkan ke semua property Anda</p>
                  </div>
                </label>

                {/* Apply to Specific */}
                <label className="flex items-start gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    checked={!formData.applyToAll}
                    onChange={() => setFormData({ ...formData, applyToAll: false })}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Property Tertentu</p>
                    <p className="text-xs text-gray-600 mb-2">Pilih property yang akan menggunakan peak season ini</p>
                    
                    {!formData.applyToAll && (
                      <select
                        value={formData.propertyId || ''}
                        onChange={(e) => setFormData({ ...formData, propertyId: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
                        required={!formData.applyToAll}
                      >
                        <option value="">Pilih Property</option>
                        {properties.map(prop => (
                          <option key={prop.id} value={prop.id}>
                            {prop.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Menyimpan...' : initialData ? 'Update Peak Season' : 'Tambah Peak Season'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

