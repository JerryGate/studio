
'use client';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Mon', sales: 12000 },
  { name: 'Tue', sales: 15000 },
  { name: 'Wed', sales: 11000 },
  { name: 'Thu', sales: 18000 },
  { name: 'Fri', sales: 22000 },
  { name: 'Sat', sales: 25000 },
  { name: 'Sun', sales: 21000 },
];

export function PharmacySalesChart() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl">Recent Sales</CardTitle>
            <CardDescription>Your total sales over the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                 <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Sales (₦)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                        contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))"
                        }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" name="Sales (₦)" />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
