import { Suspense } from 'react';
import { getCart } from '../actions/Cart/cart.action';
import CartPage from './CartPage';

export type CartItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};

// 🔥 Server fetch separated for Suspense
async function CartData() {
  const res = await getCart();

  const items: CartItem[] =
    res?.data?.map((item: CartItem) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })) || [];

  return <CartPage items={items} />;
}

export default function Page() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#F9FAFB] to-white px-4 py-30 md:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <h1 className="text-4xl font-semibold md:text-5xl">Your Cart 🌿</h1>
          <p className="mt-2 text-slate-500">Review your selected items</p>
        </header>
      </div>
      <Suspense
        fallback={
          <div className="p-10 text-center text-gray-500">Loading cart...</div>
        }
      >
        <CartData />
      </Suspense>
    </div>
  );
}
