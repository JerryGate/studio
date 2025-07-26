
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

type Payout = {
  payoutId: string;
  date: string;
  partner: string;
  partnerType: 'Pharmacy' | 'Dispatcher';
  amount: number;
  status: 'Pending' | 'Paid' | 'Failed';
};

const mockPayouts: Payout[] = [
  { payoutId: 'PAY001', date: '2023-05-05', partner: 'GoodHealth Pharmacy', partnerType: 'Pharmacy', amount: 50000, status: 'Pending' },
  { payoutId: 'PAY002', date: '2023-05-05', partner: 'Femi Adebayo', partnerType: 'Dispatcher', amount: 12000, status: 'Pending' },
  { payoutId: 'PAY003', date: '2023-04-28', partner: 'City Drugs', partnerType: 'Pharmacy', amount: 85000, status: 'Paid' },
];

export const columns: ColumnDef<Payout>[] = [
    { accessorKey: 'payoutId', header: 'Payout ID' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'partner', header: 'Partner' },
    { accessorKey: 'partnerType', header: 'Type' },
    { accessorKey: 'amount', header: 'Amount (₦)' },
    { accessorKey: 'status', header: 'Status' },
    {
        id: 'actions',
        cell: ({ row }) => {
          const payout = row.original;
          if (payout.status === 'Pending') {
            return <Button size="sm">Process Payout</Button>;
          }
          return null;
        },
    },
];

export default function PayoutsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold animated-gradient-text mb-6">Manage Payouts</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Partner Payouts</CardTitle>
                    <CardDescription>
                        Process and track payouts to pharmacies and dispatchers.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={mockPayouts} searchColumn='partner' searchPlaceholder='Filter by partner...' />
                </CardContent>
            </Card>
        </div>
    );
}
