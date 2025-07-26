
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type SpecialRequest = {
  id: string;
  name: string;
  date: string;
  condition: string;
  status: 'New' | 'Replied' | 'Closed';
};

const mockRequests: SpecialRequest[] = [
  { id: 'REQ001', name: 'Funke Ojo', date: '2023-08-01', condition: 'Trouble sleeping and seasonal allergies.', status: 'New' },
  { id: 'REQ002', name: 'Adebayo Adekunle', date: '2023-07-30', condition: 'Looking for a good multivitamin for men over 40.', status: 'Replied' },
  { id: 'REQ003', name: 'Chidinma Okoro', date: '2023-07-29', condition: 'Need recommendations for dry skin.', status: 'Closed' },
];

export const columns: ColumnDef<SpecialRequest>[] = [
    { accessorKey: 'id', header: 'Request ID' },
    { accessorKey: 'name', header: 'Customer Name' },
    { accessorKey: 'date', header: 'Date' },
    { 
        accessorKey: 'condition', 
        header: 'Condition/Request',
        cell: ({ row }) => <p className="truncate max-w-xs">{row.getValue('condition')}</p>
    },
    { 
        accessorKey: 'status', 
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status') as SpecialRequest['status'];
            const variant = {
                'New': 'default',
                'Replied': 'secondary',
                'Closed': 'outline'
            }[status];
            return <Badge variant={variant as any}>{status}</Badge>
        }
    },
    {
        id: 'actions',
        cell: () => <Button variant="outline" size="sm">View & Reply</Button>,
    },
];

export default function SpecialRequestsPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold animated-gradient-text">Special Recommendations</h1>
                    <p className="text-muted-foreground">Review and respond to customer requests for product recommendations.</p>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Customer Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={mockRequests} searchColumn='name' searchPlaceholder='Filter by customer name...' />
                </CardContent>
            </Card>
        </div>
    );
}
