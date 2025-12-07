import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import DashboardPreloader from "@/components/dashboard/DashboardPreloader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header />
        <main className="flex-1 px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-8 mt-14 md:mt-16 mb-20 lg:mb-0">
          {children}
        </main>
      </div>
      <MobileNav />
      <DashboardPreloader />
    </div>
  );
}
