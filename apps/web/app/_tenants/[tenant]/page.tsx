import { headers } from 'next/headers';
import { StorefrontHero } from './components/StorefrontHero';
import { ProductsGrid } from './components/ProductsGrid';

function getTenantStorefrontData(tenantId: string) {
  return {
    name: `Maison ${tenantId.toUpperCase()}`,
    description: 'Expérience ultra-premium distribuée.',
    featuredCategories: [{ id: '1', title: 'Haute Couture', slug: 'haute-couture' }],
    featuredProducts: [
      { id: '101', title: 'Chronographe Or Noir', price: 850000, currency: 'XOF', imageUrl: '' },
    ],
  };
}

export default function TenantHomePage({ params }: { params: { tenant: string } }) {
  const storeData = getTenantStorefrontData(params.tenant);
  const headerList = headers();
  const currency = headerList.get('x-currency') || 'XOF';

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-8">
      <StorefrontHero tenantName={storeData.name} description={storeData.description} />
      <ProductsGrid
        products={storeData.featuredProducts}
        tenantId={params.tenant}
        currency={currency}
      />
    </div>
  );
}
