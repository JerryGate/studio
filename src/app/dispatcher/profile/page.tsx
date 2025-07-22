import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DispatcherProfilePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Dispatcher Profile</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                    <CardDescription>
                        Keep your personal details up to date.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" defaultValue="Femi Adebayo" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="08098765432" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="vehicle">Vehicle Information</Label>
                        <Input id="vehicle" defaultValue="Honda Motorcycle - ABC 123" />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    );
}
