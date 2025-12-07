import ArticleSquare from "@/components/dashboard/ArticleSquare";

export default function SquarePage() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">文章广场</h2>
      <ArticleSquare />
    </div>
  );
}