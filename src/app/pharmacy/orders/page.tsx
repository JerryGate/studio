
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Order, OrderStatus } from '@/types';
import { mockOrders } from '@/lib/mock-data';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export default function ManageOrdersPage() {
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const { toast } = useToast();

    const handleStatusChange = (orderId: string, status: OrderStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
        toast({ title: 'Order Updated', description: `Order #${orderId} has been marked as ${status}.`});
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Manage Orders</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Incoming Orders</CardTitle>
                    <CardDescription>
                        Fulfill incoming orders from customers.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Customer</TableHead>
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
                                        <TableCell>{order.customerDetails.fullName || 'N/A'}</TableCell>
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
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                     <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                     </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Shipped')}>Mark as Shipped</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Delivered')}>Mark as Delivered</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive" onClick={() => handleStatusChange(order.id, 'Cancelled')}>Cancel Order</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24">
                                        You have no orders yet.
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
