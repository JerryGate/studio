import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PatientManagementPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Patient Management</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Patients</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This is where you will manage all registered patients. You'll be able to view their details, order history, and manage their accounts.</p>
                    {/* Placeholder for patient list table */}
                </CardContent>
            </Card>
        </div>
    );
}
