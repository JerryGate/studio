
'use client';
import AdminSidebar from '@/components/admin/admin-sidebar';
import Header from '@/components/header';

function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="md:hidden border-b p-4">
             <Header />
          </header>
          <main className="flex-1 p-8 bg-muted/40">
            {children}
          </main>
        </div>
      </div>
  );
}

export default AdminLayout;
