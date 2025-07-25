'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useOrders } from '@/hooks/use-orders';

export default function DeliveryHistoryPage() {
    const { orders } = useOrders();
    const completedDeliveries = orders.filter(o => o.status === 'Delivered' || o.status === 'Cancelled');

    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Delivery History</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Past Deliveries</CardTitle>
                    <CardDescription>
                        View a record of all the deliveries you have completed or that were cancelled.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {completedDeliveries.length > 0 ? (
                                completedDeliveries.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>{order.customerDetails.fullName || 'N/A'}</TableCell>
                                        <TableCell>₦{order.total.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={order.status === 'Cancelled' ? 'destructive' : 'default'}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">
                                        You have no completed deliveries.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
