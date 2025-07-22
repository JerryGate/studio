
'use client';

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Jan', admissions: 120 },
  { name: 'Feb', admissions: 150 },
  { name: 'Mar', admissions: 130 },
  { name: 'Apr', admissions: 180 },
  { name: 'May', admissions: 210 },
  { name: 'Jun', admissions: 190 },
  { name: 'Jul', admissions: 220 },
];

export function PatientAdmissionsChart() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl">Patient Admissions</CardTitle>
            <CardDescription>Number of patient admissions over the last few months.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={350}>
                 <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} label={{ value: 'Admissions', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                        contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))"
                        }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="admissions" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorAdmissions)" name="Admissions" />
                </AreaChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
