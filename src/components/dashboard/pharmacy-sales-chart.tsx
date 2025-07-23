
'use client';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ComposedChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Mon', sales: 12000, orders: 10 },
  { name: 'Tue', sales: 15000, orders: 14 },
  { name: 'Wed', sales: 11000, orders: 8 },
  { name: 'Thu', sales: 18000, orders: 16 },
  { name: 'Fri', sales: 22000, orders: 20 },
  { name: 'Sat', sales: 25000, orders: 25 },
  { name: 'Sun', sales: 21000, orders: 18 },
];

export function PharmacySalesChart() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl">Weekly Sales & Orders</CardTitle>
            <CardDescription>Your total sales and orders over the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                 <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" stroke="hsl(var(--primary))" label={{ value: 'Sales (₦)', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" allowDecimals={false} label={{ value: 'Orders', angle: -90, position: 'insideRight' }} />
                    <Tooltip 
                        contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))"
                        }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" fill="hsl(var(--primary))" name="Sales (₦)" />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(var(--accent))" name="Orders" />
                </ComposedChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
