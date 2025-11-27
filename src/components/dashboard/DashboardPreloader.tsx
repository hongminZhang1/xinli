"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePreloadData } from '@/hooks/usePreload';

/**
 * Dashboard预加载组件
 * 在用户访问Dashboard时预加载常用数据
 */
export default function DashboardPreloader() {
  const { data: session } = useSession();
  const { preloadJournalDetails, preloadEmotionRecords, preloadAdminData } = usePreloadData();

  useEffect(() => {
    if (session) {
      // 检查用户角色
      const isAdmin = session.user?.role === 'ADMIN';
      
      // 预加载情绪记录（所有用户）
      preloadEmotionRecords({ 
        enabled: true, 
        delay: 500 // 让Dashboard先加载完成
      });

      // 预加载最新的几篇公开文章（所有用户）
      const preloadLatestJournals = async () => {
        try {
          const response = await fetch('/api/journal?type=public&limit=3');
          if (response.ok) {
            const data = await response.json();
            const journals = data.journals || [];
            const journalIds = journals.map((j: any) => j.id);
            
            if (journalIds.length > 0) {
              preloadJournalDetails(journalIds, { 
                enabled: true, 
                delay: 800 // 更长的延迟，确保不影响当前页面
              });
            }
          }
        } catch (error) {
          console.warn('Dashboard预加载失败:', error);
        }
      };

      // 管理员专用预加载
      const adminPreloadTasks = () => {
        if (isAdmin) {
          // 等待基础数据加载完成后再预加载管理员数据
          preloadAdminData({ 
            enabled: true, 
            delay: 1200 // 让Dashboard和基础数据先稳定
          });
        }
      };

      // 启动预加载任务
      const timer1 = setTimeout(preloadLatestJournals, 1000);
      const timer2 = setTimeout(adminPreloadTasks, 1000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [session, preloadJournalDetails, preloadEmotionRecords, preloadAdminData]);

  // 这个组件不渲染任何内容
  return null;
}