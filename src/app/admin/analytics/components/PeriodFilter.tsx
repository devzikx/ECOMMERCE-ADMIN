'use client';

import { TimePeriod } from '@/core/domain/repositories/IAnalyticsRepository';

interface PeriodFilterProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

const periodOptions: Array<{ value: TimePeriod; label: string }> = [
  { value: '7days', label: '최근 7일' },
  { value: '1month', label: '이번 달' },
  { value: '3months', label: '최근 3개월' },
];

export default function PeriodFilter({
  selectedPeriod,
  onPeriodChange,
}: PeriodFilterProps) {
  return (
    <div className="flex gap-2">
      {periodOptions.map(option => (
        <button
          key={option.value}
          onClick={() => onPeriodChange(option.value)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedPeriod === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
