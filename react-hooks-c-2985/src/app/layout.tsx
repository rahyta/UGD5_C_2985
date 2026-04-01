import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Auth System',
  description: 'Login and Register System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
        />
      </body>
    </html>
  );
}