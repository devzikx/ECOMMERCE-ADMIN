'use client';

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DailySalesData } from '@/core/domain/entities/dashboard';

interface AnalyticsChartProps {
  data: DailySalesData[];
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        매출 및 주문 동향
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip
            formatter={(value: number) => {
              if (typeof value === 'number') {
                return value.toLocaleString();
              }
              return value;
            }}
            labelFormatter={(label) => `날짜: ${label}`}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" name="매출 (₩)" />
          <Line yAxisId="right" dataKey="orders" stroke="#ef4444" name="주문건수" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
