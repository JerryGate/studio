
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

const COLORS = [
  '#1E3A8A', // Deep Blue (Primary)
  '#22C55E', // Vibrant Green (Accent)
  '#F59E0B', // Amber
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#3B82F6', // Blue
];

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
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip 
                     contentStyle={{
                        background: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                    }}
                />
                <Legend />
            </PieChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
