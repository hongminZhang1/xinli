# 本地缓存系统使用指南

## 📋 概述

本项目已实现完整的客户端本地缓存机制，用于减少重复的网络请求，提升应用性能和用户体验。

## 🎯 核心特性

### 1. 智能缓存策略
- **多级缓存时间**：不同类型数据使用不同的缓存时长
- **Stale-While-Revalidate**：立即返回缓存数据，后台静默刷新
- **自动失效**：数据更新时自动清除相关缓存
- **内存缓存**：所有数据存储在内存中，快速访问

### 2. 缓存时间配置

```typescript
export const CACHE_TTL = {
  ARTICLES: 2 * 60 * 1000,      // 文章列表: 2分钟
  ARTICLE_DETAIL: 5 * 60 * 1000, // 文章详情: 5分钟
  COMMENTS: 3 * 60 * 1000,       // 评论: 3分钟
  EMOTIONS: 5 * 60 * 1000,       // 情绪记录: 5分钟
  USERS: 10 * 60 * 1000,         // 用户列表: 10分钟
  SETTINGS: 15 * 60 * 1000,      // 系统设置: 15分钟
  DEFAULT: 5 * 60 * 1000,        // 默认: 5分钟
};
```

### 3. Stale Time（新鲜度时间）

- **文章列表**：1分钟内认为是新鲜数据
- **文章详情**：2分钟内认为是新鲜数据
- **评论**：1分钟内认为是新鲜数据
- **情绪记录**：2分钟内认为是新鲜数据
- **用户/设置**：5-10分钟内认为是新鲜数据

在 staleTime 内，数据直接从缓存返回；超过 staleTime 后，会在后台自动刷新。

## 📦 核心组件

### 1. 缓存Store (`src/store/useCacheStore.ts`)

统一的缓存管理中心：

```typescript
import { useCacheStore, CACHE_TTL } from '@/store/useCacheStore';

const { getCache, setCache, invalidateCache, invalidatePattern } = useCacheStore();

// 获取缓存
const data = getCache<MyDataType>('cache-key');

// 设置缓存（带过期时间）
setCache('cache-key', myData, CACHE_TTL.ARTICLES);

// 删除单个缓存
invalidateCache('cache-key');

// 批量删除（正则匹配）
invalidatePattern('journal-.*'); // 删除所有以 journal- 开头的缓存
```

### 2. 查询Hook (`src/hooks/useQuery.ts`)

统一的数据查询接口，自动处理缓存：

```typescript
import { useQuery } from '@/hooks/useQuery';

const { data, isLoading, isFetching, error, refetch } = useQuery(
  'my-query-key',
  async () => {
    // 数据获取逻辑
    const response = await fetch('/api/data');
    return response.json();
  },
  {
    cacheTime: 5 * 60 * 1000,  // 缓存5分钟
    staleTime: 60 * 1000,       // 1分钟内认为新鲜
  }
);
```

**返回值说明：**
- `data`: 数据内容
- `isLoading`: 首次加载中（无缓存时）
- `isFetching`: 后台刷新中
- `error`: 错误信息
- `refetch`: 手动刷新函数

### 3. 数据变更Hook (`useMutation`)

用于创建、更新、删除操作，自动失效相关缓存：

```typescript
import { useMutation } from '@/hooks/useQuery';

const { mutate, isLoading } = useMutation(
  async (data) => {
    const response = await fetch('/api/journal', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },
  {
    onSuccess: (data) => {
      console.log('创建成功', data);
    },
    invalidateQueries: ['journals-*'], // 失效所有日记相关缓存
  }
);

// 调用
await mutate({ title: '新日记', content: '内容' });
```

## 🔧 现有数据查询Hooks

### 文章/日记

```typescript
import { useJournals, useJournalDetail, useJournalComments } from '@/hooks/useQuery';

// 获取文章列表
const { data: journals } = useJournals('public'); // 或 'all'

// 获取文章详情
const { data: journal } = useJournalDetail(journalId);

// 获取文章评论
const { data: comments } = useJournalComments(journalId);
```

### 情绪记录

```typescript
import { useEmotionRecords } from '@/hooks/useQuery';

const { data: emotions } = useEmotionRecords();
```

