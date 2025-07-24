
'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockOrders } from '@/lib/mock-data';

interface DeliveryHistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dispatcherName: string;
}

const deliveryHistory = mockOrders.slice(0, 3).map(order => ({ ...order, status: 'Delivered' as const }));

export function DeliveryHistoryDialog({ isOpen, onClose, dispatcherName }: DeliveryHistoryDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Delivery History for {dispatcherName}</DialogTitle>
          <DialogDescription>
            A list of deliveries completed by this dispatcher. This is mock data.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {deliveryHistory.map((delivery) => (
                        <TableRow key={delivery.id}>
                            <TableCell>{delivery.id}</TableCell>
                            <TableCell>{delivery.date}</TableCell>
                            <TableCell>₦{delivery.total.toLocaleString()}</TableCell>
                            <TableCell><Badge>{delivery.status}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
