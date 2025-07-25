
'use client';

import Hero from '@/components/landing/hero';
import Services from '@/components/landing/services';
import HowItWorks from '@/components/landing/how-it-works';
import TrustSignals from '@/components/landing/trust-signals';
import GeolocationFeature from '@/components/landing/geolocation-feature';
import Cta from '@/components/landing/cta';
import FeaturedProducts from '@/components/landing/featured-products';
import { MobileSearch } from '@/components/mobile-search';
import TopPharmacies from '@/components/landing/top-pharmacies';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        <MobileSearch />
        <FeaturedProducts />
        <Services />
        <TopPharmacies />
        <HowItWorks />
        <TrustSignals />
        <GeolocationFeature />
        <Cta />
      </main>
    </div>
  );
}
