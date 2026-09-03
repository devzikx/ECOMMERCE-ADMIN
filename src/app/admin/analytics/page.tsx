'use client';

import { useState, useEffect } from 'react';
import { TimePeriod } from '@/core/domain/repositories/IAnalyticsRepository';
import { GetAnalyticsUseCase } from '@/core/application/use-cases/GetAnalyticsUseCase';
import { MockAnalyticsRepository } from '@/infrastructure/repositories/MockAnalyticsRepository';
import PeriodFilter from './components/PeriodFilter';
import AnalyticsChart from './components/AnalyticsChart';
import BestSellerTable from './components/BestSellerTable';
import type { DailySalesData, BestSellerProduct } from '@/core/domain/entities/dashboard';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<TimePeriod>('7days');
  const [dailySalesData, setDailySalesData] = useState<DailySalesData[]>([]);
  const [bestSellers, setBestSellers] = useState<BestSellerProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const repository = new MockAnalyticsRepository();
        const useCase = new GetAnalyticsUseCase(repository);
        const data = await useCase.execute(period);

        setDailySalesData(data.dailySalesData);
        setBestSellers(data.bestSellers);
      } catch (error) {
        console.error('분석 데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [period]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">매출 분석</h1>
        <PeriodFilter selectedPeriod={period} onPeriodChange={setPeriod} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-500">데이터를 로드 중입니다...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <AnalyticsChart data={dailySalesData} />
          <BestSellerTable products={bestSellers} />
        </div>
      )}
    </div>
  );
}
