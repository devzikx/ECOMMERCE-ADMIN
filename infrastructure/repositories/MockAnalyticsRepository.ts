import {
  DailySalesData,
  BestSellerProduct,
} from '@/core/domain/entities/dashboard';
import {
  IAnalyticsRepository,
  TimePeriod,
} from '@/core/domain/repositories/IAnalyticsRepository';

export class MockAnalyticsRepository implements IAnalyticsRepository {
  async getDailySalesData(period: TimePeriod): Promise<DailySalesData[]> {
    const today = new Date();
    const daysMap: Record<TimePeriod, number> = {
      '7days': 7,
      '1month': 30,
      '3months': 90,
    };

    const days = daysMap[period];
    const data: DailySalesData[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('ko-KR', {
        month: 'numeric',
        day: 'numeric',
      });

      data.push({
        date: dateStr,
        sales: Math.floor(Math.random() * 3000000) + 500000,
        orders: Math.floor(Math.random() * 50) + 5,
      });
    }

    return data;
  }

  async getBestSellerProducts(limit: number): Promise<BestSellerProduct[]> {
    const products = [
      {
        id: '1',
        name: '무선 이어폰',
        quantity: 245,
        revenue: 21850000,
      },
      {
        id: '2',
        name: 'USB-C 케이블',
        quantity: 512,
        revenue: 7680000,
      },
      {
        id: '3',
        name: '노트북 스탠드',
        quantity: 156,
        revenue: 7020000,
      },
      {
        id: '4',
        name: '무선 마우스',
        quantity: 289,
        revenue: 9248000,
      },
      {
        id: '5',
        name: '기계식 키보드',
        quantity: 178,
        revenue: 13900000,
      },
    ];

    return products.slice(0, limit).map((product, index) => ({
      ...product,
      rank: index + 1,
    }));
  }
}
