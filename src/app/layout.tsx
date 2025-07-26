
'use client';

import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { CartProvider } from '@/contexts/cart-context';
import PageTransition from '@/components/page-transition';
import { AuthProvider } from '@/contexts/auth-context';
import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button';
import { ImageProvider } from '@/contexts/image-context';
import { Suspense, useState, useEffect } from 'react';
import Preloader from '@/components/preloader';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/contexts/theme-context';
import { SettingsProvider } from '@/contexts/settings-context';
import { EmergencyRequestModal } from '@/components/emergency-request-modal';
import { WhatsAppCta } from '@/components/whatsapp-cta';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure the preloader runs for at least the animation duration.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000); 

    return () => clearTimeout(timer);
  }, []);

  const isDashboardRoute =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/pharmacy') ||
    pathname.startsWith('/dispatcher') ||
    pathname.startsWith('/hospital');
    
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/partner');

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader />}
      </AnimatePresence>
      <div className="flex-1 flex flex-col" style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
          {!isDashboardRoute && !isAuthRoute && (
            <div className="px-4 sm:px-6 lg:px-8">
              <Header />
            </div>
          )}
          <div className="flex-1 flex flex-col">
            <Suspense>
              <PageTransition>{children}</PageTransition>
            </Suspense>
          </div>
          {!isDashboardRoute && !isAuthRoute && (
            <div className="px-4 sm:px-6 lg:px-8">
              <Footer />
            </div>
          )}
          {!isDashboardRoute && !isAuthRoute && (
              <>
                  <EmergencyRequestModal />
                  <ScrollToTopButton />
                  <WhatsAppCta />
              </>
          )}
      </div>
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""/>
        <title>E-pharma Nigeria - Quality Drugs, Fast Delivery</title>
        <meta
            name="description"
            content="Affordable, verified medications delivered to your doorstep from nearby pharmacies in Nigeria. Order drugs online with ease and track your delivery in real-time."
        />
        <meta name="keywords" content="buy drugs online Nigeria, e-pharmacy Nigeria, drug delivery Nigeria, online pharmacy, E-pharma Nigeria" />
      </head>
      <body className="font-body antialiased bg-background text-foreground flex flex-col min-h-screen">
        <AuthProvider>
          <ThemeProvider>
            <SettingsProvider>
              <ImageProvider>
                <Toaster>
                  <CartProvider>
                    <LayoutContent>{children}</LayoutContent>
                  </CartProvider>
                </Toaster>
              </ImageProvider>
            </SettingsProvider>
          </ThemeProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
