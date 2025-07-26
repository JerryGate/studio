
'use client';

import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MinusCircle, PlusCircle, Trash2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold animated-gradient-text">Your Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent>
          {cartCount === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
              <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
              <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/search">
                <Button className="mt-8">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 p-4 border rounded-lg">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.imageUrls[0]} alt={item.name} layout="fill" objectFit="cover" />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <Link href={`/product/${item.id}`}>
                      <p className="font-bold text-lg hover:text-primary">{item.name}</p>
                    </Link>
                    <p className="text-muted-foreground text-sm">{item.category}</p>
                    <p className="text-lg font-semibold text-accent mt-1">₦{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center border rounded-md">
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <MinusCircle className="h-5 w-5" />
                      </Button>
                      <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <PlusCircle className="h-5 w-5" />
                      </Button>
                    </div>
                    <p className="w-24 text-right font-bold text-lg">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <Button variant="destructive" size="icon" className="text-destructive-foreground" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        {cartCount > 0 && (
          <CardFooter className="flex flex-col items-end gap-4 bg-muted/40 p-6">
            <div className="w-full md:w-1/3 space-y-2">
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                <span className="font-semibold">₦{cartTotal.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold animated-gradient-text">
                <span>Total</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-end">
                <Button variant="outline" onClick={clearCart}>
                    Clear Cart
                </Button>
                <Link href="/checkout">
                  <Button size="lg">Proceed to Checkout</Button>
                </Link>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
