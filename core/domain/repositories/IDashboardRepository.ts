import {
  DashboardStats,
  WeeklySales,
  CategorySales,
  RecentOrder,
} from '../entities/dashboard';

export interface IDashboardRepository {
  getDashboardStats(): Promise<DashboardStats>;
  getWeeklySales(): Promise<WeeklySales[]>;
  getCategorySales(): Promise<CategorySales[]>;
  getRecentOrders(limit: number): Promise<RecentOrder[]>;
}
