
'use client';

import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import { CreditCard, MapPin, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import Map from '@/components/map';

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(11, 'A valid phone number is required'),
  address: z.string().min(10, 'A detailed address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { toast } = useToast();
  const [deliveryFee, setDeliveryFee] = useState(1000); // Default fee

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
    },
  });

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="text-3xl font-bold mt-6">Your Cart is Empty</h1>
        <p className="text-muted-foreground mt-2">
          You can't proceed to checkout without any items.
        </p>
        <Link href="/search">
          <Button className="mt-8">Start Shopping</Button>
        </Link>
      </div>
    );
  }
  
  const totalAmount = cartTotal + deliveryFee;

  const onSubmit = (data: CheckoutFormValues) => {
    // Here you would typically handle payment gateway integration
    console.log('Order placed:', {
      customer: data,
      items: cartItems,
      total: totalAmount,
    });

    toast({
        title: "Order Placed!",
        description: "Your order has been successfully placed. We will contact you shortly."
    });

    // clearCart();
    // Potentially redirect to an order confirmation page
    // router.push('/order-confirmation');
  };

  // Mock distance calculation
  const calculateDeliveryCost = (distance: number) => {
    const costPerKm = 150; // NGN 150 per kilometer
    return Math.round(distance * costPerKm);
  };
  
  const handleLocationSelect = (location: { lat: number; lng: number }, address: string) => {
    form.setValue('location', location);
    form.setValue('address', address);

    // Mock distance from nearest pharmacy
    const mockDistanceInKm = Math.random() * 20;
    const cost = calculateDeliveryCost(mockDistanceInKm);
    setDeliveryFee(cost);
  };

  return (
    <div className="container mx-auto px-4 py-12">
       <CardHeader className="px-0">
          <CardTitle className="text-3xl font-extrabold text-primary">Checkout</CardTitle>
          <CardDescription>Please fill in your details to complete your purchase.</CardDescription>
        </CardHeader>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form & Map */}
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Delivery Address</FormLabel>
                                <FormControl>
                                <Input placeholder="Enter your address or click the map" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                    <Input placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                    <Input placeholder="08012345678" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="text-primary" /> Select Delivery Location on Map
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-96 w-full rounded-lg overflow-hidden">
                        <Map onLocationSelect={handleLocationSelect} />
                    </div>
                </CardContent>
            </Card>
        </div>
        
        {/* Order Summary */}
        <div className="space-y-6 sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.imageUrls[0]} alt={item.name} layout="fill" objectFit="cover" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-semibold">₦{cartTotal.toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Delivery Fee</p>
                  <p className="font-semibold">₦{deliveryFee.toLocaleString()}</p>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold text-primary">
                  <p>Total</p>
                  <p>₦{totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
                 <Button type="submit" size="lg" className="w-full" onClick={form.handleSubmit(onSubmit)}>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Place Order & Pay
                </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
