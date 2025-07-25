
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton';
import { adminRoles } from '@/lib/mock-data';

// This is a top-level layout for /admin.
// It will redirect to the correct admin dashboard or the admin login page.
export default function AdminRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const isLoginPage = pathname === '/admin/login';
    const userIsAdmin = user && adminRoles.includes(user.role);

    if (userIsAdmin && isLoginPage) {
        // If logged-in admin is on login page, redirect to their dashboard
        const dashboardUrl = {
            'super-admin': '/admin/super-admin',
            'finance-admin': '/admin/finance-admin',
            'content-admin': '/admin/content-admin',
        }[user.role as keyof typeof adminRoles];
        
        router.replace(dashboardUrl || '/admin/super-admin');
        return;
    }
    
    if (!userIsAdmin && !isLoginPage) {
        // If not an admin and not on the login page, redirect to login
        router.replace('/admin/login');
        return;
    }
    
    // This handles the case where a user might land on `/admin` directly
    if (userIsAdmin && pathname === '/admin') {
         const dashboardUrl = {
            'super-admin': '/admin/super-admin',
            'finance-admin': '/admin/finance-admin',
            'content-admin': '/admin/content-admin',
        }[user.role as keyof typeof adminRoles];
        router.replace(dashboardUrl || '/admin/super-admin');
    }

  }, [user, loading, router, pathname]);
  
  // Show skeleton if loading, or if user is being redirected away from a protected route
  if (loading || (!user && pathname !== '/admin/login')) {
      return <DashboardSkeleton />;
  }

  // Render children (which will be the actual page component like login or a dashboard)
  return <>{children}</>;
}
