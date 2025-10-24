import { Edit, Trash2, Users, DollarSign, DoorOpen, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useCurrencyFormatter } from '@/hooks/dashboard';

interface RoomCardProps {
  room: {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    capacity: number;
    totalUnits: number;
    availableUnits: number;
    status?: string;
    images: any[];
  };
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function RoomCard({ room, onEdit, onDelete }: RoomCardProps) {
  const { formatCurrency } = useCurrencyFormatter();

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors border-b last:border-b-0">
      <div className="flex items-start gap-4">
        {/* Room Image Placeholder */}
        <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
          {room.images.length > 0 ? (
            <img 
              src={room.images[0]} 
              alt={room.name} 
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <ImageIcon className="w-12 h-12 text-gray-400" />
          )}
        </div>

        {/* Room Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {room.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {room.description}
              </p>
            </div>

            {/* Status Badge */}
            {room.status && (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                room.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {room.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            )}
          </div>

          {/* Room Stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Base Price</p>
                <p className="font-semibold text-gray-900">
                  {formatCurrency(room.basePrice)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Capacity</p>
                <p className="font-semibold text-gray-900">
                  {room.capacity} Orang
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <DoorOpen className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Units</p>
                <p className="font-semibold text-gray-900">
                  {room.totalUnits} Unit
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Available</p>
                <p className="font-semibold text-green-600">
                  {room.availableUnits} Unit
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
                onClick={() => onEdit(room.id)}
              >
                <Edit className="w-4 h-4" />
                Edit Room
              </button>
            )}
            {onDelete && (
              <button
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                onClick={() => {
                  if (confirm('Apakah Anda yakin ingin menghapus room ini?')) {
                    onDelete(room.id);
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
                Hapus
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

