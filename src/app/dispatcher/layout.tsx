
'use client';
import DispatcherSidebar from '@/components/dashboard/dispatcher-sidebar';
import { withAuth } from '@/components/with-auth';

function DispatcherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex min-h-[calc(100vh-16rem)] container mx-auto px-4 py-12 gap-8">
        <DispatcherSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
  );
}

export default withAuth(DispatcherDashboardLayout, ['dispatcher']);
