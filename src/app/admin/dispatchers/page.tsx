import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DispatcherManagementPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Dispatcher Management</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Dispatchers</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This is where you will manage all dispatchers. You'll be able to view their profiles, track their performance, and manage their accounts.</p>
                    {/* Placeholder for dispatcher list table */}
                </CardContent>
            </Card>
        </div>
    );
}
