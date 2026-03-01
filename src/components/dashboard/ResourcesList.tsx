import React from "react";
import Card from "@/components/ui/Card";

const resources = [
  {
    title: "正念冥想入门视频合集",
    desc: "跟着引导音频做呼吸与身体放松练习，随时缓解焦虑紧张",
    href: "https://search.bilibili.com/all?keyword=%E6%AD%A3%E5%BF%B5%E5%86%A5%E6%83%B3%E5%85%A5%E9%97%A8&duration=1",
    icon: "🧘‍♀️",
    gradient: "from-emerald-400 to-teal-500",
    dot: "bg-emerald-400",
  },
  {
    title: "情绪管理热门问答（知乎）",
    desc: "心理学家与过来人分享与负面情绪和平共处的实用方法",
    href: "https://www.zhihu.com/question/53299143/answer/1126934575",
    icon: "💡",
    gradient: "from-sky-400 to-blue-500",
    dot: "bg-sky-400",
  },
  {
    title: "助眠白噪音视频合集",
    desc: "雨声、海浪、森林等自然白噪音，帮助快速放松进入深眠",
    href: "https://search.bilibili.com/all?keyword=%E5%8A%A9%E7%9C%A0%E7%99%BD%E5%99%AA%E9%9F%B3",
    icon: "🌙",
    gradient: "from-indigo-400 to-violet-500",
    dot: "bg-indigo-400",
  },
  {
    title: "简单心理·心理健康科普",
    desc: "专业咨询师撰写，涵盖焦虑、抑郁、亲密关系等实用文章",
    href: "https://www.jiandanxinli.com/columns",
    icon: "📖",
    gradient: "from-amber-400 to-orange-500",
    dot: "bg-amber-400",
  },
  {
    title: "壹心理·自我成长专区",
    desc: "心理测试、情感专栏、冥想音频，一站式心理健康平台",
    href: "https://www.xinli001.com/",
    icon: "🌱",
    gradient: "from-teal-400 to-cyan-500",
    dot: "bg-teal-400",
  },
  {
    title: "丁香医生·心理健康科普",
    desc: "医学专业团队出品，讲解抑郁、焦虑及睡眠障碍等知识",
    href: "https://drugs.dxy.cn/pc",
    icon: "🩺",
    gradient: "from-violet-400 to-purple-500",
    dot: "bg-violet-400",
  },
  {
    title: "瑜伽减压拉伸视频合集",
    desc: "适合居家练习的瑜伽流程，帮助舒缓肌肉紧张与心理压力",
    href: "https://search.bilibili.com/all?keyword=%E7%91%9C%E4%BC%BD%E6%94%BE%E6%9D%BE%E5%87%8F%E5%8E%8B&duration=1",
    icon: "🧘‍♂️",
    gradient: "from-green-400 to-emerald-500",
    dot: "bg-green-400",
  },
  {
    title: "焦虑情绪科普（知乎话题）",
    desc: "了解焦虑成因与应对方法，收录大量亲历者经验与专家解答",
    href: "https://zhuanlan.zhihu.com/p/144176474",
    icon: "😮‍💨",
    gradient: "from-orange-400 to-yellow-500",
    dot: "bg-orange-400",
  },
  {
    title: "豆瓣·心理学高分书单",
    desc: "精选豆瓣高评分心理学读物，涵盖认知、情绪、人际各领域",
    href: "https://www.douban.com/tag/%E5%BF%83%E7%90%86%E5%AD%A6/?type=book",
    icon: "📚",
    gradient: "from-amber-500 to-orange-500",
    dot: "bg-amber-500",
  },
  {
    title: "正念减压 MBSR 教程（B站）",
    desc: "系统化的正念减压课程视频，帮助建立长期减压练习习惯",
    href: "https://search.bilibili.com/all?keyword=%E6%AD%A3%E5%BF%B5%E5%87%8F%E5%8E%8B+MBSR&duration=4",
    icon: "🧠",
    gradient: "from-cyan-400 to-sky-500",
    dot: "bg-cyan-400",
  },
  {
    title: "认知行为疗法自学入门",
    desc: "了解 CBT 核心技术，通过思维记录与行为实验改变负性认知",
    href: "https://search.bilibili.com/all?keyword=%E8%AE%A4%E7%9F%A5%E8%A1%8C%E4%B8%BA%E7%96%97%E6%B3%95%E5%85%A5%E9%97%A8",
    icon: "🔍",
    gradient: "from-blue-400 to-indigo-500",
    dot: "bg-blue-400",
  },
  {
    title: "抑郁症科普（知乎话题）",
    desc: "收录专业科普与患者故事，帮助正确认识和应对抑郁情绪",
    href: "https://www.zhihu.com/topic/19558033/hot",
    icon: "🌧️",
    gradient: "from-slate-400 to-blue-500",
    dot: "bg-slate-400",
  },
  {
    title: "4-7-8 深呼吸放松练习",
    desc: "科学呼吸技法视频教程，可即时平复焦虑、帮助入眠",
    href: "https://search.bilibili.com/all?keyword=4-7-8%E5%91%BC%E5%90%B8%E6%B3%95+%E6%94%BE%E6%9D%BE",
    icon: "💨",
    gradient: "from-teal-400 to-green-500",
    dot: "bg-teal-400",
  },
  {
    title: "积极心理学科普视频（B站）",
    desc: "幸福感、感恩、心流等积极心理学核心概念通俗讲解",
    href: "https://search.bilibili.com/all?keyword=%E7%A7%AF%E6%9E%81%E5%BF%83%E7%90%86%E5%AD%A6%E7%A7%91%E6%99%AE",
    icon: "✨",
    gradient: "from-yellow-400 to-orange-500",
    dot: "bg-yellow-400",
  },
  {
    title: "壹心理·免费心理测评",
    desc: "SDS、SAS、PHQ-9 等常用心理量表在线自测，了解自身状态",
    href: "https://www.xinli001.com/ceshi?source=pc-home",
    icon: "📊",
    gradient: "from-purple-400 to-violet-500",
    dot: "bg-purple-400",
  },
  {
    title: "睡眠障碍科普视频合集",
    desc: "失眠成因分析与睡眠卫生实操建议，告别辗转难眠",
    href: "https://search.bilibili.com/all?keyword=%E7%9D%A1%E7%9C%A0%E9%9A%9C%E7%A2%8D%E5%A4%B1%E7%9C%A0%E7%A7%91%E6%99%AE",
    icon: "😴",
    gradient: "from-indigo-400 to-blue-500",
    dot: "bg-indigo-400",
  },
  {
    title: "亲密关系与沟通（知乎话题）",
    desc: "依恋类型、非暴力沟通、边界感等热门关系议题深度讨论",
    href: "https://zhuanlan.zhihu.com/p/1925954231808004919",
    icon: "💑",
    gradient: "from-pink-400 to-red-500",
    dot: "bg-pink-400",
  },
  {
    title: "职场压力管理（知乎话题）",
    desc: "职业倦怠识别与应对，高压环境下保持心理弹性的策略",
    href: "https://www.zhihu.com/question/661114956/answer/1973779643258651435",
    icon: "💼",
    gradient: "from-blue-500 to-cyan-500",
    dot: "bg-blue-500",
  },
  {
    title: "腹式呼吸冥想引导视频",
    desc: "10分钟腹式呼吸音频引导，随时随地快速进入平静状态",
    href: "https://search.bilibili.com/all?keyword=%E8%85%B9%E5%BC%8F%E5%91%BC%E5%90%B8%E5%86%A5%E6%83%B3%E5%BC%95%E5%AF%BC&duration=1",
    icon: "🫁",
    gradient: "from-emerald-400 to-cyan-500",
    dot: "bg-emerald-400",
  },
  {
    title: "自我关怀练习（B站视频）",
    desc: "学习对自己温柔，以自我悲悯替代自我批判，提升幸福感",
    href: "https://search.bilibili.com/all?keyword=%E8%87%AA%E6%88%91%E5%85%B3%E6%80%80%E5%86%A5%E6%83%B3%E7%BB%83%E4%B9%A0",
    icon: "🤗",
    gradient: "from-amber-400 to-rose-500",
    dot: "bg-amber-400",
  },
  {
    title: "心理健康话题（知乎）",
    desc: "综合心理健康问答社区，涵盖情绪、睡眠、人际等全方位议题",
    href: "https://www.zhihu.com/question/1937991623154852740/answer/1976405280599326735",
    icon: "🧩",
    gradient: "from-violet-400 to-indigo-500",
    dot: "bg-violet-400",
  },
  {
    title: "TED 心理学演讲精选（B站）",
    desc: "国际顶级 TED 演讲中文字幕版，开拓心理健康全球视野",
    href: "https://search.bilibili.com/all?keyword=TED%E5%BF%83%E7%90%86%E5%AD%A6%E6%BC%94%E8%AE%B2%E4%B8%AD%E6%96%87",
    icon: "🎤",
    gradient: "from-rose-400 to-pink-500",
    dot: "bg-rose-400",
  },
  {
    title: "压力管理技巧（知乎话题）",
    desc: "减压策略、时间管理、认知重构，多维度对抗生活压力",
    href: "https://www.zhihu.com/question/1927372462510810223/answer/2000291483421521651",
    icon: "📉",
    gradient: "from-red-400 to-orange-500",
    dot: "bg-red-400",
  },
  {
    title: "微信读书·心理学精选",
    desc: "《被讨厌的勇气》《蛤蟆先生》等经典心理书籍可在线阅读",
    href: "https://weread.qq.com/web/",
    icon: "📱",
    gradient: "from-green-400 to-teal-500",
    dot: "bg-green-400",
  },
  {
    title: "儿童青少年心理健康（知乎）",
    desc: "家长、教师可参考的青少年心理发展与危机识别实用内容",
    href: "https://www.zhihu.com/question/9447515817/answer/1989639911750521415",
    icon: "👨‍👩‍👧",
    gradient: "from-yellow-400 to-amber-500",
    dot: "bg-yellow-400",
  },
  {
    title: "冥想音乐 & 自然音景（B站）",
    desc: "水晶钵、颂钵、432Hz 调频音乐，深度放松身心的音频合集",
    href: "https://search.bilibili.com/all?keyword=%E5%86%A5%E6%83%B3%E9%9F%B3%E4%B9%90+%E8%87%AA%E7%84%B6%E9%9F%B3%E6%99%AF",
    icon: "🎵",
    gradient: "from-sky-400 to-violet-500",
    dot: "bg-sky-400",
  },
  {
    title: "身体扫描冥想引导（B站）",
    desc: "通过逐步关注身体各部位，释放肌肉紧张，深度觉察当下",
    href: "https://search.bilibili.com/all?keyword=%E8%BA%AB%E4%BD%93%E6%89%AB%E6%8F%8F%E5%86%A5%E6%83%B3&duration=1",
    icon: "🫶",
    gradient: "from-teal-400 to-sky-500",
    dot: "bg-teal-400",
  },
  {
    title: "人际边界感科普（知乎）",
    desc: "识别并建立健康边界，摆脱讨好型人格，保护自我能量",
    href: "https://www.zhihu.com/search?type=content&q=%E4%BA%BA%E9%99%85%E8%BE%B9%E7%95%8C%E6%84%9F%E5%BF%83%E7%90%86",
    icon: "🛡️",
    gradient: "from-cyan-400 to-blue-500",
    dot: "bg-cyan-400",
  },
  {
    title: "运动改善情绪与心理健康",
    desc: "有氧运动对抑郁焦虑的科学研究解读与居家运动教程推荐",
    href: "https://search.bilibili.com/all?keyword=%E8%BF%90%E5%8A%A8%E6%94%B9%E5%96%84%E6%8A%91%E9%83%81%E7%84%A6%E8%99%91",
    icon: "🏃‍♀️",
    gradient: "from-lime-400 to-green-500",
    dot: "bg-lime-400",
  },
  {
    title: "全国心理援助热线",
    desc: "24小时免费援助：12356 / 400-161-9995",
    href: "https://baike.baidu.com/item/12356%E5%BF%83%E7%90%86%E6%8F%B4%E5%8A%A9%E7%83%AD%E7%BA%BF%E5%B9%B3%E5%8F%B0/67243261",
    icon: "📞",
    gradient: "from-rose-400 to-pink-500",
    dot: "bg-rose-400",
  },
];

