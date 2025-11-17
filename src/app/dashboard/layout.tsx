import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
