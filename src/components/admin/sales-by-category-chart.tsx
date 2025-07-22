
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const data = [
  { name: 'Pain Relief', value: 400 },
  { name: 'Vitamins', value: 300 },
  { name: 'Antibiotics', value: 300 },
  { name: 'Allergy', value: 200 },
  { name: 'Cold & Flu', value: 278 },
  { name: 'Diabetes', value: 189 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export function SalesByCategoryChart() {
  return (
     <Card>
        <CardHeader>
            <CardTitle className="text-xl">Sales by Category</CardTitle>
            <CardDescription>Breakdown of sales across different drug categories.</CardDescription>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip 
                     contentStyle={{
                        background: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))"
                    }}
                />
                <Legend />
            </PieChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
