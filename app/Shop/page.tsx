import Child from './Child';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params?.category || 'All';

  return (
    <section className="mx-auto my-10 max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-bold text-[#1a2b3c]">
          Shop All Flowers
        </h2>
        <p className="text-gray-500">
          Explore our curated collection of fresh seasonal blooms.
        </p>
      </div>

      <Child category={category} />
    </section>
  );
}
