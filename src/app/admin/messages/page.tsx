import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MessagesPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Messaging Centre</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This will be the central hub for all communications, including support tickets and direct messages between users, pharmacies, and dispatchers.</p>
                    {/* Placeholder for messaging interface */}
                </CardContent>
            </Card>
        </div>
    );
}
