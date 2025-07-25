'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { useOrders } from '@/hooks/use-orders';
import { Order } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted flex items-center justify-center"><Loader2 className="animate-spin" /></div>
});

export default function ActiveDeliveriesPage() {
    const { orders, updateOrderStatus } = useOrders();
    const { toast } = useToast();
    const activeDeliveries = orders.filter(o => o.status === 'Shipped');
    const [selectedDelivery, setSelectedDelivery] = useState<Order | null>(activeDeliveries.length > 0 ? activeDeliveries[0] : null);

    const handleMarkAsDelivered = (orderId: string) => {
        updateOrderStatus(orderId, 'Delivered');
        toast({
            title: "Delivery Complete!",
            description: `Order #${orderId} has been marked as delivered.`
        });
        // Select the next delivery in the list or null if it was the last one
        const remainingDeliveries = activeDeliveries.filter(d => d.id !== orderId);
        setSelectedDelivery(remainingDeliveries.length > 0 ? remainingDeliveries[0] : null);
    }
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Active Deliveries</h1>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Your Assigned Deliveries</CardTitle>
                            <CardDescription>
                                These are the orders you need to deliver.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                               {activeDeliveries.length > 0 ? activeDeliveries.map(delivery => (
                                   <div 
                                        key={delivery.id} 
                                        className={cn(
                                            "p-3 rounded-md cursor-pointer border",
                                            selectedDelivery?.id === delivery.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
                                        )}
                                        onClick={() => setSelectedDelivery(delivery)}
                                    >
                                       <p className="font-bold">{delivery.id} - {delivery.customerDetails.fullName}</p>
                                       <p className="text-sm text-muted-foreground">{delivery.customerDetails.address}</p>
                                   </div>
                               )) : (
                                 <p className="text-muted-foreground text-center p-4">No active deliveries.</p>
                               )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                 <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Delivery Location</CardTitle>
                            <CardDescription>
                                {selectedDelivery ? `Map view for order #${selectedDelivery.id}` : 'Select a delivery to see the location.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           {selectedDelivery ? (
                                <>
                                    <div className="h-96 w-full rounded-lg overflow-hidden mb-4">
                                        <Map
                                            key={selectedDelivery.id}
                                            interactive={false}
                                            initialCenter={selectedDelivery.customerDetails.location}
                                            markers={selectedDelivery.customerDetails.location ? [selectedDelivery.customerDetails.location] : undefined}
                                        />
                                    </div>
                                    <Button onClick={() => handleMarkAsDelivered(selectedDelivery.id)}>Mark as Delivered</Button>
                                </>
                           ) : (
                                <div className="h-96 flex items-center justify-center bg-muted rounded-lg">
                                    <p className="text-muted-foreground">No delivery selected.</p>
                                </div>
                           )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
