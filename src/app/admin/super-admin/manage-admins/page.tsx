
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
import { UserRole } from '@/types';
import { mockAuthUsers } from '@/lib/mock-data';

type AdminUser = {
  id: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Suspended';
};

const initialAdmins: AdminUser[] = [
    { id: mockAuthUsers['super-admin'].id, email: mockAuthUsers['super-admin'].email, role: 'super-admin', status: 'Active' },
    { id: mockAuthUsers['finance-admin'].id, email: mockAuthUsers['finance-admin'].email, role: 'finance-admin', status: 'Active' },
    { id: mockAuthUsers['content-admin'].id, email: mockAuthUsers['content-admin'].email, role: 'content-admin', status: 'Active' },
];

export default function ManageAdminsPage() {
    const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);

    const columns: ColumnDef<AdminUser>[] = [
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
          const role = row.getValue('role') as string;
          return <Badge variant="secondary">{role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</Badge>;
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          return <Badge variant={status === 'Active' ? 'default' : 'destructive'}>{status}</Badge>;
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
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
                <DropdownMenuItem>Edit Role</DropdownMenuItem>
                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Suspend Admin</DropdownMenuItem>
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
                    <h1 className="text-3xl font-bold animated-gradient-text">Manage Admins</h1>
                    <p className="text-muted-foreground">Add, edit, or suspend administrator accounts.</p>
                </div>
                <Button>Add New Admin</Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Administrator Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                     <DataTable columns={columns} data={admins} searchColumn='email' searchPlaceholder="Filter admins by email..." />
                </CardContent>
            </Card>
        </div>
    );
}
