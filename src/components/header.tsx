
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, ShoppingCart, X, Sun, Moon, LogOut, User, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import Logo from './logo';
import { useCart } from '@/contexts/cart-context';
import { Badge } from './ui/badge';
import { useTheme } from '@/contexts/theme-context';
import { useAuth } from '@/contexts/auth-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


const baseNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/#services' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Contact Us', href: '/#contact' },
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { mode, toggleMode } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = baseNavLinks;


  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span className="font-medium text-foreground/80 hover:text-primary transition-colors duration-300">
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
             <Button variant="ghost" size="icon" onClick={toggleMode}>
                {mode === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
            </Button>
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
                                <User className="mr-2 h-4 w-4" />
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
                <div className="hidden lg:flex items-center space-x-2">
                    <Link href="/login">
                        <Button variant="ghost">Log In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>Sign Up</Button>
                    </Link>
                </div>
            )}
          
            <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full max-w-xs bg-background p-0">
                     <SheetHeader className="sr-only">
                        <SheetTitle>Mobile Menu</SheetTitle>
                     </SheetHeader>
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between p-4 border-b">
                         <Logo />
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                          <X className="h-6 w-6" />
                          <span className="sr-only">Close menu</span>
                        </Button>
                      </div>
                      <nav className="flex-1 p-4 space-y-4">
                        {navLinks.map((link) => (
                          <Link key={link.name} href={link.href}>
                            <span
                              className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-300"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.name}
                            </span>
                          </Link>
                        ))}
                      </nav>
                      <div className="p-4 border-t space-y-2">
                         {user ? (
                            <>
                               <Link href={getDashboardUrl(user?.role)} passHref>
                                    <Button variant="outline" className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                                        <User className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log Out
                                </Button>
                            </>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <Link href="/login" passHref>
                                    <Button variant="outline" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/signup" passHref>
                                    <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
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
