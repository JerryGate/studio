
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, ShoppingCart, Users, Truck } from 'lucide-react';
import { OverviewChart } from '@/components/admin/overview-chart';
import { SalesByCategoryChart } from '@/components/admin/sales-by-category-chart';

export default function SuperAdminDashboard() {
  const stats = [
    { title: 'Total Revenue', value: '₦1,250,000', icon: DollarSign },
    { title: 'Total Orders', value: '830', icon: ShoppingCart },
    { title: 'Total Patients', value: '1,500', icon: Users },
    { title: 'Total Pharmacies', value: '5', icon: Truck },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Super Admin Dashboard</h1>
      <Card>
        <CardHeader>
            <CardTitle>Welcome, Super Admin!</CardTitle>
            <CardDescription>This is your main dashboard for overseeing the entire platform.</CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-8 grid-cols-1 lg:grid-cols-2">
        <OverviewChart />
        <SalesByCategoryChart />
      </div>
    </div>
  );
}
