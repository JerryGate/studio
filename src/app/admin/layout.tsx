
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton';

// This is a top-level layout for /admin.
// It will redirect to the correct admin dashboard or the admin login page.
export default function AdminRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user || !user.role.includes('admin')) {
      router.replace('/admin/login');
      return;
    }
    
    // Redirect to the appropriate dashboard based on role
    const adminDashboardMap = {
      'super-admin': '/admin/super-admin',
      'finance-admin': '/admin/finance-admin',
      'content-admin': '/admin/content-admin',
    };

    const dashboardUrl = adminDashboardMap[user.role as keyof typeof adminDashboardMap];

    if (dashboardUrl) {
      router.replace(dashboardUrl);
    } else {
       // Fallback for generic 'admin' role or if something is wrong
       router.replace('/partner/login');
    }

  }, [user, loading, router]);
  
  // Show a skeleton while loading/redirecting
  return <DashboardSkeleton />;
}
