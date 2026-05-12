'use client';

import Image from 'next/image';
import { useMemo, useState, useTransition } from 'react';
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from '@/app/actions/Cart/cart.action';
import { Minus, Plus, Trash2 } from 'lucide-react';

type CartItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    stock: number;
  };
};

export default function CartPage({
  initialItems,
}: {
  initialItems: CartItem[];
}) {
  const [items, setItems] = useState(initialItems);
  const [, startTransition] = useTransition();

  const total = useMemo(() => {
    return items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }, [items]);

  const inc = (productId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.quantity < item.product.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
    startTransition(() => increaseQuantity(productId));
  };

  const dec = (productId: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
    startTransition(() => decreaseQuantity(productId));
  };

  const remove = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
    startTransition(() => removeItem(productId));
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
          <span className="text-4xl">🛒</span>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Your bag is empty
        </h2>

        <p className="mt-2 max-w-65 text-sm text-neutral-500">
          Add premium plants and décor to build your collection.
        </p>

        <button className="mt-8 rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition active:scale-95">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-visible bg-[#f5f5f7] px-4 pt-8 pb-40 sm:px-6">
      {/* soft background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-pink-200/30 blur-[120px]" />
        <div className="absolute -right-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-blue-200/30 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-neutral-400 uppercase">
            Shopping Bag
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Your Items
          </h1>
        </div>

        {/* ITEMS */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="group flex gap-4 rounded-3xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-md transition hover:shadow-md sm:p-5"
            >
              {/* IMAGE */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 sm:h-28 sm:w-28">
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  fill
                  className={`object-cover transition group-hover:scale-105 ${
                    item.product.stock === 0 ? 'opacity-50 grayscale' : ''
                  }`}
                />
              </div>

              {/* INFO */}
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-base font-semibold text-neutral-900 sm:text-lg">
                      {item.product.title}
                    </h2>

                    <p
                      className={`mt-1 text-xs font-medium ${
                        item.product.stock - item.quantity > 0
                          ? 'text-neutral-500'
                          : 'text-red-500'
                      }`}
                    >
                      {item.product.stock - item.quantity > 0
                        ? `${item.product.stock - item.quantity} in stock`
                        : 'Out of stock'}
                    </p>
                  </div>

                  <button
                    onClick={() => remove(item.product.id)}
                    className="rounded-full bg-neutral-100 p-2 text-neutral-500 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* bottom row */}
                <div className="mt-4 flex items-center justify-between">
                  {/* qty */}
                  <div className="flex items-center rounded-full bg-neutral-100 p-1">
                    <button
                      onClick={() => dec(item.product.id)}
                      disabled={item.quantity <= 1}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm disabled:opacity-30"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="min-w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => inc(item.product.id)}
                      disabled={item.quantity >= item.product.stock}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm disabled:opacity-30"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* price */}
                  <div className="text-right">
                    <p className="text-base font-semibold text-neutral-900">
                      ₱{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CHECKOUT */}
        {/* CHECKOUT */}
        <div className="sticky bottom-0 z-50 mt-10 border-t border-white/30 bg-white/70 backdrop-blur-xl sm:rounded-3xl sm:border">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:px-6">
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-neutral-400 uppercase">
                Total
              </p>
              <p className="text-2xl font-bold text-neutral-900">
                ₱{total.toLocaleString()}
              </p>
            </div>

            <button className="rounded-full bg-black px-10 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 active:scale-95">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
