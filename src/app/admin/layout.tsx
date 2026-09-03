'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './components/Sidebar';

const pageTitle: Record<string, string> = {
  '/admin': '대시보드',
  '/admin/products': '상품 관리',
  '/admin/orders': '주문 관리',
  '/admin/customers': '고객 관리',
  '/admin/analytics': '매출 분석',
  '/admin/settings': '스토어 설정',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title = pageTitle[pathname] || '대시보드';

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
