'use client';

import { addToCart } from '@/app/actions/Cart/cart.action';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

export default function AddToCartButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleAdd = () => {
    startTransition(async () => {
      try {
        const res = await addToCart(productId);

        if (res?.success === false) {
          toast.error(res.error || 'Failed to add to cart');
          return;
        }

        toast.success('Added to cart 🛒');
      } catch (error) {
        console.error(error);
        toast.error('Server error');
      }
    });
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isPending}
      className="w-full rounded-full border border-[#ff4d8d] py-3 text-sm font-semibold text-[#ff4d8d] transition hover:bg-[#ff4d8d] hover:text-white"
    >
      {isPending ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
