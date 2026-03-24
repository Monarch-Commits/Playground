import prisma from '@/app/lib/prisma';
import ShopChild from './ShopChild';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return <div>No ID provided!</div>;
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return <div>Product not found</div>;

  return <ShopChild product={product} />;
}
