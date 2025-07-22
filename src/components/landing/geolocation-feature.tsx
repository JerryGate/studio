
'use client';

import { useState } from 'react';
import { locateNearestPharmacy, LocateNearestPharmacyOutput } from '@/ai/flows/nearest-pharmacy-locator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MapPin, Navigation } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
        },
    },
};

const GeolocationFeature = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LocateNearestPharmacyOutput | null>(null);
  const { toast } = useToast();

  const handleLocate = () => {
    setLoading(true);
    setError(null);
    setResult(null);

    if (!navigator.geolocation) {
      const errorMessage = 'Geolocation is not supported by your browser.';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const pharmacyResult = await locateNearestPharmacy({ latitude, longitude });
          setResult(pharmacyResult);
          toast({
            title: 'Success!',
            description: 'We found the nearest pharmacy for you.',
          });
        } catch (e) {
          const errorMessage = 'Could not find a pharmacy. Please try again.';
          setError(errorMessage);
          toast({
            title: 'Error',
            description: errorMessage,
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      },
      () => {
        const errorMessage = 'Unable to retrieve your location. Please enable location services.';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
        setLoading(false);
      }
    );
  };

  return (
    <section id="geolocation" className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
          >
            <div className="inline-block bg-accent/10 text-accent font-semibold py-1 px-3 rounded-full text-sm mb-4">
              Smart & Fast
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-primary mb-4">
              Find a Pharmacy in Seconds
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our smart system connects your order to the nearest verified pharmacy, ensuring your medication gets to you faster than ever. Just one click is all it takes.
            </p>
            <div className="max-w-md mx-auto md:mx-0">
              <Button onClick={handleLocate} disabled={loading} size="lg" className="w-full sm:w-auto">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding Pharmacy...
                  </>
                ) : (
                  <>
                    <Navigation className="mr-2 h-4 w-4" />
                    Find Nearest Pharmacy
                  </>
                )}
              </Button>
              {error && <p className="text-destructive mt-4 text-sm">{error}</p>}
              {result && (
                <Card className="mt-6 text-left shadow-lg animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-accent">
                      <MapPin />
                      Nearest Pharmacy Found!
                    </CardTitle>
                    <CardDescription>We recommend the following pharmacy for your order.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>
                      <strong>Name:</strong> {result.pharmacyName}
                    </p>
                    <p>
                      <strong>Address:</strong> {result.pharmacyAddress}
                    </p>
                    <p>
                      <strong>Phone:</strong> {result.pharmacyPhoneNumber}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
           <motion.div 
            className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-2xl"
            initial={{x: 100, opacity: 0}}
            whileInView={{x: 0, opacity: 1}}
            viewport={{ once: true, amount: 0.5 }}
            transition={{duration: 0.8, type: 'spring'}}
           >
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Map showing pharmacy locations" 
                layout="fill"
                objectFit="cover"
                data-ai-hint="abstract map"
                className="transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/20"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <MapPin className="h-16 w-16 text-white/80 animate-pulse" />
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GeolocationFeature;
