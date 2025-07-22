import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DispatcherDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Welcome, Dispatcher</h1>
      <Card>
        <CardHeader>
          <CardTitle>Dispatcher Dashboard</CardTitle>
          <CardDescription>
            Here you can find your assigned deliveries and manage your profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <p>Use the sidebar to navigate through the sections.</p>
            <Link href="/dispatcher/deliveries">
                <Button>View Active Deliveries</Button>
            </Link>
        </CardContent>
      </Card>
    </div>
  );
}
