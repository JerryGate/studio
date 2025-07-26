
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
import { useToast } from '@/hooks/use-toast';


export default function PharmacyManagementPage() {
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>(mockPharmacies);
    const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const { toast } = useToast();

    const handleAdd = (pharmacyData: Omit<Pharmacy, 'id' | 'dateRegistered'>) => {
        const newPharmacy = { ...pharmacyData, id: `PHM${pharmacies.length + 101}`, dateRegistered: new Date().toISOString().split('T')[0] };
        setPharmacies(prev => [newPharmacy, ...prev]);
        toast({ title: 'Success', description: 'New pharmacy has been added.' });
    };

    const handleEdit = (pharmacy: Pharmacy) => {
        setPharmacies(prev => prev.map(p => p.id === pharmacy.id ? pharmacy : p));
        toast({ title: 'Success', description: 'Pharmacy details have been updated.' });
    };

    const openForm = (pharmacy?: Pharmacy, viewMode = false) => {
        setSelectedPharmacy(pharmacy || null);
        setIsViewing(viewMode);
        setIsFormOpen(true);
    };

    const handleStatusChange = (pharmacyId: string, status: 'Approved' | 'Rejected') => {
        setPharmacies(prev => prev.map(p => p.id === pharmacyId ? { ...p, status } : p));
        toast({
            title: 'Pharmacy Status Updated',
            description: `Pharmacy has been ${status}.`
        });
    }

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
          const isPending = pharmacy.status === 'Pending';
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
                        <DropdownMenuItem onClick={() => openForm(pharmacy, false)}>Edit Pharmacy</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openForm(pharmacy, true)}>View Details</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {isPending && (
                            <>
                                <DropdownMenuItem className="text-green-600" onClick={() => handleStatusChange(pharmacy.id, 'Approved')}>Approve</DropdownMenuItem>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
                                </AlertDialogTrigger>
                            </>
                        )}
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
                            onClick={() => handleStatusChange(pharmacy.id, 'Rejected')}
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
                    <h1 className="text-3xl font-bold animated-gradient-text">Pharmacy Management</h1>
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
                isViewing={isViewing}
            />
        </div>
    );
}
