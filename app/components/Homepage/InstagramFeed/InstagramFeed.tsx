import Image from 'next/image';
import Link from 'next/link';

const feedImages = [
  { id: 1, src: '/InstagramFeed/image1.jpg', alt: 'Flower story 1' },
  { id: 2, src: '/InstagramFeed/image2.jpg', alt: 'Flower story 2' },
  { id: 3, src: '/InstagramFeed/image3.jpg', alt: 'Flower story 3' },
  { id: 4, src: '/InstagramFeed/image4.jpg', alt: 'Flower story 4' },
  { id: 5, src: '/InstagramFeed/image5.jpg', alt: 'Flower story 5' },
  { id: 6, src: '/InstagramFeed/image6.jpg', alt: 'Flower story 6' },
];

export default function InstagramFeed() {
  return (
    <section className="w-full px-6 py-16">
      {/* Header */}
      <div className="mx-auto mb-8 flex max-w-7xl items-center justify-between">
        <h2 className="text-3xl font-bold text-[#1a2b3c]">
          Follow Our Flower Story
        </h2>
        <Link
          href="https://instagram.com/petalsandbloom"
          className="font-semibold text-[#ff4d8d] hover:underline"
        >
          @petalsandbloom ↗
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {feedImages.map((img) => (
          <div
            key={img.id}
            className="relative aspect-square overflow-hidden bg-gray-100"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="cursor-pointer object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
