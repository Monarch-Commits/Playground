'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
export type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};
interface Props {
  items?: CartItem[];
}

export default function CartPage({ items = [] }: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);

  // ➕ INCREASE
  const increaseQty = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // ➖ DECREASE
  const decreaseQty = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  // 🗑 REMOVE
  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 💰 SUBTOTAL
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* ITEMS */}
      <div className="space-y-6 lg:col-span-8">
        {cartItems.length === 0 && (
          <p className="text-slate-500">Your cart is empty 🌱</p>
        )}

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-5 rounded-2xl border bg-white p-5 shadow-sm md:flex-row"
          >
            <div className="relative h-32 w-full md:w-32">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="rounded-xl object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-slate-500">{item.description}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold">${item.price.toFixed(2)}</span>

                <div className="flex items-center rounded-full border bg-slate-50 p-1">
                  <button onClick={() => decreaseQty(item.id)} className="px-3">
                    <Minus size={16} />
                  </button>

                  <span className="px-4 text-sm">{item.quantity}</span>

                  <button onClick={() => increaseQty(item.id)} className="px-3">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <button onClick={() => removeItem(item.id)}>
              <Trash2 className="text-slate-400 hover:text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="lg:col-span-4">
        <div className="sticky top-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold">Order Summary</h2>

          <div className="space-y-3 text-sm">
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

          <div className="mt-5 flex justify-between border-t pt-5 text-lg font-semibold">
            <span>Total</span>
            <span>${(subtotal + 12 - 10).toFixed(2)}</span>
          </div>

          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-white">
            Checkout <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
