
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line, ComposedChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Jan', revenue: 4000, orders: 24 },
  { name: 'Feb', revenue: 3000, orders: 13 },
  { name: 'Mar', revenue: 5000, orders: 48 },
  { name: 'Apr', revenue: 4780, orders: 39 },
  { name: 'May', revenue: 6890, orders: 48 },
  { name: 'Jun', revenue: 5390, orders: 38 },
  { name: 'Jul', revenue: 6490, orders: 43 },
];

export function OverviewChart() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl">Sales & Orders Overview</CardTitle>
            <CardDescription>Monthly revenue and number of orders.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                 <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis yAxisId="left" stroke="hsl(var(--primary))" tick={{ fill: 'hsl(var(--muted-foreground))' }} label={{ value: 'Revenue (₦)', angle: -90, position: 'insideLeft', fill: 'hsl(var(--primary))' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" tick={{ fill: 'hsl(var(--muted-foreground))' }} label={{ value: 'Orders', angle: -90, position: 'insideRight', fill: 'hsl(var(--accent))' }} />
                    <Tooltip 
                        contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))"
                        }}
                    />
                    <Legend wrapperStyle={{ color: "hsl(var(--foreground))" }} />
                    <Bar yAxisId="left" dataKey="revenue" fill="hsl(var(--primary))" name="Revenue" />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(var(--accent))" name="Orders" />
                </ComposedChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
