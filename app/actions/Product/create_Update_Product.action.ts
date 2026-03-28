'use server';
import prisma from '@/app/lib/prisma';
import syncUser from '../User/syncUser.action';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import cloudinary from '@/lib/cloudinary';

interface Product {
  imageUrl?: File;
  title: string;
  description: string;
  price: number;
  id?: string;
  stock: number;
  categoryName: string;
}

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export default async function upsertProduct({
  id,
  imageUrl,
  title,
  description,
  stock,
  price,
  categoryName,
}: Product) {
  const dbUser = await syncUser();
  if (!dbUser) redirect('/api/auth/login');

  const category = await prisma.category.findUnique({
    where: { name: categoryName },
  });
  if (!category) throw new Error('Invalid category');

  let finalImageUrl: string | undefined;

  // Conditional Upload
  if (imageUrl && imageUrl.size > 0) {
    const arrayBuffer = await imageUrl.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: 'e-commerce flower products' },
            (error, result) => {
              if (error) reject(error);
              else if (!result) reject(new Error('Cloudinary upload failed'));
              else resolve(result as CloudinaryUploadResult);
            },
          )
          .end(buffer);
      },
    );
    finalImageUrl = uploadResult.secure_url;
  }

  try {
    let result;

    if (id) {
      // UPDATE
      result = await prisma.product.update({
        where: { id },
        data: {
          title,
          description,
          stock: Math.floor(stock),
          price: Math.floor(price),
          categoryId: category.id,
          ...(finalImageUrl && { imageUrl: finalImageUrl }),
        },
      });
    } else {
      // CREATE
      if (!finalImageUrl) throw new Error('Image is required for new products');

      result = await prisma.product.create({
        data: {
          userId: dbUser.id,
          title,
          description,
          imageUrl: finalImageUrl,
          stock: Math.floor(stock),
          price: Math.floor(price),
          categoryId: category.id,
        },
      });
    }

    // Tawagin ito para sa parehong Create at Update
    revalidatePath('/Shop');
    revalidatePath('/SellerDashboard');
    revalidatePath('/');

    return {
      success: true,
      data: result,
      wasCreated: !id, // true kung walang id (create), false kung meron (update)
    };
  } catch (error) {
    console.error('Upsert Error:', error);
    return { success: false, error: 'Failed to save product' };
  }
}

// para may laman na category agad
export async function ensureCategories() {
  const count = await prisma.category.count();

  if (count === 0) {
    await prisma.category.createMany({
      data: [
        // 🌿 Plant Curated Collections
        { id: 'indoor', name: 'Indoor Plants' },
        { id: 'outdoor', name: 'Outdoor Plants' },
        { id: 'beginner', name: 'Beginner Friendly' },
        { id: 'low-maintenance', name: 'Low Maintenance' },
        { id: 'flowering', name: 'Flowering Plants' },
        { id: 'air-purifying', name: 'Air Purifying Plants' },
        { id: 'small-space', name: 'Small Space Plants' },
        { id: 'pet-friendly', name: 'Pet Friendly Plants' },
      ],
    });
  }
}
