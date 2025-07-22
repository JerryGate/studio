import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Welcome to your Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Hello, Customer!</CardTitle>
          <CardDescription>
            This is your personal space to manage your orders, track deliveries, and update your profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <p>You can use the navigation on the left to get around.</p>
            <Link href="/search">
                <Button>Start a New Order</Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
