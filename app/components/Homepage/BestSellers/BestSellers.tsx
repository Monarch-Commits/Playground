import { getBestSellers } from '@/app/actions/Product/getProduct.action';

import Link from 'next/link';
import BestSellersCard from './BestSellersChild';

export default async function BestSellersSection() {
  const bestSell = await getBestSellers();

  return (
    // Ginawa nating w-full at tinanggal ang max-w-7xl
    <section className="w-full px-4 py-12 sm:px-8">
      <div className="mb-10 flex flex-col items-end justify-between gap-3 sm:flex-row">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-[#1a2b3c]">
            Best Selling Bouquets
          </h2>
          <p className="mt-2 text-gray-500">
            Our customers&apos; most-loved choices this week.
          </p>
        </div>
        <Link
          href="/Shop"
          className="text-sm font-bold text-[#ff4d8d] hover:underline"
        >
          View All Products
        </Link>
      </div>

      {/* Siguraduhing w-full din ang grid */}
      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
        {bestSell?.map((bs) => (
          <BestSellersCard key={bs.id} bs={bs} />
        ))}
      </div>
    </section>
  );
}
