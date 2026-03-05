import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApiBaseUrl } from "@/lib/env-config";
import Card from "@/components/ui/Card";
import JournalList from "@/components/dashboard/JournalList";

async function fetchUserJournals(userId: string): Promise<any[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(
      `${baseUrl}/journals?type=private&userId=${userId}`,
      { cache: "no-store" }
    );
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export default async function JournalPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <Card className="text-center p-8">
        <p className="text-gray-500">���ȵ�¼�鿴�����ռ�</p>
      </Card>
    );
  }

  const initialJournals = await fetchUserJournals(session.user.id);

  return <JournalList initialJournals={initialJournals} userId={session.user.id} />;
}
