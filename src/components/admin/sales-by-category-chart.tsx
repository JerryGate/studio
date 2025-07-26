
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTheme } from '@/contexts/theme-context';
import { THEMES } from '@/lib/themes';

const data = [
  { name: 'Pain Relief', value: 400 },
  { name: 'Vitamins', value: 300 },
  { name: 'Antibiotics', value: 300 },
  { name: 'Allergy', value: 200 },
  { name: 'Cold & Flu', value: 278 },
  { name: 'Diabetes', value: 189 },
];

const parseHsl = (hslString: string): { h: number, s: number, l: number } => {
    const [h, s, l] = hslString.split(' ').map(val => parseFloat(val.replace('%', '')));
    return { h, s, l };
}

const generateColors = (baseColor: string, count: number) => {
    const { h, s, l } = parseHsl(baseColor);
    const colors = [];
    for (let i = 0; i < count; i++) {
        const lightness = l - (i * 5);
        colors.push(`hsl(${h}, ${s}%, ${lightness}%)`);
    }
    return colors;
}

export function SalesByCategoryChart() {
  const { theme } = useTheme();
  const themeColors = generateColors(theme.colors.primary, data.length);
  const accentColor = `hsl(${theme.colors.accent})`;
  const finalColors = [accentColor, ...themeColors.slice(1)];

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
                    <Cell key={`cell-${index}`} fill={finalColors[index % finalColors.length]} />
                ))}
                </Pie>
                <Tooltip 
                     contentStyle={{
                        background: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                    }}
                />
                <Legend wrapperStyle={{ color: "hsl(var(--foreground))" }} />
            </PieChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
  );
}
