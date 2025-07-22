
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, Package, Users2, MessageSquare, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/auth-context';

const navItems = [
  { href: '/hospital', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '#', icon: User, label: 'My Profile' },
  { href: '#', icon: Package, label: 'Bulk Orders' },
  { href: '#', icon: Users2, label: 'Manage Staff' },
  { href: '#', icon: MessageSquare, label: 'Messages' },
];

export default function HospitalSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

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
                onClick={logout}
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-destructive hover:bg-destructive/10'
            >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
            </Link>
        </div>
    </aside>
  );
}
