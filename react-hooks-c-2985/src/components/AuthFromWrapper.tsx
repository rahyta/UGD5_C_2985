import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

const AuthFormWrapper = ({ title, children }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-20">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-2">{title}</h1>

        <div className="mt-4">
          {children}
        </div>

      </div>
    </div>
  );
};

export default AuthFormWrapper;