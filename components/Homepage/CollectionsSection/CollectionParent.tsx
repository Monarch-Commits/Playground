// app/collections/page.tsx (o kung saan man ito nakalagay)
import CollectionsCard from './CollectionsCard';
// Tiyakin na ang CuratedCollections ay may tamang datos
import { CuratedCollections } from '@/Constant/Constant';

export default function CollectionParent() {
  return (
    // Ginawang bg-white o bg-slate-50 para sa malinis na background
    <section className="mx-auto max-w-7xl bg-white px-6 py-24 sm:py-32">
      {/* Header - Mas malinis at modernong typography */}
      <div className="mb-20 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
          Our Curated Collections
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Explore our handpicked selection of premium items designed for modern
          living.
        </p>
        {/* Opsyonal: Pwede mong tanggalin ang divider kung gusto mo ng ultra-minimalist */}
        <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-rose-500" />
      </div>

      {/* Grid - Nadagdagan ang gap para sa mas "airy" na pakiramdam */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
        {CuratedCollections.map((p) => (
          <CollectionsCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
