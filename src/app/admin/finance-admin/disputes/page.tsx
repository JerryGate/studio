
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';

type Dispute = {
  caseId: string;
  orderId: string;
  date: string;
  patient: string;
  reason: string;
  status: 'Open' | 'Resolved' | 'Pending';
};

const mockDisputes: Dispute[] = [
  { caseId: 'CASE001', orderId: 'ORD004', date: '2023-05-04', patient: 'Funke Ojo', reason: 'Item not received', status: 'Open' },
  { caseId: 'CASE002', orderId: 'ORD001', date: '2023-05-02', patient: 'Adebayo Adekunle', reason: 'Incorrect item delivered', status: 'Resolved' },
];

export const columns: ColumnDef<Dispute>[] = [
    { accessorKey: 'caseId', header: 'Case ID' },
    { accessorKey: 'orderId', header: 'Order ID' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'patient', header: 'Patient' },
    { accessorKey: 'reason', header: 'Reason' },
    { accessorKey: 'status', header: 'Status' },
];

export default function DisputesPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Disputes & Refunds</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Disputes</CardTitle>
                    <CardDescription>
                        Review and resolve customer disputes and process refunds.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={mockDisputes} searchColumn='patient' searchPlaceholder='Filter by patient...' />
                </CardContent>
            </Card>
        </div>
    );
}
