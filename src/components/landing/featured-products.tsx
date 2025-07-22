import { Product } from '@/types';
import ProductCard from '@/components/product/product-card';
import { Button } from '../ui/button';
import Link from 'next/link';

const featuredProducts: Product[] = [
    { id: '1', name: 'Paracetamol 500mg', price: 500, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'white pills', category: 'Pain Relief', stock: 10 },
    { id: '2', name: 'Vitamin C 1000mg', price: 1200, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'orange tablets', category: 'Vitamins', stock: 25 },
    { id: '5', name: 'Ibuprofen 200mg', price: 600, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'painkillers tablets', category: 'Pain Relief', stock: 30 },
    { id: '7', name: 'Salbutamol Inhaler', price: 2500, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'asthma inhaler', category: 'Asthma', stock: 12 },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-primary">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out some of our most popular medications and health products.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-16">
            <Link href="/search">
                <Button size="lg" variant="outline">
                    View All Products
                </Button>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
