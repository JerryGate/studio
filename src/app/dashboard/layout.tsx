
'use client';
import CustomerSidebar from '@/components/dashboard/customer-sidebar';
import { withAuth } from '@/components/with-auth';

function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex container mx-auto px-4 py-12 gap-8 flex-col md:flex-row">
        <CustomerSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
  );
}

export default withAuth(DashboardLayout, ['customer']);
