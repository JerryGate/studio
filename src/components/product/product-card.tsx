
'use client';

import { Product } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ShoppingCart, XCircle } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

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

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();
    const isInStock = product.stock > 0;

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
    };

    return (
        <motion.div
            variants={itemVariants}
            className="h-full"
        >
             <Card className={cn(
                "relative flex flex-col h-full overflow-hidden group",
                "transition-all duration-300",
                "border-border/20 hover:shadow-2xl hover:-translate-y-2"
             )}>
                 {/* Animated Border on hover */}
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary via-accent to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ zIndex: 0 }} />

                <Link href={`/product/${product.id}`} className="block focus:outline-none flex flex-col h-full bg-card rounded-lg z-10">
                    <CardHeader className="p-0">
                        <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
                            <Image
                                src={product.imageUrls[0]}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                data-ai-hint={product.dataAiHint}
                            />
                            {isInStock ? (
                                <Badge variant="secondary" className="absolute top-2 right-2 bg-black/50 text-white border-0">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    In Stock
                                </Badge>
                            ) : (
                                <Badge variant="destructive" className="absolute top-2 right-2">
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Out of Stock
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 flex flex-col flex-grow">
                        <div className="flex-grow mb-2">
                            <CardTitle className="text-base font-semibold text-primary mb-1 leading-tight line-clamp-2">
                               {product.name}
                            </CardTitle>
                             {product.dosage && (
                                <p className="text-xs text-muted-foreground">{product.dosage}</p>
                            )}
                        </div>
                        
                        <div className="mt-auto pt-2 space-y-2">
                            <p className="text-xl font-bold animated-gradient-text">
                                ₦{product.price.toLocaleString()}
                            </p>
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300"
                            >
                                <Button className="w-full h-9" disabled={!isInStock} onClick={handleAddToCart} size="sm">
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    {isInStock ? 'Add to Cart' : 'Out of Stock'}
                                </Button>
                            </motion.div>
                        </div>
                    </CardContent>
                </Link>
            </Card>
        </motion.div>
    );
};

export default ProductCard;
