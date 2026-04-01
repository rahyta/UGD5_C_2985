'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotAuthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center">
        {/* Ilustrasi / gambar alam */}
        <div className="w-full h-40 rounded-lg overflow-hidden mb-6">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
            alt="landscape"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-xl font-bold text-red-600 mb-2 flex items-center justify-center gap-2">
          ❌ Anda belum login
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Silakan login terlebih dahulu.
        </p>

        <button
          onClick={() => router.push('/auth/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
        >
          ← Kembali
        </button>
      </div>
    </div>
  );
}
