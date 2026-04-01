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
      router.replace('/auth/login');
    }
  }, [router]);

  if (isLogin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
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