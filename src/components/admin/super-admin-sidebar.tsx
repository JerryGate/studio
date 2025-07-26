
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, Users, Truck, BarChart, Bell, MessageSquare, Power, LifeBuoy, UserCircle, Shield, Settings, Palette, FileUp, Image as ImageIcon, Sparkles, Landmark, AlertTriangle } from 'lucide-react';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '../ui/button';

const navItems = [
  { href: '/admin/super-admin', icon: Home, label: 'Dashboard', section: 'Overview' },
  { href: '/admin/super-admin/pharmacies', icon: Store, label: 'Pharmacies', section: 'Management' },
  { href: '/admin/super-admin/patients', icon: Users, label: 'Patients', section: 'Management' },
  { href: '/admin/super-admin/dispatchers', icon: Truck, label: 'Dispatchers', section: 'Management' },
  { href: '/admin/super-admin/manage-admins', icon: Shield, label: 'Manage Admins', section: 'Management' },
  { href: '/admin/super-admin/reports', icon: BarChart, label: 'Transaction Reports', section: 'Finance' },
  { href: '/admin/super-admin/payouts', icon: Landmark, label: 'Manage Payouts', section: 'Finance' },
  { href: '/admin/super-admin/disputes', icon: AlertTriangle, label: 'Disputes & Refunds', section: 'Finance' },
  { href: '/admin/super-admin/slider', icon: ImageIcon, label: 'Slider Images', section: 'Content' },
  { href: '/admin/super-admin/blog', icon: Bell, label: 'Blog Posts', section: 'Content' },
  { href: '/admin/super-admin/requests', icon: Sparkles, label: 'Special Requests', section: 'Content' },
  { href: '/admin/super-admin/documents', icon: FileUp, label: 'Document Uploads', section: 'Content' },
  { href: '/admin/super-admin/theme', icon: Palette, label: 'Theme Settings', section: 'Content' },
  { href: '/admin/super-admin/performance', icon: LifeBuoy, label: 'Performance', section: 'Platform' },
  { href: '/admin/super-admin/notifications', icon: Bell, label: 'Notifications', section: 'Platform' },
  { href: '/admin/super-admin/messages', icon: MessageSquare, label: 'Messages', section: 'Platform' },
  { href: '/admin/super-admin/profile', icon: UserCircle, label: 'Profile', section: 'Platform' },
  { href: '/admin/super-admin/settings', icon: Settings, label: 'Settings', section: 'Platform' },
];

const navSections = [
    { name: 'Overview', items: navItems.filter(i => i.section === 'Overview')},
    { name: 'Management', items: navItems.filter(i => i.section === 'Management')},
    { name: 'Finance', items: navItems.filter(i => i.section === 'Finance')},
    { name: 'Content', items: navItems.filter(i => i.section === 'Content')},
    { name: 'Platform', items: navItems.filter(i => i.section === 'Platform')},
]

export const AdminNav = ({ isMobile = false }) => {
    const pathname = usePathname();
    const { logout } = useAuth();

    const checkActive = (href: string) => {
      if (href === '/admin/super-admin') {
        return pathname === href;
      }
      return pathname.startsWith(href);
    }

    return (
        <div className="flex flex-col h-full">
            <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
                {navSections.map(section => (
                    <div key={section.name} className="space-y-2">
                        <h4 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{section.name}</h4>
                        {section.items.map((item) => (
                            <Link
                            key={item.label}
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
                    </div>
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

export default function SuperAdminSidebar({isMobile = false}) {
  return (
    <div className="flex flex-col h-full">
      {!isMobile && (
         <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Logo textClassName="inline" />
         </div>
      )}
      <AdminNav isMobile={isMobile} />
    </div>
  );
}
