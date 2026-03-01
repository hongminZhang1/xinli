"use client";
import React, { useState } from "react";

const categories = [
  { key: "all", label: "全部资源", icon: "✨" },
  { key: "meditation", label: "冥想放松", icon: "🧘" },
  { key: "knowledge", label: "心理知识", icon: "📚" },
  { key: "platform", label: "专业平台", icon: "🌐" },
  { key: "emergency", label: "援助热线", icon: "🆘" },
];

const resources = [
  {
    "title": "正念冥想入门视频合集",
    "desc": "跟着引导音频做呼吸与身体放松练习，随时缓解焦虑紧张",
    "href": "https://search.bilibili.com/all?keyword=%E6%AD%A3%E5%BF%B5%E5%86%A5%E6%83%B3%E5%85%A5%E9%97%A8&duration=1",
    "icon": "🧘‍♀️",
    "category": "meditation",
    "tag": "视频教程",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-emerald-400 to-teal-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "情绪管理热门问答（知乎）",
    "desc": "心理学家与过来人分享与负面情绪和平共处的实用方法",
    "href": "https://www.zhihu.com/question/53299143/answer/1126934575",
    "icon": "💡",
    "category": "knowledge",
    "tag": "经验分享",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-sky-400 to-blue-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "助眠白噪音视频合集",
    "desc": "雨声、海浪、森林等自然白噪音，帮助快速放松进入深眠",
    "href": "https://search.bilibili.com/all?keyword=%E5%8A%A9%E7%9C%A0%E7%99%BD%E5%99%AA%E9%9F%B3",
    "icon": "🌙",
    "category": "meditation",
    "tag": "视频教程",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-indigo-400 to-violet-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "简单心理·心理健康科普",
    "desc": "专业咨询师撰写，涵盖焦虑、抑郁、亲密关系等实用文章",
    "href": "https://www.jiandanxinli.com/columns",
    "icon": "📖",
    "category": "knowledge",
    "tag": "专业科普",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-amber-400 to-orange-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "壹心理·自我成长专区",
    "desc": "心理测试、情感专栏、冥想音频，一站式心理健康平台",
    "href": "https://www.xinli001.com/",
    "icon": "🌱",
    "category": "platform",
    "tag": "综合平台",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-teal-400 to-cyan-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "丁香医生·心理健康科普",
    "desc": "医学专业团队出品，讲解抑郁、焦虑及睡眠障碍等知识",
    "href": "https://drugs.dxy.cn/pc",
    "icon": "🩺",
    "category": "meditation",
    "tag": "放松练习",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-violet-400 to-purple-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "瑜伽减压拉伸视频合集",
    "desc": "适合居家练习的瑜伽流程，帮助舒缓肌肉紧张与心理压力",
    "href": "https://search.bilibili.com/all?keyword=%E7%91%9C%E4%BC%BD%E6%94%BE%E6%9D%BE%E5%87%8F%E5%8E%8B&duration=1",
    "icon": "🧘‍♂️",
    "category": "meditation",
    "tag": "视频教程",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-green-400 to-emerald-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "焦虑情绪科普（知乎话题）",
    "desc": "了解焦虑成因与应对方法，收录大量亲历者经验与专家解答",
    "href": "https://zhuanlan.zhihu.com/p/144176474",
    "icon": "😮‍💨",
    "category": "knowledge",
    "tag": "经验分享",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-orange-400 to-yellow-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "豆瓣·心理学高分书单",
    "desc": "精选豆瓣高评分心理学读物，涵盖认知、情绪、人际各领域",
    "href": "https://www.douban.com/tag/%E5%BF%83%E7%90%86%E5%AD%A6/?type=book",
    "icon": "📚",
    "category": "platform",
    "tag": "综合平台",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-amber-500 to-orange-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "正念减压 MBSR 教程（B站）",
    "desc": "系统化的正念减压课程视频，帮助建立长期减压练习习惯",
    "href": "https://search.bilibili.com/all?keyword=%E6%AD%A3%E5%BF%B5%E5%87%8F%E5%8E%8B+MBSR&duration=4",
    "icon": "🧠",
    "category": "meditation",
    "tag": "视频教程",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-cyan-400 to-sky-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "认知行为疗法自学入门",
    "desc": "了解 CBT 核心技术，通过思维记录与行为实验改变负性认知",
    "href": "https://search.bilibili.com/all?keyword=%E8%AE%A4%E7%9F%A5%E8%A1%8C%E4%B8%BA%E7%96%97%E6%B3%95%E5%85%A5%E9%97%A8",
    "icon": "🔍",
    "category": "knowledge",
    "tag": "专业科普",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-blue-400 to-indigo-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "抑郁症科普（知乎话题）",
    "desc": "收录专业科普与患者故事，帮助正确认识和应对抑郁情绪",
    "href": "https://www.zhihu.com/topic/19558033/hot",
    "icon": "🌧️",
    "category": "knowledge",
    "tag": "经验分享",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-slate-400 to-blue-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "4-7-8 深呼吸放松练习",
    "desc": "科学呼吸技法视频教程，可即时平复焦虑、帮助入眠",
    "href": "https://search.bilibili.com/all?keyword=4-7-8%E5%91%BC%E5%90%B8%E6%B3%95+%E6%94%BE%E6%9D%BE",
    "icon": "💨",
    "category": "meditation",
    "tag": "视频教程",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-teal-400 to-green-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "积极心理学科普视频（B站）",
    "desc": "幸福感、感恩、心流等积极心理学核心概念通俗讲解",
    "href": "https://search.bilibili.com/all?keyword=%E7%A7%AF%E6%9E%81%E5%BF%83%E7%90%86%E5%AD%A6%E7%A7%91%E6%99%AE",
    "icon": "✨",
    "category": "knowledge",
    "tag": "专业科普",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-yellow-400 to-orange-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "壹心理·免费心理测评",
    "desc": "SDS、SAS、PHQ-9 等常用心理量表在线自测，了解自身状态",
    "href": "https://www.xinli001.com/ceshi?source=pc-home",
    "icon": "📊",
    "category": "knowledge",
    "tag": "专业科普",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-purple-400 to-violet-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "睡眠障碍科普视频合集",
    "desc": "失眠成因分析与睡眠卫生实操建议，告别辗转难眠",
    "href": "https://search.bilibili.com/all?keyword=%E7%9D%A1%E7%9C%A0%E9%9A%9C%E7%A2%8D%E5%A4%B1%E7%9C%A0%E7%A7%91%E6%99%AE",
    "icon": "😴",
    "category": "meditation",
    "tag": "视频教程",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-indigo-400 to-blue-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "亲密关系与沟通（知乎话题）",
    "desc": "依恋类型、非暴力沟通、边界感等热门关系议题深度讨论",
    "href": "https://zhuanlan.zhihu.com/p/1925954231808004919",
    "icon": "💑",
    "category": "knowledge",
    "tag": "经验分享",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-pink-400 to-red-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "职场压力管理（知乎话题）",
    "desc": "职业倦怠识别与应对，高压环境下保持心理弹性的策略",
    "href": "https://www.zhihu.com/question/661114956/answer/1973779643258651435",
    "icon": "💼",
    "category": "knowledge",
    "tag": "经验分享",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-blue-500 to-cyan-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "腹式呼吸冥想引导视频",
    "desc": "10分钟腹式呼吸音频引导，随时随地快速进入平静状态",
    "href": "https://search.bilibili.com/all?keyword=%E8%85%B9%E5%BC%8F%E5%91%BC%E5%90%B8%E5%86%A5%E6%83%B3%E5%BC%95%E5%AF%BC&duration=1",
    "icon": "🫁",
    "category": "meditation",
    "tag": "视频教程",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-emerald-400 to-cyan-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "自我关怀练习（B站视频）",
    "desc": "学习对自己温柔，以自我悲悯替代自我批判，提升幸福感",
    "href": "https://search.bilibili.com/all?keyword=%E8%87%AA%E6%88%91%E5%85%B3%E6%80%80%E5%86%A5%E6%83%B3%E7%BB%83%E4%B9%A0",
    "icon": "🤗",
    "category": "knowledge",
    "tag": "专业科普",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-amber-400 to-rose-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "心理健康话题（知乎）",
    "desc": "综合心理健康问答社区，涵盖情绪、睡眠、人际等全方位议题",
    "href": "https://www.zhihu.com/question/1937991623154852740/answer/1976405280599326735",
    "icon": "🧩",
    "category": "meditation",
    "tag": "放松练习",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-violet-400 to-indigo-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "TED 心理学演讲精选（B站）",
    "desc": "国际顶级 TED 演讲中文字幕版，开拓心理健康全球视野",
    "href": "https://search.bilibili.com/all?keyword=TED%E5%BF%83%E7%90%86%E5%AD%A6%E6%BC%94%E8%AE%B2%E4%B8%AD%E6%96%87",
    "icon": "🎤",
    "category": "knowledge",
    "tag": "专业科普",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-rose-400 to-pink-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "压力管理技巧（知乎话题）",
    "desc": "减压策略、时间管理、认知重构，多维度对抗生活压力",
    "href": "https://www.zhihu.com/question/1927372462510810223/answer/2000291483421521651",
    "icon": "📉",
    "category": "knowledge",
    "tag": "经验分享",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-red-400 to-orange-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "微信读书·心理学精选",
    "desc": "《被讨厌的勇气》《蛤蟆先生》等经典心理书籍可在线阅读",
    "href": "https://weread.qq.com/web/",
    "icon": "📱",
    "category": "platform",
    "tag": "综合平台",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-green-400 to-teal-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "儿童青少年心理健康（知乎）",
    "desc": "家长、教师可参考的青少年心理发展与危机识别实用内容",
    "href": "https://www.zhihu.com/question/9447515817/answer/1989639911750521415",
    "icon": "👨‍👩‍👧",
    "category": "knowledge",
    "tag": "经验分享",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-yellow-400 to-amber-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "冥想音乐 & 自然音景（B站）",
    "desc": "水晶钵、颂钵、432Hz 调频音乐，深度放松身心的音频合集",
    "href": "https://search.bilibili.com/all?keyword=%E5%86%A5%E6%83%B3%E9%9F%B3%E4%B9%90+%E8%87%AA%E7%84%B6%E9%9F%B3%E6%99%AF",
    "icon": "🎵",
    "category": "meditation",
    "tag": "视频教程",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-sky-400 to-violet-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "身体扫描冥想引导（B站）",
    "desc": "通过逐步关注身体各部位，释放肌肉紧张，深度觉察当下",
    "href": "https://search.bilibili.com/all?keyword=%E8%BA%AB%E4%BD%93%E6%89%AB%E6%8F%8F%E5%86%A5%E6%83%B3&duration=1",
    "icon": "🫶",
    "category": "meditation",
    "tag": "视频教程",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-teal-400 to-sky-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "人际边界感科普（知乎）",
    "desc": "识别并建立健康边界，摆脱讨好型人格，保护自我能量",
    "href": "https://www.zhihu.com/search?type=content&q=%E4%BA%BA%E9%99%85%E8%BE%B9%E7%95%8C%E6%84%9F%E5%BF%83%E7%90%86",
    "icon": "🛡️",
    "category": "knowledge",
    "tag": "经验分享",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-cyan-400 to-blue-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "运动改善情绪与心理健康",
    "desc": "有氧运动对抑郁焦虑的科学研究解读与居家运动教程推荐",
    "href": "https://search.bilibili.com/all?keyword=%E8%BF%90%E5%8A%A8%E6%94%B9%E5%96%84%E6%8A%91%E9%83%81%E7%84%A6%E8%99%91",
    "icon": "🏃‍♀️",
    "category": "knowledge",
    "tag": "专业科普",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-lime-400 to-green-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  },
  {
    "title": "全国心理援助热线",
    "desc": "24小时免费援助：12356 / 400-161-9995",
    "href": "https://baike.baidu.com/item/12356%E5%BF%83%E7%90%86%E6%8F%B4%E5%8A%A9%E7%83%AD%E7%BA%BF%E5%B9%B3%E5%8F%B0/67243261",
    "icon": "📞",
    "category": "emergency",
    "tag": "24小时热线",
    "tagColor": "bg--100 dark:bg--900/40 text--700 dark:text--300",
    "gradient": "from-rose-400 to-pink-500",
    "bg": "bg-gradient-to-br from--50 to--50 dark:from--900/20 dark:to--900/20",
    "border": "border--200 dark:border--800/50",
    "hover": "hover:border--400 dark:hover:border--600"
  }
];

