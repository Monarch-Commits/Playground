import { Suspense } from 'react';
import ShopSkeleton from '../components/Skeleton/Skeleton';
import GetChild from './GetChild';
import PaginationControls from './ProductsPage'; // Siguraduhing tama ang import name nito
import getProduct from '@/app/actions/Product/getProduct.action';
import CreateOrEditProduct from '../components/Buttons/Create';

export default async function GetParent({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = (await searchParams) || {};
  const currentPage = Number(resolvedParams?.page) || 1;
  const limit = 4;

  // Kinukuha natin ang data dito para makuha ang totalCount para sa Header.
  // Huwag mag-alala sa performance; nire-reuse ng Next.js ang request na ito (Memoization).
  const { totalCount } = await getProduct(currentPage, limit);

  return (
    <section className="mx-auto my-10 max-w-7xl px-6 py-16">
      <div className="mb-12 flex items-center justify-between border-b pb-6">
        <div>
          <h2 className="text-4xl font-bold text-[#1a2b3c]">Your Shop</h2>
          <p className="mt-2 text-sm font-medium text-gray-500">
            You have a total of{' '}
            <span className="font-bold text-blue-600">{totalCount}</span>{' '}
            products
          </p>
        </div>
        <CreateOrEditProduct />
      </div>

      <Suspense
        key={currentPage}
        fallback={
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <ShopSkeleton />
          </div>
        }
      >
        <ProductGrid currentPage={currentPage} limit={limit} />
      </Suspense>
    </section>
  );
}

// Child Component
async function ProductGrid({
  currentPage,
  limit,
}: {
  currentPage: number;
  limit: number;
}) {
  const { products, totalCount } = await getProduct(currentPage, limit);
  const totalPages = Math.ceil(totalCount / limit);

  if (products.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-gray-400">No products found in your shop.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
        {products.map((p) => (
          <GetChild key={p.id} p={p} />
        ))}
      </div>

      {/* Pagination UI */}
      <div className="mt-12">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={currentPage < totalPages}
          hasPrevPage={currentPage > 1}
        />
      </div>
    </>
  );
}
