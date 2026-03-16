// app/collections/page.tsx (o kung saan man ito nakalagay)
import { Collections } from '@/app/actions/Product/getProduct.action';
import CollectionsCard from './CollectionsCard';
// I-import ang card component

export default async function CollectionParent() {
  const data = await Collections();

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      {/* Header - Dito lang dapat nakalagay, hindi sa loob ng map() */}
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Our Curated Collections
        </h2>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-rose-500" />
      </div>

      {/* Grid - Dito ang tamang pag-loop ng mga items */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((p) => (
          <CollectionsCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
