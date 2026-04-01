'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GameBoard from '../../components/Game1';

const HomePage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    // Baca dari cookie, bukan localStorage
    const cookies = document.cookie.split('; ');
    const loginCookie = cookies.find((c) => c.startsWith('isLoggedIn='));
    const status = loginCookie?.split('=')[1];

    if (status === 'true') {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      router.replace('/auth/notauthorized');
    }
  }, [router]);

  if (isLogin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-500">
        <p className="text-white text-lg font-semibold">Memeriksa sesi...</p>
      </div>
    );
  }

  if (isLogin === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-500">
        <p className="text-white text-lg font-semibold">Mengalihkan...</p>
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
