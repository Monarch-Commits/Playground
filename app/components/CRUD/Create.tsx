'use client'

import createProduct from '@/app/actions/Product/createProduct.action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CreateProductForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description || !imageUrl || !price) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const result = await createProduct({
        title,
        description,
        imageUrl,
        price: Number(price),
      });

      if (result.success) {
        toast.success("Product created successfully!");
        setTitle("");
        setDescription("");
        setImageUrl("");
        setPrice("");
      } else {
        toast.error( "Error creating product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 w-full max-w-3xl">
        <div className="grid gap-2">
          <label htmlFor="title">Project Title</label>
          <Input
            id="title"
            placeholder="E.g. E-commerce Dashboard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="description">Project Description</label>
          <Input
            id="description"
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="imageUrl">Project Image URL</label>
          <Input
            id="imageUrl"
            placeholder="https://..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="price">Project Price</label>
          <Input
            id="price"
            placeholder="E.g. 1000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="min-w-30">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
            </>
          ) : (
            <>Create</>
          )}
        </Button>
      </form>
    </>
  );
}