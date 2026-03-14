import Image from 'next/image';
import React from 'react'; // Kung gagamit ng React.Fragment o Hooks

export default function ModernHeroSection() {
  return (
    // Isang modernong full-screen hero na may gradient overlay at centered content
    <section className="relative my-20 flex h-screen w-full items-center justify-center overflow-hidden bg-gray-50 p-6 md:p-12">
      {/* Background Image - Mas malaki at center-focused, na may subtle overlay */}
      <Image
        src="/flowers.png" // Palitan ito ng mas modernong flower image
        alt="Lush, modern floral arrangement"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Semi-transparent overlay for better text readability and modern feel */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Content - Naka-center, mas malaki ang text, at mas minimalist ang buttons */}
      <div className="relative z-10 max-w-3xl px-4 text-center">
        <h1 className="animate-fade-in-up text-5xl leading-tight font-extrabold text-white drop-shadow-lg md:text-7xl">
          Blooms for <br className="hidden md:block" /> Every Story
        </h1>
        <p className="animate-fade-in-up mt-6 text-xl text-white opacity-90 drop-shadow delay-200 md:mt-8 md:text-2xl">
          Handcrafted beauty, delivered fresh to your door.
        </p>
        <div className="animate-fade-in-up mt-10 flex flex-col justify-center gap-4 delay-400 sm:flex-row">
          <button className="transform rounded-full bg-white px-10 py-4 text-lg font-semibold text-gray-900 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-100">
            Shop Our Collections
          </button>
          <button className="transform rounded-full border border-white px-10 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-white hover:text-gray-900">
            Discover More
          </button>
        </div>
      </div>
    </section>
  );
}
