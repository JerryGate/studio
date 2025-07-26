
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Order, OrderStatus } from '@/types';
import { Eye, PlusCircle } from 'lucide-react';

// Mock data for bulk orders
const mockBulkOrders: Partial<Order>[] = [
  { id: 'BULK001', date: '2023-07-15', total: 150000, status: 'Delivered' },
  { id: 'BULK002', date: '2023-07-28', total: 220000, status: 'Shipped' },
  { id: 'BULK003', date: '2023-08-01', total: 185000, status: 'Processing' },
];

export const columns: ColumnDef<Partial<Order>>[] = [
    { accessorKey: 'id', header: 'Order ID' },
    { accessorKey: 'date', header: 'Date Placed' },
    { accessorKey: 'total', header: 'Total (₦)' },
    { 
        accessorKey: 'status', 
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as OrderStatus;
            return <Badge variant={status === 'Delivered' ? 'default' : 'secondary'}>{status}</Badge>
        }
    },
    {
        id: 'actions',
        cell: () => <Button variant="outline" size="sm"><Eye className="mr-2 h-4 w-4" />View Details</Button>,
    },
];

export default function BulkOrdersPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Bulk Orders</h1>
                    <p className="text-muted-foreground">Manage and track your bulk medication orders.</p>
                </div>
                <Button asChild>
                    <Link href="/hospital/bulk-orders/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Place New Bulk Order
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={mockBulkOrders} searchColumn='id' searchPlaceholder='Filter by Order ID...' />
                </CardContent>
            </Card>
        </div>
    );
}
