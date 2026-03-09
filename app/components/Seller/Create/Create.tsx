"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SyntheticEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Loader2, PlusCircle, Image as ImageIcon } from "lucide-react";
import upsertProduct from "@/app/actions/Product/create_Update_Product.action";

interface Props {
  product?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
  };
}

export default function CreateOrEditProduct({ product }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState<string | undefined>(undefined);

  // Kung may existing product (edit mode), i-fill ang states
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setImageUrl(product.imageUrl);
      setPrice(product.price.toString());
      setProductId(product.id);
      setIsOpen(false);
    }
  }, [product]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || !imageUrl || !price) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const result = await upsertProduct({
        id: productId || "",
        title,
        description,
        imageUrl,
        price: Number(price),
      });

      if (result.success) {
        toast.success(result.wasCreated ? "Product created!" : "Product updated!");
        // Reset form only if it was create
        if (result.wasCreated) {
          setTitle("");
          setDescription("");
          setImageUrl("");
          setPrice("");
        }
        setIsOpen(false);
      } else {
        toast.error("Error saving product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <PlusCircle className="h-4 w-4" /> {productId ? "Edit Product" : "Create Product"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">
            {productId ? "Edit Product" : "New Product"}
          </DialogTitle>
          <DialogDescription>
            {productId ? "Update your project details below." : "Fill out the details below to add a new project."}
          </DialogDescription>
        </DialogHeader>

        {/* Image Preview */}
        <div className="bg-muted/30 flex flex-col items-center justify-center rounded-lg border border-dashed py-6 px-4">
          {imageUrl && imageUrl.startsWith("http") ? (
            <div className="group/image w-full overflow-hidden rounded-xl shadow-lg border bg-white">
              <Image
                src={imageUrl}
                alt="Preview"
                width={800}
                height={600}
                priority
                className="h-auto w-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                onError={() => toast.error("Invalid Image URL")}
              />
            </div>
          ) : (
            <div className="text-muted-foreground flex flex-col items-center">
              <ImageIcon className="h-10 w-10 opacity-20" />
              <p className="mt-2 text-xs font-medium italic text-center">
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
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. E-commerce Dashboard"
              disabled={loading}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Project Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe the project"
              disabled={loading}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Project Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              disabled={loading}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Project Price (PHP)</Label>
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

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {productId ? "Updating..." : "Creating..."}
                </>
              ) : (
                productId ? "Update Product" : "Create Product"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}