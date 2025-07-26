
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Truck, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { DispatcherDeliveryChart } from '@/components/dashboard/dispatcher-delivery-chart';

export default function DispatcherDashboardPage() {
   const stats = [
    { title: 'Active Deliveries', value: '3', icon: Truck },
    { title: 'Completed Today', value: '8', icon: CheckCircle },
    { title: 'Avg. Delivery Time', value: '45 mins', icon: Clock },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Welcome, Dispatcher</h1>
      
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
            <CardTitle>Your Activity</CardTitle>
            <CardDescription>An overview of your recent deliveries.</CardDescription>
        </CardHeader>
        <CardContent>
            <DispatcherDeliveryChart />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
            <Link href="/dispatcher/deliveries">
                <Button>
                    <Truck className="mr-2 h-4 w-4" />
                    View Active Deliveries
                </Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
