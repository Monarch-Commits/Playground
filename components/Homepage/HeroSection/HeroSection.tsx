'use client';

import Image from 'next/image';
import { ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';

export default function PlantHero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden text-[#1d1d1f]">
      <div className="relative flex flex-1 flex-col items-center px-6 pt-20 pb-16 text-center">
        {/* OVERLINE */}
        <span className="mb-4 text-[12px] font-bold tracking-[0.15em] text-neutral-500 uppercase sm:text-[14px]">
          Nature, Delivered.
        </span>

        {/* HERO TITLE */}
        <h1 className="max-w-4xl text-[44px] leading-[1.05] font-bold tracking-tight sm:text-[64px] md:text-[80px]">
          Bring Nature <br className="hidden sm:block" />
          <span className="bg-gradient-to-b from-green-500 to-emerald-700 bg-clip-text text-transparent">
            Closer to You.
          </span>
        </h1>

        {/* SUBHEAD */}
        <p className="mt-8 max-w-xl text-[19px] leading-relaxed text-neutral-500 sm:text-[21px]">
          Transform your home into a calm, living sanctuary with plants that
          breathe life into every corner.
        </p>

        {/* CTA BUTTONS - Apple uses pill shape and clean text */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <button className="group flex items-center gap-2 rounded-full bg-[#0071e3] px-8 py-3.5 text-[17px] font-semibold text-white transition-all hover:bg-[#0077ed] active:scale-95">
            Shop Collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="#"
            className="text-[17px] font-medium text-[#0066cc] underline-offset-4 hover:underline"
          >
            Learn more &gt;
          </a>
        </div>

        {/* HERO IMAGE - Centered and Large */}
        <div className="relative mt-16 w-full max-w-[800px] md:mt-24">
          {/* Subtle Shadow/Glow underneath plant */}
          <div className="absolute inset-0 mx-auto h-[80%] w-[60%] rounded-full bg-green-200/30 blur-[80px]" />

          <div className="relative z-10">
            <Image
              src="/plants/imageforhero.png"
              alt="Premium Plant"
              width={800}
              height={900}
              priority
              className="mx-auto object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.12)]"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER STRIP */}
      <div className="relative z-30 border-t border-neutral-200/60 bg-white/40 px-6 py-8 backdrop-blur-md md:px-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
          <p className="max-w-md text-center text-[14px] leading-relaxed text-neutral-500 md:text-left">
            Easy-care plants designed to elevate your mood and create a peaceful
            environment in your home. Perfect for every lifestyle.
          </p>

          {/* SOCIALS - Clean circles */}
          <div className="flex items-center gap-5">
            {[Facebook, Instagram, Twitter].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-all hover:border-neutral-900 hover:text-neutral-900"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
