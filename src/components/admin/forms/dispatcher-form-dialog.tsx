

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dispatcher } from '@/lib/mock-data';
import { useEffect } from 'react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  phone: z.string().min(11, 'Please enter a valid phone number.'),
  vehicle: z.string().min(5, 'Please enter vehicle details.'),
  status: z.enum(['Active', 'Inactive']),
});

type DispatcherFormValues = z.infer<typeof formSchema>;

interface DispatcherFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Dispatcher | Omit<Dispatcher, 'id' | 'deliveries'>) => void;
  dispatcher: Dispatcher | null;
}

export function DispatcherFormDialog({ isOpen, onClose, onSubmit, dispatcher }: DispatcherFormDialogProps) {
  const form = useForm<DispatcherFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      vehicle: '',
      status: 'Active',
    },
  });

  useEffect(() => {
    if (dispatcher) {
      form.reset(dispatcher);
    } else {
      form.reset({
        name: '',
        phone: '',
        vehicle: '',
        status: 'Active',
      });
    }
  }, [dispatcher, form]);

  const handleSubmit = (data: DispatcherFormValues) => {
    if (dispatcher) {
      onSubmit({ ...dispatcher, ...data });
    } else {
      onSubmit(data);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dispatcher ? 'Edit Dispatcher' : 'Add New Dispatcher'}</DialogTitle>
          <DialogDescription>
            {dispatcher ? 'Update the details for this dispatcher.' : 'Fill in the details for the new dispatcher.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Femi Adebayo" {...field} />
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
              name="vehicle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Information</FormLabel>
                  <FormControl>
                    <Input placeholder="Honda Motorcycle - ABC 123" {...field} />
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="submit">{dispatcher ? 'Save Changes' : 'Add Dispatcher'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
