
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, ShoppingCart, User, ChevronDown, LayoutDashboard, LogOut, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from './ui/sheet';
import Logo from './logo';
import { useCart } from '@/contexts/cart-context';
import { Badge } from './ui/badge';
import { useAuth } from '@/contexts/auth-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

const baseNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
];

const getDashboardUrl = (role: string | undefined) => {
    if (!role) return '/login';
    switch (role) {
        case 'admin':
            return '/admin';
        case 'customer':
            return '/dashboard';
        case 'pharmacy':
            return '/pharmacy';
        case 'dispatcher':
            return '/dispatcher';
        case 'hospital':
            return '/hospital';
        default:
            return '/login';
    }
}

const getInitials = (name: string) => {
    if (!name) return '';
    const parts = name.split('@');
    return parts[0].charAt(0).toUpperCase();
}


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

  const navLinks = baseNavLinks;


  return (
    <header
      className={cn(`sticky top-0 z-50 transition-all duration-300 bg-background shadow-md -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8`, 
        pathname.startsWith('/admin') && 'hidden'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <div className="font-medium text-foreground/80 hover:text-primary transition-colors duration-300">
                    {link.name}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="hidden lg:flex flex-1 justify-center px-8">
            <form className="relative w-full max-w-md" onSubmit={handleSearch}>
                <Input
                type="text"
                placeholder="e.g., Paracetamol, Vitamin C..."
                className="h-10 pl-10 pr-20 text-sm bg-background/80 border-border/80 focus:border-primary focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 h-8">
                    Search
                </Button>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                      <Badge variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center">
                          {cartCount}
                      </Badge>
                  )}
              </Button>
            </Link>
            {user ? (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} />
                                <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                            </Avatar>
                            <span className="hidden md:inline">{user.email}</span>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                             <Link href={getDashboardUrl(user?.role)}>
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Dashboard</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                             <LogOut className="mr-2 h-4 w-4" />
                             <span>Log Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
            ) : (
                <>
                    <div className="hidden lg:flex items-center space-x-2">
                         <Link href="/login">
                             <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Log In</span>
                            </Button>
                        </Link>
                    </div>
                     <div className="lg:hidden">
                        <Link href="/login">
                             <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Log In</span>
                            </Button>
                        </Link>
                    </div>
                </>
            )}
          
            <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="w-full bg-background p-0 h-auto rounded-t-2xl">
                     <SheetHeader className="p-4 flex flex-col items-center">
                        <div className="w-12 h-1.5 rounded-full bg-muted-foreground/30 mb-2" />
                        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                     </SheetHeader>
                    <div className="flex flex-col">
                      <nav className="p-4 space-y-2">
                        {baseNavLinks.map((link) => (
                           <SheetClose asChild key={link.href}>
                             <Link
                                href={link.href}
                                className={cn(
                                  'flex items-center gap-3 rounded-lg px-3 py-3 text-lg font-medium text-foreground transition-all hover:text-primary hover:bg-primary/10',
                                  pathname === link.href && 'bg-primary/10 text-primary font-semibold'
                                )}
                              >
                                <span>{link.name}</span>
                              </Link>
                           </SheetClose>
                        ))}
                      </nav>
                      <div className="p-4 border-t space-y-2">
                         {user ? (
                            <>
                                <SheetClose asChild>
                                   <Link href={getDashboardUrl(user?.role)} passHref>
                                        <Button variant="outline" className="w-full justify-start text-base py-6">
                                            <LayoutDashboard className="mr-2 h-5 w-5" />
                                            Dashboard
                                        </Button>
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button variant="ghost" className="w-full justify-start text-base py-6" onClick={logout}>
                                        <LogOut className="mr-2 h-5 w-5" />
                                        Log Out
                                    </Button>
                                </SheetClose>
                            </>
                        ) : (
                            <>
                                 <SheetClose asChild>
                                    <Link href="/login" passHref>
                                        <Button className="w-full justify-start text-base py-6">
                                            <User className="mr-2 h-5 w-5" />
                                            Log In
                                        </Button>
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="/signup" passHref>
                                        <Button variant="outline" className="w-full justify-start text-base py-6">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </SheetClose>
                            </>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
