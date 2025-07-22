import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PerformancePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Performance Evaluation</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Evaluate Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This section will contain tools to evaluate the performance of pharmacies and dispatchers based on delivery times, customer ratings, and other metrics.</p>
                    {/* Placeholder for performance metrics and charts */}
                </CardContent>
            </Card>
        </div>
    );
}
