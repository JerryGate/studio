
'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { Product } from "@/types";
import { CheckCircle, MinusCircle, PlusCircle, ShoppingCart, XCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, Suspense, useEffect } from "react";
import { ProductPageSkeleton } from "@/components/skeletons/product-page-skeleton";
import { allProducts } from "@/lib/mock-data";


function ProductDetails({ id }: { id: string }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const { addToCart } = useCart();

    useEffect(() => {
        // Simulate fetching product data
        const timer = setTimeout(() => {
            const foundProduct = allProducts.find(p => p.id === id);
            setProduct(foundProduct || null);
            setLoading(false);
        }, 1000); // Simulate 1 second loading time
        return () => clearTimeout(timer);
    }, [id]);

    if (loading) {
        return <ProductPageSkeleton />;
    }
    
    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-destructive">Product Not Found</h1>
                <p className="text-muted-foreground mt-4">We couldn't find the product you're looking for.</p>
                <Link href="/search">
                    <Button className="mt-8">Back to Search</Button>
                </Link>
            </div>
        )
    }

    const isInStock = product.stock > 0;

    const incrementQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };
    
    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
        }
    }

    const nextImage = () => {
        setMainImageIndex(prev => (prev + 1) % product.imageUrls.length);
    }

    const prevImage = () => {
        setMainImageIndex(prev => (prev - 1 + product.imageUrls.length) % product.imageUrls.length);
    }
    
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="space-y-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={product.imageUrls[mainImageIndex]}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            data-ai-hint={product.dataAiHint}
                        />
                         {product.imageUrls.length > 1 && (
                            <>
                               <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white" onClick={prevImage}><ArrowLeft /></Button>
                               <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white" onClick={nextImage}><ArrowRight /></Button>
                            </>
                        )}
                    </div>
                     {product.imageUrls.length > 1 && (
                        <div className="grid grid-cols-5 gap-2">
                            {product.imageUrls.map((url, index) => (
                                <button key={index} onClick={() => setMainImageIndex(index)} className={`relative aspect-square rounded-md overflow-hidden ${index === mainImageIndex ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                                    <Image src={url} alt={`${product.name} thumbnail ${index+1}`} fill sizes="10vw" className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Product Details */}
                <div>
                    <Card className="border-none shadow-none">
                        <CardHeader>
                            <CardTitle className="text-4xl font-extrabold animated-gradient-text">{product.name}</CardTitle>
                            <div className="flex items-center gap-4 pt-2">
                                <Badge variant="secondary">{product.category}</Badge>
                                 {product.dosage && <Badge variant="outline">{product.dosage}</Badge>}
                            </div>
                            <div className="pt-2">
                                 {isInStock ? (
                                    <Badge variant="default" className="text-sm">
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        In Stock
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive" className="text-sm">
                                        <XCircle className="h-4 w-4 mr-1" />
                                        Out of Stock
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold animated-gradient-text mb-4">
                                ₦{product.price.toLocaleString()}
                            </p>
                            <div className="text-base text-foreground/80">
                                {product.description}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-6">
                            <Separator />
                            <div className="flex items-center gap-4">
                                <p className="font-semibold">Quantity:</p>
                                <div className="flex items-center border rounded-md">
                                    <Button variant="ghost" size="icon" onClick={decrementQuantity} disabled={!isInStock || quantity <= 1}>
                                        <MinusCircle className="h-5 w-5" />
                                    </Button>
                                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                    <Button variant="ghost" size="icon" onClick={incrementQuantity} disabled={!isInStock || quantity >= product.stock}>
                                        <PlusCircle className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                            <Button size="lg" className="w-full" disabled={!isInStock} onClick={handleAddToCart}>
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                {isInStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default function ProductDetailPage({ params }: { id: string }) {
    return (
      <Suspense key={params.id} fallback={<ProductPageSkeleton />}>
        <ProductDetails id={params.id} />
      </Suspense>
    );
}
