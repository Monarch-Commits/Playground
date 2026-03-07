"use server";

import prisma from "@/app/lib/prisma";
import syncUser from "../User/syncUser.action";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface Product {
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}

export default async function createProduct({ imageUrl, title, description, price }: Product) {
  const user = await syncUser()
  if(!user) redirect("/api/auth/login")

  try {
    const newProduct = await prisma.product.create({
      data: {
        userId: user.id,
        imageUrl,
        title,
        description,
        price: Math.floor(price),
      },
    });
    revalidatePath("/")

    return {success: true, data: newProduct};
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
}