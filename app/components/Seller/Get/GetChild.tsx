'use client';
import dynamic from 'next/dynamic';

const CreateOrEditProduct = dynamic(() => import('../Create/Create'), {
  ssr: false,
});

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import DeleteButton from '../../Buttons/DeleteButton';

interface User {
  id?: string;
  name: string | null;
  imageUrl: string | null;
}

interface Category {
  id: string;
  name: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  price: number;
  user: User | null;
  category: Category | null;
}

export default function GetChild({ p }: { p: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-xl">
      {/* IMAGE */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={p.imageUrl}
          alt={p.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* CATEGORY BADGE */}
        {p.category && (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow">
            {p.category.name}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-3 p-4">
        {/* USER */}
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border">
            <Image
              src={p.user?.imageUrl || '/default-avatar.png'}
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
            <AvatarFallback>
              {p.user?.name?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>

          <span className="text-sm text-gray-600">
            {p.user?.name || 'Unknown'}
          </span>
        </div>

        {/* TITLE */}
        <h2 className="line-clamp-1 text-lg font-bold text-gray-900">
          {p.title}
        </h2>

        {/* DESCRIPTION */}
        <p className="line-clamp-2 text-sm text-gray-600">{p.description}</p>

        {/* PRICE */}
        <div className="text-lg font-bold text-green-600">
          ₱ {p.price.toLocaleString()}
        </div>

        {/* ACTIONS */}
        <div className="z-10 mt-3 flex items-center justify-between border-t pt-3">
          <DeleteButton id={p.id} />
          <CreateOrEditProduct product={p} />
        </div>
      </div>
    </article>
  );
}
