'use server';

import prisma from '@/app/lib/prisma';
import syncUser from '../User/syncUser.action';
import { redirect } from 'next/navigation';

interface OrderInput {
  productId: string;
  quantity: number;
}

export async function cart({ productId, quantity }: OrderInput) {
  const dbUser = await syncUser();
  if (!dbUser) redirect('/api/auth/login');

  // ✅ validation
  if (!productId || quantity <= 0) {
    return { success: false, error: 'Invalid input' };
  }

  try {
    return await prisma.$transaction(async (tx) => {
      // ✅ get product
      const product = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return { success: false, error: 'Product not found' };
      }

      // ✅ stock check
      if (product.stock < quantity) {
        return { success: false, error: 'Not enough stock' };
      }

      // ✅ UPSERT CART (no duplicates, atomic)
      const cart = await tx.order.upsert({
        where: {
          userId_status: {
            userId: dbUser.id,
            status: 'pending',
          },
        },
        update: {},
        create: {
          userId: dbUser.id,
          status: 'pending',
        },
      });

      // ✅ UPSERT ORDER ITEM (no duplicates, atomic)
      await tx.orderItem.upsert({
        where: {
          orderId_productId: {
            orderId: cart.id,
            productId,
          },
        },
        update: {
          quantity: {
            increment: quantity,
          },
        },
        create: {
          orderId: cart.id,
          productId,
          quantity,
        },
      });

      // ✅ (optional) update total
      await tx.order.update({
        where: { id: cart.id },
        data: {
          total: {
            increment: product.price * quantity,
          },
        },
      });

      return {
        success: true,
        message: 'Added to cart',
        cartId: cart.id,
      };
    });
  } catch (error) {
    console.error('Cart Error:', error);
    return { success: false, error: 'Failed to add to cart' };
  }
}

export async function getCart() {
  const dbUser = await syncUser();
  if (!dbUser) redirect('/api/auth/login');

  try {
    const cart = await prisma.order.findFirst({
      where: {
        userId: dbUser.id,
        status: 'pending',
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // ✅ TRANSFORM DATA
    const formattedItems =
      cart?.items?.map((item) => ({
        id: item.id,
        name: item.product.title,
        description: item.product.description,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.imageUrl,
      })) || [];

    return {
      success: true,
      data: formattedItems,
    };
  } catch (error) {
    console.error('Get Cart Error:', error);
    return {
      success: false,
      error: 'Failed to fetch cart',
    };
  }
}
