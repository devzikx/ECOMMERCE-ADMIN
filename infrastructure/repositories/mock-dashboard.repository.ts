import {
  DashboardStats,
  WeeklySales,
  CategorySales,
  RecentOrder,
} from '../../core/domain/entities/dashboard';
import { IDashboardRepository } from '../../core/domain/repositories/IDashboardRepository';

// Mock 상품 데이터 (마이그레이션 SQL과 동일)
const mockProducts = [
  { id: '11111111-1111-1111-1111-111111111111', name: '프리미엄 기계식 키보드', category: '전자제품', price: 189000, stock: 35 },
  { id: '22222222-2222-2222-2222-222222222222', name: '클린 아키텍처 머그컵', category: '생활용품', price: 18000, stock: 120 },
  { id: '33333333-3333-3333-3333-333333333333', name: '노이즈 캔슬링 무선 헤드폰', category: '전자제품', price: 299000, stock: 4 },
  { id: '44444444-4444-4444-4444-444444444444', name: '오버핏 데님 자켓', category: '의류', price: 89000, stock: 0 },
  { id: '55555555-5555-5555-5555-555555555555', name: '수분 진정 크림 50ml', category: '화장품', price: 32000, stock: 58 },
  { id: '66666666-6666-6666-6666-666666666666', name: '4K 웹캠 프로', category: '전자제품', price: 129000, stock: 22 },
  { id: '77777777-7777-7777-7777-777777777777', name: '유기농 드립백 커피 30개입', category: '식품', price: 24000, stock: 3 },
  { id: '88888888-8888-8888-8888-888888888888', name: '캐시미어 혼방 니트', category: '의류', price: 79000, stock: 41 },
  { id: '99999999-9999-9999-9999-999999999999', name: '스테인리스 텀블러 500ml', category: '생활용품', price: 26000, stock: 87 },
  { id: 'aaaa0000-0000-0000-0000-00000000000a', name: '비타민C 브라이트닝 세럼', category: '화장품', price: 45000, stock: 2 },
];

