
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
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
            <AdminSidebar />
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <MobileSidebar />
            <div className="w-full flex-1">
              {/* Optional: Add a search bar or other header content here */}
            </div>
            <div className="flex items-center gap-2 ml-auto">
                <UserCircle className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{user?.email}</span>
            </div>
          </header>
          <main className="flex-1 p-4 sm:px-6 sm:py-6 gap-4 bg-muted/40">
            {children}
          </main>
        </div>
      </div>
  );
}

export default withAuth(AdminLayout, ['admin']);
