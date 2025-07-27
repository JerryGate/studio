

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dispatcher } from '@/lib/mock-data';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Truck, Ban, Save } from 'lucide-react';

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
  }, [dispatcher, form, isOpen]);

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
      <DialogContent className="bg-transparent border-none shadow-none p-0">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card>
                <DialogHeader className="p-6 pb-0">
                    <div className="mx-auto bg-primary/10 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
                        <Truck className="h-8 w-8" />
                    </div>
                    <DialogTitle className="text-center text-2xl font-bold text-primary">{dispatcher ? 'Edit Dispatcher' : 'Add New Dispatcher'}</DialogTitle>
                    <DialogDescription className="text-center">
                        {dispatcher ? 'Update the details for this dispatcher.' : 'Fill in the details for the new dispatcher.'}
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
                         <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={onClose}>
                                <Ban className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                            <Button type="submit">
                                <Save className="mr-2 h-4 w-4" />
                                {dispatcher ? 'Save Changes' : 'Add Dispatcher'}
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
