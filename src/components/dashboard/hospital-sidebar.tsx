
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, Package, Users2, MessageSquare, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/auth-context';
import Logo from '../logo';
import { Button } from '../ui/button';

const navItems = [
  { href: '/hospital', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/hospital/profile', icon: User, label: 'My Profile' },
  { href: '/hospital/orders', icon: Package, label: 'Bulk Orders' },
  { href: '/hospital/staff', icon: Users2, label: 'Manage Staff' },
  { href: '/hospital/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/hospital/settings', icon: Settings, label: 'Settings' },
];

const NavContent = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const checkActive = (href: string) => {
    if (href === '/hospital') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  }

  return (
    <div className="flex flex-col h-full">
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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
                <span className="truncate">{item.label}</span>
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
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
            </Button>
        </div>
    </div>
  );
}


export default function HospitalSidebar({ isMobile = false }) {
    if (isMobile) {
        return <NavContent />;
    }
  
  return (
    <aside className="w-full flex-shrink-0 bg-background flex flex-col h-full">
        <div className="p-4 border-b flex items-center h-[60px]">
          <Logo textClassName="inline" />
        </div>
        <NavContent />
    </aside>
  );
}
