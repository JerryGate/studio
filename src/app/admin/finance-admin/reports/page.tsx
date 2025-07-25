
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/ui/date-picker-with-range';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';

type Transaction = {
  orderId: string;
  date: string;
  patient: string;
  pharmacy: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
};

const mockTransactions: Transaction[] = [
  { orderId: 'ORD001', date: '2023-05-01', patient: 'Adebayo Adekunle', pharmacy: 'GoodHealth Pharmacy', amount: 3700, status: 'Completed' },
  { orderId: 'ORD002', date: '2023-05-01', patient: 'Chidinma Okoro', pharmacy: 'City Drugs', amount: 1500, status: 'Completed' },
  { orderId: 'ORD003', date: '2023-05-02', patient: 'Musa Ibrahim', pharmacy: 'Wellness Meds', amount: 800, status: 'Pending' },
  { orderId: 'ORD004', date: '2023-05-03', patient: 'Funke Ojo', pharmacy: 'GoodHealth Pharmacy', amount: 2200, status: 'Failed' },
];

export const columns: ColumnDef<Transaction>[] = [
    { accessorKey: 'orderId', header: 'Order ID' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'patient', header: 'Patient' },
    { accessorKey: 'pharmacy', header: 'Pharmacy' },
    { accessorKey: 'amount', header: 'Amount (₦)' },
    { accessorKey: 'status', header: 'Status' },
];

export default function ReportsPage() {
    const [showReport, setShowReport] = useState(false);
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Transactions & Reports</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Reports</CardTitle>
                        <CardDescription>Generate transaction reports for a specific day.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => setShowReport(true)}>Generate Today's Report</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Periodic Reports</CardTitle>
                        <CardDescription>Generate reports for a specific date range.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <DatePickerWithRange />
                         <Button onClick={() => setShowReport(true)}>Generate Periodic Report</Button>
                    </CardContent>
                </Card>
            </div>
            {showReport && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Generated Report</CardTitle>
                        <CardDescription>
                           This is a sample report of all platform transactions. In a real application, this data would be dynamically generated based on your selection.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={mockTransactions} searchColumn='patient' searchPlaceholder='Filter by patient...' />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
