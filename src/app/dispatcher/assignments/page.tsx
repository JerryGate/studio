'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/hooks/use-orders';
import { OrderStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

export default function NewAssignmentsPage() {
  const { orders, updateOrderStatus } = useOrders();
  const { toast } = useToast();

  // Show orders that are processed by pharmacy and ready for pickup
  const pendingOrders = orders.filter(o => o.status === 'Processing');

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast({
      title: 'Assignment Updated',
      description: `Order #${orderId} has been ${newStatus === 'Shipped' ? 'Accepted for delivery' : 'Rejected'}.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New Delivery Assignments</CardTitle>
          <CardDescription>
            Review and accept or reject new delivery requests. Accepted orders will move to your Active Deliveries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingOrders.length > 0 ? (
                pendingOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.customerDetails.fullName || 'N/A'}</TableCell>
                    <TableCell>{order.customerDetails.address}</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="icon" className="text-green-600 hover:text-green-700" onClick={() => handleStatusChange(order.id, 'Shipped')}>
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Accept</span>
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleStatusChange(order.id, 'Cancelled')}>
                        <X className="h-4 w-4" />
                         <span className="sr-only">Reject</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No new assignments at the moment.
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
