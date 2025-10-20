'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserProfile } from '@/hooks/user';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AvatarUpload from '@/components/AvatarUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Edit2, 
  Save, 
  X, 
  Lock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, changePasswordSchema } from '@/lib/validation';

type ProfileFormData = {
  name: string;
  phone?: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function UserProfilePage() {
  const router = useRouter();
  const { profile, isLoading, error, isUpdating, updateProfile, changePassword, uploadAvatar, removeAvatar } = useUserProfile();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile?.name || '',
      phone: profile?.phone || '',
    },
  });

  // Password form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  // Update profile when data changes
  useState(() => {
    if (profile) {
      resetProfile({
        name: profile.name,
        phone: profile.phone || '',
      });
    }
  });

  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setUpdateSuccess(false);
    setUpdateError(null);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setUpdateError(null);
    resetProfile({
      name: profile?.name || '',
      phone: profile?.phone || '',
    });
  };

  const onSubmitProfile = async (data: ProfileFormData) => {
    setUpdateSuccess(false);
    setUpdateError(null);

    try {
      await updateProfile(data);
      setIsEditingProfile(false);
      setUpdateSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : 'Gagal memperbarui profil');
    }
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    setPasswordSuccess(false);
    setPasswordError(null);

    try {
      await changePassword(data);
      setPasswordSuccess(true);
      resetPassword();
      
      // Hide success message after 3 seconds
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'Gagal mengubah password');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'tenant':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Gagal Memuat Profil</h2>
              <p className="text-gray-600 mb-4">{error || 'Terjadi kesalahan'}</p>
              <Button onClick={() => router.push('/auth/login')} className="bg-teal-600 hover:bg-teal-700">
                Kembali ke Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Teal accent line */}
      <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-600"></div>

      {/* Page Title Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profil Saya</h1>
            <p className="text-sm text-gray-600 mt-1">Kelola informasi pribadi dan keamanan akun Anda</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Messages */}
        {updateSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Berhasil!</h3>
              <p className="text-sm text-green-700 mt-1">Profil Anda telah diperbarui.</p>
            </div>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-gray-200 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <AvatarUpload
                    currentAvatarUrl={profile.avatarUrl}
                    userName={profile.name}
                    onUpload={uploadAvatar}
                    onRemove={profile.avatarUrl ? async () => { await removeAvatar() } : undefined}
                    isUploading={isUpdating}
                    size="xl"
                  />
                </div>
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-2 mt-2">
                  <Badge className={getRoleBadgeColor(profile.role)}>
                    {profile.role}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3 text-sm">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-500 text-xs">Email</p>
                    <p className="text-gray-900 font-medium truncate">{profile.email}</p>
                  </div>
                </div>
                
                {profile.phone && (
                  <div className="flex items-start gap-3 text-sm">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs">Telepon</p>
                      <p className="text-gray-900 font-medium">{profile.phone}</p>
                    </div>
                  </div>
                )}

                {profile.createdAt && (
                  <div className="flex items-start gap-3 text-sm">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs">Bergabung Sejak</p>
                      <p className="text-gray-900 font-medium">{formatDate(profile.createdAt)}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
                <TabsTrigger value="profile" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                  <User className="w-4 h-4 mr-2" />
                  Informasi Profil
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-700">
                  <Lock className="w-4 h-4 mr-2" />
                  Keamanan
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="border-gray-200 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-5 h-5 text-teal-600" />
                          Informasi Pribadi
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Kelola informasi pribadi Anda
                        </CardDescription>
                      </div>
                      {!isEditingProfile && (
                        <Button
                          size="sm"
                          onClick={handleEditProfile}
                          className="bg-teal-600 hover:bg-teal-700 text-white"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    {updateError && (
                      <Alert className="mb-4 border-red-200 bg-red-50">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{updateError}</p>
                        </div>
                      </Alert>
                    )}

                    <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          Nama Lengkap
                        </Label>
                        <Input
                          id="name"
                          {...registerProfile('name')}
                          disabled={!isEditingProfile || isUpdating}
                          className={`${!isEditingProfile ? 'bg-gray-50' : ''}`}
                          placeholder="Masukkan nama lengkap"
                        />
                        {profileErrors.name && (
                          <p className="text-sm text-red-600">{profileErrors.name.message}</p>
                        )}
                      </div>

                      {/* Email Field (Read-only) */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          disabled
                          className="bg-gray-100 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500">Email tidak dapat diubah</p>
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          Nomor Telepon
                        </Label>
                        <Input
                          id="phone"
                          {...registerProfile('phone')}
                          disabled={!isEditingProfile || isUpdating}
                          className={`${!isEditingProfile ? 'bg-gray-50' : ''}`}
                          placeholder="Contoh: 081234567890"
                        />
                        {profileErrors.phone && (
                          <p className="text-sm text-red-600">{profileErrors.phone.message}</p>
                        )}
                      </div>

                      {/* Role Field (Read-only) */}
                      <div className="space-y-2">
                        <Label htmlFor="role" className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-gray-500" />
                          Role
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="role"
                            value={profile.role}
                            disabled
                            className="bg-gray-100 cursor-not-allowed flex-1"
                          />
                          <Badge className={getRoleBadgeColor(profile.role)}>
                            {profile.role}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">Role Anda ditentukan oleh administrator</p>
                      </div>

                      {/* Action Buttons */}
                      {isEditingProfile && (
                        <div className="flex gap-3 pt-4">
                          <Button
                            type="submit"
                            disabled={isUpdating}
                            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                          >
                            {isUpdating ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Menyimpan...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4 mr-2" />
                                Simpan Perubahan
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancelEdit}
                            disabled={isUpdating}
                            className="flex-1"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Batal
                          </Button>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card className="border-gray-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-teal-600" />
                      Ubah Password
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Perbarui password Anda untuk keamanan yang lebih baik
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    {passwordSuccess && (
                      <Alert className="mb-4 border-green-200 bg-green-50">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800">Berhasil!</h3>
                          <p className="text-sm text-green-700 mt-1">Password Anda telah diubah.</p>
                        </div>
                      </Alert>
                    )}

                    {passwordError && (
                      <Alert className="mb-4 border-red-200 bg-red-50">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{passwordError}</p>
                        </div>
                      </Alert>
                    )}

                    <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-6">
                      {/* Current Password */}
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-gray-500" />
                          Password Saat Ini
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          {...registerPassword('currentPassword')}
                          disabled={isUpdating}
                          placeholder="Masukkan password saat ini"
                        />
                        {passwordErrors.currentPassword && (
                          <p className="text-sm text-red-600">{passwordErrors.currentPassword.message}</p>
                        )}
                      </div>

                      {/* New Password */}
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-gray-500" />
                          Password Baru
                        </Label>
                        <Input
                          id="newPassword"
                          type="password"
                          {...registerPassword('newPassword')}
                          disabled={isUpdating}
                          placeholder="Masukkan password baru"
                        />
                        {passwordErrors.newPassword && (
                          <p className="text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-gray-500" />
                          Konfirmasi Password Baru
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          {...registerPassword('confirmPassword')}
                          disabled={isUpdating}
                          placeholder="Konfirmasi password baru"
                        />
                        {passwordErrors.confirmPassword && (
                          <p className="text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isUpdating}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                      >
                        {isUpdating ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Mengubah Password...
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Ubah Password
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

