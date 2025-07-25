
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton';
import { UserRole } from '@/types';
import { adminRoles } from '@/lib/mock-data';

const partnerRoles: UserRole[] = ['pharmacy', 'dispatcher', 'hospital'];


export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: UserRole[]
) {
  const AuthComponent = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (loading) return;

      if (!user) {
        // If the user is not logged in, determine where to redirect them.
        const isAdminRoute = allowedRoles.some(role => adminRoles.includes(role));
        
        if (isAdminRoute) {
            router.replace('/admin/login');
        } else if (allowedRoles.some(role => partnerRoles.includes(role))) {
            router.replace('/partner/login');
        } else {
            router.replace('/login');
        }
        return;
      }
      
      const isAllowed = allowedRoles.includes(user.role);
      if (!isAllowed) {
        // If the user is logged in but has the wrong role, redirect to their own dashboard.
        const dashboardUrl = {
          'super-admin': '/admin/super-admin',
          'finance-admin': '/admin/finance-admin',
          'content-admin': '/admin/content-admin',
          customer: '/dashboard',
          pharmacy: '/pharmacy',
          dispatcher: '/dispatcher',
          hospital: '/hospital',
        }[user.role];
        router.replace(dashboardUrl || '/');
      }

    }, [user, loading, router, allowedRoles]);

    if (loading || !user || !allowedRoles.includes(user.role)) {
      return (
        <DashboardSkeleton />
      );
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
  return AuthComponent;
}

function getDisplayName<P extends object>(WrappedComponent: ComponentType<P>): string {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
