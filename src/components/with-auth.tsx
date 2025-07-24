
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton';
import { UserRole } from '@/types';

const partnerRoles: UserRole[] = ['admin', 'pharmacy', 'dispatcher', 'hospital'];

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: UserRole[]
) {
  const AuthComponent = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (loading) return;

      const isAllowed = user && allowedRoles.includes(user.role);

      if (!isAllowed) {
        // If the intended role is a partner role, redirect to the partner login page.
        // Otherwise, redirect to the standard customer login page.
        const isPartnerRoute = allowedRoles.some(role => partnerRoles.includes(role));
        if (isPartnerRoute) {
            router.push('/partner/login');
        } else {
            router.push('/login');
        }
      }
    }, [user, loading, router]);

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
