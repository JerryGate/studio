
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
import { Patient, mockPatients } from '@/lib/mock-data';
import { PatientFormDialog } from '@/components/admin/forms/patient-form-dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


export default function PatientManagementPage() {
    const [patients, setPatients] = useState<Patient[]>(mockPatients);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleAdd = (patient: Omit<Patient, 'id' | 'orders'>) => {
        setPatients(prev => [...prev, { ...patient, id: `PAT${prev.length + 1}`, orders: 0 }]);
    };

    const handleEdit = (patient: Patient) => {
        setPatients(prev => prev.map(p => p.id === patient.id ? patient : p));
    };
    
    const openForm = (patient?: Patient) => {
        setSelectedPatient(patient || null);
        setIsFormOpen(true);
    };

    const columns: ColumnDef<Patient>[] = [
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
          const variant = {
            Active: 'default',
            Inactive: 'secondary',
            Suspended: 'destructive',
          }[status] || 'outline';
          
          return <Badge variant={variant as any}>{status}</Badge>;
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const patient = row.original;
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
                        <DropdownMenuItem onClick={() => openForm(patient)}>Edit Profile</DropdownMenuItem>
                        <DropdownMenuItem>View Order History</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-destructive">Suspend Account</DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will suspend {patient.name}'s account. They will not be able to place new orders until their account is reactivated.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={() => console.log(`Suspending ${patient.name}`)}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            Suspend
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
                    <h1 className="text-3xl font-bold text-primary">Patient Management</h1>
                    <p className="text-muted-foreground">Manage all patients using the platform.</p>
                </div>
                <Button onClick={() => openForm()}>Add New Patient</Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Registered Patients</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={patients} searchColumn='name' searchPlaceholder="Filter patients by name..." />
                </CardContent>
            </Card>

            <PatientFormDialog
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={selectedPatient ? handleEdit : handleAdd}
                patient={selectedPatient}
            />
        </div>
    );
}
