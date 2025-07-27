
'use client';
import PharmacySidebar from '@/components/dashboard/pharmacy-sidebar';
import { withAuth } from '@/components/with-auth';
import { useAuth } from '@/contexts/auth-context';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Store, ChevronDown, User, LogOut } from 'lucide-react';
import Logo from '@/components/logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const getInitials = (name: string) => {
    if (!name) return '';
    const parts = name.split('@');
    return parts[0].charAt(0).toUpperCase();
}

const PharmacyMobileSidebar = () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 flex flex-col">
            <div className="p-4 shadow-sm">
                <Logo textClassName="inline" />
            </div>
            <PharmacySidebar isMobile={true} />
        </SheetContent>
    </Sheet>
)

function PharmacyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  return (
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden bg-muted/40 md:block">
            <PharmacySidebar />
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <PharmacyMobileSidebar />
            <h1 className="flex-1 text-lg font-semibold md:text-xl">Pharmacy Dashboard</h1>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center gap-2">
                   <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.id}`} />
                      <AvatarFallback>{getInitials(user?.email || '')}</AvatarFallback>
                    </Avatar>
                    <span>{user?.email}</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Pharmacy Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/pharmacy/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 p-4 sm:px-6 sm:py-6 gap-4 bg-background">
            {children}
          </main>
        </div>
      </div>
  );
}

export default withAuth(PharmacyDashboardLayout, ['pharmacy']);
