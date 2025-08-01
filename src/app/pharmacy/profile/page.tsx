
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState, useRef } from 'react';
import { Loader2, Camera, User, Save } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth-context';

export default function PharmacyProfilePage() {
    const { toast } = useToast();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

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
                         <div className="flex flex-col items-center space-y-4">
                            <div className="relative group">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={avatarPreview || `https://i.pravatar.cc/150?u=${user?.id}`} />
                                    <AvatarFallback>
                                        <User className="h-10 w-10" />
                                    </AvatarFallback>
                                </Avatar>
                                <button
                                    type="button"
                                    onClick={handleAvatarClick}
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Camera className="h-8 w-8 text-white" />
                                </button>
                                <Input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pharmacyName">Pharmacy Name</Label>
                            <Input id="pharmacyName" defaultValue="GoodHealth Pharmacy" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Contact Email Address</Label>
                            <Input id="email" type="email" defaultValue={user?.email} readOnly/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Pharmacy Address</Label>
                            <Input id="address" defaultValue="456 Health Way, Ikeja, Lagos" />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                             {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
