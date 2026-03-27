'use client';

import React from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CartPage() {
  const items: CartItem[] = [
    {
      id: 1,
      name: 'Heritage Crimson',
      description: 'Deep Red Roses • Large Bouquet',
      price: 62,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1548094891-c4ba474efd16?q=80&w=600',
    },
    {
      id: 2,
      name: 'White Jasmine',
      description: 'Fragrant White Blooms',
      price: 45,
      quantity: 2,
      image:
        'https://images.unsplash.com/photo-1596003903067-bf5762ad5c19?q=80&w=600',
    },
  ];

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-[#F9FAFB] to-white px-4 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Your Cart 🌿
          </h1>
          <p className="mt-2 text-slate-500">
            Review your selected plants before checkout
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* LEFT: CART ITEMS */}
          <div className="space-y-6 lg:col-span-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md md:flex-row"
              >
                {/* IMAGE */}
                <div className="relative h-32 w-full overflow-hidden rounded-xl bg-slate-100 md:h-32 md:w-32">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 128px"
                  />
                </div>

                {/* INFO */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-semibold">
                      ${item.price.toFixed(2)}
                    </span>

                    {/* QUANTITY */}
                    <div className="flex items-center rounded-full border bg-slate-50 p-1">
                      <button className="px-3 py-1 hover:bg-white">
                        <Minus size={16} />
                      </button>
                      <span className="px-4 text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button className="px-3 py-1 hover:bg-white">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* REMOVE */}
                <button className="text-slate-300 transition hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold">Order Summary</h2>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$12.00</span>
                </div>

                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>-$10.00</span>
                </div>
              </div>

              <div className="my-5 border-t pt-5">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${(subtotal + 12 - 10).toFixed(2)}</span>
                </div>
              </div>

              {/* BUTTON */}
              <button className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-white transition hover:bg-black">
                Checkout
                <ArrowRight size={18} />
              </button>

              <button className="w-full rounded-xl border py-3 text-sm hover:bg-slate-50">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
