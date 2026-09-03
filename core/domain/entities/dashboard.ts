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

export interface DailySalesData {
  date: string;
  sales: number;
  orders: number;
}

export interface BestSellerProduct {
  id: string;
  name: string;
  quantity: number;
  revenue: number;
  rank: number;
}

export interface StoreSettings {
  storeName: string;
  ownerName: string;
  customerServicePhone: string;
  defaultShippingFee: number;
  freeShippingThreshold: number;
}
