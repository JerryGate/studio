
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, Package, ListPlus, MessageSquare, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/auth-context';
import Logo from '../logo';
import { Button } from '../ui/button';

const navItems = [
  { href: '/pharmacy', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/pharmacy/profile', icon: User, label: 'My Profile' },
  { href: '/pharmacy/inventory', icon: ListPlus, label: 'Inventory' },
  { href: '/pharmacy/orders', icon: Package, label: 'Manage Orders' },
  { href: '/pharmacy/messages', icon: MessageSquare, label: 'Messages' },
];

export default function PharmacySidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-64 flex-shrink-0 bg-background border-r hidden md:flex flex-col">
        <div className="p-4 border-b">
          <Logo textClassName="inline" />
        </div>
        <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
            <Link
            key={item.href}
            href={item.href}
            className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10',
                pathname === item.href && 'bg-primary/10 text-primary font-semibold'
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
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
            </Button>
        </div>
    </aside>
  );
}
