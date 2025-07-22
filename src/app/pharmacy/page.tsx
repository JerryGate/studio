import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PharmacyDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Welcome, Pharmacy Partner</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pharmacy Dashboard</CardTitle>
          <CardDescription>
            Manage your inventory, orders, and profile from this dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <p>You can use the navigation on the left to get around.</p>
            <Link href="/pharmacy/orders">
                <Button>View New Orders</Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
