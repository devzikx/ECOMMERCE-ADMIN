import {
  DashboardStats,
  WeeklySales,
  CategorySales,
  RecentOrder,
} from '../../domain/entities/dashboard';
import { IDashboardRepository } from '../../domain/repositories/IDashboardRepository';

export interface DashboardData {
  stats: DashboardStats;
  weeklySales: WeeklySales[];
  categorySales: CategorySales[];
  recentOrders: RecentOrder[];
}

export class GetDashboardStatsUseCase {
  constructor(private dashboardRepository: IDashboardRepository) {}

  async execute(): Promise<DashboardData> {
    const [stats, weeklySales, categorySales, recentOrders] =
      await Promise.all([
        this.dashboardRepository.getDashboardStats(),
        this.dashboardRepository.getWeeklySales(),
        this.dashboardRepository.getCategorySales(),
        this.dashboardRepository.getRecentOrders(10),
      ]);

    return {
      stats,
      weeklySales,
      categorySales,
      recentOrders,
    };
  }
}
