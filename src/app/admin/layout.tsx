import Sidebar from './components/Sidebar';

export const metadata = {
  title: '관리자 대시보드 - 쇼핑몰',
  description: '쇼핑몰 관리자 대시보드',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">대시보드</h2>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
