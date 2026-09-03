import { Metadata } from 'next';
import LoginForm from './components/LoginForm';

export const metadata: Metadata = {
  title: '관리자 로그인 - 쇼핑몰',
  description: '쇼핑몰 관리자 로그인',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로그인 카드 */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* 헤더 */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <span className="text-3xl font-bold text-blue-600">A</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              관리자 대시보드
            </h1>
            <p className="text-slate-600">
              관리자 계정으로 로그인해주세요
            </p>
          </div>

          {/* 로그인 폼 */}
          <LoginForm />

          {/* 푸터 */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              쇼핑몰 관리 시스템 v0.1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
