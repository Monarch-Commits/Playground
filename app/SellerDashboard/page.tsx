import { Suspense } from 'react';

import ShopSkeleton from '../components/Skeleton/Skeleton';
import Link from 'next/link';
import { categories } from '@/Constant/Constant';
import Child from './Child';
import CreateOrEditProduct from '../components/Buttons/Create';
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;

  // Siguraduhin na ang category ay may default, at ang page ay Number
  const category = params?.category || 'All';
  const page = Number(params?.page) || 1;

  const allCategories = categories;
  return (
    <section className="mx-auto my-10 max-w-7xl px-6 py-16">
      <div className="mb-12 flex justify-between text-start">
        <div>
          <h2 className="mb-4 text-4xl font-bold text-[#1a2b3c]">Shop</h2>
          <p className="text-gray-500">
            Explore our curated collection of fresh seasonal blooms.
          </p>
        </div>

        <CreateOrEditProduct />
      </div>

      {/* Category Container */}
      <div className="scrollbar-hide mb-12 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-start">
        {allCategories.map((c) => (
          <Link
            key={c.id}
            href={`/SellerDashboard?category=${c.name}&page=1`}
            className={`rounded-full px-6 py-2 text-sm whitespace-nowrap transition md:text-base ${
              category === c.name
                ? 'bg-[#ff4d8d] text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <Suspense
        key={`${category}-${page}`}
        fallback={
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <ShopSkeleton />
          </div>
        }
      >
        <Child category={category} page={page} />
      </Suspense>
    </section>
  );
}
