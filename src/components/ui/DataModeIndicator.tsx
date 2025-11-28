"use client";

import React from 'react';
import { isApiMode, currentDataAccessMode } from '@/lib/db-adapter';

export default function DataModeIndicator() {
  const isAPI = isApiMode();
  const mode = currentDataAccessMode;
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`
        px-3 py-2 rounded-lg text-sm font-medium shadow-lg
        ${isAPI 
          ? 'bg-green-100 border border-green-300 text-green-800' 
          : 'bg-blue-100 border border-blue-300 text-blue-800'
        }
      `}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isAPI ? 'bg-green-500' : 'bg-blue-500'
          }`} />
          <span>
            {isAPI ? '🌐 云端API模式' : '💾 直连模式'}
          </span>
        </div>
        <div className="text-xs opacity-75 mt-1">
          {isAPI ? '数据通过193.112.165.180访问' : '直连数据库'}
        </div>
      </div>
    </div>
  );
}