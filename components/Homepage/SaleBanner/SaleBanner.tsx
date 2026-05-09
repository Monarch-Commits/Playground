export default function SaleBanner() {
  return (
    <section className="w-full px-6 py-12">
      <div className="flex flex-col items-center justify-between rounded-[2rem] bg-[#e94b79] p-8 shadow-lg md:flex-row md:p-12">
        {/* Text Content */}
        <div className="mb-6 text-white md:mb-0">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            Spring Flower Sale
          </h2>
          <p className="text-lg text-pink-100">
            Get <span className="font-bold text-white">20% off</span> selected
            bouquets throughout the season.
          </p>
        </div>

        {/* Action Button */}
        <button className="rounded-full bg-white px-8 py-3 font-bold text-[#e94b79] shadow-md transition-all duration-300 hover:bg-gray-100">
          Shop Sale
        </button>
      </div>
    </section>
  );
}
