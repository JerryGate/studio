
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function PharmacyProfilePage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Profile Updated",
                description: "Your pharmacy information has been saved successfully.",
            });
        }, 1500);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Pharmacy Profile</h1>
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Your Pharmacy's Information</CardTitle>
                        <CardDescription>
                            Keep your pharmacy details up to date.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="pharmacyName">Pharmacy Name</Label>
                            <Input id="pharmacyName" defaultValue="GoodHealth Pharmacy" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Contact Email Address</Label>
                            <Input id="email" type="email" defaultValue="pharmacy@e-pharma.com" readOnly/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Pharmacy Address</Label>
                            <Input id="address" defaultValue="456 Health Way, Ikeja, Lagos" />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
