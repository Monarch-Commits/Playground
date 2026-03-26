import Image from 'next/image';

interface BestSell {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}

export default function BestSellersCard({ bs }: { bs: BestSell }) {
  return (
    <div
      key={bs.id}
      className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white/70 p-4 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      {/* 🔥 Badge */}
      <span className="absolute top-4 left-4 z-10 rounded-full bg-[#ff4d8d] px-3 py-1 text-xs font-semibold text-white shadow">
        Best Seller
      </span>

      {/* 🖼 Image */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl">
        <Image
          src={bs.imageUrl}
          alt={bs.title}
          fill
          sizes="(max-width: 768px) 100vw, 20vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        {/* 🌫 Gradient overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      {/* 📝 Content */}
      <div className="space-y-2">
        <h3 className="truncate text-sm font-semibold text-gray-800">
          {bs.title}
        </h3>

        <p className="text-sm font-bold text-[#ff4d8d]">
          ₱ {bs.price.toLocaleString()}
        </p>
      </div>

      {/* ✨ Glow Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-pink-200/20 via-transparent to-purple-200/20 blur-xl" />
      </div>
    </div>
  );
}
