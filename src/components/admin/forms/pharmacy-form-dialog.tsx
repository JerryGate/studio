
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pharmacy } from '@/lib/mock-data';
import { useEffect } from 'react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  contactPerson: z.string().min(2, 'Contact person is required.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().min(11, 'Please enter a valid phone number.'),
  status: z.enum(['Approved', 'Pending', 'Rejected']),
});

type PharmacyFormValues = z.infer<typeof formSchema>;

interface PharmacyFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Pharmacy | Omit<Pharmacy, 'id' | 'dateRegistered'>) => void;
  pharmacy: Pharmacy | null;
  isViewing?: boolean;
}

export function PharmacyFormDialog({ isOpen, onClose, onSubmit, pharmacy, isViewing = false }: PharmacyFormDialogProps) {
  const form = useForm<PharmacyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      status: 'Pending',
    },
  });

  useEffect(() => {
    if (pharmacy) {
      form.reset(pharmacy);
    } else {
      form.reset({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        status: 'Pending',
      });
    }
  }, [pharmacy, form]);

  const handleSubmit = (data: PharmacyFormValues) => {
    if (pharmacy) {
      onSubmit({ ...pharmacy, ...data });
    } else {
      onSubmit(data);
    }
    onClose();
  };

  const dialogTitle = isViewing ? 'View Pharmacy' : pharmacy ? 'Edit Pharmacy' : 'Add New Pharmacy';
  const dialogDescription = isViewing ? 'Viewing details for this pharmacy.' : pharmacy ? 'Update the details for this pharmacy.' : 'Fill in the details for the new pharmacy.';


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pharmacy Name</FormLabel>
                  <FormControl>
                    <Input placeholder="GoodHealth Pharmacy" {...field} disabled={isViewing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} disabled={isViewing} />
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
                    <Input placeholder="contact@goodhealth.com" {...field} disabled={isViewing} />
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
                    <Input placeholder="08012345678" {...field} disabled={isViewing} />
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
                   <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isViewing}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                    {isViewing ? 'Close' : 'Cancel'}
                </Button>
                {!isViewing && (
                    <Button type="submit">{pharmacy ? 'Save Changes' : 'Add Pharmacy'}</Button>
                )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
