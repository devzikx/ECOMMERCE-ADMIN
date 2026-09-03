import { RecentOrder } from '@/core/domain/entities/dashboard';
import Link from 'next/link';

interface RecentOrdersTableProps {
  orders: RecentOrder[];
}

const statusConfig: Record<string, { label: string; bgColor: string; textColor: string }> = {
  pending: { label: '대기중', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  processing: { label: '처리중', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
  shipped: { label: '배송중', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
  delivered: { label: '완료', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  cancelled: { label: '취소', bgColor: 'bg-red-100', textColor: 'text-red-800' },
};

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">최근 주문</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                주문번호
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                고객명
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                상품명
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                결제금액
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                배송상태
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                일시
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.map(order => {
              const status = statusConfig[order.status];
              return (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-blue-600 hover:text-blue-800">
                    <Link href={`/admin/orders/${order.id}`}>{order.orderNumber}</Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{order.productName}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">
                    ₩{order.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${status.bgColor} ${status.textColor}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {order.createdAt.toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="px-6 py-8 text-center text-slate-500">
          <p>주문 데이터가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