或使用专用hook：

```typescript
import { useEmotions } from '@/hooks/useEmotions';

const { entries, loading, addEntry, updateEntry, deleteEntry } = useEmotions();
```

### 用户管理

```typescript
import { useUsers, useUser } from '@/hooks/useQuery';

// 获取所有用户
const { data: users } = useUsers();

// 获取单个用户
const { data: user } = useUser(userId);
```

### 系统设置

```typescript
import { useSystemSettings } from '@/hooks/useQuery';

const { data: settings } = useSystemSettings();
```

## 💡 最佳实践

### 1. 组件中使用

```typescript
'use client';

import { useJournals } from '@/hooks/useQuery';

export default function JournalList() {
  const { data: journals, isLoading, error, refetch } = useJournals('public');

  if (isLoading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div>
      <button onClick={refetch}>刷新</button>
      {journals?.map(journal => (
        <div key={journal.id}>{journal.title}</div>
      ))}
    </div>
  );
}
```

### 2. 数据更新后失效缓存

```typescript
import { useMutation } from '@/hooks/useQuery';

const { mutate: createJournal } = useMutation(
  async (data) => {
    const res = await fetch('/api/journal', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.json();
  },
  {
    invalidateQueries: ['journals-*'], // 失效所有文章缓存
  }
);
```

### 3. 手动管理缓存

```typescript
import { useCacheStore } from '@/store/useCacheStore';

function MyComponent() {
  const { invalidateCache, invalidatePattern } = useCacheStore();

  const handleDelete = async (id: string) => {
    await deleteAPI(id);
    
    // 失效特定缓存
    invalidateCache(`journal-${id}`);
    
    // 失效所有相关缓存
    invalidatePattern('journal-.*');
  };
}
```

## 🚀 性能优化效果

### 减少网络请求
- ✅ 页面切换时，重复数据直接从缓存读取
- ✅ 避免频繁的API调用
- ✅ 降低服务器负载

### 提升响应速度
- ✅ 缓存命中时数据立即可用（<1ms）
- ✅ 后台刷新不阻塞UI
- ✅ 用户体验更流畅

### 智能刷新策略
- ✅ 过期数据自动后台刷新
- ✅ 用户手动触发强制刷新
- ✅ 数据变更时自动失效相关缓存

## 🔍 调试和监控

### 查看缓存内容

```typescript
import { useCacheStore } from '@/store/useCacheStore';

const { getCacheKeys, getCache } = useCacheStore();

// 获取所有缓存键
const keys = getCacheKeys();
console.log('所有缓存键:', keys);

// 查看特定缓存
const data = getCache('journals-public');
console.log('文章列表缓存:', data);
```

### 清理过期缓存

```typescript
import { useCacheStore } from '@/store/useCacheStore';

const { cleanExpiredCache } = useCacheStore();

// 手动清理过期缓存
cleanExpiredCache();
```

缓存会自动清理（每分钟一次），但也可以手动触发。

## 📝 注意事项

1. **缓存时间配置**：根据数据更新频率合理设置缓存时间
2. **内存使用**：缓存存储在内存中，不要缓存过大的数据
3. **数据一致性**：重要操作后记得失效相关缓存
4. **错误处理**：网络错误时，缓存数据仍可用作降级方案

## 🔄 缓存生命周期

```
1. 组件挂载 → 检查缓存
   ├─ 有缓存且新鲜 → 直接使用
   ├─ 有缓存但过时 → 使用缓存 + 后台刷新
   └─ 无缓存 → 显示加载 + 获取数据

2. 数据获取成功 → 更新缓存 + 设置过期时间

3. 数据变更 → 失效相关缓存 → 下次访问重新获取

4. 定时清理 → 每分钟清理过期缓存
```

## 🎉 总结

通过本地缓存系统，项目实现了：
- ✅ 减少重复请求，提升性能
- ✅ 改善用户体验，响应更快
- ✅ 降低服务器负载
- ✅ 智能缓存管理，数据新鲜度保证
- ✅ 简单易用的API，开发效率高

所有数据请求都已集成缓存机制，无需额外配置即可享受缓存带来的性能提升！
