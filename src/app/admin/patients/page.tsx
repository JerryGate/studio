
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

const mockPatients: Patient[] = [
    { id: 'PAT001', name: 'Adebayo Adekunle', email: 'adebayo@example.com', phone: '08011223344', orders: 5, status: 'Active' },
    { id: 'PAT002', name: 'Chidinma Okoro', email: 'chidinma@example.com', phone: '09022334455', orders: 2, status: 'Active' },
    { id: 'PAT003', name: 'Musa Ibrahim', email: 'musa@example.com', phone: '07033445566', orders: 8, status: 'Active' },
    { id: 'PAT004', name: 'Funke Ojo', email: 'funke@example.com', phone: '08144556677', orders: 0, status: 'Inactive' },
    { id: 'PAT005', name: 'Emeka Nwosu', email: 'emeka@example.com', phone: '08055667788', orders: 12, status: 'Active' },
    { id: 'PAT006', name: 'Zainab Bello', email: 'zainab@example.com', phone: '09066778899', orders: 1, status: 'Suspended' },
];

export type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  status: 'Active' | 'Inactive' | 'Suspended';
};

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
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
    accessorKey: 'orders',
    header: 'Total Orders',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const badgeClass = {
        Active: 'bg-green-100 text-green-800',
        Inactive: 'bg-gray-100 text-gray-800',
        Suspended: 'bg-yellow-100 text-yellow-800',
      }[status] || '';
      return <Badge className={badgeClass} variant="outline">{status}</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const patient = row.original;
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
            <DropdownMenuItem>View Order History</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Suspend Account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function PatientManagementPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Patient Management</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Registered Patients</CardTitle>
                    <CardDescription>A list of all patients using the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={mockPatients} searchColumn='name' searchPlaceholder="Filter patients by name..." />
                </CardContent>
            </Card>
        </div>
    );
}
