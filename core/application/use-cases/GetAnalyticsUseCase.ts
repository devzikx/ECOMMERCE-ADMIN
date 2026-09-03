import {
  DailySalesData,
  BestSellerProduct,
} from '@/core/domain/entities/dashboard';
import {
  IAnalyticsRepository,
  TimePeriod,
} from '@/core/domain/repositories/IAnalyticsRepository';

export class GetAnalyticsUseCase {
  constructor(private analyticsRepository: IAnalyticsRepository) {}

  async execute(period: TimePeriod) {
    const [dailySalesData, bestSellers] = await Promise.all([
      this.analyticsRepository.getDailySalesData(period),
      this.analyticsRepository.getBestSellerProducts(5),
    ]);

    return {
      dailySalesData,
      bestSellers,
    };
  }
}

export type AnalyticsData = Awaited<
  ReturnType<GetAnalyticsUseCase['execute']>
>;
