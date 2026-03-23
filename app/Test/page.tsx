'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Heart,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id;

  // Mock data - sa actual, kukunin mo ito sa API gamit ang productId
  const product = {
    name: 'Red Rose Romance Bouquet',
    price: 45.0,
    rating: 4.8,
    reviews: 48,
    description:
      'A luxurious arrangement of deep crimson roses, hand-selected for their velvet texture and exquisite fragrance.',
    subDescription:
      'Wrapped in premium cream paper and finished with a sage green silk ribbon, our signature bouquet conveys timeless love.',
    images: [
      '/image1.jpg', // Palitan ng path ng images mo
      '/image2.jpg',
      '/image3.jpg',
      '/image4.jpg',
    ],
  };

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* LEFT COLUMN: IMAGES */}
          <div className="flex flex-col gap-4">
            {/* Main Image Container (Portrait 4:5) */}
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2.5rem] bg-gray-50 shadow-sm transition-all">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Floating Wishlist Button */}
              <button className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all hover:bg-white active:scale-90">
                <Heart size={20} className="text-gray-900" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-start gap-4 px-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`relative h-24 w-20 overflow-hidden rounded-2xl border-2 transition-all ${
                    mainImage === img
                      ? 'border-[#FA2B91] ring-4 ring-pink-50'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILS */}
          <div className="flex flex-col py-4">
            {/* Breadcrumb / Category */}
            <nav className="mb-6 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
              <span>Home</span>
              <span className="h-1 w-1 rounded-full bg-gray-300"></span>
              <span>Shop</span>
              <span className="h-1 w-1 rounded-full bg-gray-300"></span>
              <span className="text-[#FA2B91]">Bestseller {productId}</span>
            </nav>

            {/* Title & Price */}
            <div className="mb-8 space-y-4">
              <h1 className="font-serif text-5xl leading-[1.1] font-bold text-slate-900 md:text-6xl">
                {product.name}
              </h1>
              <div className="flex items-center gap-6">
                <span className="text-3xl font-semibold text-[#FA2B91]">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
                  <div className="flex text-pink-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < 4 ? 'currentColor' : 'none'}
                        stroke="currentColor"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-400 underline decoration-gray-200 underline-offset-4">
                    {product.reviews} Reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10 max-w-md space-y-4">
              <p className="text-lg leading-relaxed text-slate-600">
                {product.description}
              </p>
              <p className="text-sm leading-relaxed text-gray-400">
                {product.subDescription}
              </p>
            </div>

            {/* Selection Area */}
            <div className="mb-10 space-y-8">
              {/* Quantity */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                  Quantity
                </label>
                <div className="flex w-fit items-center gap-2 rounded-full border border-gray-100 bg-gray-50/50 p-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:bg-gray-50 active:scale-90 disabled:opacity-50"
                    disabled={quantity === 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:bg-gray-50 active:scale-90"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="group relative flex-2 overflow-hidden rounded-full bg-[#FA2B91] py-5 font-bold text-white shadow-xl shadow-pink-200 transition-all hover:bg-[#D12E7B] active:scale-[0.98]">
                  <div className="flex items-center justify-center gap-3">
                    <ShoppingCart
                      size={20}
                      className="transition-transform group-hover:-translate-y-1"
                    />
                    <span>Add to Cart</span>
                  </div>
                </button>
                <button className="flex-1 rounded-full border-2 border-[#FA2B91] py-5 font-bold text-[#FA2B91] transition-all hover:bg-pink-50 active:scale-[0.98]">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust Badges / Logistics */}
            <div className="grid grid-cols-1 gap-4 rounded-3xl border border-gray-100 bg-gray-50/50 p-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2.5 text-[#FA2B91] shadow-sm">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Fast Delivery
                  </h4>
                  <p className="mt-1 text-[11px] leading-tight text-gray-500">
                    Order in 2h 45m for todays delivery.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2.5 text-green-500 shadow-sm">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Freshness Guranteed
                  </h4>
                  <p className="mt-1 text-[11px] leading-tight text-gray-500">
                    Hand-picked and delivered in 24h.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
