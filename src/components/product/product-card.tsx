
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
        addToCart(product, 1); // Always add a quantity of 1
    };

    return (
        <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="h-full"
        >
            <Card className="flex flex-col h-full overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group bg-card border-border focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-lg">
                 <Link href={`/product/${product.id}`} className="block focus:outline-none">
                    <CardHeader className="p-0">
                        <motion.div 
                            className="relative aspect-square w-full"
                            variants={{ hover: { scale: 1.05 } }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={product.imageUrls[0]}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                                data-ai-hint={product.dataAiHint}
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    </CardHeader>
                </Link>
                <CardContent className="p-4 flex flex-col flex-grow">
                     <div className="flex-grow">
                        <CardTitle className="text-base font-semibold mb-1 hover:text-primary leading-tight min-h-[40px]">
                            <Link href={`/product/${product.id}`} className="focus:outline-none">
                                {product.name}
                            </Link>
                        </CardTitle>
                        {product.dosage && (
                            <p className="text-xs text-muted-foreground mb-2">{product.dosage}</p>
                        )}
                    </div>
                     <div className="flex items-center gap-2 mt-2 mb-2">
                        {isInStock ? (
                            <Badge variant="secondary" className="text-xs text-emerald-700 bg-emerald-100 border-emerald-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                In Stock
                            </Badge>
                        ) : (
                            <Badge variant="destructive" className="text-xs">
                                <XCircle className="h-3 w-3 mr-1" />
                                Out of Stock
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-auto pt-2">
                         <p className="text-xl font-bold animated-gradient-text">
                            ₦{product.price.toLocaleString()}
                        </p>
                        <Button className="h-9 w-9" disabled={!isInStock} onClick={handleAddToCart} size="icon">
                            <ShoppingCart className="h-4 w-4" />
                            <span className="sr-only">Add to Cart</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ProductCard;
