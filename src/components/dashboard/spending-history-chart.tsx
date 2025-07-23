
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ComposedChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Jan', spent: 2500, orders: 3 },
  { name: 'Feb', spent: 3200, orders: 4 },
  { name: 'Mar', spent: 1800, orders: 2 },
  { name: 'Apr', spent: 4500, orders: 5 },
  { name: 'May', spent: 1200, orders: 1 },
  { name: 'Jun', spent: 500, orders: 1 },
  { name: 'Jul', spent: 3700, orders: 4 },
];

export function SpendingHistoryChart() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl">Spending & Order History</CardTitle>
            <CardDescription>Your total spending and orders over the last few months.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                 <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" stroke="hsl(var(--primary))" label={{ value: 'Amount (₦)', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" allowDecimals={false} label={{ value: 'Orders', angle: -90, position: 'insideRight' }} />
                    <Tooltip 
                        contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))"
                        }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="spent" fill="hsl(var(--primary))" name="Spent (₦)" />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(var(--accent))" name="Orders" />
                </ComposedChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
