'use server';

import prisma from '@/app/lib/prisma';

export default async function deleteProduct(id: string) {
  const products = await prisma.product.delete({
    where: { id },
  });
  return products;
}
