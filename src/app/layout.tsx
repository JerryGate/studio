import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { CartProvider } from '@/contexts/cart-context';
import PageTransition from '@/components/page-transition';
import { ThemeProvider } from '@/contexts/theme-context';

export const metadata: Metadata = {
  title: 'Medfast Nigeria - Quality Drugs, Fast Delivery',
  description:
    'Affordable, verified medications delivered to your doorstep from nearby pharmacies in Nigeria. Order drugs online with ease and track your delivery in real-time.',
  keywords: 'buy drugs online Nigeria, e-pharmacy Nigeria, drug delivery Nigeria, online pharmacy, medfast nigeria',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground flex flex-col min-h-screen">
        <ThemeProvider>
          <CartProvider>
            <div className="px-4 sm:px-6 lg:px-8">
              <Header />
            </div>
            <main className="flex-1 flex flex-col">
              <PageTransition>{children}</PageTransition>
            </main>
            <div className="px-4 sm:px-6 lg:px-8">
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
