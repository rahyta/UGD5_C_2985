'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import GameBoard from '../../components/Game1';

  const HomePage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    const status = localStorage.getItem('isLogin');

    if (status === 'true') {
      setIsLogin(true);
    } else {
      setIsLogin(false);

      router.replace('/auth/login');
    }
  }, [router]);

  if (isLogin === null) return null;

  if (isLogin === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-500">
        <div className="bg-white p-6 rounded-xl text-center shadow-lg">
          <h1 className="text-xl font-bold text-red-600 mb-2">
            ❌ Akses Ditolak
          </h1>
          <p className="mb-4">
            Anda belum login
          </p>
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ⬅ Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <GameBoard />
    </div>
  );
};

export default HomePage;