'use server';

import prisma from '@/app/lib/prisma';
import syncUser from '../User/syncUser.action';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// ADD TO CART
export async function addToCart(productId: string) {
  const user = await syncUser();
  if (!user) redirect('/api/auth/login');

  try {
    await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!product) throw new Error('Product not found');

      let cart = await tx.cart.findUnique({
        where: { userId: user.id },
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { userId: user.id },
        });
      }

      await tx.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
        update: {
          quantity: { increment: 1 },
        },
        create: {
          cartId: cart.id,
          productId,
          quantity: 1,
        },
      });
    });

    revalidatePath('/cart');

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to add to cart' };
  }
}

// GET CART
export async function getCart() {
  const user = await syncUser();
  if (!user) throw new Error('Unauthorized');

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    return {
      success: true,
      items: cart?.items ?? [],
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to fetch cart', items: [] };
  }
}

// INCREASE QTY
export async function increaseQuantity(productId: string) {
  const user = await syncUser();
  if (!user) throw new Error('Unauthorized');

  try {
    await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { userId: user.id },
      });

      if (!cart) return;

      await tx.cartItem.update({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
        data: {
          quantity: { increment: 1 },
        },
      });
    });

    revalidatePath('/cart');
  } catch (error) {
    console.error(error);
  }
}

// DECREASE QTY
export async function decreaseQuantity(productId: string) {
  const user = await syncUser();
  if (!user) throw new Error('Unauthorized');

  try {
    await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { userId: user.id },
      });

      if (!cart) return;

      const item = await tx.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
      });

      if (!item) return;

      if (item.quantity <= 1) {
        await tx.cartItem.delete({
          where: {
            cartId_productId: {
              cartId: cart.id,
              productId,
            },
          },
        });
      } else {
        await tx.cartItem.update({
          where: {
            cartId_productId: {
              cartId: cart.id,
              productId,
            },
          },
          data: {
            quantity: { decrement: 1 },
          },
        });
      }
    });

    revalidatePath('/cart');
  } catch (error) {
    console.error(error);
  }
}

// REMOVE ITEM
export async function removeItem(productId: string) {
  const user = await syncUser();
  if (!user) throw new Error('Unauthorized');

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  if (!cart) return;

  await prisma.cartItem.delete({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  revalidatePath('/cart');
}
