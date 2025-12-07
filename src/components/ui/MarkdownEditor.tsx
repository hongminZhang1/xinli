"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// 动态导入以避免SSR问题
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    )
  }
);

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "开始写作...",
  height = 300
}: MarkdownEditorProps) {
  
  // 强制设置字体大小
  useEffect(() => {
    const applyFontSize = () => {
      const textareas = document.querySelectorAll('.markdown-editor-wrapper textarea');
      const codeMirrorLines = document.querySelectorAll('.markdown-editor-wrapper .CodeMirror-line');
      const codeMirrorCodes = document.querySelectorAll('.markdown-editor-wrapper .CodeMirror-code');
      const codeMirrorElements = document.querySelectorAll('.markdown-editor-wrapper .CodeMirror');
      const editorTextAreas = document.querySelectorAll('.markdown-editor-wrapper .w-md-editor-text-textarea');
      const cursors = document.querySelectorAll('.markdown-editor-wrapper .CodeMirror-cursor');
      
      textareas.forEach((textarea: any) => {
        textarea.style.fontSize = '18px';
        textarea.style.lineHeight = '1.6';
        textarea.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      });
      
      editorTextAreas.forEach((area: any) => {
        area.style.fontSize = '18px';
        area.style.lineHeight = '1.6';
        area.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      });
      
      codeMirrorLines.forEach((line: any) => {
        line.style.fontSize = '18px';
        line.style.lineHeight = '1.6';
      });
      
      codeMirrorCodes.forEach((code: any) => {
        code.style.fontSize = '18px';
        code.style.lineHeight = '1.6';
      });
      
      codeMirrorElements.forEach((element: any) => {
        element.style.fontSize = '18px';
        element.style.lineHeight = '1.6';
      });
      
      // 修复光标
      cursors.forEach((cursor: any) => {
        cursor.style.borderLeft = '2px solid #374151';
        cursor.style.height = '1.4em';
      });
    };

    // 立即执行一次
    const timer = setTimeout(applyFontSize, 100);
    
    // 设置MutationObserver监视DOM变化
    const observer = new MutationObserver(() => {
      applyFontSize();
    });
    
    const wrapperElement = document.querySelector('.markdown-editor-wrapper');
    if (wrapperElement) {
      observer.observe(wrapperElement, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
      });
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [value]);
  
  return (
    <div 
      className="markdown-editor-wrapper" 
      style={{
        '--editor-font-size': '18px',
        '--editor-line-height': '1.6'
      } as React.CSSProperties}
    >
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        preview="edit"
        hideToolbar={false}
        height={height}
        data-color-mode="light"
        textareaProps={{
          placeholder,
          style: {
            fontSize: 18,
            lineHeight: 1.6,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
          }
        }}
      />
      
      <style jsx global>{`
        .markdown-editor-wrapper {
          --editor-font-size: 18px;
          --editor-line-height: 1.6;
        }
        
        /* 最高优先级的全局样式 */
        .markdown-editor-wrapper * {
          font-size: 18px !important;
          line-height: 1.6 !important;
        }
        
        .markdown-editor-wrapper .w-md-editor {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .markdown-editor-wrapper .w-md-editor-focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .markdown-editor-wrapper .w-md-editor-text-textarea {
          font-size: var(--editor-font-size, 18px) !important;
          line-height: var(--editor-line-height, 1.6) !important;
          padding: 16px !important;
        }
        
        .markdown-editor-wrapper .w-md-editor-text-textarea textarea {
          font-size: var(--editor-font-size, 18px) !important;
          line-height: var(--editor-line-height, 1.6) !important;
        }
        
        .markdown-editor-wrapper .w-md-editor .w-md-editor-text textarea {
          font-size: var(--editor-font-size, 18px) !important;
          line-height: var(--editor-line-height, 1.6) !important;
        }
        
        .markdown-editor-wrapper .w-md-editor .w-md-editor-text .w-md-editor-text-textarea {
          font-size: var(--editor-font-size, 18px) !important;
          line-height: var(--editor-line-height, 1.6) !important;
        }
        
        /* 通用选择器确保所有textarea都有正确的字体大小 */
        .markdown-editor-wrapper textarea {
          font-size: var(--editor-font-size, 18px) !important;
          line-height: var(--editor-line-height, 1.6) !important;
          font-family: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' !important;
        }
        
        /* 修复光标大小问题 */
        .markdown-editor-wrapper .w-md-editor-text-input,
        .markdown-editor-wrapper .w-md-editor-text,
        .markdown-editor-wrapper .w-md-editor-text-textarea,
        .markdown-editor-wrapper .w-md-editor-text-textarea > textarea {
          font-size: 18px !important;
          line-height: 1.6 !important;
          font-family: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' !important;
        }
        
        /* 光标样式修复 */
        .markdown-editor-wrapper .w-md-editor-text-textarea textarea {
          caret-color: #374151 !important;
        }
        
        /* CodeMirror光标修复 */
        .markdown-editor-wrapper .CodeMirror-cursor {
          border-left: 1px solid #374151 !important;
          height: 1.4em !important;
        }
        
        /* 更强的选择器确保样式生效 */
        .markdown-editor-wrapper .w-md-editor .w-md-editor-text .w-md-editor-text-textarea textarea {
          font-size: var(--editor-font-size, 18px) !important;
          line-height: var(--editor-line-height, 1.6) !important;
        }
        
        .markdown-editor-wrapper .w-md-editor .w-md-editor-text .CodeMirror {
          font-size: var(--editor-font-size, 18px) !important;
          line-height: var(--editor-line-height, 1.6) !important;
        }
        
        .markdown-editor-wrapper .w-md-editor .w-md-editor-text .CodeMirror .CodeMirror-code {
          font-size: var(--editor-font-size, 18px) !important;
          line-height: var(--editor-line-height, 1.6) !important;
        }
        
        .markdown-editor-wrapper .w-md-editor .w-md-editor-text .CodeMirror .CodeMirror-line {
          font-size: var(--editor-font-size, 18px) !important;
          line-height: var(--editor-line-height, 1.6) !important;
        }
        
        .markdown-editor-wrapper .w-md-editor-toolbar {
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
        }
        
        .markdown-editor-wrapper .w-md-editor-toolbar button {
          border-radius: 4px;
          margin: 0 1px;
          font-size: 16px !important;
          font-weight: 600 !important;
        }
        
        .markdown-editor-wrapper .w-md-editor-toolbar button:hover {
          background: #e5e7eb;
        }
        
        .markdown-editor-wrapper .w-md-editor-toolbar button svg {
          width: 18px !important;
          height: 18px !important;
        }
        
        /* 移动端优化 */
        @media (max-width: 640px) {
          .markdown-editor-wrapper .w-md-editor {
            border-radius: 6px;
          }
          
          .markdown-editor-wrapper .w-md-editor-text-textarea {
            font-size: 18px !important;
            padding: 12px !important;
          }
          
          .markdown-editor-wrapper .w-md-editor-text-textarea textarea {
            font-size: 18px !important;
          }
          
          .markdown-editor-wrapper .w-md-editor .w-md-editor-text textarea {
            font-size: 18px !important;
          }
          
          .markdown-editor-wrapper .w-md-editor .w-md-editor-text .w-md-editor-text-textarea {
            font-size: 18px !important;
          }
          
          /* 移动端通用选择器 */
          .markdown-editor-wrapper textarea {
            font-size: 18px !important;
            font-family: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' !important;
          }
          
          /* 移动端更强的选择器 */
          .markdown-editor-wrapper .w-md-editor .w-md-editor-text .w-md-editor-text-textarea textarea {
            font-size: 18px !important;
            line-height: 1.6 !important;
          }
          
          .markdown-editor-wrapper .w-md-editor .w-md-editor-text .CodeMirror {
            font-size: 18px !important;
            line-height: 1.6 !important;
          }
          
          .markdown-editor-wrapper .w-md-editor .w-md-editor-text .CodeMirror .CodeMirror-code {
            font-size: 18px !important;
            line-height: 1.6 !important;
          }
          
          .markdown-editor-wrapper .w-md-editor .w-md-editor-text .CodeMirror .CodeMirror-line {
            font-size: 18px !important;
            line-height: 1.6 !important;
          }
          
          .markdown-editor-wrapper .w-md-editor-toolbar {
            padding: 4px;
          }
          
          .markdown-editor-wrapper .w-md-editor-toolbar button {
            padding: 8px;
            margin: 0;
            font-size: 14px !important;
            font-weight: 600 !important;
            min-width: 36px;
            min-height: 36px;
          }
          
          .markdown-editor-wrapper .w-md-editor-toolbar button svg {
            width: 16px !important;
            height: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}