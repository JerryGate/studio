
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';

interface OrderItem {
    id: number;
    drugName: string;
    quantity: string;
}

export default function NewBulkOrderPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<OrderItem[]>([{ id: 1, drugName: '', quantity: '' }]);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), drugName: '', quantity: '' }]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: number, field: 'drugName' | 'quantity', value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // In a real app, you would send this to an API
    console.log("Submitting bulk order:", items);
    setTimeout(() => {
        toast({
            title: "Bulk Order Submitted!",
            description: "Your request has been sent to our pharmacy partners for a quote.",
        });
        router.push('/hospital/bulk-orders');
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">New Bulk Order</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create Bulk Order Request</CardTitle>
          <CardDescription>List the drugs and quantities you need. Our team will get back to you with a quote.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 items-end p-4 border rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow w-full">
                            <div className="space-y-2">
                                <Label htmlFor={`drugName-${item.id}`}>Drug Name</Label>
                                <Input 
                                    id={`drugName-${item.id}`} 
                                    placeholder="e.g., Amoxicillin 500mg" 
                                    required 
                                    value={item.drugName}
                                    onChange={(e) => handleItemChange(item.id, 'drugName', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                                <Input 
                                    id={`quantity-${item.id}`} 
                                    placeholder="e.g., 50 packs" 
                                    required 
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                />
                            </div>
                        </div>
                         <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={items.length === 1}
                            className="flex-shrink-0"
                         >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
            
            <Button type="button" variant="outline" onClick={handleAddItem}>
                <PlusCircle className="mr-2 h-4 w-4"/>
                Add Another Item
            </Button>
            
            <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea id="notes" placeholder="Any specific instructions or brands?" />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
