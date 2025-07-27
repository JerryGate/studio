
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, ShoppingCart, User, ChevronDown, LayoutDashboard, LogOut, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import Logo from './logo';
import { useCart } from '@/contexts/cart-context';
import { Badge } from './ui/badge';
import { useAuth } from '@/contexts/auth-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'framer-motion';

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
        case 'super-admin':
            return '/admin/super-admin';
        case 'content-admin':
            return '/admin/content-admin';
        case 'finance-admin':
            return '/admin/finance-admin';
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

const MobileMenu = ({ user, logout, closeMenu }: { user: any, logout: () => void, closeMenu: () => void }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/search');
        }
        closeMenu();
    };
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            },
        },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-lg flex flex-col p-6"
        >
            <div className="flex justify-between items-center mb-12">
                <Logo />
                <Button variant="ghost" size="icon" onClick={closeMenu}>
                    <X className="h-6 w-6" />
                </Button>
            </div>
            
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-grow flex flex-col justify-center items-center text-center space-y-2"
            >
                {baseNavLinks.map((link) => (
                    <motion.div key={link.name} variants={itemVariants}>
                        <Link href={link.href} onClick={closeMenu}>
                            <span className="block text-3xl font-headline font-semibold py-3 text-foreground hover:text-primary transition-colors">
                                {link.name}
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-auto space-y-4"
            >
                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <Input
                            placeholder="Search..."
                            className="h-12 pl-12 rounded-full text-base"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                </form>
                {user ? (
                    <div className="flex gap-2">
                        <Button asChild className="flex-1 text-base py-6" variant="outline">
                             <Link href={getDashboardUrl(user.role)} onClick={closeMenu}>
                                <LayoutDashboard className="mr-2 h-5 w-5" />
                                Dashboard
                            </Link>
                        </Button>
                        <Button className="flex-1 text-base py-6" variant="ghost" onClick={() => { logout(); closeMenu(); }}>
                            <LogOut className="mr-2 h-5 w-5" />
                            Log Out
                        </Button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                         <Button asChild className="flex-1 text-base py-6">
                            <Link href="/login" onClick={closeMenu}>
                                <User className="mr-2 h-5 w-5" />
                                Log In
                            </Link>
                        </Button>
                        <Button asChild className="flex-1 text-base py-6" variant="outline">
                            <Link href="/signup" onClick={closeMenu}>
                                Sign Up
                            </Link>
                        </Button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
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

  useEffect(() => {
    // Disable body scroll when mobile menu is open
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => {
        document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);


  return (
    <header
      className={cn(`sticky top-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-sm shadow-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8`, 
        pathname.startsWith('/admin') && 'hidden'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Logo />
             <nav className="hidden lg:flex items-center gap-6">
              {baseNavLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <div className="font-medium text-foreground/80 hover:text-primary transition-colors duration-300">
                    {link.name}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
             <div className="hidden lg:flex">
                <form className="relative w-full max-w-sm" onSubmit={handleSearch}>
                    <Input
                    type="text"
                    placeholder="e.g., Paracetamol..."
                    className="h-10 pl-10 pr-4 text-sm bg-background/80 border-border/80 focus:border-primary focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </form>
             </div>

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
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
            <MobileMenu user={user} logout={logout} closeMenu={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
