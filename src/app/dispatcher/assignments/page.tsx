
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/hooks/use-orders';
import { Order, OrderStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Check, X } from 'lucide-react';

export default function NewAssignmentsPage() {
  const { orders, updateOrderStatus } = useOrders();
  const { toast } = useToast();

  const pendingOrders = orders.filter(o => o.status === 'Pending Approval');

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast({
      title: 'Assignment Updated',
      description: `Order #${orderId} has been ${newStatus === 'Processing' ? 'Accepted' : 'Rejected'}.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>New Delivery Assignments</CardTitle>
          <CardDescription>
            Review and accept or reject new delivery requests.
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
                      <Button variant="outline" size="icon" className="text-green-600" onClick={() => handleStatusChange(order.id, 'Processing')}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleStatusChange(order.id, 'Cancelled')}>
                        <X className="h-4 w-4" />
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
