'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, Truck, History, MessageSquare, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/dispatcher', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dispatcher/profile', icon: User, label: 'My Profile' },
  { href: '/dispatcher/deliveries', icon: Truck, label: 'Active Deliveries' },
  { href: '/dispatcher/history', icon: History, label: 'Delivery History' },
  { href: '/dispatcher/messages', icon: MessageSquare, label: 'Messages' },
];

export default function DispatcherSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0">
        <div className="sticky top-24">
            <nav className="flex flex-col gap-2">
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
            <Separator className="my-4" />
            <Link
                href="/"
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-destructive hover:bg-destructive/10'
            >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
            </Link>
        </div>
    </aside>
  );
}
