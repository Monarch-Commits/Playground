'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SyntheticEvent, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Loader2, PlusCircle, Image as ImageIcon } from 'lucide-react';
import upsertProduct from '@/app/actions/Product/create_Update_Product.action';
import { categories } from '@/Constant/Constant';

interface Props {
  product?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    categoryId: string; // sa DB, ID pa rin ang naka-store
  };
}

export default function CreateOrEditProduct({ product }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState<string | undefined>(undefined);
  const [categoryName, setCategoryName] = useState(''); // ngayon name ang ginagamit

  // Auto-fill at reset logic
  useEffect(() => {
    if (isOpen) {
      if (product) {
        setTitle(product.title);
        setDescription(product.description);
        setImageUrl(product.imageUrl);
        setPrice(product.price.toString());
        setProductId(product.id);

        // Auto-select category by matching product.categoryId sa categories array
        const category = categories.find((c) => c.id === product.categoryId);
        setCategoryName(category ? category.name : '');
      } else {
        setTitle('');
        setDescription('');
        setImageUrl('');
        setPrice('');
        setProductId(undefined);
        setCategoryName('');
      }
    }
  }, [product, isOpen]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || !imageUrl || !price || !categoryName) {
      toast.error('Please fill in all fields, including category!');
      return;
    }

    setLoading(true);
    try {
      const result = await upsertProduct({
        id: productId,
        title,
        description,
        imageUrl,
        price: Number(price),
        categoryName, // name ang ipapasa sa server
      });

      if (result.success) {
        toast.success(
          result.wasCreated ? 'Product created!' : 'Product updated!',
        );
        setIsOpen(false);
      } else {
        toast.error('Error saving product');
      }
    } catch (err) {
      console.error(err);
      toast.error('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={product ? 'outline' : 'default'}
          className="z-100 gap-2"
        >
          {product ? (
            'Edit Product'
          ) : (
            <>
              <PlusCircle className="h-4 w-4" /> Create Product
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent
        key={product?.id || 'new-product-form'}
        className="max-h-[95vh] overflow-y-auto sm:max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">
            {productId ? 'Edit Product' : 'New Product'}
          </DialogTitle>
          <DialogDescription>
            {productId
              ? 'Update your product details below.'
              : 'Fill out the details below to add a new product.'}
          </DialogDescription>
        </DialogHeader>

        {/* Image Preview Area */}
        <div className="bg-muted/30 flex flex-col items-center justify-center rounded-lg border border-dashed px-4 py-6">
          {imageUrl && imageUrl.startsWith('http') ? (
            <div className="group/image relative aspect-video w-full overflow-hidden rounded-xl border bg-white shadow-lg">
              <Image
                src={imageUrl}
                alt="Preview"
                fill
                className="object-cover transition-transform duration-500 group-hover/image:scale-105"
                onError={() => toast.error('Invalid Image URL')}
              />
            </div>
          ) : (
            <div className="text-muted-foreground flex flex-col items-center py-6">
              <ImageIcon className="h-10 w-10 opacity-20" />
              <p className="mt-2 text-center text-xs font-medium italic">
                Paste a valid image URL below to see preview
              </p>
            </div>
          )}
          <p className="text-muted-foreground mt-3 text-[10px] font-bold tracking-widest uppercase">
            Image Preview
          </p>
        </div>

        <Separator />

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Red Roses Bouquet"
              disabled={loading}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              disabled={loading}
              required
              className="border-input bg-background focus:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Price (PHP)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="E.g. 1000"
              disabled={loading}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe the product"
              disabled={loading}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              disabled={loading}
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {productId ? 'Updating...' : 'Creating...'}
                </>
              ) : productId ? (
                'Update Product'
              ) : (
                'Create Product'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
