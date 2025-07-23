
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
import { useState, use } from "react";

// Mock data - in a real app, you'd fetch this based on the `params.id`
const allProducts: Product[] = [
    { id: '1', name: 'Paracetamol 500mg', price: 500, imageUrls: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'], dataAiHint: 'white pills', category: 'Pain Relief', stock: 10, description: 'An effective pain reliever and fever reducer. Suitable for headaches, muscle aches, and colds.' },
    { id: '2', name: 'Vitamin C 1000mg', price: 1200, imageUrls: ['https://placehold.co/600x600.png'], dataAiHint: 'orange tablets', category: 'Vitamins', stock: 25, description: 'A high-strength Vitamin C supplement to support your immune system. Effervescent tablets.' },
    { id: '3', name: 'Amoxicillin 250mg', price: 800, imageUrls: ['https://placehold.co/600x600.png'], dataAiHint: 'capsules antibiotic', category: 'Antibiotics', stock: 0, description: 'A broad-spectrum antibiotic used to treat a variety of bacterial infections. Prescription required.' },
    { id: '4', name: 'Loratadine 10mg', price: 750, imageUrls: ['https://placehold.co/600x600.png'], dataAiHint: 'allergy medicine', category: 'Allergy', stock: 15, description: 'A non-drowsy antihistamine that provides 24-hour relief from allergy symptoms.' },
    { id: '5', name: 'Ibuprofen 200mg', price: 600, imageUrls: ['https://placehold.co/600x600.png'], dataAiHint: 'painkillers tablets', category: 'Pain Relief', stock: 30, description: 'Provides relief from pain, inflammation, and fever. Ideal for period pain, dental pain, and migraines.' },
    { id: '6', name: 'Metformin 500mg', price: 950, imageUrls: ['https://placehold.co/600x600.png'], dataAiHint: 'diabetes medication', category: 'Diabetes', stock: 8, description: 'Used to control high blood sugar in people with type 2 diabetes. Prescription required.' },
    { id: '7', name: 'Salbutamol Inhaler', price: 2500, imageUrls: ['https://placehold.co/600x600.png'], dataAiHint: 'asthma inhaler', category: 'Asthma', stock: 12, description: 'A reliever inhaler for asthma symptoms, providing quick relief from breathing difficulties.' },
    { id: '8', name: 'Cough Syrup', price: 1500, imageUrls: ['https://placehold.co/600x600.png'], dataAiHint: 'liquid medicine', category: 'Cold & Flu', stock: 5, description: 'A soothing cough syrup to relieve dry, tickly coughs. Contains honey and lemon.' },
];


export default function ProductDetailPage({ params }: { params: { id: string } }) {
    const resolvedParams = use(params);
    const product = allProducts.find(p => p.id === resolvedParams.id);
    const [quantity, setQuantity] = useState(1);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const { addToCart } = useCart();
    
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
                            <CardTitle className="text-4xl font-extrabold text-primary">{product.name}</CardTitle>
                            <div className="flex items-center gap-2 pt-2">
                                <Badge variant="secondary">{product.category}</Badge>
                                {isInStock ? (
                                    <Badge variant="default">
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        In Stock
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive">
                                        <XCircle className="h-4 w-4 mr-1" />
                                        Out of Stock
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-accent mb-4">
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
    );
}
