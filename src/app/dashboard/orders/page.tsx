

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/hooks/use-orders';
import { useState } from 'react';
import { OrderDetailsDialog } from '@/components/dashboard/order-details-dialog';
import { Order } from '@/types';
import { FeedbackDialog } from '@/components/dashboard/feedback-dialog';
import { useToast } from '@/hooks/use-toast';
import { Eye } from 'lucide-react';

export default function OrderHistoryPage() {
    const { orders, updateOrderStatus } = useOrders();
    const { toast } = useToast();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
        setIsDetailsOpen(true);
    };

    const handleConfirmDelivery = (orderId: string) => {
        updateOrderStatus(orderId, 'Delivered');
        setIsDetailsOpen(false);
        // Find the order that was just confirmed to pass to feedback dialog
        const confirmedOrder = orders.find(o => o.id === orderId);
        setSelectedOrder(confirmedOrder || null);
        setIsFeedbackOpen(true);
         toast({
            title: "Order Confirmed!",
            description: "Thank you for confirming your delivery.",
        });
    }

    const handleFeedbackSubmit = () => {
        setIsFeedbackOpen(false);
        toast({
            title: "Feedback Submitted",
            description: "Thank you for your valuable feedback!",
        });
    }

    return (
        <div>
            <h1 className="text-3xl font-bold animated-gradient-text mb-6">Order History</h1>
            <Card>
                <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>
                        View your past and current orders.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>₦{order.total.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                order.status === 'Delivered' ? 'default' : 
                                                order.status === 'Shipped' ? 'secondary' : 'outline'
                                            }>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">
                                        You have no orders yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {selectedOrder && (
                <OrderDetailsDialog 
                    isOpen={isDetailsOpen}
                    onClose={() => setIsDetailsOpen(false)}
                    order={selectedOrder}
                    onConfirmDelivery={handleConfirmDelivery}
                />
            )}

            {selectedOrder && (
                <FeedbackDialog
                    isOpen={isFeedbackOpen}
                    onClose={() => setIsFeedbackOpen(false)}
                    order={selectedOrder}
                    onSubmit={handleFeedbackSubmit}
                />
            )}
        </div>
    );
}
