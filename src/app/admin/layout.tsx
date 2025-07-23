
'use client';
import AdminSidebar from '@/components/admin/admin-sidebar';
import { MobileSidebar } from '@/components/admin/mobile-sidebar';


function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
           <header className="md:hidden border-b p-2">
            <MobileSidebar />
          </header>
          <main className="flex-1 p-4 md:p-8 bg-muted/40">
            {children}
          </main>
        </div>
      </div>
  );
}

export default AdminLayout;
