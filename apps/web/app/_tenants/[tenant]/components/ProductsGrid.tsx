import React from 'react';
import Link from 'next/link';

interface ProductGridItem {
  id: string;
  title: string;
  price: number;
}

interface ProductsGridProps {
  products: ProductGridItem[];
  tenantId: string;
  currency: string;
}

export function ProductsGrid({ products, tenantId, currency }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {products.map((p) => (
        <div key={p.id} className="border border-white/5 bg-[#12121A]/50 p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-lg">{p.title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-[#C9A84C] font-black">
              {p.price.toLocaleString()} {currency}
            </span>
            <Link
              href={`/_tenants/${tenantId}/products/${p.id}`}
              className="text-xs bg-white text-black px-4 py-2 rounded-lg font-bold"
            >
              Voir
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
