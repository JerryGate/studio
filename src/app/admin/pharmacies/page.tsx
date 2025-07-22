import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PharmacyManagementPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Pharmacy Management</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Pharmacies</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This is where you will manage all registered pharmacies on the platform. You'll be able to view, edit, approve, and remove pharmacies.</p>
                    {/* Placeholder for pharmacy list table */}
                </CardContent>
            </Card>
        </div>
    );
}
