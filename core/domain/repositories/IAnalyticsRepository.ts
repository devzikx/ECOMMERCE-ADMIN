import {
  DailySalesData,
  BestSellerProduct,
} from '../entities/dashboard';

export type TimePeriod = '7days' | '1month' | '3months';

export interface IAnalyticsRepository {
  getDailySalesData(period: TimePeriod): Promise<DailySalesData[]>;
  getBestSellerProducts(limit: number): Promise<BestSellerProduct[]>;
}
