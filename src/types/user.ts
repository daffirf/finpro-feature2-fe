export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string | null;
  role: 'user' | 'tenant' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface UserStats {
  totalBookings?: number;
  totalProperties?: number;
  memberSince?: string;
}

