'use server';

import prisma from '@/app/lib/prisma';

import { redirect } from 'next/navigation';
import syncUser from '../User/syncUser.action';

// SELLER
export default async function getProduct(page: number = 1, limit: number = 10) {
  const user = await syncUser();
  if (!user) redirect('/api/auth/login');

  const skip = (page - 1) * limit;

  const [products, totalCount] = await Promise.all([
    prisma.product.findMany({
      where: { userId: user.id },
      include: { user: true, category: true },
      skip: skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({
      where: { userId: user.id },
    }),
  ]);

  return { products, totalCount };
}

// SHOP
export async function productShop(
  category?: string,
  page: number = 1,
  limit: number = 1,
) {
  try {
    const skip = (page - 1) * limit;
    const whereClause =
      category && category !== 'All'
        ? {
            category: {
              name: { equals: category, mode: 'insensitive' as const },
            },
          }
        : {};

    // Sabay na patakbuhin ang pagkuha ng data at pagbilang (Optimization)
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        include: { category: { select: { name: true } } },
        skip: skip,
        take: limit,
      }),
      prisma.product.count({ where: whereClause }),
    ]);

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Database Error:', error);
    return { products: [], total: 0, page: 1, totalPages: 0 };
  }
}

// COLLECTIONS
export async function Collections() {
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
