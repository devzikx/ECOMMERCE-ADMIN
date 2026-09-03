'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { AlertCircle, LogIn } from 'lucide-react';
import { loginSchema, LoginFormData } from '../schema';
import { LoginUseCase } from '@/core/application/use-cases/LoginUseCase';
import { SupabaseAuthRepository } from '@/infrastructure/repositories/SupabaseAuthRepository';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setError(null);
      setIsLoading(true);

      try {
        const repository = new SupabaseAuthRepository();
        const useCase = new LoginUseCase(repository);
        const result = await useCase.execute({
          email: values.email,
          password: values.password,
        });

        // 로그인 토큰을 쿠키에 저장
        document.cookie = `admin_token=${result.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
        document.cookie = `admin_user_id=${result.user.id}; path=/; max-age=${7 * 24 * 60 * 60}`;

        router.push('/admin');
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '로그인에 실패했습니다'
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle size={20} className="text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* 이메일 필드 */}
      <form.Field
        name="email"
        validators={{
          onBlur: loginSchema.shape.email,
        }}
      >
        {(field) => (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
              placeholder="이메일을 입력하세요"
            />
            {field.state.meta.errors && field.state.meta.errors.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <AlertCircle size={16} className="text-red-600" />
                <p className="text-sm text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              </div>
            )}
          </div>
        )}
      </form.Field>

      {/* 비밀번호 필드 */}
      <form.Field
        name="password"
        validators={{
          onBlur: loginSchema.shape.password,
        }}
      >
        {(field) => (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
              placeholder="비밀번호를 입력하세요"
            />
            {field.state.meta.errors && field.state.meta.errors.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <AlertCircle size={16} className="text-red-600" />
                <p className="text-sm text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              </div>
            )}
          </div>
        )}
      </form.Field>

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
