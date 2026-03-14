'use server';

import prisma from '@/app/lib/prisma';
import syncUser from '../User/syncUser.action';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface Product {
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  id: string;
}

export default async function upsertProduct({
  id,
  imageUrl,
  title,
  description,
  price,
}: Product) {
  const dbUser = await syncUser();
  if (!dbUser) redirect('/api/auth/login');

  try {
    const result = await prisma.product.upsert({
      where: { id: id || '' },
      update: {
        title,
        description,
        imageUrl,
        price: Math.floor(price),
      },
      create: {
        userId: dbUser.id,
        title,
        description,
        imageUrl,
        price: Math.floor(price),
      },
    });
    revalidatePath('/');

    return { success: true, data: result, wasCreated: !id };
  } catch (error) {
    console.error('Failed to create product:', error);
    throw error;
  }
}
