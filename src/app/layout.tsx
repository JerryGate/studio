
'use client';

import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { CartProvider } from '@/contexts/cart-context';
import PageTransition from '@/components/page-transition';
import { AuthProvider, useAuth } from '@/contexts/auth-context';
import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button';
import { ImageProvider, useImageContext } from '@/contexts/image-context';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider, useTheme } from '@/contexts/theme-context';
import { SettingsProvider, useSettings } from '@/contexts/settings-context';
import { EmergencyRequestModal } from '@/components/emergency-request-modal';
import { WhatsAppCta } from '@/components/whatsapp-cta';
import { useEffect, useState }from 'react';
import { Preloader } from '@/components/preloader';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { themeKey } = useTheme();
  const { loading: imagesLoading, sliderImages } = useImageContext();
  const { loading: settingsLoading, whatsAppNumber } = useSettings();
  const { loading: themeLoading, theme } = useTheme();

  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  useEffect(() => {
    const allContextsLoaded = 
      !imagesLoading && 
      !settingsLoading &&
      !themeLoading &&
      sliderImages &&
      sliderImages.length > 0 &&
      whatsAppNumber &&
      theme;

    if (allContextsLoaded) {
      const timer = setTimeout(() => {
        setIsPreloaderVisible(false);
      }, 3000); // Preloader minimum display time

      return () => clearTimeout(timer);
    }
  }, [imagesLoading, settingsLoading, themeLoading, sliderImages, whatsAppNumber, theme]);

  const isDashboardRoute =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/pharmacy') ||
    pathname.startsWith('/dispatcher') ||
    pathname.startsWith('/hospital');
    
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/partner');

  return (
    <>
      <AnimatePresence>
        {isPreloaderVisible && <Preloader />}
      </AnimatePresence>
      
      {!isPreloaderVisible && (
        <motion.div
            key="loaded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col min-h-screen"
        >
          <AnimatePresence mode="wait">
            <motion.div
                key={pathname + themeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col"
            >
                {!isDashboardRoute && !isAuthRoute && (
                  <div className="px-4 sm:px-6 lg:px-8">
                    <Header />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <PageTransition>{children}</PageTransition>
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
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
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
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
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
