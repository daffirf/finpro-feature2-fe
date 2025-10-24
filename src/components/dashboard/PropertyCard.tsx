import { Building2, Eye, Edit, Trash2, DoorOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PropertyCardProps {
  property: {
    id: number;
    name: string;
    city: string;
    category: string;
    totalRooms: number;
    activeRooms: number;
    status: string;
    image?: string;
  };
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function PropertyCard({ property, onEdit, onDelete }: PropertyCardProps) {
  const router = useRouter();

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors border-b last:border-b-0">
      <div className="flex items-center gap-4">
        {/* Property Image */}
        <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
          {property.image ? (
            <img 
              src={property.image} 
              alt={property.name} 
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <Building2 className="w-8 h-8 text-gray-400" />
          )}
        </div>

        {/* Property Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {property.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {property.city}
                </span>
                <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs font-medium">
                  {property.category}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="text-gray-600">
                  {property.totalRooms} Rooms
                </span>
                <span className="text-green-600 font-medium">
                  {property.activeRooms} Active
                </span>
              </div>
            </div>

            {/* Status Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              property.status === 'active' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              {property.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Lihat Detail"
            onClick={() => router.push(`/property/${property.id}`)}
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Kelola Rooms"
            onClick={() => router.push(`/dashboard/properties/rooms?propertyId=${property.id}`)}
          >
            <DoorOpen className="w-5 h-5" />
          </button>
          {onEdit && (
            <button
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit Property"
              onClick={() => onEdit(property.id)}
            >
              <Edit className="w-5 h-5" />
            </button>
          )}
          {onDelete && (
            <button
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Hapus Property"
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin menghapus property ini?')) {
                  onDelete(property.id);
                }
              }}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

