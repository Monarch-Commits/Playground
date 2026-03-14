import { Truck, Flower2, Gift, BadgeCheck } from 'lucide-react';

const perks = [
  {
    icon: <Truck className="h-6 w-6 text-[#ff4d8d]" />,
    title: 'Same Day Delivery',
    description: 'Order by 12 PM for same day delivery',
  },
  {
    icon: <Flower2 className="h-6 w-6 text-[#ff4d8d]" />,
    title: 'Fresh Farm Flowers',
    description: 'Directly sourced for longest vase life',
  },
  {
    icon: <Gift className="h-6 w-6 text-[#ff4d8d]" />,
    title: 'Perfect Packaging',
    description: 'Elegant boxes and personalized cards',
  },
  {
    icon: <BadgeCheck className="h-6 w-6 text-[#ff4d8d]" />,
    title: 'Trusted Choice',
    description: '10k+ five-star reviews from happy customers',
  },
];

export default function Features() {
  return (
    <section className="w-full bg-[#fdf2f5] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon Circle Container */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                {perk.icon}
              </div>

              {/* Text Content */}
              <h3 className="mb-1 text-lg font-bold text-[#1a2b3c]">
                {perk.title}
              </h3>
              <p className="max-w-50 text-sm leading-relaxed text-gray-500">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
