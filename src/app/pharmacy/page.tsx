
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PharmacySalesChart } from '@/components/dashboard/pharmacy-sales-chart';
import { DollarSign, ListPlus, Package, ArrowRight } from 'lucide-react';

export default function PharmacyDashboardPage() {
  const stats = [
    { title: 'Today\'s Revenue', value: '₦85,000', icon: DollarSign },
    { title: 'Pending Orders', value: '12', icon: Package },
    { title: 'Products Listed', value: '152', icon: ListPlus },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Welcome, Pharmacy Partner</h1>
      
       <div className="grid gap-6 md:grid-cols-3">
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

      <Card>
        <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
            <CardDescription>An overview of your sales performance.</CardDescription>
        </CardHeader>
        <CardContent>
            <PharmacySalesChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
            <Link href="/pharmacy/orders">
                <Button>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    View New Orders
                </Button>
            </Link>
             <Link href="/pharmacy/inventory">
                <Button variant="outline">
                    <ListPlus className="mr-2 h-4 w-4" />
                    Manage Inventory
                </Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
