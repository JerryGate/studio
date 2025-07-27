
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
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from './ui/sheet';
import { Separator } from './ui/separator';

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

const MobileMenu = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/search');
        }
        setIsOpen(false);
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
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 120,
                damping: 15
            },
        },
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent 
                side="left" 
                className="w-full max-w-sm bg-background/80 backdrop-blur-lg p-0 flex flex-col border-0"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20" style={{zIndex: -1}} />
                <SheetHeader className="p-6 flex flex-row items-center justify-between border-b border-white/10">
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    <Logo />
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-foreground hover:bg-white/10">
                            <X className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                </SheetHeader>
                <div className="flex-grow p-6 overflow-y-auto">
                     <motion.ul
                        className="space-y-1"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {baseNavLinks.map((link) => (
                            <motion.li key={link.name} variants={itemVariants}>
                                <Link href={link.href} onClick={() => setIsOpen(false)}>
                                    <span className={cn(
                                        "block text-xl font-medium py-3 text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-white/5 px-3",
                                        pathname === link.href && "text-primary-foreground bg-primary/20 font-semibold"
                                    )}>
                                        {link.name}
                                    </span>
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
                <motion.div
                    className="p-6 border-t border-white/10 mt-auto space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                >
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <Input
                                placeholder="Search..."
                                className="h-11 pl-10 rounded-full bg-background/50 border-white/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                    </form>
                    <Separator className="bg-white/10" />
                     {user ? (
                        <div className="flex gap-2">
                            <Button asChild className="flex-1" variant="outline" onClick={() => setIsOpen(false)}>
                                <Link href={getDashboardUrl(user.role)}>
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    Dashboard
                                </Link>
                            </Button>
                            <Button className="flex-1" variant="ghost" onClick={() => { logout(); setIsOpen(false); }}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Log Out
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                                <Link href="/login">
                                    <User className="mr-2 h-4 w-4" />
                                    Log In
                                </Link>
                            </Button>
                            <Button asChild className="w-full" variant="secondary" onClick={() => setIsOpen(false)}>
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </motion.div>
            </SheetContent>
        </Sheet>
    )
}

const Header = () => {
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
                <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
