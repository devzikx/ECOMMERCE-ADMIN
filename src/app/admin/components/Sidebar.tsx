'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { BarChart3, Package, ShoppingCart, Users, TrendingUp, Settings, LogOut } from 'lucide-react';

const navItems = [
  { href: '/admin', label: '대시보드', icon: BarChart3 },
  { href: '/admin/products', label: '상품 관리', icon: Package },
  { href: '/admin/orders', label: '주문 관리', icon: ShoppingCart },
  { href: '/admin/customers', label: '고객 관리', icon: Users },
  { href: '/admin/analytics', label: '매출 분석', icon: TrendingUp },
  { href: '/admin/settings', label: '스토어 설정', icon: Settings },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // 쿠키 삭제
    document.cookie = 'admin_token=; path=/; max-age=0';
    document.cookie = 'admin_user_id=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-slate-400 mt-1">쇼핑몰 관리 대시보드</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700 space-y-3">
        <div className="bg-slate-700 rounded-lg p-3 text-sm text-slate-300">
          <p className="font-semibold text-white">버전</p>
          <p className="mt-1">v0.1.0</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition-colors bg-slate-700"
        >
          <LogOut size={20} />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  );
}
