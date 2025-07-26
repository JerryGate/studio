
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SpecialRecommendationModal() {
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
            title: "Request Submitted!",
            description: "Our team will review your request and get back to you with personalized recommendations.",
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="text-center">
                    <h4 className="font-semibold mb-2">Need Help?</h4>
                     <Button variant="link" className="p-0 h-auto">
                        Get a special recommendation
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="text-primary" />
                        Special Recommendation Request
                    </DialogTitle>
                    <DialogDescription>
                        Not sure what you need? Fill out this form and our experts will help.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="condition">Condition or Symptoms</Label>
                        <Textarea id="condition" placeholder="e.g., Seasonal allergies, dry skin, trouble sleeping..." required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="preferences">Preferences (optional)</Label>
                        <Textarea id="preferences" placeholder="e.g., Prefer natural remedies, have an allergy to aspirin..." />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Request
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
