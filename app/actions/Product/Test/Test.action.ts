'use server';

import prisma from '@/app/lib/prisma';

// @/app/actions/Product/getProduct.action
export default async function getProduct(page: number = 1, limit: number = 8) {
  const skip = (page - 1) * limit;

  // Halimbawa gamit ang Prisma:
  const products = await prisma.product.findMany({
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
