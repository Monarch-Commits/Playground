import { Mail } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="w-full bg-white px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        {/* Mail Icon */}
        <div className="mb-4 flex justify-center">
          <Mail className="h-8 w-8 text-[#ff4d8d]" />
        </div>

        {/* Title and Subtitle */}
        <h2 className="mb-3 text-3xl font-bold text-[#1a2b3c]">
          Join Our Bloom Club
        </h2>
        <p className="mb-8 text-gray-500">
          Subscribe to receive floral care tips, first access to new
          collections, and special treats.
        </p>

        {/* Form Container */}
        <form className="flex flex-col justify-center gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full rounded-full border border-gray-200 px-6 py-3 transition-all focus:ring-2 focus:ring-[#ff4d8d] focus:outline-none sm:w-96"
            required
          />
          <button
            type="submit"
            className="rounded-full bg-[#ff4d8d] px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-[#e64075]"
          >
            Subscribe Now
          </button>
        </form>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-gray-400">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </section>
  );
}
