
"use client"
import dynamic from "next/dynamic";

const CreateOrEditProduct = dynamic(
  () => import("../Create/Create"),
  { ssr: false } // Importanteng hindi ito i-SSR
);

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import DeleteButton from '../../Buttons/DeleteButton';


interface User {
  id?: string;
  name: string | null;
  imageUrl: string | null;
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  user: User | null;
}

export default function GetChild({ p }: { p: Project }) {
  return (
    <article className="relative break-inside-avoid mb-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-xl dark:border-gray-700 dark:bg-gray-50">
      
      {/* USER */}
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 border">
          <Image
            src={p.user?.imageUrl || '/default-avatar.png'}
            alt={p.user?.name ? `${p.user.name}'s avatar` : 'User avatar'}
            width={40}
            height={40}
            className="rounded-full"
          />
          <AvatarFallback>{p.user?.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-900 truncate">
          {p.user?.name?.toLowerCase() || 'Unknown User'}
        </span>
      </div>

      {/* TITLE */}
      <h2 className="text-lg font-bold text-gray-900 dark:text-black md:text-xl">{p.title}</h2>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 dark:text-gray-800 line-clamp-3">
        {p.description}
      </p>

      {/* PRICE */}
      <p className="text-sm font-semibold text-green-600 dark:text-green-500">
        ₱ {p.price.toLocaleString()}
      </p>

      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-lg shadow-sm">
        <Image
          src={p.imageUrl}
          alt={p.title || 'Project Image'}
          width={800}
          height={600}
          className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* ACTIONS */}
      <div className="mt-2 flex items-center justify-between">
        <DeleteButton id={p.id} />
        <CreateOrEditProduct product={p} />
      </div>
    </article>
  );
}