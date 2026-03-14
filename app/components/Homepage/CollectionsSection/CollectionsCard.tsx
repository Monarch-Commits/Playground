// components/Homepage/CollectionsSection/CollectionsCard.tsx
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function CollectionsCard({ p }: { p: Project }) {
  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative h-112.5 w-full overflow-hidden rounded-3xl shadow-lg transition-transform duration-500 group-hover:-translate-y-2">
        <Image src={p.imageUrl} alt={p.title} fill className="object-cover" />
      </div>

      {/* Text Content */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-900">{p.title}</h3>
        <p className="mt-2 line-clamp-2 leading-relaxed text-gray-600">
          {p.description}
        </p>
        <button className="mt-4 flex items-center font-semibold text-rose-500 transition-colors hover:text-rose-600">
          Shop Collection →
        </button>
      </div>
    </div>
  );
}
