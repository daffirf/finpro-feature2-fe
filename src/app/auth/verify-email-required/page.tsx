/**
 * Email Verification Required Page
 * Ditampilkan ketika user belum verifikasi email
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';

export default function VerifyEmailRequiredPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    // If already verified, redirect to appropriate page
    if (user?.isEmailVerified) {
      if (user.role === 'tenant') {
        router.push('/dashboard');
      } else {
        router.push('/landing');
      }
      return;
    }

    setEmail(user?.email || '');
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-teal-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Verifikasi Email Diperlukan
          </h1>

          {/* Description */}
          <p className="text-center text-gray-600 mb-6">
            Silakan verifikasi email Anda untuk melanjutkan
          </p>

          {/* Email Info */}
          {email && (
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Email verifikasi telah dikirim ke:</p>
              <p className="font-medium text-gray-900">{email}</p>
            </div>
          )}

          {/* Warning Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Email belum diverifikasi</p>
                <p>Anda harus memverifikasi email terlebih dahulu untuk mengakses fitur ini.</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Langkah selanjutnya:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>Cek inbox email Anda</li>
              <li>Buka email dari kami</li>
              <li>Klik link verifikasi di email</li>
              <li>Set password Anda</li>
              <li>Login kembali</li>
            </ol>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Login
            </button>

            <button
              onClick={() => router.push('/auth/login')}
              className="w-full text-gray-600 hover:text-gray-900 text-sm transition-colors"
            >
              Sudah verifikasi? Login di sini
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Tidak menerima email?{' '}
            <a href="/auth/register" className="text-teal-600 hover:text-teal-700 font-medium">
              Kirim ulang verifikasi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

