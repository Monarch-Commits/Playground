import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { productShop } from '../actions/Product/getProduct.action';
import { categories } from '@/Constant/Constant';

export default async function Child({ category }: { category: string }) {
  const data = await productShop(category);
  const allCategories = [{ id: 'all', name: 'All' }, ...categories];

  return (
    <div>
      {/* Filter Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {allCategories.map((c) => (
            <Link
              key={c.id}
              href={`/Shop?category=${c.name}`}
              className={`rounded-full px-6 py-2 transition ${
                category === c.name
                  ? 'bg-[#ff4d8d] text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {data.length > 0 ? (
          data.map((p) => (
            <div
              key={p.id}
              className="group rounded-3xl border border-gray-100 p-4 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
                <Heart className="absolute top-3 right-3 cursor-pointer text-white hover:fill-red-500" />
              </div>
              <h3 className="font-bold text-[#1a2b3c]">{p.title}</h3>
              <div className="my-1 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mb-4 font-bold text-[#ff4d8d]">
                ₱ {p.price.toLocaleString()}
              </p>
              <button className="w-full rounded-full border border-[#ff4d8d] py-3 text-[#ff4d8d] transition hover:bg-[#ff4d8d] hover:text-white">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Walang nakitang bulaklak sa kategoryang ito.
          </p>
        )}
      </div>
    </div>
  );
}
