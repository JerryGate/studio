
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Separator } from '../ui/separator';

export function AccountSettings() {
    const { toast } = useToast();
    const { user } = useAuth();
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProfileLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsProfileLoading(false);
            toast({
                title: "Profile Updated",
                description: "Your profile information has been saved successfully.",
            });
        }, 1500);
    };
    
    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPasswordLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsPasswordLoading(false);
            toast({
                title: "Password Updated",
                description: "Your password has been changed successfully.",
            });
        }, 1500);
    };


    if (!user) {
        return null;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary">Account Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and set your password.</p>
            
            <Separator />

            <form onSubmit={handleProfileSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            Update your personal details here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" defaultValue={user.email.split('@')[0]} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue={user.email} readOnly />
                        </div>
                        <Button type="submit" disabled={isProfileLoading}>
                             {isProfileLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>
            </form>

            <form onSubmit={handlePasswordSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Password Management</CardTitle>
                        <CardDescription>
                            Change your account password here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" />
                        </div>
                        <Button type="submit" disabled={isPasswordLoading}>
                             {isPasswordLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Password
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
