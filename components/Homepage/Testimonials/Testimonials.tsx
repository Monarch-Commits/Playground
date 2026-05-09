import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah J.',
    text: "The most beautiful bouquet I've ever received. The fragrance filled my entire home and they stayed fresh for over a week!",
  },
  {
    name: 'Michael T.',
    text: "Excellent service and fast delivery. The 'Midnight Rose' arrangement was even more stunning in person than in photos.",
  },
  {
    name: 'David R.',
    text: 'I used them for my anniversary and my wife was blown away. The packaging feels incredibly luxurious. Highly recommend!',
  },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-white px-6 py-16">
      <div className="mx-auto mb-12 max-w-7xl text-center">
        <h2 className="mb-2 text-4xl font-bold text-[#1a2b3c]">
          What Our Customers Say
        </h2>
        <p className="text-gray-500">
          Kind words from those who chose Petals & Bloom
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Stars */}
            <div className="mb-6 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-[#ff4d8d] text-[#ff4d8d]"
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="mb-6 leading-relaxed text-gray-600 italic">
              &quot;{t.text}&quot;
            </p>

            {/* Author */}
            <p className="font-bold text-[#1a2b3c]">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
