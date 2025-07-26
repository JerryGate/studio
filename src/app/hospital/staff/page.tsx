
'use client';

import { useState } from 'react';
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

type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: 'Doctor' | 'Nurse' | 'Pharmacist' | 'Admin';
  status: 'Active' | 'Suspended';
};

const mockStaff: StaffMember[] = [
    { id: 'STAFF001', name: 'Dr. Amina Yusuf', email: 'amina.yusuf@hospital.com', role: 'Doctor', status: 'Active' },
    { id: 'STAFF002', name: 'Nurse Grace Okon', email: 'grace.okon@hospital.com', role: 'Nurse', status: 'Active' },
    { id: 'STAFF003', name: 'James Adebiyi', email: 'james.adebiyi@hospital.com', role: 'Pharmacist', status: 'Suspended' },
];

export default function ManageStaffPage() {
    const [staff, setStaff] = useState<StaffMember[]>(mockStaff);

    const columns: ColumnDef<StaffMember>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => <Badge variant="secondary">{row.getValue('role')}</Badge>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <Badge variant={row.getValue('status') === 'Active' ? 'default' : 'destructive'}>{row.getValue('status')}</Badge>,
      },
      {
        id: 'actions',
        cell: () => {
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
                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Suspend Account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <div>
                    <h1 className="text-3xl font-bold text-primary">Manage Staff</h1>
                    <p className="text-muted-foreground">Add, edit, or remove staff members with access to the hospital portal.</p>
                </div>
                <Button>Add New Staff Member</Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Staff Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                     <DataTable columns={columns} data={staff} searchColumn='name' searchPlaceholder="Filter staff by name..." />
                </CardContent>
            </Card>
        </div>
    );
}
