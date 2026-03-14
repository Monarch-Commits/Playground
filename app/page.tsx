import BestSellersSection from './components/Homepage/BestSellers/BestSellers';
import CollectionParent from './components/Homepage/CollectionsSection/CollectionParent';
import Features from './components/Homepage/Features/Features';
import ModernHeroSection from './components/Homepage/HeroSection/HeroSection';
import InstagramFeed from './components/Homepage/InstagramFeed/InstagramFeed';
import Newsletter from './components/Homepage/Newsletter/Newsletter';
import SaleBanner from './components/Homepage/SaleBanner/SaleBanner';
import Testimonials from './components/Homepage/Testimonials/Testimonials';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ModernHeroSection />
      <CollectionParent />
      <BestSellersSection />
      <Features />
      <Testimonials />
      <SaleBanner />
      <InstagramFeed />
      <Newsletter />
    </main>
  );
}
