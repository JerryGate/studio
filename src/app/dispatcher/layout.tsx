
'use client';
import DispatcherSidebar from '@/components/dashboard/dispatcher-sidebar';
import { withAuth } from '@/components/with-auth';
import { useAuth } from '@/contexts/auth-context';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Truck } from 'lucide-react';
import Logo from '@/components/logo';

const DispatcherMobileSidebar = () => (
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
            <DispatcherSidebar isMobile={true} />
        </SheetContent>
    </Sheet>
)

function DispatcherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { user } = useAuth();
  return (
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
            <DispatcherSidebar />
        </div>
        <div className="flex flex-col">
           <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
             <DispatcherMobileSidebar />
             <h1 className="flex-1 text-lg font-semibold md:text-xl">Dispatcher Dashboard</h1>
             <div className="flex items-center gap-2 ml-auto text-sm text-muted-foreground">
                <Truck className="h-5 w-5" />
                <span>Welcome, {user?.email}</span>
            </div>
          </header>
          <main className="flex-1 p-4 sm:px-6 sm:py-6 gap-4 bg-muted/40">
            {children}
          </main>
        </div>
      </div>
  );
}

export default withAuth(DispatcherDashboardLayout, ['dispatcher']);
