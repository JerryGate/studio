import PharmacySidebar from '@/components/dashboard/pharmacy-sidebar';

export default function PharmacyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex min-h-[calc(100vh-16rem)] container mx-auto px-4 py-12 gap-8">
        <PharmacySidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
  );
}
