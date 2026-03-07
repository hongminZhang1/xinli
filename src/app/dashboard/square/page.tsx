import ArticleSquare from "@/components/dashboard/ArticleSquare";
import { getApiBaseUrl } from "@/lib/env-config";

async function fetchPublicJournals(): Promise<any[]> {
  try {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/journals?type=public&page=1&pageSize=20`, {
      next: { revalidate: 60 }, // Vercel 边缘缓存 60 秒，减少对后端的请求
    });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export default async function SquarePage() {
  const initialJournals = await fetchPublicJournals();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">文章广场</h2>
      {/* SSR 获取失败时不传空数组，避免毒化客户端缓存导致永远不发请求 */}
      <ArticleSquare initialData={initialJournals.length > 0 ? initialJournals : undefined} />
    </div>
  );
}