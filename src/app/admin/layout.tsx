
'use client';
import AdminSidebar from '@/components/admin/admin-sidebar';
import { ThemeProvider } from '@/contexts/theme-context';
import { withAuth } from '@/components/with-auth';

function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8 bg-gray-50/50">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default withAuth(AdminLayout, ['admin']);

