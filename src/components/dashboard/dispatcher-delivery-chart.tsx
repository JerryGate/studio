
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Mon', deliveries: 8 },
  { name: 'Tue', deliveries: 12 },
  { name: 'Wed', deliveries: 7 },
  { name: 'Thu', deliveries: 10 },
  { name: 'Fri', deliveries: 15 },
  { name: 'Sat', deliveries: 18 },
  { name: 'Sun', deliveries: 9 },
];

export function DispatcherDeliveryChart() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl">Weekly Deliveries</CardTitle>
            <CardDescription>Number of deliveries completed in the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                 <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} label={{ value: 'Deliveries', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                        contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))"
                        }}
                    />
                    <Legend />
                    <Bar dataKey="deliveries" fill="hsl(var(--accent))" name="Deliveries" />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
