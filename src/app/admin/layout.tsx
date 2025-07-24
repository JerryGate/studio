
'use client';
import AdminSidebar from '@/components/admin/admin-sidebar';
import { withAuth } from '@/components/with-auth';
import { MobileSidebar } from '@/components/admin/mobile-sidebar';
import { useAuth } from '@/contexts/auth-context';
import { UserCircle } from 'lucide-react';


function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { user } = useAuth();
  return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AdminSidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
           <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileSidebar />
            <div className="flex items-center gap-2 ml-auto">
                <UserCircle className="h-5 w-5 text-muted-foreground" />
                <span>{user?.email}</span>
            </div>
          </header>
          <main className="flex-1 p-4 sm:px-6 sm:py-0 gap-4">
            {children}
          </main>
        </div>
      </div>
  );
}

export default withAuth(AdminLayout, ['admin']);
