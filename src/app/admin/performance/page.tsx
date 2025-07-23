

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid } from 'recharts';

const pharmacyPerformanceData = [
  { name: 'GoodHealth', rating: 4.8, avgDeliveryTime: 45 },
  { name: 'Wellness Meds', rating: 4.5, avgDeliveryTime: 60 },
  { name: 'City Drugs', rating: 4.9, avgDeliveryTime: 35 },
  { name: 'CarePoint', rating: 4.2, avgDeliveryTime: 75 },
  { name: 'Nationwide', rating: 4.7, avgDeliveryTime: 50 },
];

const dispatcherPerformanceData = [
  { name: 'Femi Adebayo', rating: 4.9, avgDeliveryTime: 25 },
  { name: 'Tunde Bakare', rating: 4.6, avgDeliveryTime: 35 },
  { name: 'Chioma Nwosu', rating: 4.8, avgDeliveryTime: 30 },
  { name: 'Musa Aliyu', rating: 4.7, avgDeliveryTime: 28 },
];

export default function PerformancePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Performance Evaluation</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Pharmacy Performance</CardTitle>
                        <CardDescription>Average ratings and delivery times.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={pharmacyPerformanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" />
                                <Tooltip
                                    contentStyle={{
                                        background: "hsl(var(--background))",
                                        borderColor: "hsl(var(--border))"
                                    }}
                                />
                                <Legend />
                                <Bar yAxisId="left" dataKey="rating" fill="hsl(var(--primary))" name="Avg Rating" />
                                <Bar yAxisId="right" dataKey="avgDeliveryTime" fill="hsl(var(--accent))" name="Avg Delivery (mins)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Dispatcher Performance</CardTitle>
                        <CardDescription>Average ratings and delivery times.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dispatcherPerformanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" />
                                <Tooltip
                                    contentStyle={{
                                        background: "hsl(var(--background))",
                                        borderColor: "hsl(var(--border))"
                                    }}
                                />
                                <Legend />
                                <Bar yAxisId="left" dataKey="rating" fill="hsl(var(--primary))" name="Avg Rating" />
                                <Bar yAxisId="right" dataKey="avgDeliveryTime" fill="hsl(var(--accent))" name="Avg Delivery (mins)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
