'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, LogIn } from 'lucide-react';
import { loginSchema, LoginFormData } from '../schema';
import { LoginUseCase } from '@/core/application/use-cases/LoginUseCase';
import { SupabaseAuthRepository } from '@/infrastructure/repositories/SupabaseAuthRepository';
import { ZodError } from 'zod';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name: string, value: string) => {
    try {
      if (name === 'email') {
        loginSchema.shape.email.parse(value);
      } else if (name === 'password') {
        loginSchema.shape.password.parse(value);
      }
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } catch (err) {
      if (err instanceof ZodError) {
        setErrors((prev) => ({
          ...prev,
          [name]: err.errors[0].message,
        }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setErrors({});
    setIsLoading(true);

    try {
      // 전체 폼 검증
      const validated = loginSchema.parse(formData);

      const repository = new SupabaseAuthRepository();
      const useCase = new LoginUseCase(repository);
      const result = await useCase.execute({
        email: validated.email,
        password: validated.password,
      });

      // 로그인 토큰을 쿠키에 저장
      document.cookie = `admin_token=${result.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      document.cookie = `admin_user_id=${result.user.id}; path=/; max-age=${7 * 24 * 60 * 60}`;

      router.push('/admin');
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          const fieldName = error.path[0];
          if (fieldName) {
            fieldErrors[fieldName] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setError(
          err instanceof Error ? err.message : '로그인에 실패했습니다'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle size={20} className="text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* 이메일 필드 */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          이메일
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-colors ${
            errors.email
              ? 'border-red-300 focus:ring-red-600'
              : 'border-slate-300 focus:ring-blue-600'
          }`}
          placeholder="이메일을 입력하세요"
        />
        {errors.email && (
          <div className="flex items-center gap-2 mt-2">
            <AlertCircle size={16} className="text-red-600" />
            <p className="text-sm text-red-600">{errors.email}</p>
          </div>
        )}
      </div>

      {/* 비밀번호 필드 */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          비밀번호
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isLoading}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-colors ${
            errors.password
              ? 'border-red-300 focus:ring-red-600'
              : 'border-slate-300 focus:ring-blue-600'
          }`}
          placeholder="비밀번호를 입력하세요"
        />
        {errors.password && (
          <div className="flex items-center gap-2 mt-2">
            <AlertCircle size={16} className="text-red-600" />
            <p className="text-sm text-red-600">{errors.password}</p>
          </div>
        )}
      </div>

      {/* 로그인 버튼 */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <LogIn size={20} />
        {isLoading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
}
