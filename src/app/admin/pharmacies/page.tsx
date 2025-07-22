
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

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

// Mock data for pharmacies
const mockPharmacies: Pharmacy[] = [
    { id: 'PHM001', name: 'GoodHealth Pharmacy', contactPerson: 'John Doe', email: 'contact@goodhealth.com', phone: '08012345678', status: 'Approved', dateRegistered: '2023-01-15' },
    { id: 'PHM002', name: 'Wellness Meds', contactPerson: 'Jane Smith', email: 'info@wellnessmeds.ng', phone: '09087654321', status: 'Pending', dateRegistered: '2023-02-20' },
    { id: 'PHM003', name: 'City Drugs', contactPerson: 'Mike Johnson', email: 'support@citydrugs.com', phone: '07033445566', status: 'Approved', dateRegistered: '2022-11-30' },
    { id: 'PHM004', name: 'CarePoint Pharmacy', contactPerson: 'Sarah Williams', email: 'care@carepoint.ng', phone: '08122334455', status: 'Rejected', dateRegistered: '2023-03-10' },
    { id: 'PHM005', name: 'Nationwide Pharmacy', contactPerson: 'David Brown', email: 'hr@nationwide.com', phone: '08055667788', status: 'Approved', dateRegistered: '2021-09-01' },
];

export type Pharmacy = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  dateRegistered: string;
};

export const columns: ColumnDef<Pharmacy>[] = [
  {
    accessorKey: 'name',
    header: 'Pharmacy Name',
  },
  {
    accessorKey: 'contactPerson',
    header: 'Contact Person',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'dateRegistered',
    header: 'Date Registered',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const variant = {
        Approved: 'default',
        Pending: 'secondary',
        Rejected: 'destructive',
      }[status] || 'outline';

      return <Badge variant={variant as any}>{status}</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const pharmacy = row.original;
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
            <DropdownMenuItem onClick={() => alert(`Viewing ${pharmacy.name}`)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>Edit Pharmacy</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-green-600">Approve</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Reject/Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


export default function PharmacyManagementPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Pharmacy Management</h1>
                    <p className="text-muted-foreground">Manage all registered pharmacies on the platform.</p>
                </div>
                 <Button>Add New Pharmacy</Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Registered Pharmacies</CardTitle>
                    <CardDescription>A list of all pharmacies in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={mockPharmacies} searchColumn='name' searchPlaceholder="Filter pharmacies by name..." />
                </CardContent>
            </Card>
        </div>
    );
}
