import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './AuthProvider';
import { Toaster } from 'react-hot-toast';
import { Navigation } from './components/layout/Navigation/Nav';
import Footer from './components/layout/Footer/Footer';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Plant E-Commerce 🌱',
    template: '%s | Plant E-Commerce',
  },
  description:
    'Discover and shop beautiful plants for your home and garden. Fresh, healthy, and delivered with care.',
  icons: {
    icon: '/logo/logo.png',
  },
  openGraph: {
    title: 'Plant E-Commerce 🌱',
    description:
      'Shop high-quality plants and bring nature closer to your home.',
    url: 'https://yourdomain.com',
    siteName: 'Plant E-Commerce',
    images: [
      {
        url: '/logo/logo.png',
        width: 1200,
        height: 630,
        alt: 'Plant E-Commerce Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plant E-Commerce 🌱',
    description:
      'Shop high-quality plants and bring nature closer to your home.',
    images: ['/logo/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={` ${poppins.variable} antialiased`}>
          <Navigation />
          {children}
          <Footer />
          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </html>
    </AuthProvider>
  );
}
