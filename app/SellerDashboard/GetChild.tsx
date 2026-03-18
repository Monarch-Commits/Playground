// Alisin ang 'use client' dito
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import DeleteButton from '../components/Buttons/DeleteButton';
import CreateOrEditProduct from '../components/Buttons/Create'; // Direct import

// Interface definition (mananatili ito)
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  price: number;
  user: { name: string | null; imageUrl: string | null } | null;
  category: { id: string; name: string } | null;
}

export default function GetChild({ p }: { p: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-xl">
      {/* IMAGE - Server Rendered */}
      <div className="relative h-56 w-full overflow-hidden">
        <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl">
          <Image
            src={p.imageUrl}
            alt={p.title}
            fill
            sizes="(max-width: 768px) 100vw, 20vw"
            className="object-cover transition group-hover:scale-105"
          />
        </div>
        {p.category && (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow">
            {p.category.name}
          </span>
        )}
      </div>

      {/* CONTENT - Server Rendered */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <Avatar size="sm" className="border">
            {p.user?.imageUrl ? (
              <Image
                src={p.user.imageUrl}
                alt="avatar"
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <AvatarFallback>{p.user?.name?.charAt(0) || 'U'}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm text-gray-600">
            {p.user?.name?.toLowerCase() || 'Unknown'}
          </span>
        </div>

        <h2 className="line-clamp-1 text-lg font-bold text-gray-900">
          {p.title}
        </h2>
        <p className="line-clamp-2 text-sm text-gray-600">{p.description}</p>
        <div className="text-lg font-bold text-green-600">
          ₱ {p.price.toLocaleString()}
        </div>

        {/* ACTIONS - Dito papasok ang "islands" ng interactivity */}
        <div className="z-10 mt-3 flex items-center justify-between border-t pt-3">
          <DeleteButton id={p.id} />
          <CreateOrEditProduct product={p} />
        </div>
      </div>
    </article>
  );
}
