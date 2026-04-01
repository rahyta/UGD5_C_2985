'use client';

import { useRouter } from 'next/navigation';
import GameBoard from '../../components/Game1';

export default function HomeClient() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'isLoggedIn=; path=/; max-age=0';
    router.push('/auth/login');
  };

  return (
    <div className="game-container">
      <div className="flex justify-end px-6 pt-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
      <GameBoard />
    </div>
  );
}
