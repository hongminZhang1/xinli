import { redirect } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For simplicity, we are just grouping routes.
  // In a real app, you might check for an existing session and redirect.
  return <>{children}</>;
}
