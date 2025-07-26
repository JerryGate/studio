
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, Users, Truck, BarChart, Bell, MessageSquare, Power, LifeBuoy, Palette, UserCircle, Settings, Shield } from 'lucide-react';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '../ui/button';

// This component is being deprecated in favor of role-specific sidebars (SuperAdminSidebar, etc.)
// but is kept for now to avoid breaking imports. It can be removed later.

const navItems = [
  { href: '/admin/super-admin', icon: Home, label: 'Dashboard' },
  { href: '/admin/super-admin/pharmacies', icon: Store, label: 'Pharmacies' },
  { href: '/admin/super-admin/patients', icon: Users, label: 'Patients' },
  { href: '/admin/super-admin/dispatchers', icon: Truck, label: 'Dispatchers' },
  { href: '/admin/super-admin/reports', icon: BarChart, label: 'Reports' },
  { href: '/admin/super-admin/performance', icon: LifeBuoy, label: 'Performance' },
  { href: '/admin/super-admin/notifications', icon: Bell, label: 'Notifications' },
  { href: '/admin/super-admin/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/admin/super-admin/manage-admins', icon: Shield, label: 'Manage Admins' },
  { href: '/admin/super-admin/profile', icon: UserCircle, label: 'Profile' },
  { href: '/admin/super-admin/settings', icon: Settings, label: 'Settings' },
];

export const AdminNav = ({ isMobile = false }) => {
    const pathname = usePathname();
    const { logout } = useAuth();

    const checkActive = (href: string) => {
      const baseAdminPath = '/admin/super-admin';
      if (href === baseAdminPath) {
        return pathname === href;
      }
      return pathname.startsWith(href);
    }

    return (
        <div className="flex flex-col h-full">
            <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10',
                        checkActive(item.href) && 'bg-primary/10 text-primary font-semibold'
                    )}
                    >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="p-4 mt-auto border-t">
                <Separator className="my-4" />
                <Button
                    variant="ghost"
                    onClick={logout}
                    className='w-full justify-start flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-destructive hover:bg-destructive/10'
                >
                    <Power className="h-4 w-4" />
                    <span>Logout</span>
                </Button>
            </div>
        </div>
    )
}

export default function AdminSidebar() {
  return (
    <div className="flex flex-col h-full bg-muted/40">
      <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
        <Logo textClassName="inline" />
      </div>
      <AdminNav />
    </div>
  );
}
