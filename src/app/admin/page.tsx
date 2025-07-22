import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, ShoppingCart, Users, Truck } from 'lucide-react';
import { OverviewChart } from '@/components/admin/overview-chart';
import { SalesByCategoryChart } from '@/components/admin/sales-by-category-chart';


export default function AdminDashboard() {
  const stats = [
    { title: 'Total Revenue', value: '₦1,250,000', icon: DollarSign },
    { title: 'Total Orders', value: '830', icon: ShoppingCart },
    { title: 'Total Patients', value: '1,500', icon: Users },
    { title: 'Pending Deliveries', value: '25', icon: Truck },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
      <div className="mt-8">
        <Card>
            <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>An overview of the platform's performance.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 md:grid-cols-2">
                <OverviewChart />
                <SalesByCategoryChart />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
