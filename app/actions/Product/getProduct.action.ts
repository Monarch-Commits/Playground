'use server';

import prisma from '@/app/lib/prisma';

import { redirect } from 'next/navigation';
import syncUser from '../User/syncUser.action';

export default async function getProduct(page: number = 1, limit: number = 8) {
  const user = await syncUser();
  if (!user) redirect('/api/auth/login');
  const skip = (page - 1) * limit;

  // Halimbawa gamit ang Prisma:
  const products = await prisma.product.findMany({
    where: { userId: user.id },
    include: {
      user: true, // Isasama ang user information
      category: true, // Isasama ang category information
    },
    skip: skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

  const totalCount = await prisma.product.count();

  return { products, totalCount };
}

export async function Collections() {
  // 2. Fetch products for that user only
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
    console.log('Fetched products:', products);
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

export async function getBestSellers() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
    });
    console.log('Fetched getBestSellers:', products);
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

// app/actions/Product/getProduct.action.ts
export async function productShop(category?: string) {
  try {
    const products = await prisma.product.findMany({
      where:
        category && category !== 'All'
          ? { category: { name: { equals: category, mode: 'insensitive' } } }
          : undefined,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}
