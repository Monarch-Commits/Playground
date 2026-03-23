'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Truck, Gift, Star, Minus, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id;
  const gallery = [
    { id: 1, src: '/image1.jpg', alt: 'Main Red Rose' },
    { id: 2, src: '/image2.jpg', alt: 'Rose Petals' },
    { id: 3, src: '/image3.jpg', alt: 'White Roses' },
    { id: 4, src: '/image4.jpg', alt: 'Peach Roses' },
  ];

  const [selectedImage, setSelectedImage] = useState(gallery[0].src);
  const [quantity, setQuantity] = useState(1);

  const decreaseQty = () => setQuantity(Math.max(1, quantity - 1));
  const increaseQty = () => setQuantity(Math.min(99, quantity + 1));

  return (
    <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gray-50 p-4 shadow-sm lg:p-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* LEFT: Main Image + Gallery */}
        <div className="space-y-6">
          {/* Main Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-sm">
            <Image
              src={selectedImage}
              alt="Bouquet"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2">
            {gallery.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img.src)}
                className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
                  selectedImage === img.src
                    ? 'border-pink-500 ring-2 ring-pink-100'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Details */}
        <div className="flex flex-col justify-start gap-6">
          {/* Badge */}
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[8px]">
              R
            </span>
            Bestseller {productId}
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl font-bold text-slate-900 md:text-5xl">
            Red Rose Romance Bouquet
          </h1>

          {/* Price */}
          <p className="text-2xl font-semibold text-pink-600">$45.00</p>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex text-pink-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm text-gray-500 underline hover:text-pink-500">
              48 Reviews
            </span>
          </div>

          {/* Description */}
          <div className="space-y-2 text-gray-600">
            <p className="text-lg text-slate-700">
              A luxurious arrangement of deep crimson roses, hand-selected for
              their velvet texture and exquisite fragrance.
            </p>
            <p className="text-sm text-gray-500">
              Wrapped in premium cream paper and finished with a sage green silk
              ribbon, our signature Red Rose Romance Bouquet conveys timeless
              love.
            </p>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="mb-2 block text-xs font-bold tracking-wider text-gray-400 uppercase">
              Quantity
            </label>
            <div className="flex w-fit items-center rounded-full border border-gray-200 px-2 py-1.5">
              <button
                onClick={decreaseQty}
                disabled={quantity === 1}
                className="rounded-full p-2 hover:bg-gray-100 disabled:opacity-30"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center font-semibold text-slate-800">
                {quantity}
              </span>
              <button
                onClick={increaseQty}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="flex flex-[1.5] items-center justify-center gap-2 rounded-full bg-pink-500 py-4 font-bold text-white shadow hover:bg-pink-600 active:scale-95">
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className="flex-1 rounded-full border-2 border-pink-500 py-4 font-bold text-pink-500 hover:bg-pink-50 active:scale-95">
              Buy Now
            </button>
          </div>

          {/* Shipping Info */}
          <div className="space-y-5 rounded-2xl border border-gray-100 bg-gray-50 p-5">
            <div className="flex gap-4">
              <div className="h-fit rounded-lg bg-white p-2 shadow-sm">
                <Truck className="text-slate-400" size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Same Day Delivery
                </p>
                <p className="text-xs text-gray-500">
                  Order within 2h 45m for delivery today in NYC area.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-fit rounded-lg bg-white p-2 shadow-sm">
                <Gift className="text-slate-400" size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Free Packaging
                </p>
                <p className="text-xs text-gray-500">
                  Includes handwritten card and premium gift box.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
