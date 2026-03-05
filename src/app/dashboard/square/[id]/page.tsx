import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";
import JournalDetailClient from "@/components/dashboard/JournalDetailClient";

async function fetchJournalDetail(id: string, userId: string): Promise<any | null> {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(
      `${baseUrl}/journals/${id}?userId=${userId}`,
      { cache: "no-store" }
    );
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function fetchJournalComments(id: string): Promise<any[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(
      `${baseUrl}/journals/${id}/comments`,
      { next: { revalidate: 30 } }
    );
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export default async function JournalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  const [initialJournal, initialComments] = await Promise.all([
    session?.user?.id ? fetchJournalDetail(params.id, session.user.id) : Promise.resolve(null),
    fetchJournalComments(params.id),
  ]);

  return (
    <JournalDetailClient
      journalId={params.id}
      initialJournal={initialJournal}
      initialComments={initialComments}
    />
  );
}