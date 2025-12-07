import AppointmentsWidget from "@/components/dashboard/AppointmentsWidget";

export default function AppointmentsPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">咨询预约</h2>
      <AppointmentsWidget />
    </div>
  );
}
