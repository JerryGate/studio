
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Landmark, CreditCard, AlertTriangle } from 'lucide-react';
import { SalesByCategoryChart } from '@/components/admin/sales-by-category-chart';

export default function FinanceAdminDashboard() {
  const stats = [
    { title: 'Total Revenue', value: '₦1,250,000', icon: DollarSign },
    { title: 'Pending Payouts', value: '₦150,000', icon: Landmark },
    { title: 'Transactions Today', value: '120', icon: CreditCard },
    { title: 'Refund Requests', value: '3', icon: AlertTriangle },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Finance Admin Dashboard</h1>
      <Card>
        <CardHeader>
            <CardTitle>Welcome, Finance Admin!</CardTitle>
            <CardDescription>Monitor all financial activities on the platform from here.</CardDescription>
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
        <Card>
            <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>A detailed log of all transactions will be shown here.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Transaction log component to be built.</p>
            </CardContent>
        </Card>
        <SalesByCategoryChart />
      </div>
    </div>
  );
}
