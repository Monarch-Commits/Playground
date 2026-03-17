import { Suspense } from 'react';
import getProduct from '@/app/actions/Product/getProduct.action';
import GetChild from './GetChild';
import ShopSkeleton from '../../Skeleton/Skeleton';
import CreateOrEditProduct from '../Create/Create';

export default function GetParent() {
  return (
    <section className="mt-10 w-full px-4 lg:px-12">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Your Products
        </h1>
        <CreateOrEditProduct />
      </header>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <ShopSkeleton />
          </div>
        }
      >
        <ProductGrid />
      </Suspense>
    </section>
  );
}

async function ProductGrid() {
  const data = await getProduct();

  if (!data || data.length === 0) {
    return (
      <div className="mt-20 flex w-full flex-col items-center justify-center text-center text-gray-500">
        <p className="text-lg font-semibold text-gray-900">No products yet</p>
        <p className="text-sm">Start adding your first flower product 🌸</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {data.map((p) => (
        <GetChild key={p.id} p={p} />
      ))}
    </div>
  );
}
