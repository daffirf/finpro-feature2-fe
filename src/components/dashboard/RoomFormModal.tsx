'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Bed, Users, DollarSign, Building2, FileText, Image } from 'lucide-react';
import { useTenantProperties } from '@/hooks/dashboard';

interface RoomFormData {
  propertyId: number;
  name: string;
  description: string;
  basePrice: number;
  capacity: number;
  totalUnits: number;
  images: File[];
  facilities: string[]; // For UI only, not sent to backend
}

interface RoomFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RoomFormData) => void;
  initialData?: Partial<RoomFormData>;
  isLoading?: boolean;
}

const COMMON_FACILITIES = [
  'WiFi',
  'AC',
  'TV',
  'Kamar Mandi Dalam',
  'Air Panas',
  'Lemari',
  'Meja Kerja',
  'Kulkas Mini',
  'Balkon',
  'Pemanas',
];

export function RoomFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false
}: RoomFormModalProps) {
  const { properties, isLoading: loadingProperties } = useTenantProperties();

  const [formData, setFormData] = useState<RoomFormData>({
    propertyId: 0,
    name: '',
    description: '',
    basePrice: 0,
    capacity: 1,
    totalUnits: 1,
    images: [],
    facilities: []
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [customFacility, setCustomFacility] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        propertyId: initialData.propertyId || 0,
        name: initialData.name || '',
        description: initialData.description || '',
        basePrice: initialData.basePrice || 0,
        capacity: initialData.capacity || 1,
        totalUnits: initialData.totalUnits || 1,
        images: [],
        facilities: initialData.facilities || []
      });
    }
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: files }));

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleFacilityToggle = (facility: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const handleAddCustomFacility = () => {
    if (customFacility.trim() && !formData.facilities.includes(customFacility.trim())) {
      setFormData(prev => ({
        ...prev,
        facilities: [...prev.facilities, customFacility.trim()]
      }));
      setCustomFacility('');
    }
  };

  const handleRemoveFacility = (facility: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.filter(f => f !== facility)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.propertyId === 0) {
      alert('Silakan pilih property terlebih dahulu');
      return;
    }
    
    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({
      propertyId: 0,
      name: '',
      description: '',
      basePrice: 0,
      capacity: 1,
      totalUnits: 1,
      images: [],
      facilities: []
    });
    setImagePreviews([]);
    setCustomFacility('');
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
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Bed className="w-6 h-6 text-teal-600" />
              {initialData ? 'Edit Room' : 'Tambah Room Baru'}
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
            {/* Property Selection */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Pilih Property <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.propertyId}
                onChange={(e) => setFormData({ ...formData, propertyId: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                required
                disabled={loadingProperties || !!initialData}
              >
                <option value={0}>
                  {loadingProperties ? 'Memuat properties...' : 'Pilih Property'}
                </option>
                {properties.map(property => (
                  <option key={property.id} value={property.id}>
                    {property.name} - {property.city}
                  </option>
                ))}
              </select>
              {properties.length === 0 && !loadingProperties && (
                <p className="text-xs text-red-600 mt-2">
                  Belum ada property. Silakan buat property terlebih dahulu.
                </p>
              )}
            </div>

            {/* Room Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Room <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Contoh: Deluxe Room"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                rows={4}
                placeholder="Deskripsikan room ini..."
                required
              />
            </div>

            {/* Capacity, Price, and Units */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Kapasitas <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Jumlah tamu"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Orang per room</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Harga (per malam) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Harga room"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Rupiah (IDR)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  Total Unit <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.totalUnits}
                  onChange={(e) => setFormData({ ...formData, totalUnits: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Jumlah unit"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Jumlah room tersedia</p>
              </div>
            </div>

            {/* Facilities - For UI only, not sent to backend */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Fasilitas Room <span className="text-xs text-gray-500">(Opsional)</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">
                * Fasilitas ini hanya untuk catatan Anda, tidak disimpan ke sistem
              </p>
              
              {/* Common Facilities Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {COMMON_FACILITIES.map((facility) => (
                  <label
                    key={facility}
                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.facilities.includes(facility)
                        ? 'bg-teal-50 border-teal-500 text-teal-700'
                        : 'bg-white border-gray-300 hover:border-teal-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.facilities.includes(facility)}
                      onChange={() => handleFacilityToggle(facility)}
                      className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <span className="text-sm">{facility}</span>
                  </label>
                ))}
              </div>

              {/* Custom Facility Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customFacility}
                  onChange={(e) => setCustomFacility(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomFacility())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Tambah fasilitas lain..."
                />
                <button
                  type="button"
                  onClick={handleAddCustomFacility}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                >
                  Tambah
                </button>
              </div>

              {/* Selected Custom Facilities */}
              {formData.facilities.filter(f => !COMMON_FACILITIES.includes(f)).length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.facilities
                    .filter(f => !COMMON_FACILITIES.includes(f))
                    .map((facility) => (
                      <span
                        key={facility}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {facility}
                        <button
                          type="button"
                          onClick={() => handleRemoveFacility(facility)}
                          className="hover:text-purple-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Images Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <Image className="w-4 h-4" />
                Upload Gambar Room
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload foto room untuk menarik tamu
              </p>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative h-24 rounded-lg overflow-hidden border">
                      <img 
                        src={preview} 
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
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
                disabled={isLoading || properties.length === 0}
              >
                {isLoading ? 'Menyimpan...' : initialData ? 'Update Room' : 'Tambah Room'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

