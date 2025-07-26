
'use client';

import Hero from '@/components/landing/hero';
import Services from '@/components/landing/services';
import HowItWorks from '@/components/landing/how-it-works';
import TrustSignals from '@/components/landing/trust-signals';
import GeolocationFeature from '@/components/landing/geolocation-feature';
import Cta from '@/components/landing/cta';
import FeaturedProducts from '@/components/landing/featured-products';
import TopPharmacies from '@/components/landing/top-pharmacies';
import { SearchBar } from '@/components/landing/hero';
import { motion } from 'framer-motion';
import { CategorySlider } from '@/components/category-slider';
import { ShopByCategory } from '@/components/shop-by-category';
import { BestSellers } from '@/components/best-sellers';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        <div className="lg:hidden container mx-auto px-4 py-8">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                <SearchBar />
            </motion.div>
        </div>
        
        <FeaturedProducts />

        <Services />

        <div className="container mx-auto px-4 py-16 space-y-24">
            <CategorySlider />
            <ShopByCategory />
            <BestSellers />
        </div>

        <HowItWorks />
        <TopPharmacies />
        <TrustSignals />
        <GeolocationFeature />
        <Cta />
      </main>
    </div>
  );
}
