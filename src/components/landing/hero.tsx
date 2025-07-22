'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-24 md:py-40 text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-800 animate-gradient-xy"></div>
      <style jsx>{`
        @keyframes gradient-xy {
          0%, 100% {
            background-size: 400% 400%;
            background-position: 0% 50%;
          }
          50% {
            background-size: 200% 200%;
            background-position: 100% 50%;
          }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>
      
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline mb-4 drop-shadow-lg">
          Order Quality Drugs with Fast Delivery in Nigeria
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white/90 drop-shadow-md">
          Affordable, verified medications delivered to your doorstep from nearby pharmacies.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground transform hover:scale-105 transition-transform duration-300 shadow-lg">
            Get Started
          </Button>
          <Button size="lg" variant="secondary" className="transform hover:scale-105 transition-transform duration-300 shadow-lg">
            Learn More
          </Button>
        </div>
        <div className="mt-12 max-w-xl mx-auto">
          <form className="relative">
            <Input
              type="text"
              placeholder="e.g., Paracetamol, Vitamin C..."
              className="h-14 pl-12 pr-4 text-base bg-white/90 text-primary placeholder:text-muted-foreground/80 border-2 border-transparent focus:border-accent focus:ring-accent"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