const stats = [
  { label: "精选资源", value: "30+", icon: "📌" },
  { label: "覆盖场景", value: "4", icon: "🗂️" },
  { label: "专业平台", value: "5+", icon: "🎓" },
  { label: "免费资源", value: "100%", icon: "🆓" },
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/40">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl mb-8 bg-white dark:bg-slate-900 border border-teal-100 dark:border-teal-900/50 p-8 shadow-sm dark:shadow-none">
        {/* decorative background flares */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-50 dark:bg-teal-900/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-sky-50 dark:bg-sky-900/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-xs font-semibold tracking-wide border border-teal-200/60 dark:border-teal-800">
                🌿 心理健康资源库
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-slate-800 dark:text-slate-100">
              疗愈资源中心
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
              精选冥想引导、权威心理科普与专业援助平台，陪伴你在每一个需要支持的时刻，找到属于自己的平静与力量。
            </p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl px-5 py-4 border border-slate-100 dark:border-slate-700/50 text-center min-w-[110px] transition-colors hover:bg-slate-100/60 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-600"
              >
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{s.value}</div>
                <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActiveCategory(c.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              activeCategory === c.key
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-indigo-900/20"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
            }`}
          >
            <span>{c.icon}</span>
            {c.label}
          </button>
        ))}
        <span className="ml-auto flex items-center text-xs text-slate-400 gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
          共 {filtered.length} 个资源
        </span>
      </div>

      {/* Emergency Banner */}
      {(activeCategory === "all" || activeCategory === "emergency") && (
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 dark:from-rose-600 dark:to-pink-700 p-5 flex items-center gap-4 text-white shadow-lg shadow-rose-200 dark:shadow-none">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl shrink-0 border border-white/30">
            🆘
          </div>
          <div className="flex-1">
            <div className="font-bold text-base mb-0.5">紧急心理援助热线 · 24小时免费</div>
            <div className="text-white/80 text-sm">
              &nbsp;*&nbsp; 
              <a href="tel:4001619995" className="font-mono font-bold underline underline-offset-2 mx-1 hover:text-white">12356</a>
              &nbsp;·&nbsp; 危机时刻请立即拨打，专业人士全程陪伴
            </div>
          </div>
          <a
            href="https://baike.baidu.com/item/12356%E5%BF%83%E7%90%86%E6%8F%B4%E5%8A%A9%E7%83%AD%E7%BA%BF%E5%B9%B3%E5%8F%B0/67243261"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-semibold border border-white/30 transition-all"
          >
            了解详情 →
          </a>
        </div>
      )}

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered
          .filter((r) => r.category !== "emergency")
          .map((r) => (
            <a
              key={r.title}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col rounded-2xl border ${r.border} ${r.bg} ${r.hover} p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
            >
              {/* gradient accent top bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${r.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="flex items-start gap-4 mb-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-2xl shrink-0 shadow-md`}
                >
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5 ${r.tagColor}`}>
                    {r.tag}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white leading-snug line-clamp-2">
                    {r.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1 mb-4 line-clamp-3">
                {r.desc}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">点击访问外部链接</span>
                <span className={`flex items-center gap-1 text-xs font-semibold bg-gradient-to-r ${r.gradient} bg-clip-text text-transparent group-hover:gap-2 transition-all`}>
                  立即访问
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-400 dark:group-hover:text-indigo-400 transition-colors"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
      </div>

      {/* Footer Tip */}
      <div className="mt-8 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xl shrink-0">
          💬
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-0.5">寻求专业帮助是勇敢的选择</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            如果你正在经历持续的情绪困扰，建议同时使用本平台的 AI 情感倾诉 或 预约心理咨询 功能，获得更系统的支持与陪伴。
          </div>
        </div>
      </div>
    </div>
  );
}
