
'use client';
import HospitalSidebar from '@/components/dashboard/hospital-sidebar';
import { withAuth } from '@/components/with-auth';
import { useAuth } from '@/contexts/auth-context';

function HospitalDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  return (
      <div className="flex min-h-screen">
        <HospitalSidebar />
        <div className="flex-1 flex flex-col">
           <header className="bg-background border-b h-16 flex items-center px-6 sticky top-0 z-10">
             <h1 className="text-xl font-semibold">Hospital Dashboard</h1>
             <div className="ml-auto text-sm text-muted-foreground">Welcome, {user?.email}</div>
          </header>
          <main className="flex-1 p-4 md:p-8 bg-muted/40">
            {children}
          </main>
        </div>
      </div>
  );
}

export default withAuth(HospitalDashboardLayout, ['hospital']);
