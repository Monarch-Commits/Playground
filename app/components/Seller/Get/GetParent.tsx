import getProduct from '@/app/actions/Product/getProduct.action';
import GetChild from './GetChild';

export default async function GetParent() {
  const data = await getProduct();

  if (!data.length) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center text-center text-gray-500">
        <p className="text-lg font-semibold">No products yet</p>
        <p className="text-sm">Start adding your first flower product 🌸</p>
      </div>
    );
  }

  return (
    <section className="mx-auto mt-10 max-w-7xl px-4">
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Your Products</h1>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
          {data.length} items
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((p) => (
          <GetChild key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
