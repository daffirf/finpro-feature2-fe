'use client'

import { useState } from 'react'
import { Modal } from './Modal'

interface EmailReminderModalProps {
  isOpen: boolean
  onClose: () => void
  bookingId: string
  bookingData: {
    user: { name: string; email: string }
    property: { name: string }
    room: { name: string }
    checkIn: string
    checkOut: string
  }
  onSuccess: () => void
}

export function EmailReminderModal({ 
  isOpen, 
  onClose, 
  bookingId, 
  bookingData, 
  onSuccess 
}: EmailReminderModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [reminderType, setReminderType] = useState<'confirmation' | 'checkin'>('confirmation')

  const sendReminder = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/tenant/bookings/${bookingId}/send-reminder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: reminderType })
      })

      const result = await response.json()

      if (response.ok) {
        onSuccess()
        onClose()
        alert('Email reminder berhasil dikirim!')
      } else {
        setError(result.error || 'Gagal mengirim email reminder')
      }
    } catch {
      setError('Terjadi kesalahan server')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Kirim Email Reminder" size="md">
      <div className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Detail Pemesanan</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div><strong>User:</strong> {bookingData.user.name} ({bookingData.user.email})</div>
            <div><strong>Properti:</strong> {bookingData.property.name}</div>
            <div><strong>Kamar:</strong> {bookingData.room.name}</div>
            <div><strong>Check-in:</strong> {new Date(bookingData.checkIn).toLocaleDateString('id-ID')}</div>
            <div><strong>Check-out:</strong> {new Date(bookingData.checkOut).toLocaleDateString('id-ID')}</div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jenis Reminder
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="confirmation"
                checked={reminderType === 'confirmation'}
                onChange={(e) => setReminderType(e.target.value as 'confirmation' | 'checkin')}
                className="mr-2"
              />
              <span className="text-sm">Konfirmasi Pembayaran & Detail Pemesanan</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="checkin"
                checked={reminderType === 'checkin'}
                onChange={(e) => setReminderType(e.target.value as 'confirmation' | 'checkin')}
                className="mr-2"
              />
              <span className="text-sm">Reminder Check-in (H-1)</span>
            </label>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Isi Email akan mencakup:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Detail pemesanan lengkap</li>
            <li>• Tata cara check-in</li>
            <li>• Aturan penggunaan properti</li>
            <li>• Informasi kontak darurat</li>
            <li>• Petunjuk akses properti</li>
          </ul>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={sendReminder}
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Mengirim...' : 'Kirim Email Reminder'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </Modal>
  )
}
