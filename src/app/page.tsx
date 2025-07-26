
'use client';

import Hero from '@/components/landing/hero';
import Services from '@/components/landing/services';
import HowItWorks from '@/components/landing/how-it-works';
import TrustSignals from '@/components/landing/trust-signals';
import GeolocationFeature from '@/components/landing/geolocation-feature';
import Cta from '@/components/landing/cta';
import { SearchBar } from '@/components/landing/hero';
import { motion } from 'framer-motion';
import { CategorySlider } from '@/components/category-slider';
import { Card, CardContent } from '@/components/ui/card';
import { WhatsAppCta } from '@/components/whatsapp-cta';
import { allProducts } from '@/lib/mock-data';
import { CategoryProductsSection } from '@/components/landing/CategoryProductsSection';
import TopPharmacies from '@/components/landing/top-pharmacies';
import { EmergencyRequestModal } from '@/components/emergency-request-modal';
import { PrescriptionUploadModal } from '@/components/prescription-upload-modal';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        },
    },
};

const uniqueCategories = [...new Set(allProducts.map(p => p.category))];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        
        <div className="container mx-auto px-4 py-8 space-y-4">
            <motion.div
                className="lg:hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                <SearchBar />
            </motion.div>
             <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <EmergencyRequestModal />
                <PrescriptionUploadModal />
            </div>
        </div>


        <Services />

        <div className="container mx-auto px-4 py-16 space-y-24">
            <section>
                 <motion.div 
                    className="text-center mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={itemVariants}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline animated-gradient-text">
                    Browse by Health Interest
                  </h2>
                  <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Explore our wide range of products tailored to your health needs.
                  </p>
                </motion.div>
                 <Card className="shadow-lg">
                    <CardContent className="p-6 md:p-8">
                        <CategorySlider />
                    </CardContent>
                </Card>
            </section>
            
            {uniqueCategories.map(category => (
              <CategoryProductsSection
                key={category}
                category={category}
                products={allProducts.filter(p => p.category === category).slice(0, 4)}
              />
            ))}
        </div>

        <HowItWorks />
        <TopPharmacies />
        <TrustSignals />
        <GeolocationFeature />
        <Cta />
        <WhatsAppCta />
      </main>
    </div>
  );
}
