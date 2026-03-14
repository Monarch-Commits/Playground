import Link from 'next/link';
import { Medal, Camera, Globe } from 'lucide-react'; // Halimbawa ng icons

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white px-6 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Branding Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-[#ff4d8d]">Petals & Bloom</h3>
          <p className="text-sm leading-relaxed text-gray-500">
            We believe that every moment is worth celebrating. Our mission is to
            bring beauty and joy into your home through the power of fresh,
            ethically sourced flowers.
          </p>
          <div className="flex gap-3">
            <div className="cursor-pointer rounded-full bg-pink-50 p-2 text-[#ff4d8d]">
              <Medal size={18} />
            </div>
            <div className="cursor-pointer rounded-full bg-pink-50 p-2 text-[#ff4d8d]">
              <Camera size={18} />
            </div>
            <div className="cursor-pointer rounded-full bg-pink-50 p-2 text-[#ff4d8d]">
              <Globe size={18} />
            </div>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="mb-6 text-xs font-bold tracking-wider text-[#1a2b3c] uppercase">
            Shop
          </h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li>
              <Link href="#" className="hover:text-[#ff4d8d]">
                All Bouquets
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#ff4d8d]">
                Monthly Subscriptions
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#ff4d8d]">
                Gift Cards
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#ff4d8d]">
                Wedding Florals
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#ff4d8d]">
                Care Guide
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="mb-6 text-xs font-bold tracking-wider text-[#1a2b3c] uppercase">
            Support
          </h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li>
              <Link href="#" className="hover:text-[#ff4d8d]">
                Track Order
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#ff4d8d]">
                Delivery Info
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#ff4d8d]">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#ff4d8d]">
                Return Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#ff4d8d]">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Location Section */}
        <div>
          <h4 className="mb-6 text-xs font-bold tracking-wider text-[#1a2b3c] uppercase">
            Location
          </h4>
          <p className="mb-4 text-sm text-gray-500">
            123 Blossom Lane, Garden City
            <br />
            Open Mon-Sat, 8am - 6pm
          </p>
          <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
            {/* Dito mo ilalagay ang map image o iframe */}
            <span className="text-xs text-gray-400 italic">
              Map Placeholder
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mx-auto mt-16 flex max-w-7xl flex-col justify-between border-t border-gray-100 pt-8 text-xs text-gray-400 md:flex-row">
        <p>&copy; 2024 Petals & Bloom. All rights reserved.</p>
        <div className="mt-4 flex gap-6 md:mt-0">
          <Link href="#" className="hover:text-gray-600">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-gray-600">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-gray-600">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
