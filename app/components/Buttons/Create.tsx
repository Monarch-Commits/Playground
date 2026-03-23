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
import { Loader2, PlusCircle, SquarePen } from 'lucide-react';
import upsertProduct from '@/app/actions/Product/create_Update_Product.action';
import { categories } from '@/Constant/Constant';

interface Props {
  product?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string; // existing URL lang
    price: number;
    categoryId: string;
  };
}

export default function CreateOrEditProduct({ product }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // string for preview
  const [imageFile, setImageFile] = useState<File | null>(null); // actual file
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState<string | undefined>(undefined);
  const [categoryName, setCategoryName] = useState('');

  // Auto-fill at reset logic
  useEffect(() => {
    if (isOpen) {
      if (product) {
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price.toString());
        setProductId(product.id);
        setImageFile(null); // no File object for existing product
        setImageUrl(product.imageUrl); // preview

        const category = categories.find((c) => c.id === product.categoryId);
        setCategoryName(category ? category.name : '');
      } else {
        setTitle('');
        setDescription('');
        setImageFile(null);
        setImageUrl('');
        setPrice('');
        setProductId(undefined);
        setCategoryName('');
      }
    }
  }, [product, isOpen]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate: require File only if new product
    if (!title || !description || !price || !categoryName) {
      toast.error('Please fill in all fields, including category!');
      return;
    }
    if (!productId && !imageFile) {
      toast.error('Image is required for new product!');
      return;
    }

    setLoading(true);
    try {
      const result = await upsertProduct({
        id: productId,
        title,
        description,
        price: Number(price),
        categoryName,
        imageUrl: imageFile || undefined, // File only if new
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
          className="z-50 gap-2"
        >
          {product ? (
            <SquarePen size={16} color="#1354ec" strokeWidth={2.25} />
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              <span className="hidden lg:flex">Create Product</span>
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

        {/* Image Preview */}
        <div className="bg-muted/30 flex flex-col items-center justify-center rounded-lg border border-dashed px-4 py-6">
          {imageUrl ? (
            <div className="relative h-60 w-full overflow-hidden rounded-xl border bg-white shadow-lg">
              <Image
                src={imageUrl}
                alt="Preview"
                fill
                className="object-cover object-center"
              />
            </div>
          ) : (
            <div className="text-muted-foreground flex flex-col items-center py-6">
              <span className="opacity-20">No image</span>
            </div>
          )}
          <p className="text-muted-foreground mt-3 text-[10px] font-bold tracking-widest uppercase">
            Image Preview
          </p>
        </div>

        <Separator />

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Title */}
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

          {/* Category */}
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

          {/* Price */}
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

          {/* Description */}
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

          {/* Image Upload */}
          <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                  setImageUrl(URL.createObjectURL(e.target.files[0]));
                }
              }}
              required={!productId} // required only for new product
            />
          </div>

          {/* Submit */}
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
