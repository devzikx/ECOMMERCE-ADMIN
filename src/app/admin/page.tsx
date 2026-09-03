'use client';

import { DollarSign, ShoppingCart, Users, AlertCircle } from 'lucide-react';
import StatCard from './components/StatCard';
import WeeklySalesChart from './components/WeeklySalesChart';
import CategorySalesChart from './components/CategorySalesChart';
import RecentOrdersTable from './components/RecentOrdersTable';
import type { DashboardData } from '@/core/application/use-cases/GetDashboardStatsUseCase';

const dashboardData: DashboardData = {
  stats: {
    todaySales: 2543000,
    newOrders: 12,
    newCustomers: 8,
    lowStockProducts: 3,
  },
  weeklySales: [
    { day: 'Sun', sales: 450000 },
    { day: 'Mon', sales: 620000 },
    { day: 'Tue', sales: 580000 },
    { day: 'Wed', sales: 720000 },
    { day: 'Thu', sales: 890000 },
    { day: 'Fri', sales: 1200000 },
    { day: 'Sat', sales: 950000 },
  ],
  categorySales: [
    { name: '전자제품', value: 3500000 },
    { name: '의류', value: 2800000 },
    { name: '가구', value: 2100000 },
    { name: '식품', value: 1500000 },
    { name: '기타', value: 1100000 },
  ],
  recentOrders: [
    {
      id: '1',
      orderNumber: '#ABC12345',
      customerName: '김철수',
      productName: '무선 이어폰',
      totalAmount: 89000,
      status: 'delivered',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      orderNumber: '#ABC12344',
      customerName: '이영희',
      productName: 'USB-C 케이블',
      totalAmount: 15000,
      status: 'shipped',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '3',
      orderNumber: '#ABC12343',
      customerName: '박민수',
      productName: '노트북 스탠드',
      totalAmount: 45000,
      status: 'processing',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '4',
      orderNumber: '#ABC12342',
      customerName: '최수진',
      productName: '무선 마우스',
      totalAmount: 32000,
      status: 'pending',
      createdAt: new Date('2024-01-14'),
    },
    {
      id: '5',
      orderNumber: '#ABC12341',
      customerName: '정준호',
      productName: '키보드',
      totalAmount: 78000,
      status: 'delivered',
      createdAt: new Date('2024-01-14'),
    },
  ],
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="오늘 매출"
          value={`₩${dashboardData.stats.todaySales.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          bgColor="bg-green-50"
        />
        <StatCard
          label="신규 주문"
          value={`${dashboardData.stats.newOrders}건`}
          icon={<ShoppingCart size={24} />}
          bgColor="bg-blue-50"
        />
        <StatCard
          label="신규 고객"
          value={`${dashboardData.stats.newCustomers}명`}
          icon={<Users size={24} />}
          bgColor="bg-purple-50"
        />
        <StatCard
          label="재고 부족"
          value={`${dashboardData.stats.lowStockProducts}개`}
          icon={<AlertCircle size={24} />}
          bgColor="bg-red-50"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklySalesChart data={dashboardData.weeklySales} />
        </div>
        <div className="lg:col-span-1">
          <CategorySalesChart data={dashboardData.categorySales} />
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable orders={dashboardData.recentOrders} />
    </div>
  );
}
