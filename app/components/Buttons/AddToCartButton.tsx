'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { cart } from '@/app/actions/Cart/cart.action';

export default function AddToCartButton({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      try {
        const res = await cart({ productId, quantity });

        if (res?.success) {
          toast.success('Added to cart 🛒');
          router.refresh();
        } else {
          toast.error(res?.error || 'Failed to add to cart');
        }
      } catch (error) {
        console.error(error);
        toast.error('Unexpected error occurred');
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending || quantity <= 0}
      className="flex flex-[1.5] items-center justify-center gap-2 rounded-full bg-pink-500 py-4 font-bold text-white shadow hover:bg-pink-600 active:scale-95 disabled:opacity-50"
    >
      <ShoppingCart size={20} />
      {isPending ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
