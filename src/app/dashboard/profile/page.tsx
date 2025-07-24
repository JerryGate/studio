
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">My Profile</h1>
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
                        <Input id="fullName" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="08012345678" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="address">Default Delivery Address</Label>
                        <Input id="address" defaultValue="123 Main Street, Garki, Abuja" />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    );
}
