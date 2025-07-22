import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ActiveDeliveriesPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Active Deliveries</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Assigned Deliveries</CardTitle>
                    <CardDescription>
                        These are the orders you need to pick up and deliver.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>A list of active deliveries will appear here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
