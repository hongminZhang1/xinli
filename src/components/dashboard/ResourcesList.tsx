import React from "react";
import Card from "@/components/ui/Card";

const resources = [
  { 
    title: "正念冥想入门视频合集", 
    desc: "跟着引导音频做呼吸与身体放松练习，随时缓解焦虑紧张",
    href: "https://search.bilibili.com/all?keyword=%E6%AD%A3%E5%BF%B5%E5%86%A5%E6%83%B3%E5%85%A5%E9%97%A8&duration=1", 
    icon: "🧘‍♀️",
    color: "bg-emerald-100 text-emerald-600"
  },
  { 
    title: "情绪管理热门问答（知乎）", 
    desc: "心理学家与过来人分享与负面情绪和平共处的实用方法",
    href: "https://www.zhihu.com/topic/19596553/hot", 
    icon: "💡",
    color: "bg-sky-100 text-sky-600"
  },
  { 
    title: "助眠白噪音视频合集", 
    desc: "雨声、海浪、森林等自然白噪音，帮助快速放松进入深眠",
    href: "https://search.bilibili.com/all?keyword=%E5%8A%A9%E7%9C%A0%E7%99%BD%E5%99%AA%E9%9F%B3", 
    icon: "🌙",
    color: "bg-indigo-100 text-indigo-600"
  },
  { 
    title: "简单心理·心理健康科普", 
    desc: "专业咨询师撰写，涵盖焦虑、抑郁、亲密关系等实用文章",
    href: "https://www.jiandanxinli.com/reads", 
    icon: "📖",
    color: "bg-amber-100 text-amber-600"
  },
  { 
    title: "壹心理·自我成长专区", 
    desc: "心理测试、情感专栏、冥想音频，一站式心理健康平台",
    href: "https://www.xinli001.com/", 
    icon: "🌱",
    color: "bg-teal-100 text-teal-600"
  },
  { 
    title: "丁香医生·心理健康科普", 
    desc: "医学专业团队出品，讲解抑郁、焦虑及睡眠障碍等知识",
    href: "https://dxy.com/article/category/%E5%BF%83%E7%90%86", 
    icon: "🩺",
    color: "bg-violet-100 text-violet-600"
  },
  { 
    title: "全国心理援助热线", 
    desc: "24小时免费援助：北京 010-82951332，全国 400-161-9995",
    href: "https://www.bjchp.org/", 
    icon: "📞",
    color: "bg-rose-100 text-rose-600"
  },
];

export default function ResourcesList() {
  return (
    <Card className="h-full flex flex-col border-none shadow-md bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="text-xl">🌱</span> 资源荟萃
        </h3>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">精选推荐</span>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2">
        <ul className="space-y-3">
          {resources.map((r) => (
            <li key={r.title} className="group">
              <a 
                href={r.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-blue-100 hover:shadow-sm transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${r.color}`}>
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors truncate">
                    {r.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
                <div className="text-slate-300 group-hover:text-blue-400 transition-colors self-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
