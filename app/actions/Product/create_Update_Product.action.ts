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
  id?: string;
  categoryName: string; // changed from categoryId
}

export default async function upsertProduct({
  id,
  imageUrl,
  title,
  description,
  price,
  categoryName,
}: Product) {
  const dbUser = await syncUser();
  if (!dbUser) redirect('/api/auth/login');

  // Hanapin ang category id gamit ang name
  const category = await prisma.category.findUnique({
    where: { name: categoryName },
  });

  if (!category) throw new Error('Invalid category');

  try {
    let result;

    if (id) {
      // Update existing product
      result = await prisma.product.update({
        where: { id },
        data: {
          title,
          description,
          imageUrl,
          price: Math.floor(price),
          categoryId: category.id,
        },
      });
    } else {
      // Create new product
      result = await prisma.product.create({
        data: {
          userId: dbUser.id,
          title,
          description,
          imageUrl,
          price: Math.floor(price),
          categoryId: category.id,
        },
      });
    }

    revalidatePath('/Shop');
    revalidatePath('/SellerDashboard');
    return { success: true, data: result, wasCreated: !id };
  } catch (error) {
    console.error('Failed to create/update product:', error);
    throw error;
  }
}

// para may laman na category agad
export async function ensureCategories() {
  const count = await prisma.category.count();

  if (count === 0) {
    await prisma.category.createMany({
      data: [
        { id: 'bouquets', name: 'Bouquets' },
        { id: 'birthday', name: 'Birthday' },
        { id: 'wedding', name: 'Wedding' },
        { id: 'anniversary', name: 'Anniversary' },
        { id: 'funeral', name: 'Funeral' },
      ],
    });
  }
}
