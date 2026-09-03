'use client';

import { BestSellerProduct } from '@/core/domain/entities/dashboard';

interface BestSellerTableProps {
  products: BestSellerProduct[];
}

export default function BestSellerTable({ products }: BestSellerTableProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        베스트셀러 TOP 5
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">
                순위
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">
                상품명
              </th>
              <th className="text-right py-3 px-4 font-semibold text-slate-700">
                판매량
              </th>
              <th className="text-right py-3 px-4 font-semibold text-slate-700">
                매출액
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-slate-100">
                <td className="py-3 px-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                    {product.rank}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-900">{product.name}</td>
                <td className="py-3 px-4 text-right text-slate-700">
                  {product.quantity.toLocaleString()}개
                </td>
                <td className="py-3 px-4 text-right text-slate-900 font-semibold">
                  ₩{product.revenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
