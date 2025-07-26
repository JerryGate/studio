
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Pill, Truck, Users2 } from 'lucide-react';
import { PatientAdmissionsChart } from '@/components/dashboard/patient-admissions-chart';


export default function HospitalDashboardPage() {
    const stats = [
    { title: 'Total Patients', value: '256', icon: Users },
    { title: 'Bulk Orders Placed', value: '34', icon: Pill },
    { title: 'Pending Deliveries', value: '5', icon: Truck },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Welcome, Hospital Partner</h1>
      
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
            <CardTitle>Hospital Analytics</CardTitle>
            <CardDescription>An overview of patient and order activity.</CardDescription>
        </CardHeader>
        <CardContent>
            <PatientAdmissionsChart />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
            <Link href="/hospital/bulk-orders/new">
                <Button>
                    <Pill className="mr-2 h-4 w-4" />
                    Place a Bulk Order
                </Button>
            </Link>
             <Link href="/hospital/staff">
                <Button variant="outline">
                    <Users2 className="mr-2 h-4 w-4" />
                    Manage Staff
                </Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
