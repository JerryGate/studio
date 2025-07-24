
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
import { CreditCard, MapPin, ShoppingCart, Loader2, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useOrders } from '@/hooks/use-orders';
import { useAuth } from '@/contexts/auth-context';

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted flex items-center justify-center"><Loader2 className="animate-spin" /></div>
});

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
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [isCalculatingFee, setIsCalculatingFee] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isPaystackScriptLoaded, setPaystackScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setPaystackScriptLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.email.split('@')[0] || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      state: '',
    },
  });

  useEffect(() => {
    if (user) {
        form.reset({
            fullName: form.getValues('fullName') || user.email.split('@')[0],
            email: form.getValues('email') || user.email,
            phone: form.getValues('phone') || '',
            address: form.getValues('address') || '',
            city: form.getValues('city') || '',
            state: form.getValues('state') || '',
        })
    }
  }, [user, form]);

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
  
  const totalAmount = cartTotal + (deliveryFee || 0);

  const handlePaymentSuccess = () => {
    const customerDetails = form.getValues();
    addOrder({
      total: totalAmount,
      items: cartItems,
      customerDetails: { ...customerDetails, deliveryFee: deliveryFee || 0 },
    });

    toast({
        title: "Order Placed!",
        description: "Your payment was successful. We will contact you shortly."
    });

    clearCart();
    router.push('/dashboard/orders');
  };
  
  const handlePaymentClose = () => {
    toast({
        title: "Payment Cancelled",
        description: "Your payment process was cancelled.",
        variant: "destructive"
    });
  }

  const handleLocationSelect = async (location: { lat: number; lng: number }) => {
    form.setValue('location', location, { shouldValidate: true });
    setSelectedLocation(location);
    setIsCalculatingFee(true);
    setDeliveryFee(null);

    try {
        const response = await fetch('/api/distance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                destination: { lat: location.lat, lon: location.lng }
            }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to calculate distance');
        }

        const data = await response.json();
        setDeliveryFee(data.deliveryCost);
    } catch (error) {
        toast({
            title: "Error calculating delivery fee",
            description: "Could not calculate delivery fee. Please try again.",
            variant: "destructive"
        });
    } finally {
        setIsCalculatingFee(false);
    }
  };

  const handleGeocodeAddress = async () => {
      const { address, city, state } = form.getValues();
      if (!address || !city || !state) {
          toast({
              title: "Incomplete Address",
              description: "Please fill in the address, city, and state fields to find your location.",
              variant: "destructive",
          });
          return;
      }
      
      const fullAddress = `${address}, ${city}, ${state}, Nigeria`;
      setIsGeocoding(true);

      try {
          const response = await fetch('/api/geocode', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ address: fullAddress }),
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Failed to find location');
          }

          const data = await response.json();
          await handleLocationSelect({ lat: data.lat, lng: data.lng });
          toast({
              title: "Location Found!",
              description: "The address has been pinpointed on the map."
          });

      } catch (error: any) {
           toast({
              title: "Geocoding Error",
              description: error.message || "Could not find the specified address. Please try again or select on the map.",
              variant: "destructive"
          });
      } finally {
          setIsGeocoding(false);
      }
  };
  
  const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  const handlePayment = () => {
     if (!user) {
        toast({
            title: "Authentication Required",
            description: "Please log in to your account to complete your purchase.",
            variant: 'destructive',
            action: (
                <Button variant="secondary" onClick={() => router.push('/login')}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                </Button>
            )
        });
        return;
    }

    if (!form.formState.isValid) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all the required delivery information fields.",
        variant: "destructive"
      });
      return;
    }

    if (deliveryFee === null) {
      toast({
        title: "Location not set",
        description: "Please use the 'Find on Map' button or click the map to set your delivery location and calculate the fee.",
        variant: "destructive"
      });
      return;
    }
    
    if (!paystackPublicKey || !isPaystackScriptLoaded || !(window as any).PaystackPop) {
        toast({
            title: "Payment Error",
            description: "Payment service is not available. Please try again later.",
            variant: "destructive"
        });
        return;
    }

    const handler = (window as any).PaystackPop.setup({
        key: paystackPublicKey,
        email: form.getValues('email'),
        amount: totalAmount * 100, // Amount in kobo
        ref: new Date().getTime().toString(),
        onClose: handlePaymentClose,
        callback: handlePaymentSuccess
    });
    handler.openIframe();
  }


  if (!paystackPublicKey) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-destructive text-2xl font-bold">Configuration Error</h1>
            <p className="text-muted-foreground">The payment gateway is not configured. Please contact support.</p>
        </div>
    )
  }

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
                    <form className="space-y-6">
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
                        <div className="flex flex-col sm:flex-row gap-4">
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
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Street Address</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g. 123 Allen Avenue" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <div className="flex flex-col sm:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g. Ikeja" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g. Lagos" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <div>
                             <Button type="button" variant="outline" onClick={handleGeocodeAddress} disabled={isGeocoding}>
                                {isGeocoding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Find on Map
                            </Button>
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
                     <CardDescription>Click on the map to set your delivery location, or use the "Find on Map" button above.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-96 w-full rounded-lg overflow-hidden">
                        <Map
                           onLocationSelect={handleLocationSelect}
                           key={selectedLocation ? `${selectedLocation.lat}-${selectedLocation.lng}` : 'map'}
                           initialCenter={selectedLocation || undefined}
                        />
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
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">Delivery Fee</p>
                   {isCalculatingFee || isGeocoding ? (
                       <Loader2 className="h-4 w-4 animate-spin" />
                   ) : deliveryFee !== null ? (
                       <p className="font-semibold">₦{deliveryFee.toLocaleString()}</p>
                   ) : (
                       <p className="text-sm text-muted-foreground">Select location</p>
                   )}
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold text-primary">
                  <p>Total</p>
                  <p>₦{totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
                 <Button
                    size="lg"
                    className="w-full"
                    onClick={handlePayment}
                    disabled={isCalculatingFee || isGeocoding || !isPaystackScriptLoaded || deliveryFee === null}
                >
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
