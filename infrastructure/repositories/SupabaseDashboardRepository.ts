import { SupabaseClient } from '@supabase/supabase-js';
import {
  DashboardStats,
  WeeklySales,
  CategorySales,
  RecentOrder,
} from '../../core/domain/entities/dashboard';
import { IDashboardRepository } from '../../core/domain/repositories/IDashboardRepository';

export class SupabaseDashboardRepository implements IDashboardRepository {
  constructor(private supabase: SupabaseClient) {}

  async getDashboardStats(): Promise<DashboardStats> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: orders, error: ordersError } = await this.supabase
      .from('orders')
      .select('id, total_amount, created_at')
      .gte('created_at', today.toISOString())
      .eq('status', 'delivered');

    if (ordersError) throw new Error(`Failed to fetch today sales: ${ordersError.message}`);

    const todaySales = (orders || []).reduce((sum, order) => sum + (order.total_amount || 0), 0);

    const { count: newOrdersCount, error: newOrdersError } = await this.supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', today.toISOString());

    if (newOrdersError) throw new Error(`Failed to fetch new orders: ${newOrdersError.message}`);

    const { count: newCustomersCount, error: newCustomersError } = await this.supabase
      .from('customers')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', today.toISOString());

    if (newCustomersError) throw new Error(`Failed to fetch new customers: ${newCustomersError.message}`);

    const { data: lowStockProducts, error: lowStockError } = await this.supabase
      .from('products')
      .select('id')
      .lt('stock', 10);

    if (lowStockError) throw new Error(`Failed to fetch low stock products: ${lowStockError.message}`);

    return {
      todaySales,
      newOrders: newOrdersCount || 0,
      newCustomers: newCustomersCount || 0,
      lowStockProducts: (lowStockProducts || []).length,
    };
  }

  async getWeeklySales(): Promise<WeeklySales[]> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const { data, error } = await this.supabase
      .from('orders')
      .select('total_amount, created_at')
      .gte('created_at', sevenDaysAgo.toISOString())
      .eq('status', 'delivered')
      .order('created_at', { ascending: true });

    if (error) throw new Error(`Failed to fetch weekly sales: ${error.message}`);

    const salesByDay: Record<string, number> = {};
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(date.getDate() + i);
      const dayName = days[date.getDay()];
      salesByDay[dayName] = 0;
    }

    (data || []).forEach(order => {
      const date = new Date(order.created_at);
      const dayName = days[date.getDay()];
      salesByDay[dayName] += order.total_amount || 0;
    });

    return Object.entries(salesByDay).map(([day, sales]) => ({
      day,
      sales: Math.round(sales),
    }));
  }

  async getCategorySales(): Promise<CategorySales[]> {
    const { data, error } = await this.supabase
      .from('order_items')
      .select(`
        product_id,
        unit_price,
        quantity,
        products (category)
      `)
      .not('products', 'is', null);

    if (error) throw new Error(`Failed to fetch category sales: ${error.message}`);

    const salesByCategory: Record<string, number> = {};

    (data || []).forEach((item: any) => {
      const category = item.products?.category || 'Unknown';
      const itemTotal = (item.unit_price || 0) * (item.quantity || 0);
      salesByCategory[category] = (salesByCategory[category] || 0) + itemTotal;
    });

    return Object.entries(salesByCategory)
      .map(([name, value]) => ({ name, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value);
  }

  async getRecentOrders(limit: number): Promise<RecentOrder[]> {
    const { data, error } = await this.supabase
      .from('orders')
      .select(`
        id,
        status,
        total_amount,
        created_at,
        customers (name),
        order_items (products (name))
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(`Failed to fetch recent orders: ${error.message}`);

    return (data || []).map((order: any) => ({
      id: order.id,
      orderNumber: `#${order.id.slice(0, 8).toUpperCase()}`,
      customerName: order.customers?.name || 'Unknown',
      productName: order.order_items?.[0]?.products?.name || 'Unknown',
      totalAmount: order.total_amount || 0,
      status: order.status || 'pending',
      createdAt: new Date(order.created_at),
    }));
  }
}
