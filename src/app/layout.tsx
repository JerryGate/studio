

'use client';

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { CartProvider } from '@/contexts/cart-context';
import PageTransition from '@/components/page-transition';
import { ThemeProvider } from '@/contexts/theme-context';
import { AuthProvider } from '@/contexts/auth-context';
import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboardRoute =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/pharmacy') ||
    pathname.startsWith('/dispatcher') ||
    pathname.startsWith('/hospital');

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title>Medfast - Quality Drugs, Fast Delivery in Nigeria</title>
        <meta
            name="description"
            content="Affordable, verified medications delivered to your doorstep from nearby pharmacies in Nigeria. Order drugs online with ease and track your delivery in real-time."
        />
        <meta name="keywords" content="buy drugs online Nigeria, e-pharmacy Nigeria, drug delivery Nigeria, online pharmacy, medfast" />
      </head>
      <body className="font-body antialiased bg-background text-foreground flex flex-col min-h-screen">
            <AuthProvider>
              <ThemeProvider>
                  <CartProvider>
                    {!isDashboardRoute && (
                      <div className="px-4 sm:px-6 lg:px-8">
                        <Header />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col">
                      <PageTransition>{children}</PageTransition>
                    </div>
                    {!isDashboardRoute && (
                      <div className="px-4 sm:px-6 lg:px-8">
                        <Footer />
                      </div>
                    )}
                  </CartProvider>
              </ThemeProvider>
            </AuthProvider>
          <Toaster />
      </body>
    </html>
  );
}
