import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DeliveryHistoryPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Delivery History</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Past Deliveries</CardTitle>
                    <CardDescription>
                        View a record of all the deliveries you have completed.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Your delivery history will be listed here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
