
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted flex items-center justify-center"><Loader2 className="animate-spin" /></div>
});


const mockDeliveries = [
    {
        id: 'ORD001',
        patient: 'Adebayo Adekunle',
        address: '123 Allen Avenue, Ikeja, Lagos',
        location: { lat: 6.6018, lng: 3.3515 }, // Ikeja
    },
    {
        id: 'ORD002',
        patient: 'Chidinma Okoro',
        address: '456 Ademola Adetokunbo Crescent, Wuse II, Abuja',
        location: { lat: 9.0765, lng: 7.4913 }, // Abuja
    },
     {
        id: 'ORD003',
        patient: 'Musa Ibrahim',
        address: '789 Aba Road, Port Harcourt',
        location: { lat: 4.8156, lng: 7.0498 }, // Port Harcourt
    },
];


export default function ActiveDeliveriesPage() {
    const [selectedDelivery, setSelectedDelivery] = useState(mockDeliveries[0]);
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Active Deliveries</h1>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Your Assigned Deliveries</CardTitle>
                            <CardDescription>
                                These are the orders you need to pick up and deliver.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                               {mockDeliveries.map(delivery => (
                                   <div 
                                        key={delivery.id} 
                                        className={`p-3 rounded-md cursor-pointer ${selectedDelivery.id === delivery.id ? 'bg-primary/10' : ''}`}
                                        onClick={() => setSelectedDelivery(delivery)}
                                    >
                                       <p className="font-bold">{delivery.patient}</p>
                                       <p className="text-sm text-muted-foreground">{delivery.address}</p>
                                   </div>
                               ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                 <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Delivery Location</CardTitle>
                            <CardDescription>
                                Map view of the selected delivery address.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-96 w-full rounded-lg overflow-hidden">
                                <Map
                                    interactive={false}
                                    initialCenter={selectedDelivery.location}
                                    markers={[selectedDelivery.location]}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
