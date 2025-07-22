
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import { Loader2 } from 'lucide-react';

type UserRole = 'customer' | 'admin' | 'pharmacy' | 'dispatcher' | 'hospital';

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles: UserRole[]
) {
  const AuthComponent = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!user || !allowedRoles.includes(user.role))) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (!allowedRoles.includes(user.role)) {
      return (
         <div className="flex justify-center items-center h-screen">
            <p>You do not have permission to view this page. Redirecting...</p>
        </div>
      )
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
  return AuthComponent;
}

function getDisplayName<P extends object>(WrappedComponent: ComponentType<P>): string {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
