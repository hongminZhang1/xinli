"use client";

import React from 'react';

export default function DataModeIndicator() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="px-3 py-2 rounded-lg text-sm font-medium shadow-lg bg-green-100 border border-green-300 text-green-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>🌐 云端API模式</span>
        </div>
      </div>
    </div>
  );
}