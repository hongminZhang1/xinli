"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-sm sm:prose-base max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // 自定义代码块渲染
          code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const inline = !match;
            return !inline && match ? (
              <SyntaxHighlighter
                style={tomorrow}
                language={match[1]}
                PreTag="div"
                className="rounded-lg !mt-4 !mb-4"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code 
                className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" 
                {...props}
              >
                {children}
              </code>
            );
          },
          // 自定义链接渲染
          a({ children, href, ...props }: any) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
                {...props}
              >
                {children}
              </a>
            );
          },
          // 自定义标题渲染
          h1({ children }: any) {
            return <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-4 border-b pb-2">{children}</h1>;
          },
          h2({ children }: any) {
            return <h2 className="text-xl font-semibold text-gray-800 mt-5 mb-3">{children}</h2>;
          },
          h3({ children }: any) {
            return <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">{children}</h3>;
          },
          // 自定义段落渲染
          p({ children }: any) {
            return <p className="text-gray-700 leading-relaxed mb-4 last:mb-0">{children}</p>;
          },
          // 自定义列表渲染
          ul({ children }: any) {
            return <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700">{children}</ul>;
          },
          ol({ children }: any) {
            return <ol className="list-decimal list-inside space-y-1 mb-4 text-gray-700">{children}</ol>;
          },
          // 自定义引用块渲染
          blockquote({ children }: any) {
            return (
              <blockquote className="border-l-4 border-blue-200 pl-4 py-2 my-4 bg-blue-50 text-gray-700 italic">
                {children}
              </blockquote>
            );
          },
          // 自定义表格渲染
          table({ children }: any) {
            return (
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  {children}
                </table>
              </div>
            );
          },
          th({ children }: any) {
            return (
              <th className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-left font-medium text-gray-800">
                {children}
              </th>
            );
          },
          td({ children }: any) {
            return (
              <td className="px-4 py-2 border-b border-gray-100 text-gray-700">
                {children}
              </td>
            );
          },
          // 自定义分割线
          hr() {
            return <hr className="border-gray-200 my-6" />;
          }
        }}
      >
        {content}
      </ReactMarkdown>
      
      <style jsx global>{`
        /* 移动端优化 */
        @media (max-width: 640px) {
          .prose h1 {
            font-size: 1.5rem;
            margin-top: 1rem;
            margin-bottom: 0.75rem;
          }
          
          .prose h2 {
            font-size: 1.25rem;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          
          .prose h3 {
            font-size: 1.125rem;
            margin-top: 0.75rem;
            margin-bottom: 0.5rem;
          }
          
          .prose p {
            margin-bottom: 0.75rem;
          }
          
          .prose pre {
            font-size: 0.875rem;
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}