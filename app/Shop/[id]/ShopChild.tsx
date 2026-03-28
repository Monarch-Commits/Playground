'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Truck, Gift, Star, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/lib/generated/prisma/client';
import AddToCartButton from '@/app/components/Buttons/AddToCartButton';

interface ShopChildProps {
  product: Product | null;
}

export default function ShopChild({ product }: ShopChildProps) {
  const [quantity, setQuantity] = useState(1);

  const decreaseQty = () => setQuantity(Math.max(1, quantity - 1));
  const increaseQty = () => setQuantity(Math.min(99, quantity + 1));

  if (!product)
    return <div className="py-10 text-center text-lg">Product not found</div>;

  return (
    <div className="mx-auto my-12 max-w-7xl overflow-hidden rounded-2xl bg-gray-50 p-6 shadow-sm lg:p-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* LEFT: Carousel */}
        <div className="flex justify-center">
          <Carousel className="w-full max-w-md">
            <CarouselContent>
              <CarouselItem>
                <Card>
                  <CardContent className="relative aspect-square p-4">
                    <Image
                      src={product.imageUrl}
                      alt={product.title || 'Product'}
                      fill
                      className="rounded-2xl object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <div className="mt-2 flex justify-between">
              <CarouselPrevious className="rounded-full bg-white p-2 shadow hover:bg-gray-100" />
              <CarouselNext className="rounded-full bg-white p-2 shadow hover:bg-gray-100" />
            </div>
          </Carousel>
        </div>

        {/* RIGHT: Product Details */}
        <div className="flex flex-col justify-start gap-6">
          {/* Badge */}
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[8px]">
              R
            </span>
            Bestseller {product.id}
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl">
            {product.title}
          </h1>

          {/* Price */}
          <div className="flex justify-between">
            <p className="mb-4 font-bold text-[#ff4d8d]">
              ₱ {product.price.toLocaleString()}
            </p>
            <p className="mb-4 font-bold">Stock: {product.stock} </p>
          </div>

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
            <p className="text-lg text-slate-700">{product.description}</p>
            <p className="text-sm text-gray-500">{product.categoryId}</p>
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
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center font-semibold text-slate-800">
                {quantity}
              </span>
              <button
                onClick={increaseQty}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <AddToCartButton productId={product.id} quantity={quantity} />
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
