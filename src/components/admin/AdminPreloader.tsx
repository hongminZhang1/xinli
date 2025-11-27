"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePreloadData } from '@/hooks/usePreload';
import { useAdminDataRefresh } from '@/hooks/useAdminRefresh';

/**
 * 管理员页面预加载组件
 * 当管理员访问管理员面板时，预加载更多相关数据
 */
export default function AdminPreloader() {
  const { data: session } = useSession();
  const { preloadJournalDetails, preloadEmotionRecords } = usePreloadData();
  
  const isAdmin = session?.user?.role === 'ADMIN';
  
  // 启用管理员数据自动刷新
  useAdminDataRefresh(isAdmin);

  useEffect(() => {
    // 只有管理员才执行预加载
    if (isAdmin) {
      
      // 预加载更多用户相关数据
      const preloadUserRelatedData = async () => {
        try {
          console.log('🔧 管理员面板数据已加载，开始预加载相关数据...');
          
          // 预加载所有文章数据（管理员可能需要查看和管理）
          const allJournalsResponse = await fetch('/api/journal?type=all&limit=10');
          if (allJournalsResponse.ok) {
            const allJournalsData = await allJournalsResponse.json();
            const allJournals = allJournalsData.journals || [];
            const journalIds = allJournals.map((j: any) => j.id);
            
            if (journalIds.length > 0) {
              preloadJournalDetails(journalIds, { 
                enabled: true, 
                delay: 500,
                batchSize: 2 // 小批量，避免影响管理员面板操作
              });
            }
          }

          // 预加载情绪数据统计
          preloadEmotionRecords({ 
            enabled: true, 
            delay: 300 
          });
          
          console.log('📊 管理员相关数据预加载完成');
        } catch (error) {
          console.warn('管理员相关数据预加载失败:', error);
        }
      };

      // 稍作延迟，确保管理员面板先稳定加载
      const timer = setTimeout(preloadUserRelatedData, 800);
      return () => clearTimeout(timer);
    }
  }, [isAdmin, preloadJournalDetails, preloadEmotionRecords]);

  // 这个组件不渲染任何内容
  return null;
}