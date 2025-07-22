
'use client';
import HospitalSidebar from '@/components/dashboard/hospital-sidebar';
import { withAuth } from '@/components/with-auth';

function HospitalDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex min-h-[calc(100vh-16rem)] container mx-auto px-4 py-12 gap-8">
        <HospitalSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
  );
}

export default withAuth(HospitalDashboardLayout, ['hospital']);
