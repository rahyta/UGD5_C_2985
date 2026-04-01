'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthFormWrapper from '../../../components/AuthFormWrapper';
import SocialAuth from '../../../components/SocialAuth';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaSync } from 'react-icons/fa';

type RegisterFormData = {
  username: string;
  email: string;
  nomorTelp: string;
  password: string;
  confirmPassword: string;
  captcha: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const generateCaptcha = () =>
    Math.random().toString(36).substring(2, 8);
  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const {
    register,
    handleSubmit,
    watch,
    resetField, 
    formState: { errors },
  } = useForm<RegisterFormData>();
  
  const password = watch('password', '');
  const strength = Math.min(
    (password.length >= 7 ? 25 : 0) +
    (/[A-Z]/.test(password) ? 25 : 0) +
    (/[0-9]/.test(password) ? 25 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 25 : 0)
  );
  
  const onSubmit = (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Konfirmasi password tidak cocok');
      return;
    }
    
    if (data.captcha !== captchaText) {
      toast.error('Captcha salah');
      return;
    }
    
    toast.success('Register Berhasil!');
    router.push('/auth/login');
  };
  
  return (
  <AuthFormWrapper title="Register">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Username
          </label>
          <input
          {...register('username', {
            required: 'Username wajib diisi',
            minLength: { value: 3, message: 'Minimal 3 karakter' },
            maxLength: { value: 8, message: 'Maksimal 8 karakter' },
          })}
          
          className="w-full px-4 py-2.5 border rounded-lg"
          placeholder="Masukkan username"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email
              </label>
              <input
              {...register('email', {
                required: 'Email wajib diisi',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.(com|net|co)$/,
                  message: 'Format email tidak valid',
                },
              })}
              
              className="w-full px-4 py-2.5 border rounded-lg"
              placeholder="Masukkan email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nomor Telepon 
                  </label>
                  <input
                  {...register('nomorTelp', {
                    required: 'Nomor wajib diisi',
                    minLength: { value: 10, message: 'Minimal 10 digit' },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Harus angka',
                    },
                  })}
                  
                  className="w-full px-4 py-2.5 border rounded-lg"
                  placeholder="Masukkan nomor telepon"
                  />
                  {errors.nomorTelp && <p className="text-red-500 text-sm">{errors.nomorTelp.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Password 
                      </label>
                      
                      <div className="relative">
                        <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                          required: 'Password wajib diisi',
                          minLength: { value: 8, message: 'Minimal 8 karakter' },
                        })}
                        
                        className="w-full px-4 py-2.5 pr-10 border rounded-lg"
                        placeholder="Masukkan password"
                        />
                        
                        <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                          </div>
                          
                          <div className="h-2 bg-gray-200 rounded">
                            <div
                            className="h-2 rounded"
                            style={{
                              width: `${strength}%`,
                              backgroundColor:
                              strength < 50 ? 'red' :
                              strength < 75 ? 'orange' :
                              'green',
                            }}
                            /></div>
                            <p className="text-sm">Strength: {strength}%</p>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-gray-700">
                                Konfirmasi Password
                                </label>
                                <div className="relative">
                                  <input
                                  type={showConfirm ? 'text' : 'password'}
                                  {...register('confirmPassword', {
                                    required: 'Wajib diisi',
                                    validate: (value) =>
                                      value === password || 'Password tidak cocok',
                                  })}
                                  
                                  className="w-full px-4 py-2.5 pr-10 border rounded-lg"
                                  placeholder="Masukkan ulang password"
                                  />
                                  <span
                                  onClick={() => setShowConfirm(!showConfirm)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                  >
                                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                    </div>
                                    {errors.confirmPassword && (
                                      <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                                      )}
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
                                          Captcha
                                          </label>
                                          <div className="flex items-center gap-3">
                                            <span className="font-bold bg-gray-200 px-3 py-1 rounded">
                                              {captchaText}
                                              </span>
                                              <button
                                              type="button"
                                              onClick={() => {
                                                setCaptchaText(generateCaptcha());
                                                resetField('captcha'); 
                                                }}
                                                >
                                                  <FaSync />
                                                  </button>
                                                  </div>
                                                  <input
                                                  {...register('captcha', {
                                                    required: 'Captcha wajib diisi',
                                                    validate: (value) =>
                                                      value === captchaText || 'Harus sesuai dengan captcha yang ditampilkan',
                                                  })}
                                                  className="w-full px-4 py-2.5 border rounded-lg"
                                                  placeholder="Masukkan captcha"
                                                  />
                                                  {errors.captcha && (
                                                    <p className="text-red-500 text-sm">{errors.captcha.message}</p>
                                                    )}
                                                    </div>
                                                    <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg">
                                                      Register
                                                      </button>
                                                      <SocialAuth />
                                                      <p className="text-center text-sm">
                                                        Sudah punya akun?{' '}
                                                        <Link href="/auth/login" className="text-blue-600">
                                                        Login
                                                        </Link>
                                                        </p>
                                                        </form>
                                                        </AuthFormWrapper>
                                                        );
                                                      };
                                                      export default RegisterPage;