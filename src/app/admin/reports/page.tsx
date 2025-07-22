import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Transaction Reports</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>View and generate daily transaction reports.</p>
                        {/* Placeholder for daily report generator */}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Periodic Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Generate transaction reports for specific periods (e.g., weekly, monthly).</p>
                        {/* Placeholder for periodic report generator */}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
