
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, ShoppingCart, X, Sun, Moon, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Logo from './logo';
import { useCart } from '@/contexts/cart-context';
import { Badge } from './ui/badge';
import { useTheme } from '@/contexts/theme-context';
import { useAuth } from '@/contexts/auth-context';

const baseNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/#services' },
  { name: 'Contact', href: '/#contact' },
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
            return '/hospital'; // Assuming a hospital dashboard exists
        default:
            return '/login';
    }
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

  const navLinks = user 
    ? [...baseNavLinks.slice(0, 3), { name: 'Dashboard', href: getDashboardUrl(user?.role) }, ...baseNavLinks.slice(3)] 
    : baseNavLinks;


  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span className="font-medium text-foreground/80 hover:text-primary transition-colors duration-300">
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
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
                 <>
                    <Link href={getDashboardUrl(user?.role)}>
                        <Button variant="ghost">
                            <User className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                    </Button>
                </>
            ) : (
                <>
                    <Link href="/login">
                        <Button variant="ghost">Log In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>Sign Up</Button>
                    </Link>
                </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
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
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background">
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
                        <Button variant="ghost" className="w-full" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Log Out
                        </Button>
                    ) : (
                        <>
                            <Link href="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full">
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/signup" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full">Sign Up</Button>
                            </Link>
                        </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
