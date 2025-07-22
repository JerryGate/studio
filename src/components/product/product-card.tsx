'use client';

import { Product } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ShoppingCart, XCircle } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart } = useCart();
    const isInStock = product.stock > 0;

    const handleAddToCart = () => {
        addToCart(product, 1);
    }

    return (
        <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link href={`/product/${product.id}`} className="block">
                <CardHeader className="p-0">
                    <div className="relative aspect-square w-full">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint={product.dataAiHint}
                            className="transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </CardHeader>
            </Link>
            <div className="p-4 flex flex-col flex-grow">
                <CardTitle className="text-lg font-bold mb-1 hover:text-primary">
                    <Link href={`/product/${product.id}`}>
                        {product.name}
                    </Link>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mb-2">{product.category}</CardDescription>
                
                <div className="flex items-center gap-2 mt-auto mb-2">
                    {isInStock ? (
                        <Badge variant="default" className="text-xs">
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

                <p className="text-xl font-extrabold text-primary">
                    ₦{product.price.toLocaleString()}
                </p>
            </div>
            <CardFooter className="p-4 bg-muted/50">
                <Button className="w-full" disabled={!isInStock} onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {isInStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
