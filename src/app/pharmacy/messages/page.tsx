import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MessagesPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Pharmacy Messages</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Messaging Centre</CardTitle>
                    <CardDescription>
                        Communicate with customers or the Medfast support team.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Your messaging interface will appear here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
