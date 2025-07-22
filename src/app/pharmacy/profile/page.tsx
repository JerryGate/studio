import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PharmacyProfilePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Pharmacy Profile</h1>
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
                        <Input id="email" type="email" defaultValue="contact@goodhealth.com" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="address">Pharmacy Address</Label>
                        <Input id="address" defaultValue="456 Health Way, Ikeja, Lagos" />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    );
}
