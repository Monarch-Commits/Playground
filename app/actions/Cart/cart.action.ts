'use server';

import prisma from '@/app/lib/prisma';
import syncUser from '../User/syncUser.action';
import { redirect } from 'next/navigation';

interface Order {
  productId: string;
  quantity: number;
}

export async function cart({ productId, quantity }: Order) {
  const dbUser = await syncUser();
  if (!dbUser) redirect('/api/auth/login');

  try {
    // ✅ FIXED: userId ang gamit, hindi id
    let carts = await prisma.order.findFirst({
      where: {
        userId: dbUser.id,
        status: 'pending',
      },
    });

    // create cart if none
    if (!carts) {
      carts = await prisma.order.create({
        data: {
          userId: dbUser.id,
          status: 'pending',
        },
      });
    }

    // check existing item
    const existingItem = await prisma.orderItem.findFirst({
      where: {
        orderId: carts.id,
        productId,
      },
    });

    if (existingItem) {
      await prisma.orderItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      await prisma.orderItem.create({
        data: {
          orderId: carts.id,
          productId,
          quantity,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Cart Error:', error);
    return { success: false, error: 'Failed to create cart' };
  }
}
