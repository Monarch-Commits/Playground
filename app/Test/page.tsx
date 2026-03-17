import { Suspense } from 'react';
import PaginationControls from './ProductsPage';
import getProduct from '../actions/Product/Test/Test.action';

import ShopSkeleton from '../components/Skeleton/Skeleton';
import GetChild from './Child';

export default async function GetParent({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>; // Gawing Promise ang type
}) {
  // Eto ang magic line! Kailangan i-await ang searchParams
  const resolvedParams = await searchParams;

  // Ngayon, makukuha na natin ang actual na value
  const currentPage = Number(resolvedParams.page) || 1;
  const limit = 3;

  return (
    <section className="mt-10 w-full px-4 lg:px-12">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Your Products
        </h1>
      </header>

      {/* Siguraduhin na ang key ay ang currentPage para mag-refresh ang Suspense */}
      <Suspense
        key={currentPage}
        fallback={
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ShopSkeleton />
          </div>
        }
      >
        <ProductGrid currentPage={currentPage} limit={limit} />
      </Suspense>
    </section>
  );
}

async function ProductGrid({
  currentPage,
  limit,
}: {
  currentPage: number;
  limit: number;
}) {
  const { products, totalCount } = await getProduct(currentPage, limit);
  const totalPages = Math.ceil(totalCount / limit);

  if (!products.length) return <p>No products found.</p>;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
        {products.map((p) => (
          <GetChild key={p.id} p={p} />
        ))}
      </div>

      {/* Pagination UI */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={currentPage < totalPages}
        hasPrevPage={currentPage > 1}
      />
    </>
  );
}
