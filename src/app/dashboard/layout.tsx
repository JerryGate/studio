'use client';
import CustomerSidebar from '@/components/dashboard/customer-sidebar';
import { withAuth } from '@/components/with-auth';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Menu, UserCircle, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

const getInitials = (name: string) => {
    if (!name) return '';
    const parts = name.split('@');
    return parts[0].charAt(0).toUpperCase();
}

const CustomerMobileSidebar = () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 flex flex-col">
            <div className="p-4 border-b">
                <Logo textClassName="inline" />
            </div>
            <CustomerSidebar isMobile={true} />
        </SheetContent>
    </Sheet>
)


function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  return (
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
            <CustomerSidebar />
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <CustomerMobileSidebar />
            <div className="w-full flex-1">
               <h1 className="text-lg font-semibold md:text-xl">Customer Dashboard</h1>
            </div>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="relative flex items-center gap-2">
                   <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.id}`} />
                      <AvatarFallback>{getInitials(user?.email || '')}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{user?.email}</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <UserCircle className="mr-2 h-4 w-4" />
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
          <main className="flex-1 p-4 sm:px-6 sm:py-6 gap-4 bg-muted/40">
            {children}
          </main>
        </div>
      </div>
  );
}

export default withAuth(DashboardLayout, ['customer']);
