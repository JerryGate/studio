
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
import { Dispatcher, mockDispatchers } from '@/lib/mock-data';
import { DispatcherFormDialog } from '@/components/admin/forms/dispatcher-form-dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


export default function DispatcherManagementPage() {
    const [dispatchers, setDispatchers] = useState<Dispatcher[]>(mockDispatchers);
    const [selectedDispatcher, setSelectedDispatcher] = useState<Dispatcher | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleAdd = (dispatcher: Omit<Dispatcher, 'id' | 'deliveries'>) => {
        setDispatchers(prev => [...prev, { ...dispatcher, id: `DIS${prev.length + 1}`, deliveries: 0 }]);
    };

    const handleEdit = (dispatcher: Dispatcher) => {
        setDispatchers(prev => prev.map(d => d.id === dispatcher.id ? dispatcher : d));
    };
    
    const openForm = (dispatcher?: Dispatcher) => {
        setSelectedDispatcher(dispatcher || null);
        setIsFormOpen(true);
    };

    const columns: ColumnDef<Dispatcher>[] = [
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
             <AlertDialog>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => openForm(dispatcher)}>Edit Profile</DropdownMenuItem>
                    <DropdownMenuItem>View Delivery History</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-destructive">Deactivate Account</DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will deactivate {dispatcher.name}'s account. They will not be able to perform deliveries until reactivated.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                         onClick={() => console.log(`Deactivating ${dispatcher.name}`)}
                         className="bg-destructive hover:bg-destructive/90"
                        >
                            Deactivate
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          );
        },
      },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Dispatcher Management</h1>
                    <p className="text-muted-foreground">Manage all dispatchers on the platform.</p>
                </div>
                <Button onClick={() => openForm()}>Add New Dispatcher</Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Registered Dispatchers</CardTitle>
                    <CardDescription>A list of all dispatchers in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={dispatchers} searchColumn='name' searchPlaceholder="Filter dispatchers by name..." />
                </CardContent>
            </Card>
            
            <DispatcherFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={selectedDispatcher ? handleEdit : handleAdd}
                dispatcher={selectedDispatcher}
            />
        </div>
    );
}
