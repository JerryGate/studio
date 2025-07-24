
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockOrders } from '@/lib/mock-data';
import { Order, OrderStatus } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Package, Truck } from 'lucide-react';

const statusToProgress: Record<OrderStatus, number> = {
    Processing: 25,
    Shipped: 60,
    Delivered: 100,
    Cancelled: 0,
};

const statusToDescription: Record<OrderStatus, string> = {
    Processing: "Your order is being processed by the pharmacy.",
    Shipped: "Your order has been dispatched and is on its way.",
    Delivered: "Your order has been successfully delivered.",
    Cancelled: "This order has been cancelled.",
};

export default function DeliveryTrackingPage() {
    const [orderId, setOrderId] = useState('');
    const [trackedOrder, setTrackedOrder] = useState<Order | null | undefined>(undefined);

    const handleTrack = () => {
        const foundOrder = mockOrders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
        setTrackedOrder(foundOrder || null);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleTrack();
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Track Delivery</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Track Your Order</CardTitle>
                    <CardDescription>
                        Enter your order ID to see its current status.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input 
                            placeholder="Enter Order ID (e.g., ORD002)" 
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <Button onClick={handleTrack}>Track</Button>
                    </div>
                    
                    <div className="pt-4 border-t">
                        {trackedOrder === undefined && (
                             <p className="text-muted-foreground">Tracking information will be displayed here.</p>
                        )}
                        {trackedOrder === null && (
                           <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Order Not Found</AlertTitle>
                                <AlertDescription>
                                   We couldn't find an order with that ID. Please check the ID and try again.
                                </AlertDescription>
                            </Alert>
                        )}
                        {trackedOrder && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Tracking Details for Order #{trackedOrder.id}</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium text-muted-foreground">
                                       <span className="flex items-center gap-1"><Package className="h-4 w-4 text-primary" /> Order Confirmed</span>
                                       <span className="flex items-center gap-1"><Truck className="h-4 w-4 text-primary" /> Dispatched</span>
                                       <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-primary" /> Delivered</span>
                                    </div>
                                    <Progress value={statusToProgress[trackedOrder.status]} className="w-full" />
                                </div>
                                <Alert variant={trackedOrder.status === 'Cancelled' ? 'destructive' : 'default'}>
                                    <AlertTitle className="capitalize">Status: {trackedOrder.status}</AlertTitle>
                                    <AlertDescription>
                                        {statusToDescription[trackedOrder.status]}
                                    </AlertDescription>
                                </Alert>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
