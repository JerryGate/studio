
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Jan', spent: 2500 },
  { name: 'Feb', spent: 3200 },
  { name: 'Mar', spent: 1800 },
  { name: 'Apr', spent: 4500 },
  { name: 'May', spent: 1200 },
  { name: 'Jun', spent: 500 },
  { name: 'Jul', spent: 3700 },
];

export function SpendingHistoryChart() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl">Spending History</CardTitle>
            <CardDescription>Your total spending over the last few months.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                 <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Amount (₦)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                        contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))"
                        }}
                    />
                    <Legend />
                    <Bar dataKey="spent" fill="hsl(var(--primary))" name="Spent (₦)" />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
