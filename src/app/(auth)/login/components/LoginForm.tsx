'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { AlertCircle, LogIn } from 'lucide-react';
import { loginSchema, LoginFormData } from '../schema';
import { LoginUseCase } from '@/core/application/use-cases/LoginUseCase';
import { MockAuthRepository } from '@/infrastructure/repositories/MockAuthRepository';

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
        const repository = new MockAuthRepository();
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

  const emailValue = form.getFieldValue('email');
  const passwordValue = form.getFieldValue('password');

  const emailError =
    !emailValue?.trim() && form.getFieldMeta('email')?.isTouched
      ? '이메일을 입력해주세요'
      : undefined;

  const passwordError =
    !passwordValue?.trim() && form.getFieldMeta('password')?.isTouched
      ? '비밀번호를 입력해주세요'
      : undefined;

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
      <form.Field name="email">
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
              placeholder="admin@example.com"
            />
            {emailError && (
              <div className="flex items-center gap-2 mt-2">
                <AlertCircle size={16} className="text-red-600" />
                <p className="text-sm text-red-600">{emailError}</p>
              </div>
            )}
          </div>
        )}
      </form.Field>

      {/* 비밀번호 필드 */}
      <form.Field name="password">
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
              placeholder="••••••••"
            />
            {passwordError && (
              <div className="flex items-center gap-2 mt-2">
                <AlertCircle size={16} className="text-red-600" />
                <p className="text-sm text-red-600">{passwordError}</p>
              </div>
            )}
          </div>
        )}
      </form.Field>

      {/* 테스트 자격증명 안내 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>테스트 계정:</strong>
          <br />
          관리자: admin@example.com / password123
          <br />
          일반 사용자: user@example.com / password123
        </p>
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
