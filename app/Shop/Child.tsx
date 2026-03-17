'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { productShop } from '../actions/Product/getProduct.action';
import { categories } from '@/Constant/Constant';
import { useEffect, useState } from 'react';
import ShopSkeleton from '../components/Skeleton/Skeleton';

interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  category: { name: string };
}

export default function Child({ category }: { category: string }) {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const res = await productShop(category);
      setData(res);
      setIsLoading(false);
    }
    fetchProducts();
  }, [category]);

  const allCategories = categories;

  return (
    <div>
      {/* Filter Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* Desktop Buttons */}
        <div className="hidden gap-2 md:flex">
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

        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <select
            value={category}
            onChange={(e) => {
              window.location.href = `/Shop?category=${e.target.value}`;
            }}
            className="rounded-lg border border-gray-300 px-4 py-2"
          >
            {allCategories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {isLoading ? (
          <ShopSkeleton />
        ) : data.length > 0 ? (
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
              <p className="line-clamp-2 text-sm text-gray-600">
                {p.description}
              </p>
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
