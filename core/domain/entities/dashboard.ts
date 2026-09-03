export interface DashboardStats {
  todaySales: number;
  newOrders: number;
  newCustomers: number;
  lowStockProducts: number;
}

export interface WeeklySales {
  day: string;
  sales: number;
}

export interface CategorySales {
  name: string;
  value: number;
}

export interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  productName: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}
