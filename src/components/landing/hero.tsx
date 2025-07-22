'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const Hero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <section className="relative py-24 md:py-40 text-center text-white overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-800 to-primary/60 animate-gradient-xy"></div>
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
        <h1 className="text-4xl md:text-6xl font-extrabold font-headline mb-4 drop-shadow-lg animate-fade-in-down">
          Order Quality Drugs with Fast Delivery in Nigeria
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white/90 drop-shadow-md animate-fade-in-down animation-delay-300">
          Affordable, verified medications delivered to your doorstep from nearby pharmacies.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
          <Link href="/search">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground transform hover:scale-105 transition-transform duration-300 shadow-lg">
              Get Started
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="secondary" className="transform hover:scale-105 transition-transform duration-300 shadow-lg">
              Learn More
            </Button>
          </Link>
        </div>
        <div className="mt-12 max-w-xl mx-auto animate-fade-in-up animation-delay-900">
          <form className="relative" onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="e.g., Paracetamol, Vitamin C..."
              className="h-14 pl-12 pr-4 text-base bg-white/90 text-primary placeholder:text-muted-foreground/80 border-2 border-transparent focus:border-accent focus:ring-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
             <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-10">
                Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
