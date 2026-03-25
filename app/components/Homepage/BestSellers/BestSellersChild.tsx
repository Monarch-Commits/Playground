import Image from 'next/image';

interface BestSell {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}

export default function BestSellersCard({ bs }: { bs: BestSell }) {
  return (
    <div className="group cursor-pointer">
      {/* Container ng Image na may saktong rounding */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-[2.5rem] bg-gray-50">
        <Image
          src={bs.imageUrl}
          alt={bs.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-80"
          priority={false}
        />
      </div>

      {/* Text Content */}
      <div className="px-1">
        <h3 className="leading-tight font-bold text-[#1a2b3c] transition-colors group-hover:text-pink-600">
          {bs.title}
        </h3>
        <p className="mt-1.5 text-sm font-semibold text-[#ff4d8d] md:text-lg">
          ${bs.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
