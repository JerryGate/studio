
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { AlertTriangle, Loader2, Send, Ban } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function EmergencyRequestModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsLoading(false);
        setIsOpen(false);
        toast({
            title: "Emergency Request Sent!",
            description: "Your request has been broadcasted to all available pharmacies and dispatchers. You will be contacted shortly.",
            variant: "destructive"
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" className="animate-pulse-red">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Emergency Request
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="text-emergency-DEFAULT" />
                        Urgent Medical Request
                    </DialogTitle>
                    <DialogDescription>
                        This will send an alert to all nearby pharmacies. Use only for genuine emergencies.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="drugName">Drug Name</Label>
                        <Input id="drugName" placeholder="e.g., Ventolin Inhaler" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" placeholder="e.g., 1" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="urgencyReason">Reason for Urgency</Label>
                        <Textarea id="urgencyReason" placeholder="Briefly describe the emergency" required />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                            <Ban className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                        <Button type="submit" variant="destructive" disabled={isLoading}>
                             {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                            Send Urgent Alert
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
