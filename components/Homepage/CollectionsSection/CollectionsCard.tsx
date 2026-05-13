// components/Homepage/CollectionsSection/CollectionsCard.tsx

import Image from 'next/image';
import Link from 'next/link';
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export default function CollectionsCard({ p }: { p: Project }) {
  return (
    <div className="group flex flex-col items-start">
      {/* Image Container - DITO ANG MAGIC */}
      {/* 1. `aspect-[1536/1024]` o `aspect-[3/2]`: Ito ang nagse-set ng tamang proporsyon.
        2. `w-full`: Sinisiguradong puno ang lapad ng grid column.
        3. Tinanggal ang fixed `h-112.5`.
        4. `bg-gray-100`: Nagsisilbing loading placeholder background.
      */}
      <div className="relative aspect-1536/1024 w-full overflow-hidden rounded-3xl bg-gray-100 shadow-md transition-shadow duration-300 group-hover:shadow-xl">
        <Image
          src={p.image}
          alt={p.title}
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        {/* Opsyonal: Subtle overlay sa hover para mas lumutang ang text (kung may text sa ibabaw) */}
        <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Text Content */}
      <div className="mt-6 w-full">
        <h3 className="text-2xl leading-tight font-semibold text-gray-950 transition-colors group-hover:text-rose-600">
          {p.title}
        </h3>

        {/* `line-clamp-2` ay maganda para mapanatiling pantay-pantay ang taas ng mga card */}
        <p className="mt-3 line-clamp-2 text-base leading-relaxed text-gray-600">
          {p.description}
        </p>

        {/* Modernong Button Style */}
        <Link
          href={`/Shop?category=${encodeURIComponent(p.title)}&page=1`}
          className="group/btn mt-5 flex items-center gap-2 text-sm font-semibold text-rose-500"
        >
          <span className="relative">
            Shop Collection
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-rose-500 transition-all duration-300 group-hover/btn:w-full"></span>
          </span>

          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