export default function ResourcesList() {
  return (
    <Card className="h-full flex flex-col border-none shadow-md bg-white/90 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-sm shadow-sm">
            🌱
          </span>
          疗愈资源
        </h3>
        <a
          href="/dashboard/resources"
          className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 px-2.5 py-1 rounded-full transition-colors"
        >
          查看全部 →
        </a>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 -mr-1 space-y-2">
        {resources.map((r) => (
          <a
            key={r.title}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 p-2.5 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all duration-200"
          >
            {/* Icon */}
            <div
              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-base shrink-0 shadow-sm`}
            >
              {r.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${r.dot} shrink-0`} />
                <p className="text-xs font-semibold text-slate-700 group-hover:text-indigo-700 truncate transition-colors">
                  {r.title}
                </p>
              </div>
              <p className="text-xs text-slate-400 truncate mt-0.5 pl-3">
                {r.desc}
              </p>
            </div>

            {/* Arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-300 group-hover:text-indigo-400 shrink-0 transition-colors"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        ))}
      </div>

      {/* Emergency strip */}
      <div className="mt-3 pt-3 border-t border-slate-100">
        <a
          href="tel:4001619995"
          className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100 hover:border-rose-300 transition-colors group"
        >
          <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-sm shrink-0">🆘</span>
          <span className="text-xs font-semibold text-rose-700 flex-1">心理援助热线</span>
          <span className="text-xs font-mono font-bold text-rose-600 group-hover:text-rose-800 transition-colors">
            400-161-9995
          </span>
        </a>
      </div>
    </Card>
  );
}
