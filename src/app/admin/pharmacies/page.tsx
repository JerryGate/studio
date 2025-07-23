
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
import { Pharmacy, mockPharmacies } from '@/lib/mock-data';
import { PharmacyFormDialog } from '@/components/admin/forms/pharmacy-form-dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


export default function PharmacyManagementPage() {
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>(mockPharmacies);
    const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleAdd = (pharmacy: Omit<Pharmacy, 'id' | 'dateRegistered'>) => {
        setPharmacies(prev => [...prev, { ...pharmacy, id: `PHM${prev.length + 1}`, dateRegistered: new Date().toISOString().split('T')[0] }]);
    };

    const handleEdit = (pharmacy: Pharmacy) => {
        setPharmacies(prev => prev.map(p => p.id === pharmacy.id ? pharmacy : p));
    };

    const openForm = (pharmacy?: Pharmacy) => {
        setSelectedPharmacy(pharmacy || null);
        setIsFormOpen(true);
    };

    const columns: ColumnDef<Pharmacy>[] = [
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
                        <DropdownMenuItem onClick={() => openForm(pharmacy)}>Edit Pharmacy</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-green-600" onClick={() => console.log('Approving...')}>Approve</DropdownMenuItem>
                         <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
                         </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will reject the application for {pharmacy.name}. This cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            className="bg-destructive hover:bg-destructive/90" 
                            onClick={() => console.log(`Rejecting ${pharmacy.name}`)}
                        >
                            Reject
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
                    <h1 className="text-3xl font-bold text-primary">Pharmacy Management</h1>
                    <p className="text-muted-foreground">Manage all registered pharmacies on the platform.</p>
                </div>
                <Button onClick={() => openForm()}>Add New Pharmacy</Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Registered Pharmacies</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={pharmacies} searchColumn='name' searchPlaceholder="Filter pharmacies by name..." />
                </CardContent>
            </Card>

            <PharmacyFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={selectedPharmacy ? handleEdit : handleAdd}
                pharmacy={selectedPharmacy}
            />
        </div>
    );
}
