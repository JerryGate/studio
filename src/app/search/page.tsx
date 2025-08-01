
'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, AlertTriangle, FileUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import ProductCard from '@/components/product/product-card';
import { Product } from '@/types';
import { ProductCardSkeleton } from '@/components/skeletons/product-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { allProducts } from '@/lib/mock-data';
import { DrugInteractionChecker } from '@/components/drug-interaction-checker';
import { PrescriptionUploadModal } from '@/components/prescription-upload-modal';
import { Separator } from '@/components/ui/separator';
import { SpecialRecommendationModal } from '@/components/special-recommendation-modal';
import { WhatsAppCta } from '@/components/whatsapp-cta';
import { CategoryProductsSection } from '@/components/landing/CategoryProductsSection';

function SearchResults() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const initialCategory = searchParams.get('category') || 'all';
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(initialQuery);
    const [sortBy, setSortBy] = useState('relevance');
    const [inStock, setInStock] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const allCategories = ['all', ...Array.from(new Set(allProducts.map(p => p.category)))];

    useEffect(() => {
        setLoading(true);
        // Simulate API call
        const timer = setTimeout(() => {
            const results = allProducts
                .filter(product => selectedCategory === 'all' ? true : product.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory)
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
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, sortBy, inStock, selectedCategory]);

    return (
        <div className="flex flex-col md:flex-row gap-12">
            {/* Filters Sidebar */}
            <aside className="w-full md:w-1/4 lg:w-1/5">
                <div className="sticky top-24 space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <SlidersHorizontal className="h-5 w-5" />
                            Filters
                        </h3>
                        <div className="space-y-6">
                             <div>
                                <Label htmlFor="category" className="font-semibold">Category</Label>
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger id="category" className="w-full mt-2">
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {allCategories.map(cat => (
                                            <SelectItem key={cat} value={cat === 'all' ? 'all' : cat.toLowerCase().replace(/\s+/g, '-')}>
                                                {cat === 'all' ? 'All Categories' : cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
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
                     <Separator />
                     <DrugInteractionChecker />
                     <Separator />
                     <SpecialRecommendationModal />
                </div>
            </aside>

            {/* Main Content */}
            <main className="w-full md:w-3/4 lg:w-4/5">
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
                    <div className="text-sm text-muted-foreground">
                        {loading ? (
                             <Skeleton className="h-5 w-48" />
                        ) : (
                            <>
                                Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
                                {searchTerm && <> for <span className="font-semibold animated-gradient-text">"{searchTerm}"</span></>}
                            </>
                        )}
                    </div>
                </div>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                           <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
                <Skeleton className="h-9 w-1/3 mb-2" />
                <Skeleton className="h-5 w-1/2" />
            </header>
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
        </div>
    )
}

function SearchPageContent() {
    const searchParams = useSearchParams();
    const hasCategory = searchParams.has('category');

    return (
        <div className="container mx-auto px-4 py-8">
             <header className="mb-8 space-y-4">
                <h1 className="text-4xl font-extrabold animated-gradient-text">Order Medications</h1>
                <p className="text-lg text-muted-foreground">Find drugs, check for interactions, or request special recommendations.</p>
                <div className="flex flex-wrap gap-4 pt-4">
                   <PrescriptionUploadModal />
                </div>
            </header>

            <div className="space-y-16">
                 <SearchResults />
            </div>
            <WhatsAppCta />
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <SearchPageContent />
        </Suspense>
    );
}
