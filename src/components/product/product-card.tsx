
'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Minus, Plus, ShoppingCart, XCircle } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const isInStock = product.stock > 0;

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addToCart(product, quantity);
    };

    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => {
            const newQuantity = prev + amount;
            if (newQuantity < 1) return 1;
            if (newQuantity > product.stock) return product.stock;
            return newQuantity;
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover="hover"
            className="h-full"
        >
            <Card className="flex flex-col h-full overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 relative group border-0 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
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
                        </motion.div>
                    </CardHeader>
                </Link>
                <CardContent className="p-4 flex flex-col flex-grow">
                     <div className="flex-grow">
                        <CardTitle className="text-lg font-semibold mb-1 hover:text-primary min-h-[50px] leading-tight">
                            <Link href={`/product/${product.id}`} className="focus:outline-none">
                                {product.name}
                            </Link>
                        </CardTitle>
                        {product.dosage && (
                            <p className="text-sm text-muted-foreground mb-2">{product.dosage}</p>
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

                    <p className="text-2xl font-bold text-primary mb-4">
                        ₦{product.price.toLocaleString()}
                    </p>

                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center border rounded-md">
                            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => handleQuantityChange(-1)} disabled={!isInStock || quantity <= 1}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-bold text-base">{quantity}</span>
                            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => handleQuantityChange(1)} disabled={!isInStock || quantity >= product.stock}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button className="flex-1 h-10" disabled={!isInStock} onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ProductCard;
