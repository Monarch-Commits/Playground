'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Slide = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: 'Bring Nature Into Your Space',
    description:
      'Transform your home into a calm, a living sanctuary with curated indoor plants.',
    image: '/plants/plant11.png',
  },
  {
    id: 2,
    title: 'Elevate Your Living Environment',
    description:
      'Modern greenery designed to complement architecture and lifestyle.',
    image: '/plants/plant22.png',
  },
  {
    id: 3,
    title: 'A Breath of Fresh Design',
    description:
      'Minimal, elegant, and timeless plant collections for your space.',
    image: '/plants/plant33.png',
  },
];

export default function Hero() {
  const [index, setIndex] = useState<number>(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const current = slides[index];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0f1a14] text-white">
      {/* 1. Background Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-green-900/20 via-transparent to-black/40" />

      {/* 2. Diagonal Design Layer */}
      <div className="clip-diagonal absolute inset-0 bg-[#16241c]/70 backdrop-blur-md" />

      <div className="relative z-10 flex h-full flex-col lg:flex-row">
        {/* LEFT CONTENT AREA */}
        <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-6"
            >
              <h1 className="text-4xl leading-tight font-semibold md:text-6xl">
                {current.title}
              </h1>

              <p className="max-w-lg text-gray-300">{current.description}</p>

              <div className="flex gap-4">
                <button className="rounded-2xl bg-green-600 px-6 py-3 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-500 hover:shadow-green-500/30">
                  Shop Now
                </button>

                <button className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/10">
                  Explore Collection
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT IMAGE AREA */}
        <div className="relative w-full lg:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.image}
              initial={{ opacity: 0, x: 100, scale: 1.1 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 1 }}
              className="relative h-full w-full"
            >
              <Image
                src={current.image}
                alt="Featured Plant Collection"
                fill
                className="object-cover"
                priority
              />

              {/* Bottom Gradient Overlay for readability and depth */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full transition-all ${
              i === index
                ? 'scale-125 bg-green-400'
                : 'bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
