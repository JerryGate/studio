
'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

interface OrderDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

export function OrderDetailsDialog({ isOpen, onClose, order }: OrderDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details: #{order.id}</DialogTitle>
          <DialogDescription>
             On {order.date} - <Badge>{order.status}</Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-4">
            <div className="mb-4">
                <h4 className="font-semibold mb-2">Items Purchased</h4>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order.items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="flex items-center gap-2">
                                    <Image src={item.imageUrls[0]} alt={item.name} width={40} height={40} className="rounded-md" />
                                    <span>{item.name}</span>
                                </TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>₦{item.price.toLocaleString()}</TableCell>
                                <TableCell>₦{(item.price * item.quantity).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
           
            <Separator className="my-4" />

            <div className="space-y-2">
                 <h4 className="font-semibold mb-2">Order Summary</h4>
                 <div className="flex justify-between">
                     <span>Subtotal</span>
                     <span>₦{(order.total - (order.customerDetails?.deliveryFee || 0)).toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between">
                     <span>Delivery Fee</span>
                     <span>₦{(order.customerDetails?.deliveryFee || 0).toLocaleString()}</span>
                 </div>
                 <Separator />
                  <div className="flex justify-between font-bold text-lg">
                     <span>Total</span>
                     <span>₦{order.total.toLocaleString()}</span>
                 </div>
            </div>

            <Separator className="my-4" />

            <div>
                 <h4 className="font-semibold mb-2">Delivery Address</h4>
                 <p className="text-sm text-muted-foreground">
                    {order.customerDetails.fullName}<br/>
                    {order.customerDetails.address}, {order.customerDetails.city}, {order.customerDetails.state}<br/>
                    {order.customerDetails.phone}
                 </p>
            </div>
        </div>
         <DialogFooter>
            <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
