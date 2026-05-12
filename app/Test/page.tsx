'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  stock: number;
  image: string;
};

const initialItems: CartItem[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    description: 'Rare tropical indoor statement plant',
    price: 129,
    quantity: 1,
    stock: 12,
    image:
      'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Olive Tree',
    description: 'Mediterranean luxury botanical piece',
    price: 189,
    quantity: 2,
    stock: 7,
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function Page() {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const updateQuantity = (id: string, type: 'inc' | 'dec') => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (type === 'dec' && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }

        if (type === 'inc') {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 24;
  const tax = 18;
  const total = subtotal + shipping + tax;

  if (!items.length) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl text-center"
        >
          <div className="mb-8">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-50 shadow-lg">
              🌿
            </div>
          </div>

          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-400">
            Luxury Botanical Store
          </p>

          <h1 className="mb-4 text-5xl font-semibold tracking-tight text-neutral-900">
            Your cart feels lonely
          </h1>

          <p className="mb-10 text-lg leading-relaxed text-neutral-500">
            Discover premium plants curated for elegant modern living.
          </p>

          <button className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-4 text-white shadow-[0_15px_40px_rgba(34,197,94,0.35)] transition-all hover:scale-[1.02]">
            Continue Shopping
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-8 lg:px-10">
        {/* HEADER */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-neutral-400">
              Premium Plant Cart
            </p>

            <h1 className="text-5xl font-semibold tracking-tight text-neutral-900 md:text-6xl">
              Shopping Cart
            </h1>
          </div>

          <p className="hidden text-sm text-neutral-400 md:block">
            Elegant botanical shopping experience
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* CART ITEMS */}
          <div className="space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-[32px] border border-white/40 bg-white/80 p-5 shadow-[0_10px_50px_rgba(0,0,0,0.05)] backdrop-blur-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex flex-col gap-6 md:flex-row">
                  {/* IMAGE */}
                  <div className="relative aspect-square h-[240px] overflow-hidden rounded-3xl bg-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
                            {item.name}
                          </h2>

                          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
                            {item.description}
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="inline-flex items-center rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                        In Stock ({item.stock} available)
                      </div>
                    </div>

                    {/* BOTTOM */}
                    <div className="mt-8 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                      {/* QUANTITY */}
                      <div className="flex items-center gap-4 rounded-full border border-neutral-200 bg-white p-2 shadow-sm">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.05 }}
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(item.id, 'dec')
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-all hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Minus size={16} />
                        </motion.button>

                        <span className="min-w-[30px] text-center text-lg font-semibold">
                          {item.quantity}
                        </span>

                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={() =>
                            updateQuantity(item.id, 'inc')
                          }
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white shadow-lg shadow-green-200 transition-all hover:bg-green-700"
                        >
                          <Plus size={16} />
                        </motion.button>
                      </div>

                      {/* PRICE */}
                      <div className="text-right">
                        <p className="text-sm text-neutral-400">
                          Total
                        </p>

                        <p className="text-4xl font-semibold tracking-tight text-neutral-900">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* SUMMARY */}
          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-fit rounded-[32px] border border-white/40 bg-white/70 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-2xl lg:sticky lg:top-8"
          >
            <div className="mb-8">
              <p className="mb-3 text-sm uppercase tracking-[0.25em] text-neutral-400">
                Order Summary
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
                Checkout
              </h2>
            </div>

            {/* PROMO */}
            <div className="mb-8">
              <label className="mb-3 block text-sm font-medium text-neutral-700">
                Promo Code
              </label>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="h-14 flex-1 rounded-2xl border border-white/20 bg-white/60 px-5 outline-none backdrop-blur-xl placeholder:text-neutral-400 focus:border-green-300"
                />

                <button className="rounded-2xl border border-neutral-200 bg-white px-5 font-medium transition-all hover:bg-neutral-100">
                  Apply
                </button>
              </div>
            </div>

            {/* TOTALS */}
            <div className="space-y-5 border-y border-neutral-200 py-8">
              <Row label="Subtotal" value={`$${subtotal}`} />
              <Row label="Shipping" value={`$${shipping}`} />
              <Row label="Tax" value={`$${tax}`} />
            </div>

            <div className="my-8 flex items-center justify-between">
              <span className="text-lg font-medium text-neutral-500">
                Grand Total
              </span>

              <span className="text-4xl font-semibold tracking-tight text-neutral-900">
                ${total}
              </span>
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex h-16 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-lg font-semibold text-white shadow-[0_15px_40px_rgba(34,197,94,0.35)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Secure Checkout
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>

              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.button>

            <p className="mt-5 text-center text-sm leading-relaxed text-neutral-400">
              Secure SSL encrypted premium checkout experience.
            </p>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-neutral-500">{label}</span>

      <span className="font-medium text-neutral-900">
        {value}
      </span>
    </div>
  );
}