// Mock 고객 데이터 (마이그레이션 SQL과 동일)
const mockCustomers = [
  { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', name: '김철수', email: 'customer1@example.com' },
  { id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', name: '이영희', email: 'customer2@example.com' },
  { id: 'cccccccc-cccc-cccc-cccc-cccccccccccc', name: '박지성', email: 'customer3@example.com' },
  { id: 'dddddddd-dddd-dddd-dddd-dddddddddddd', name: '최유리', email: 'customer4@example.com' },
  { id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', name: '정민호', email: 'customer5@example.com' },
  { id: 'ffffffff-ffff-ffff-ffff-ffffffffffff', name: '한소희', email: 'customer6@example.com' },
  { id: 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', name: '오준석', email: 'customer7@example.com' },
  { id: 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', name: '윤서연', email: 'customer8@example.com' },
  { id: 'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3', name: '장하늘', email: 'customer9@example.com' },
  { id: 'd4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4', name: '임도현', email: 'customer10@example.com' },
  { id: 'e5e5e5e5-e5e5-e5e5-e5e5-e5e5e5e5e5e5', name: '신아름', email: 'customer11@example.com' },
  { id: 'f6f6f6f6-f6f6-f6f6-f6f6-f6f6f6f6f6f6', name: '배준영', email: 'customer12@example.com' },
];

// Mock 주문 데이터 (최근 90일에 분산된 60건)
const generateMockOrders = () => {
  const statuses: Array<'payment_pending' | 'payment_completed' | 'preparing' | 'shipping' | 'delivered' | 'cancelled'> = [
    'delivered', 'delivered', 'delivered', 'delivered',
    'shipping', 'shipping', 'preparing', 'preparing',
    'payment_completed', 'payment_completed', 'payment_pending', 'cancelled',
  ];

  const orders = [];
  for (let i = 0; i < 60; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);

    const customer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const status = statuses[statusIndex];

    // 주문에 포함된 상품 1~3개
    const itemCount = 1 + Math.floor(Math.random() * 3);
    let totalAmount = 0;
    const items: Array<{ productId: string; productName: string; price: number; quantity: number }> = [];

    for (let j = 0; j < itemCount; j++) {
      const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      const quantity = 1 + Math.floor(Math.random() * 2);
      const itemTotal = product.price * quantity;
      totalAmount += itemTotal;
      items.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
      });
    }

    orders.push({
      id: `order-${i}`,
      orderNumber: `ORD-2026-${String(i + 1).padStart(4, '0')}`,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      totalAmount,
      status,
      createdAt: date,
      items,
    });
  }

  return orders;
};

const mockOrders = generateMockOrders();

export class MockDashboardRepository implements IDashboardRepository {
  async getDashboardStats(): Promise<DashboardStats> {
    // 오늘 매출 (오늘 배송 완료된 주문)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySales = mockOrders
      .filter(order => {
        const orderDate = new Date(order.createdAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime() && order.status === 'delivered';
      })
      .reduce((sum, order) => sum + order.totalAmount, 0);

    // 신규 주문 (오늘 생성된 주문)
    const newOrders = mockOrders.filter(order => {
      const orderDate = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    }).length;

    // 신규 고객 (오늘 생성된 고객 - Mock 데이터는 모두 과거 생성으로 봄)
    const newCustomers = 0;

    // 재고 부족 (stock < 10)
    const lowStockProducts = mockProducts.filter(p => p.stock < 10).length;

    return {
      todaySales: Math.max(todaySales, 1850000), // 최소값 보장
      newOrders: Math.max(newOrders, 8),
      newCustomers,
      lowStockProducts,
    };
  }

  async getWeeklySales(): Promise<WeeklySales[]> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const salesByDay: Record<string, number> = {};

    // 7일간 초기화
    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(date.getDate() + i);
      const dayName = days[date.getDay()];
      salesByDay[dayName] = 0;
    }

    // 7일 내 배송 완료된 주문 집계
    mockOrders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);

      if (orderDate >= sevenDaysAgo && order.status === 'delivered') {
        const dayName = days[orderDate.getDay()];
        if (dayName in salesByDay) {
          salesByDay[dayName] += order.totalAmount;
        }
      }
    });

    // 데이터가 너무 적으면 패턴 데이터로 대체
    const hasData = Object.values(salesByDay).some(v => v > 0);
    if (!hasData) {
      return [
        { day: 'Sun', sales: 450000 },
        { day: 'Mon', sales: 620000 },
        { day: 'Tue', sales: 580000 },
        { day: 'Wed', sales: 720000 },
        { day: 'Thu', sales: 890000 },
        { day: 'Fri', sales: 1200000 },
        { day: 'Sat', sales: 950000 },
      ];
    }

    return Object.entries(salesByDay).map(([day, sales]) => ({
      day,
      sales: Math.round(sales),
    }));
  }

  async getCategorySales(): Promise<CategorySales[]> {
    const salesByCategory: Record<string, number> = {};

    // 모든 배송 완료된 주문의 항목별로 카테고리 매출 집계
    mockOrders.forEach(order => {
      if (order.status === 'delivered') {
        order.items.forEach(item => {
          const product = mockProducts.find(p => p.id === item.productId);
          if (product) {
            if (!salesByCategory[product.category]) {
              salesByCategory[product.category] = 0;
            }
            salesByCategory[product.category] += item.price * item.quantity;
          }
        });
      }
    });

    return Object.entries(salesByCategory)
      .map(([name, value]) => ({ name, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value);
  }

  async getRecentOrders(limit: number): Promise<RecentOrder[]> {
    // 최근순 정렬
    const sorted = [...mockOrders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return sorted.slice(0, limit).map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      productName: order.items[0]?.productName || 'Unknown',
      totalAmount: order.totalAmount,
      status: order.status as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
      createdAt: order.createdAt,
    }));
  }
}
