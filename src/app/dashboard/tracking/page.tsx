import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DeliveryTrackingPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Track Delivery</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Track Your Order</CardTitle>
                    <CardDescription>
                        Enter your order ID to see its current status.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input placeholder="Enter Order ID (e.g., ORD002)" />
                        <Button>Track</Button>
                    </div>
                    {/* Placeholder for tracking result */}
                    <div className="pt-4 border-t">
                        <p className="text-muted-foreground">Tracking information will be displayed here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
