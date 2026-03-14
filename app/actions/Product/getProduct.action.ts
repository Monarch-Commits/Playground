'use server';

import prisma from '@/app/lib/prisma';
import syncUser from '../User/syncUser.action';
import { redirect } from 'next/navigation';

export default async function getProduct() {
  // 1. Get current Kinde user
  const user = await syncUser();
  if (!user) redirect('/api/auth/login');

  // 2. Fetch products for that user only
  try {
    const products = await prisma.product.findMany({
      where: { userId: user.id }, // only current user's products
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
    });
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

export async function getPublicProduct() {
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
  // 1. Kunin ang Top 4 na pinakamabenta
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
