
'use client';

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ComposedChart, Bar, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Jan', admissions: 120, orders: 15 },
  { name: 'Feb', admissions: 150, orders: 20 },
  { name: 'Mar', admissions: 130, orders: 18 },
  { name: 'Apr', admissions: 180, orders: 25 },
  { name: 'May', admissions: 210, orders: 32 },
  { name: 'Jun', admissions: 190, orders: 28 },
  { name: 'Jul', admissions: 220, orders: 34 },
];

export function PatientAdmissionsChart() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl">Hospital Activity Overview</CardTitle>
            <CardDescription>Patient admissions and bulk orders over the last few months.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                 <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" stroke="hsl(var(--primary))" allowDecimals={false} label={{ value: 'Admissions', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" allowDecimals={false} label={{ value: 'Bulk Orders', angle: -90, position: 'insideRight' }} />
                    <Tooltip 
                        contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))"
                        }}
                    />
                    <Legend />
                     <defs>
                        <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area yAxisId="left" type="monotone" dataKey="admissions" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorAdmissions)" name="Admissions" />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(var(--accent))" name="Bulk Orders" />
                </ComposedChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
