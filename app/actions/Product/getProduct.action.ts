'use server';

import prisma from '@/app/lib/prisma';
import { redirect } from 'next/navigation';
import syncUser from '../User/syncUser.action';
import { Prisma } from '@/lib/generated/prisma/client';

// SELLER PRODUCT
export async function getSellerProduct(
  category?: string,
  page: number = 1,
  limit: number = 5,
) {
  const user = await syncUser();
  if (!user) redirect('/api/auth/login');

  try {
    const skip = (page - 1) * limit;

    const whereClause: Prisma.ProductWhereInput = {
      userId: user.id,
      ...(category &&
        category !== 'All' && {
          category: { name: { equals: category, mode: 'insensitive' } },
        }),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        include: {
          category: { select: { name: true } },
          user: true,
        },
        skip,
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

// SHOP
export async function productShop(
  category?: string,
  page: number = 1,
  limit: number = 10,
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

// HOME BEST SELLERS
export async function getBestSellers() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
    });
    console.log('Fetched getBestSellers:', products);
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}
