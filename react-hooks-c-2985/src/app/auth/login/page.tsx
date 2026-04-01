'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthFormWrapper from '../../../components/AuthFormWrapper';
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

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: ErrorObject = {};
    const validEmail = '2985@gmail.com';
    const validPassword = '241712985';

    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password tidak boleh kosong';
    }

    if (!formData.captchaInput.trim()) {
      newErrors.captcha = 'Captcha belum diisi';
    } else if (
      formData.captchaInput.toLowerCase() !== captcha.toLowerCase()
    ) {
      newErrors.captcha = 'Captcha tidak sesuai';
    }

    if (!newErrors.email && formData.email !== validEmail) {
      newErrors.email = 'Email salah';
    }

    if (!newErrors.password && formData.password !== validPassword) {
      newErrors.password = 'Password salah';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      if (attempt > 0) {
        const newAttempt = attempt - 1;
        setAttempt(newAttempt);

        toast.error(`Login gagal! Sisa kesempatan: ${newAttempt}`);

        if (newAttempt === 0) {
          toast.error('Kesempatan login habis!');
        }
      }

      setCaptcha(generateCaptcha());

      return;
    }

    toast.success('Login Berhasil!');
    localStorage.setItem('isLogin', 'true');
    router.push('/home');
  };

  return (
    <AuthFormWrapper title="Login">
      <form onSubmit={handleSubmit} className="space-y-5 w-full">

        <p className="text-center text-sm text-gray-600">
          Sisa kesempatan: {attempt}
        </p>

        <InputField label="Masukkan Email" error={errors.email}>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            placeholder="Masukkan email"
          />
        </InputField>

        <InputField label="Masukkan Password" error={errors.password}>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input pr-10"
              placeholder="Masukkan password"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="eye-icon"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </InputField>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            Ingat Saya
          </label>

          <Link href="/auth/forgot-password" className="text-blue-600">
            Lupa Password
          </Link>
        </div>

        <InputField label="Captcha" error={errors.captcha}>
          <div className="flex items-center gap-3">
            <span className="captcha-box">{captcha}</span>
            <button
              type="button"
              onClick={() => {
                setCaptcha(generateCaptcha());
                setFormData((prev) => ({
                  ...prev,
                  captchaInput: '',
                }));
              }}
            >
              <FaSync />
            </button>
          </div>

          <input
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            className="input"
            placeholder="Masukkan captcha"
          />
        </InputField>

        <button
          type="submit"
          disabled={attempt === 0}
          className={`btn ${
            attempt === 0 ? 'btn-disabled' : 'btn-primary'
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
          className={`btn ${
            attempt === 0 ? 'btn-success' : 'btn-disabled'
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
    </AuthFormWrapper>
  );
};

export default LoginPage;

const InputField = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label>{label}</label>
    {children}
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);