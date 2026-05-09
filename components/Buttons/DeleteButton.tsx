'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import deleteProduct from '@/app/actions/Product/deleteProduct.action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this?')) return;

    setIsDeleting(true);
    try {
      await deleteProduct(id);
      toast.success('Product deleted!');
      router.refresh(); // This updates the Server Component list!
    } catch (error) {
      toast.error('Failed to delete');
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
