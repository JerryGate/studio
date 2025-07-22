
'use client';
import DispatcherSidebar from '@/components/dashboard/dispatcher-sidebar';
import { withAuth } from '@/components/with-auth';

function DispatcherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex container mx-auto px-4 py-12 gap-8 flex-col md:flex-row">
        <DispatcherSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
  );
}

export default withAuth(DispatcherDashboardLayout, ['dispatcher']);
