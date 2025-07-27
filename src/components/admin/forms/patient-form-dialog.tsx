

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Patient } from '@/lib/mock-data';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { User, Ban, Save } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().min(11, 'Please enter a valid phone number.'),
  status: z.enum(['Active', 'Inactive', 'Suspended']),
});

type PatientFormValues = z.infer<typeof formSchema>;

interface PatientFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Patient | Omit<Patient, 'id' | 'orders'>) => void;
  patient: Patient | null;
}

export function PatientFormDialog({ isOpen, onClose, onSubmit, patient }: PatientFormDialogProps) {
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      status: 'Active',
    },
  });

  useEffect(() => {
    if (patient) {
      form.reset(patient);
    } else {
      form.reset({
        name: '',
        email: '',
        phone: '',
        status: 'Active',
      });
    }
  }, [patient, form, isOpen]);

  const handleSubmit = (data: PatientFormValues) => {
    if (patient) {
      onSubmit({ ...patient, ...data });
    } else {
      onSubmit(data);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-transparent border-none shadow-none p-0">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card>
                <DialogHeader className="p-6 pb-0">
                    <div className="mx-auto bg-primary/10 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
                        <User className="h-8 w-8" />
                    </div>
                    <DialogTitle className="text-center text-2xl font-bold text-primary">{patient ? 'Edit Patient' : 'Add New Patient'}</DialogTitle>
                    <DialogDescription className="text-center">
                        {patient ? 'Update the details for this patient.' : 'Fill in the details for the new patient.'}
                    </DialogDescription>
                </DialogHeader>
                <CardContent className="p-6">
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="08012345678" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                                <SelectItem value="Suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={onClose}>
                                <Ban className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                            <Button type="submit">
                                 <Save className="mr-2 h-4 w-4" />
                                {patient ? 'Save Changes' : 'Add Patient'}
                            </Button>
                        </DialogFooter>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
