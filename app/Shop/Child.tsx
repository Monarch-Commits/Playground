// Alisin ang 'use client' – gagawin nating Server Component ito
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { productShop } from '../actions/Product/getProduct.action';

interface ChildProps {
  category: string;
  page?: number; // Idagdag ang page prop
}

export default async function Child({ category, page = 1 }: ChildProps) {
  // 1. Fetch data diretso sa server
  const { products, totalPages } = await productShop(category, page);

  return (
    <>
      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p.id}
              className="group rounded-3xl border border-gray-100 p-4 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  className="object-cover transition group-hover:scale-105"
                />
                <Heart className="absolute top-3 right-3 cursor-pointer text-white transition hover:fill-red-500" />
              </div>
              <h3 className="truncate font-bold text-[#1a2b3c]">{p.title}</h3>
              <div className="my-1 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mb-2 line-clamp-2 h-10 text-sm text-gray-600">
                {p.description}
              </p>
              <p className="mb-4 font-bold text-[#ff4d8d]">
                ₱ {p.price.toLocaleString()}
              </p>

              <Link href={`/Shop/${p.id}`}>
                <button className="w-full rounded-full border border-[#ff4d8d] py-2 font-medium text-[#ff4d8d] transition hover:bg-[#ff4d8d] hover:text-white">
                  Add to Cart
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full py-20 text-center text-gray-500">
            Walang nakitang bulaklak sa kategoryang ito.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-4">
          <Link
            href={`/Shop?category=${category}&page=${Math.max(1, page - 1)}`}
            className={`rounded-lg border px-4 py-2 ${page <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50'}`}
          >
            Previous
          </Link>
          <span className="flex items-center font-medium">
            Page {page} of {totalPages}
          </span>
          <Link
            href={`/Shop?category=${category}&page=${Math.min(totalPages, page + 1)}`}
            className={`rounded-lg border px-4 py-2 ${page >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50'}`}
          >
            Next
          </Link>
        </div>
      )}
    </>
  );
}
