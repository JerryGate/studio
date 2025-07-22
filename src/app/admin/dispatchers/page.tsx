
'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';
import { MoreHorizontal } from 'lucide-react';

const mockDispatchers: Dispatcher[] = [
    { id: 'DIS001', name: 'Femi Adebayo', phone: '08098765432', vehicle: 'Honda Motorcycle - ABC 123', status: 'Active', deliveries: 25 },
    { id: 'DIS002', name: 'Tunde Bakare', phone: '08023456789', vehicle: 'Suzuki Bike - XYZ 789', status: 'Active', deliveries: 15 },
    { id: 'DIS003', name: 'Chioma Nwosu', phone: '09011223344', vehicle: 'TVS Tricycle - LMN 456', status: 'Inactive', deliveries: 42 },
    { id: 'DIS004', name: 'Musa Aliyu', phone: '08134567890', vehicle: 'Bajaj Bike - GHI 321', status: 'Active', deliveries: 8 },
];

export type Dispatcher = {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  status: 'Active' | 'Inactive';
  deliveries: number;
};

export const columns: ColumnDef<Dispatcher>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'vehicle',
    header: 'Vehicle Information',
  },
  {
    accessorKey: 'deliveries',
    header: 'Completed Deliveries',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return <Badge variant={status === 'Active' ? 'default' : 'secondary'}>{status}</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const dispatcher = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>View Delivery History</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Deactivate Account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


export default function DispatcherManagementPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Dispatcher Management</h1>
                    <p className="text-muted-foreground">Manage all dispatchers on the platform.</p>
                </div>
                <Button>Add New Dispatcher</Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Registered Dispatchers</CardTitle>
                    <CardDescription>A list of all dispatchers in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={mockDispatchers} searchColumn='name' searchPlaceholder="Filter dispatchers by name..." />
                </CardContent>
            </Card>
        </div>
    );
}
