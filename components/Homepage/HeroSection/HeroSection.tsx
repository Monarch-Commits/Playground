import Image from 'next/image';
import { ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';

export default function PlantHero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white text-gray-900">
      {/* Subtle Background Glow */}
      <div className="absolute -top-37.5 -left-25 h-100 w-100 rounded-full bg-green-100 blur-[100px]" />
      <div className="absolute -right-25 -bottom-37.5 h-100 w-100 rounded-full bg-emerald-100 blur-[100px]" />

      {/* MAIN */}
      <div className="relative grid flex-1 grid-cols-1 px-6 pt-28 pb-20 md:grid-cols-2 md:px-20">
        {/* LEFT TEXT */}
        <div className="z-20 flex flex-col justify-center">
          <span className="mb-4 text-xs tracking-[0.3em] text-gray-500 uppercase">
            Nature, Delivered
          </span>

          <h1 className="mb-6 text-4xl leading-tight font-semibold md:text-6xl">
            Bring Nature <br />
            <span className="text-green-600">Closer</span>
          </h1>

          <p className="max-w-md text-base text-gray-600 md:text-lg">
            Transform your home into a calm, living sanctuary with plants that
            breathe life into every corner.
          </p>

          {/* CTA */}
          <button className="group mt-10 flex w-fit items-center gap-3 rounded-full bg-green-600 px-6 py-3 text-white shadow-md transition-all hover:scale-105 hover:bg-green-700">
            <span className="font-medium">Shop Collection</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative mt-10 flex items-center justify-center md:mt-0">
          <div className="absolute h-[80%] w-[85%] rounded-[50%] bg-green-400/50 shadow-xl blur-[60px]" />
          {/* Plant Image */}
          <div className="relative z-10">
            <Image
              src="/plants/imageforhero.png"
              alt="Plant"
              width={600}
              height={700}
              priority
              className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="relative z-30 flex flex-col items-center justify-between gap-6 border-t border-gray-200 px-6 py-6 md:flex-row md:px-20">
        <p className="max-w-lg text-sm text-gray-500">
          Easy-care plants designed to elevate your mood and create a peaceful
          environment in your home.
        </p>

        <div className="flex items-center gap-3">
          {[Facebook, Instagram, Twitter].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-green-600 hover:text-white"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
