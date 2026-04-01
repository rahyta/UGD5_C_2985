'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthFromWrapper from '../../../components/AuthFromWrapper';
import SocialAuth from '../../../components/SocialAuth';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaSync } from 'react-icons/fa';

interface LoginFormData {
  email: string;
  password: string;
  captchaInput: string;
  rememberMe: boolean;
}

interface ErrorObject {
  email?: string;
  password?: string;
  captcha?: string;
}

const LoginPage = () => {
  const router = useRouter();
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    return Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  };
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    captchaInput: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<ErrorObject>({});
  const [attempt, setAttempt] = useState(3);
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: ErrorObject = {};
    const validEmail = "2985@gmail.com";
    const validPassword = "241712985";

    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password tidak boleh kosong';
    }

    if (!formData.captchaInput.trim()) {
      newErrors.captcha = 'Captcha belum diisi';
    } else if (formData.captchaInput !== captcha) {
      newErrors.captcha = 'Captcha tidak sesuai';
    }

    if (formData.email && formData.email !== validEmail) {
      newErrors.email = 'Email salah';
    }

    if (formData.password && formData.password !== validPassword) {
      newErrors.password = 'Password salah';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

    if (attempt > 0) {
      const newAttempt = attempt - 1;

    setAttempt(newAttempt);

    toast.error(`Login gagal! Sisa kesempatan: ${newAttempt}`, {
      style: {
        background: '#000',
        color: '#fff',
      },
    });

    if (newAttempt === 0) {
      toast.error('Kesempatan login habis!', {
        style: {
          background: '#000',
          color: '#fff',
        },
      });
    }
  }

  return;
}

toast.success('Login Berhasil!');
localStorage.setItem('isLogin', 'true');
router.push('/home');
};

return (
<AuthFromWrapper title="Login">
  <form onSubmit={handleSubmit} className="space-y-5 w-full">
    <p className="text-center text-sm text-gray-600">
      Sisa kesempatan: {attempt}
        </p>

        <div className="space-y-2">
          <label>Masukkan Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label>Masukkan Password</label>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 pr-10 rounded-lg border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Masukkan password"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="mr-2"
          />
        <label className="text-sm text-gray-700">Ingat Saya</label>
      </div>
      
      <Link
      href="/auth/forgot-password"
      className="text-sm text-blue-600 hover:underline"
      >
      Forgot Password
      </Link>
      </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span>Captcha:</span>
            <span className="font-mono text-lg font-bold bg-gray-100 px-3 py-1.5 rounded">
              {captcha}
            </span>

            <button
              type="button"
              onClick={() => {
                setCaptcha(generateCaptcha());
                setFormData((prev) => ({ ...prev, captchaInput: '' }));
              }}
              >
              <FaSync />
            </button>
          </div>

          <input
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.captcha ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan captcha"
            />

          {errors.captcha && (
            <p className="text-red-600 text-sm">{errors.captcha}</p>
            )}
            </div>

          <button
            type="submit"
            disabled={attempt === 0}
            className={`w-full text-white font-semibold py-2.5 rounded-lg ${
              attempt === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            >
            Sign In
          </button>

          <button
          type="button"
          onClick={() => {
            setAttempt(3);
            toast.success('Kesempatan direset!');
          }}
          disabled={attempt !== 0}
          className={`w-full font-semibold py-2.5 rounded-lg ${
            attempt === 0
              ? 'bg-green-500 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          >
          Reset Kesempatan
          </button>

          <SocialAuth />

          <p className="text-center text-sm">
            Tidak punya akun?{' '}
            <Link href="/auth/register" className="text-blue-600 font-semibold">
            Daftar
            </Link>
          </p>
      </form>
    </AuthFromWrapper>
  );
};

export default LoginPage;