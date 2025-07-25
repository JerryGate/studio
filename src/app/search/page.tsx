

'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import ProductCard from '@/components/product/product-card';
import { Product } from '@/types';
import { ProductCardSkeleton } from '@/components/skeletons/product-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data, to be replaced with API call
const allProducts: Product[] = [
    { id: '1', name: 'Paracetamol 500mg', price: 500, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'white pills', category: 'Pain Relief', stock: 10, description: 'An effective pain reliever and fever reducer.' },
    { id: '2', name: 'Vitamin C 1000mg', price: 1200, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'orange tablets', category: 'Vitamins', stock: 25, description: 'Supports immune system.' },
    { id: '3', name: 'Amoxicillin 250mg', price: 800, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'antibiotic capsules', category: 'Antibiotics', stock: 0, description: 'Treats bacterial infections.' },
    { id: '4', name: 'Loratadine 10mg', price: 750, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'allergy medicine', category: 'Allergy', stock: 15, description: 'Non-drowsy antihistamine.' },
    { id: '5', name: 'Ibuprofen 200mg', price: 600, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'painkillers tablets', category: 'Pain Relief', stock: 30, description: 'Provides relief from pain, inflammation, and fever.' },
    { id: '6', name: 'Metformin 500mg', price: 950, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'diabetes medication', category: 'Diabetes', stock: 8, description: 'Controls high blood sugar.' },
    { id: '7', name: 'Salbutamol Inhaler', price: 2500, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'asthma inhaler', category: 'Asthma', stock: 12, description: 'Quick relief for asthma symptoms.' },
    { id: '8', name: 'Cough Syrup', price: 1500, imageUrls: ['https://placehold.co/300x300.png'], dataAiHint: 'liquid medicine', category: 'Cold & Flu', stock: 5, description: 'Soothing cough syrup.' },
];

function SearchResults() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [sortBy, setSortBy] = useState('relevance');
    const [inStock, setInStock] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        setLoading(true);
        // Simulate API call
        const timer = setTimeout(() => {
            const results = allProducts
                .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .filter(product => !inStock || product.stock > 0)
                .sort((a, b) => {
                    if (sortBy === 'price-asc') return a.price - b.price;
                    if (sortBy === 'price-desc') return b.price - a.price;
                    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
                    return 0; // 'relevance'
                });
            setFilteredProducts(results);
            setLoading(false);
        }, 500); // Simulate 0.5 second loading time

        return () => clearTimeout(timer);
    }, [searchTerm, sortBy, inStock]);


    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="w-full md:w-1/4">
                <div className="sticky top-24">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <SlidersHorizontal className="h-5 w-5" />
                        Filters
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="sort" className="font-semibold">Sort by</Label>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger id="sort" className="w-full mt-2">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="relevance">Relevance</SelectItem>
                                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Availability</h4>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="in-stock" checked={inStock} onCheckedChange={(checked) => setInStock(!!checked)} />
                                <Label htmlFor="in-stock" className="font-normal">In Stock Only</Label>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="w-full md:w-3/4">
                <div className="mb-6">
                    <form onSubmit={(e) => { e.preventDefault(); }}>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search for drugs, e.g., Paracetamol..."
                                className="h-12 text-lg pl-12"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                        </div>
                    </form>
                </div>

                <div className="border-b pb-4 mb-6 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        {!loading && (
                            <>
                                Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
                                {searchTerm && <> for <span className="font-semibold text-primary">"{searchTerm}"</span></>}
                            </>
                        )}
                         {loading && (
                            <Skeleton className="h-5 w-48" />
                         )}
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                           <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-semibold">No Products Found</h3>
                        <p className="text-muted-foreground mt-2">
                            We couldn't find any products matching your search.
                            <br/>
                            Try a different search term or adjust your filters.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}


function LoadingSkeleton() {
    return (
        <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/4">
                 <div className="sticky top-24 space-y-6">
                     <div className="space-y-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-10 w-full" />
                     </div>
                     <div className="space-y-2">
                        <Skeleton className="h-6 w-24" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5" />
                            <Skeleton className="h-5 w-20" />
                        </div>
                     </div>
                 </div>
            </aside>
            <main className="w-full md:w-3/4">
                 <Skeleton className="h-12 w-full mb-6" />
                 <div className="border-b pb-4 mb-6">
                     <Skeleton className="h-5 w-48" />
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                 </div>
            </main>
        </div>
    )
}

export default function SearchPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">Search for Medications</h1>
                <p className="text-muted-foreground">Find the drugs you need from our wide selection.</p>
            </header>
            
            <Suspense fallback={<LoadingSkeleton />}>
                <SearchResults />
            </Suspense>
        </div>
    );
}
