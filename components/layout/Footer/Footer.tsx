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
          <div className="h-32 w-full overflow-hidden rounded-2xl bg-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7628900733557!2d125.15516877098686!3d6.918925222752615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f855fcf974b3bf%3A0xf06e34380ef1359e!2s7seas%20Travel%20%26%20Tours!5e0!3m2!1sen!2sus!4v1774052635395!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: '0' }} // ✅ string
              allowFullScreen // ✅ camelCase
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" // ✅ camelCase
              title="Petals & Bloom Location" // ✅ accessibility
            ></iframe>
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
