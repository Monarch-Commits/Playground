import Image from 'next/image';
import { ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';

export default function PlantHero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-linear-to-br from-[#1a3c34] via-[#2d5a4c] to-[#a3d9a5] font-sans text-white">
      {/* Main Content */}
      <div className="relative grid flex-1 grid-cols-1 pt-24 pb-32 md:grid-cols-2 md:pt-24 md:pb-0">
        {/* Left Side: Text */}
        <div className="z-20 flex flex-col justify-center px-8 md:pl-20">
          <span className="mb-4 text-sm font-medium tracking-[0.2em] uppercase opacity-90">
            Nature, Delivered.
          </span>
          <h1 className="mb-6 text-4xl leading-[1.1] font-bold md:text-7xl">
            Bring Nature <br /> Closer
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-white/80">
            Turn your home into a living sanctuary with our curated plant
            collection.
          </p>

          <button className="group mt-10 flex w-fit items-center gap-4 rounded-full border border-white/10 bg-white/5 p-1.5 pr-8 transition-all hover:bg-orange-400">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-400 text-white transition-colors group-hover:bg-white group-hover:text-orange-400">
              <ArrowRight className="h-5 w-5" />
            </span>
            <span className="font-semibold">Shop Now</span>
          </button>
        </div>

        {/* Right Side: Featured Image */}
        <div className="relative flex items-end justify-center pt-10 md:pt-0">
          <div className="absolute right-0 bottom-0 h-[85%] w-full rounded-tl-[120px] bg-[#c8e6c9]/20 backdrop-blur-sm md:w-[90%]" />
          <div className="relative z-10 w-full max-w-175">
            <Image
              src="/plants/s.png"
              alt="Featured Plant"
              width={700}
              height={800}
              className="translate-y-10 object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-105 md:translate-y-20"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer Strip */}
      <div className="relative z-30 flex w-full flex-col md:flex-row">
        {/* Small Preview Box */}
        <div className="hidden w-1/4 items-center justify-center rounded-tr-[60px] bg-[#a3d9a5] py-6 md:flex">
          <div className="group relative h-24 w-40 overflow-hidden rounded-2xl bg-white/20 p-2">
            <Image
              src="/plants/plant33.png"
              alt="Small Plant Preview"
              fill
              className="scale-150 object-contain pt-4 transition-transform group-hover:rotate-6"
            />
          </div>
        </div>

        {/* Dark Info Bar */}
        <div className="flex flex-1 flex-col items-center justify-between gap-6 bg-[#132a24] px-10 py-8 md:flex-row md:py-0">
          <p className="max-w-lg text-sm leading-relaxed font-light text-white/70">
            Discover easy-care, handpicked plants that brighten your space,
            boost your mood, and make every corner feel alive.
          </p>

          <div className="flex items-center gap-4">
            {[Facebook, Instagram, Twitter].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-all hover:bg-white hover:text-[#132a24]"
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
