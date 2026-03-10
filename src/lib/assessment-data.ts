// 评估分类
export const assessmentCategories = [
  {
    id: "personality",
    name: "人格分析",
    icon: "�",
    description: "深入了解你的性格特质和行为模式"
  },
  {
    id: "emotion",
    name: "情绪健康",
    icon: "🪴",
    description: "评估你的情绪状态和心理健康水平"
  },
  {
    id: "career",
    name: "职业倾向",
    icon: "🧭",
    description: "发现你的职业兴趣和能力倾向"
  },
  {
    id: "social",
    name: "人际交往",
    icon: "☕",
    description: "了解你的社交风格和人际关系模式"
  },
  {
    id: "stress",
    name: "压力评估",
    icon: "🌊",
    description: "测量你的压力水平和应对能力"
  }
];

// 所有心理测试
export const allAssessments = [
  // 人格分析类
  {
    id: "mbti",
    title: "MBTI 人格类型测试",
    description: "基于荣格心理学理论，探索你的性格类型。了解你是内向还是外向，更偏向感觉还是直觉，思考还是情感，判断还是感知。",
    icon: "🎭",
    category: "personality",
    duration: "3分钟",
    questions: 10,
    participants: 342,
    difficulty: "medium",
    tags: ["性格", "职场", "人际关系"],
    completed: false
  },
  {
    id: "big_five",
    title: "大五人格测试",
    description: "科学权威的人格测试，从开放性、责任心、外向性、亲和性、神经质五个维度全面分析你的性格。",
    icon: "🌟",
    category: "personality",
    duration: "4分钟",
    questions: 10,
    participants: 215,
    difficulty: "easy",
    tags: ["科学", "权威", "全面"],
    completed: true
  },
  {
    id: "introvert_extrovert",
    title: "内外向指数评估",
    description: "深入了解你的社交能量来源，是从独处中获得能量还是从与他人互动中充电。",
    icon: "⚖️",
    category: "personality",
    duration: "3分钟",
    questions: 10,
    participants: 456,
    difficulty: "easy",
    tags: ["内向", "外向", "社交"],
    completed: false
  },
  {
    id: "enneagram",
    title: "九型人格测试",
    description: "古老而深刻的人格分析系统，帮你发现内在动机、恐惧和欲望，找到成长的方向。",
    icon: "🔮",
    category: "personality",
    duration: "5分钟",
    questions: 10,
    participants: 128,
    difficulty: "hard",
    tags: ["深度", "成长", "自我认知"],
    completed: false
  },

  // 情绪健康类
  {
    id: "depression_scale",
    title: "抑郁自评量表",
    description: "科学评估你的情绪状态，及早发现抑郁倾向，关爱自己的心理健康。",
    icon: "🥀",
    category: "emotion",
    duration: "3分钟",
    questions: 10,
    participants: 892,
    difficulty: "easy",
    tags: ["情绪", "健康", "自测"],
    completed: false
  },
  {
    id: "anxiety_test",
    title: "焦虑程度测试",
    description: "评估你的焦虑水平，了解焦虑对日常生活的影响程度，学会更好地管理焦虑情绪。",
    icon: "🎢",
    category: "emotion",
    duration: "3分钟",
    questions: 10,
    participants: 675,
    difficulty: "easy",
    tags: ["焦虑", "管理", "缓解"],
    completed: false
  },
  {
    id: "emotional_intelligence",
    title: "情商测试",
    description: "测试你的情绪智力，包括自我觉察、情绪管理、社会觉察和人际关系管理四个方面。",
    icon: "🧠",
    category: "emotion",
    duration: "4分钟",
    questions: 10,
    participants: 432,
    difficulty: "medium",
    tags: ["情商", "智力", "管理"],
    completed: false
  },
  {
    id: "happiness_index",
    title: "幸福感指数",
    description: "评估你的生活满意度和主观幸福感，发现提升生活质量的关键因素。",
    icon: "🌻",
    category: "emotion",
    duration: "3分钟",
    questions: 10,
    participants: 567,
    difficulty: "easy",
    tags: ["幸福", "满意度", "生活质量"],
    completed: true
  },

  // 职业倾向类
  {
    id: "holland_career",
    title: "霍兰德职业兴趣测试",
    description: "经典的职业测评工具，从六种职业兴趣类型分析你的职业倾向和适合的工作环境。",
    icon: "🧭",
    category: "career",
    duration: "4分钟",
    questions: 10,
    participants: 321,
    difficulty: "medium",
    tags: ["职业", "兴趣", "规划"],
    completed: false
  },
  {
    id: "leadership_style",
    title: "领导风格测试",
    description: "了解你的领导特质和管理风格，发现你在团队中的角色定位和影响力模式。",
    icon: "♟️",
    category: "career",
    duration: "3分钟",
    questions: 10,
    participants: 145,
    difficulty: "medium",
    tags: ["领导力", "管理", "团队"],
    completed: false
  },
  {
    id: "work_values",
    title: "职业价值观测试",
    description: "探索你在工作中最看重的价值，帮助你选择与内心价值观一致的职业道路。",
    icon: "⚖️",
    category: "career",
    duration: "3分钟",
    questions: 10,
    participants: 234,
    difficulty: "easy",
    tags: ["价值观", "选择", "匹配"],
    completed: false
  },

  // 人际交往类
  {
    id: "attachment_style",
    title: "依恋类型测试",
    description: "了解你在亲密关系中的依恋模式，改善人际关系和情感沟通。",
    icon: "🔗",
    category: "social",
    duration: "3分钟",
    questions: 10,
    participants: 421,
    difficulty: "medium",
    tags: ["依恋", "关系", "沟通"],
    completed: false
  },
  {
    id: "communication_style",
    title: "沟通风格测试",
    description: "发现你的沟通偏好和表达方式，提升人际交往的有效性和和谐度。",
    icon: "🪞",
    category: "social",
    duration: "3分钟",
    questions: 10,
    participants: 356,
    difficulty: "easy",
    tags: ["沟通", "表达", "人际"],
    completed: false
  },
  {
    id: "social_skills",
    title: "社交能力评估",
    description: "全面评估你的社交技能，包括倾听、共情、冲突解决和团队合作等方面。",
    icon: "🎪",
    category: "social",
    duration: "5分钟",
    questions: 10,
    participants: 198,
    difficulty: "medium",
    tags: ["社交", "技能", "合作"],
    completed: false
  },

  // 压力评估类
  {
    id: "stress_level",
    title: "压力水平测试",
    description: "评估你当前的压力状况，了解压力来源和对生活的影响程度。",
    icon: "🌋",
    category: "stress",
    duration: "3分钟",
    questions: 10,
    participants: 789,
    difficulty: "easy",
    tags: ["压力", "状况", "影响"],
    completed: false
  },
  {
    id: "coping_strategies",
    title: "压力应对方式",
    description: "了解你处理压力的策略和模式，学会更健康有效的压力管理方法。",
    icon: "🧯",
    category: "stress",
    duration: "4分钟",
    questions: 10,
    participants: 267,
    difficulty: "medium",
    tags: ["应对", "策略", "管理"],
    completed: true
  },
  {
    id: "resilience_test",
    title: "心理韧性测试",
    description: "测试你面对挫折和困难时的恢复能力，提升心理抗压和适应能力。",
    icon: "🎋",
    category: "stress",
    duration: "4分钟",
    questions: 10,
    participants: 156,
    difficulty: "medium",
    tags: ["韧性", "恢复", "适应"],
    completed: false
  },
  {
    id: "burnout_assessment",
    title: "职业倦怠评估",
    description: "评估工作中的疲惫感和倦怠程度，预防职业倦怠，维护工作热情。",
    icon: "🔋",
    category: "stress",
    duration: "3分钟",
    questions: 10,
    participants: 345,
    difficulty: "easy",
    tags: ["倦怠", "工作", "热情"],
    completed: false
  }
];

// 题目定义
const mbtiQuestionsList = [
  { id: 1, text: "在聚会中，你更倾向于：", options: [ { value: "E", text: "与很多人交谈，享受社交的乐趣" }, { value: "I", text: "与少数几个人深入交谈" } ] },
  { id: 2, text: "当解决问题时，你更依靠：", options: [ { value: "S", text: "已知的事实和经验" }, { value: "N", text: "直觉和可能性" } ] },
  { id: 3, text: "做决定时，你更看重：", options: [ { value: "T", text: "逻辑分析和客观标准" }, { value: "F", text: "个人价值观和他人感受" } ] },
  { id: 4, text: "你更喜欢：", options: [ { value: "J", text: "有计划、有条理的生活" }, { value: "P", text: "灵活、自发的生活方式" } ] },
  { id: 5, text: "在团队项目中，你通常：", options: [ { value: "E", text: "主动分享想法，推动讨论" }, { value: "I", text: "先思考再发言，提供深思熟虑的观点" } ] },
  { id: 6, text: "面对突发情况，你通常会：", options: [ { value: "J", text: "感到焦虑，希望尽快恢复计划" }, { value: "P", text: "觉得刺激，灵活应对新变化" } ] },
  { id: 7, text: "你在空闲时间的理想状态是：", options: [ { value: "E", text: "和朋友们一起出去玩乐" }, { value: "I", text: "独自在家看书或做自己喜欢的事" } ] },
  { id: 8, text: "你如何看待规则和制度：", options: [ { value: "J", text: "它们是必要的，应该被严格遵守" }, { value: "P", text: "它们只是指南，可以根据情况灵活变通" } ] },
  { id: 9, text: "在工作中，你更看重：", options: [ { value: "T", text: "效率和最终的成果" }, { value: "F", text: "团队的和谐及成员的感受" } ] },
  { id: 10, text: "你更喜欢怎样的学习方式：", options: [ { value: "S", text: "通过实践操作和具体例子来学习" }, { value: "N", text: "通过理解理论和探究概念来学习" } ] }
];

const sdsQuestionsList = [
  { id: 1, text: "我觉得闷闷不乐，情绪低沉", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 2, text: "我觉得一天之中早晨最好", options: [ { value: "4", text: "没有或很少时间" }, { value: "3", text: "小部分时间" }, { value: "2", text: "相当多时间" }, { value: "1", text: "绝大部分或全部时间" } ] },
  { id: 3, text: "我一阵阵哭出来或觉得想哭", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 4, text: "我晚上睡眠不好", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 5, text: "我吃得跟平常一样多", options: [ { value: "4", text: "没有或很少时间" }, { value: "3", text: "小部分时间" }, { value: "2", text: "相当多时间" }, { value: "1", text: "绝大部分或全部时间" } ] },
  { id: 6, text: "我与异性接触时和以往一样感到愉快", options: [ { value: "4", text: "没有或很少时间" }, { value: "3", text: "小部分时间" }, { value: "2", text: "相当多时间" }, { value: "1", text: "绝大部分或全部时间" } ] },
  { id: 7, text: "我发觉我的体重在下降", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 8, text: "我有便秘的苦恼", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 9, text: "我心跳比平时快", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 10, text: "我无缘无故地感到疲乏", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] }
];

const sasQuestionsList = [
  { id: 1, text: "我觉得比平常容易紧张和着急", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 2, text: "我无缘无故地感到害怕", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 3, text: "我容易心里烦乱或觉得惊恐", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 4, text: "我觉得我可能将要发疯", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 5, text: "我觉得一切都很好，也不会发生什么不幸", options: [ { value: "4", text: "没有或很少时间" }, { value: "3", text: "小部分时间" }, { value: "2", text: "相当多时间" }, { value: "1", text: "绝大部分或全部时间" } ] },
  { id: 6, text: "我手脚发抖打颤", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 7, text: "我因为头痛、颈痛和背痛而苦恼", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 8, text: "我感觉容易衰弱和疲乏", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] },
  { id: 9, text: "我感到平静，并且容易安静坐着", options: [ { value: "4", text: "没有或很少时间" }, { value: "3", text: "小部分时间" }, { value: "2", text: "相当多时间" }, { value: "1", text: "绝大部分或全部时间" } ] },
  { id: 10, text: "我觉得心跳得很快", options: [ { value: "1", text: "没有或很少时间" }, { value: "2", text: "小部分时间" }, { value: "3", text: "相当多时间" }, { value: "4", text: "绝大部分或全部时间" } ] }
];

const bigFiveQuestionsList = [
  { id: 1, text: "我经常会有新的想法", options: [{value:"1", text:"极不符合"}, {value:"2", text:"有点不符合"}, {value:"3", text:"有点符合"}, {value:"4", text:"极符合"}] },
  { id: 2, text: "我做事情总是很有条理", options: [{value:"1", text:"极不符合"}, {value:"2", text:"有点不符合"}, {value:"3", text:"有点符合"}, {value:"4", text:"极符合"}] },
  { id: 3, text: "在社交场合，我总是很健谈", options: [{value:"1", text:"极不符合"}, {value:"2", text:"有点不符合"}, {value:"3", text:"有点符合"}, {value:"4", text:"极符合"}] },
  { id: 4, text: "我会经常体谅别人的感受", options: [{value:"1", text:"极不符合"}, {value:"2", text:"有点不符合"}, {value:"3", text:"有点符合"}, {value:"4", text:"极符合"}] },
  { id: 5, text: "我容易感到焦虑或紧张", options: [{value:"1", text:"极不符合"}, {value:"2", text:"有点不符合"}, {value:"3", text:"有点符合"}, {value:"4", text:"极符合"}] },
  { id: 6, text: "我对艺术和美学有很深的兴趣", options: [{value:"1", text:"极不符合"}, {value:"2", text:"有点不符合"}, {value:"3", text:"有点符合"}, {value:"4", text:"极符合"}] },
  { id: 7, text: "我有时会把事情拖延到最后一刻", options: [{value:"4", text:"极不符合"}, {value:"3", text:"有点不符合"}, {value:"2", text:"有点符合"}, {value:"1", text:"极符合"}] },
  { id: 8, text: "我喜欢保持安静，不喜欢引人注目", options: [{value:"4", text:"极不符合"}, {value:"3", text:"有点不符合"}, {value:"2", text:"有点符合"}, {value:"1", text:"极符合"}] },
  { id: 9, text: "我有时会对别人表现出冷漠", options: [{value:"4", text:"极不符合"}, {value:"3", text:"有点不符合"}, {value:"2", text:"有点符合"}, {value:"1", text:"极符合"}] },
  { id: 10, text: "在面对压力时，我能保持情绪稳定", options: [{value:"4", text:"极不符合"}, {value:"3", text:"有点不符合"}, {value:"2", text:"有点符合"}, {value:"1", text:"极符合"}] }
];

const introvertExtrovertQuestionsList = [
  { id: 1, text: "周末休息时，你更倾向于：", options: [{value:"I", text:"一个人在家待着，看看书或剧"}, {value:"E", text:"和朋友出去聚会或者参加活动"}] },
  { id: 2, text: "在很多人开会的场合，你通常：", options: [{value:"I", text:"多半是听众，除非被点名"}, {value:"E", text:"积极发言，发表自己的观点"}] },
  { id: 3, text: "如果遇到让你心烦的事情，你首先会：", options: [{value:"I", text:"自己独自去消化"}, {value:"E", text:"找人倾诉"}] },
  { id: 4, text: "你觉得电话和短信，更喜欢哪种？", options: [{value:"I", text:"发文字消息，不那么有压迫感"}, {value:"E", text:"直接打电话，沟通更高效"}] },
  { id: 5, text: "刚到一个新环境，你的适应过程是：", options: [{value:"I", text:"默默观察一阵子再决定怎么做"}, {value:"E", text:"主动跟旁边的人搭话"}] },
  { id: 6, text: "你对认识新朋友的态度是：", options: [{value:"I", text:"挺费精力的事"}, {value:"E", text:"充满期待和兴趣"}] },
  { id: 7, text: "你觉得哪种工作环境更好：", options: [{value:"I", text:"有可以不受干扰的独立空间"}, {value:"E", text:"开放式办公，随时可以交流"}] },
  { id: 8, text: "经过一天的社交活动后，你感觉：", options: [{value:"I", text:"非常疲惫，需要独处来恢复"}, {value:"E", text:"充满能量，很兴奋"}] },
  { id: 9, text: "与人交流时，你更喜欢：", options: [{value:"I", text:"一对一的深入交流"}, {value:"E", text:"多人的热闹聊天"}] },
  { id: 10, text: "别人通常是如何评价你的：", options: [{value:"I", text:"安静、谨慎、神秘"}, {value:"E", text:"开朗、活泼、受欢迎"}] }
];

const enneagramQuestionsList = [
  { id: 1, text: "我对自己的要求非常严格：", options: [{value:"1", text:"完全符合"}, {value:"2", text:"部分符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 2, text: "我很在乎别人是否需要我：", options: [{value:"1", text:"完全符合"}, {value:"2", text:"部分符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 3, text: "只要能达成目标，我不介意改变策略：", options: [{value:"1", text:"完全符合"}, {value:"2", text:"部分符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 4, text: "我觉得自己是一个有些与众不同的人：", options: [{value:"1", text:"完全符合"}, {value:"2", text:"部分符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 5, text: "我喜欢深入钻研以理解事物的本质：", options: [{value:"1", text:"完全符合"}, {value:"2", text:"部分符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 6, text: "在做出决定前，我会考虑各种风险和不确定性：", options: [{value:"1", text:"完全符合"}, {value:"2", text:"部分符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 7, text: "我不喜欢被限制，总是寻找新的乐趣和体验：", options: [{value:"1", text:"完全符合"}, {value:"2", text:"部分符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 8, text: "我不害怕冲突，如果有必要我会直接表达愤怒：", options: [{value:"1", text:"完全符合"}, {value:"2", text:"部分符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 9, text: "我尽量避免冲突，希望能与大家和睦相处：", options: [{value:"1", text:"完全符合"}, {value:"2", text:"部分符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 10, text: "当面临压力时，我首先的想法是：", options: [{value:"action", text:"采取行动"}, {value:"think", text:"退后思考"}, {value:"feeling", text:"压抑情绪"}, {value:"peace", text:"设法妥协"}] }
];

const emotionalIntelligenceQuestionsList = [
  { id: 1, text: "我能清楚地知道自己当下正处于什么情绪中：", options: [{value:"1", text:"非常同意"}, {value:"2", text:"比较同意"}, {value:"3", text:"不太同意"}, {value:"4", text:"非常不同意"}] },
  { id: 2, text: "当朋友遇到困难时，我能很快察觉到他们的感受：", options: [{value:"1", text:"非常同意"}, {value:"2", text:"比较同意"}, {value:"3", text:"不太同意"}, {value:"4", text:"非常不同意"}] },
  { id: 3, text: "在极度愤怒的大多数时候，我能克制住不去冲动行事：", options: [{value:"1", text:"非常同意"}, {value:"2", text:"比较同意"}, {value:"3", text:"不太同意"}, {value:"4", text:"非常不同意"}] },
  { id: 4, text: "即使做着不喜欢的工作，我也能找到激励自己的理由：", options: [{value:"1", text:"非常同意"}, {value:"2", text:"比较同意"}, {value:"3", text:"不太同意"}, {value:"4", text:"非常不同意"}] },
  { id: 5, text: "我很容易在别人不开心时把对方逗笑：", options: [{value:"1", text:"非常同意"}, {value:"2", text:"比较同意"}, {value:"3", text:"不太同意"}, {value:"4", text:"非常不同意"}] },
  { id: 6, text: "我通常知道在什么场合该说什么样的话：", options: [{value:"1", text:"非常同意"}, {value:"2", text:"比较同意"}, {value:"3", text:"不太同意"}, {value:"4", text:"非常不同意"}] },
  { id: 7, text: "如果有人对我发脾气，我很容易就被激怒反击：", options: [{value:"4", text:"非常同意"}, {value:"3", text:"比较同意"}, {value:"2", text:"不太同意"}, {value:"1", text:"非常不同意"}] },
  { id: 8, text: "我常常回想今天发脾气的原因和过程，以反省自己：", options: [{value:"1", text:"非常同意"}, {value:"2", text:"比较同意"}, {value:"3", text:"不太同意"}, {value:"4", text:"非常不同意"}] },
  { id: 9, text: "面对棘手的冲突，我倾向于调解而不是直接对抗：", options: [{value:"1", text:"非常同意"}, {value:"2", text:"比较同意"}, {value:"3", text:"不太同意"}, {value:"4", text:"非常不同意"}] },
  { id: 10, text: "我能轻易察觉出一个隐瞒真实情绪的微笑：", options: [{value:"1", text:"非常同意"}, {value:"2", text:"比较同意"}, {value:"3", text:"不太同意"}, {value:"4", text:"非常不同意"}] }
];

const happinessIndexQuestionsList = [
  { id: 1, text: "我对目前的生活状态总体感到满意", options: [{value:"1", text:"强烈同意"}, {value:"2", text:"同意"}, {value:"3", text:"不同意"}, {value:"4", text:"强烈不同意"}] },
  { id: 2, text: "我感到目前自己能够掌控生活的大部分节奏", options: [{value:"1", text:"强烈同意"}, {value:"2", text:"同意"}, {value:"3", text:"不同意"}, {value:"4", text:"强烈不同意"}] },
  { id: 3, text: "我过去一周里开怀大笑的次数很多", options: [{value:"1", text:"强烈同意"}, {value:"2", text:"同意"}, {value:"3", text:"不同意"}, {value:"4", text:"强烈不同意"}] },
  { id: 4, text: "我觉得我的生活没有意义和目标", options: [{value:"4", text:"强烈同意"}, {value:"3", text:"同意"}, {value:"2", text:"不同意"}, {value:"1", text:"强烈不同意"}] },
  { id: 5, text: "我身边有可以依靠并给予我情感支持的人", options: [{value:"1", text:"强烈同意"}, {value:"2", text:"同意"}, {value:"3", text:"不同意"}, {value:"4", text:"强烈不同意"}] },
  { id: 6, text: "我对自己的未来充满希望", options: [{value:"1", text:"强烈同意"}, {value:"2", text:"同意"}, {value:"3", text:"不同意"}, {value:"4", text:"强烈不同意"}] },
  { id: 7, text: "我经常觉得充满活力，精力旺盛", options: [{value:"1", text:"强烈同意"}, {value:"2", text:"同意"}, {value:"3", text:"不同意"}, {value:"4", text:"强烈不同意"}] },
  { id: 8, text: "如果没有别人的肯定，我就觉得做的事情没价值", options: [{value:"4", text:"强烈同意"}, {value:"3", text:"同意"}, {value:"2", text:"不同意"}, {value:"1", text:"强烈不同意"}] },
  { id: 9, text: "过去发生的事情总是让我感到懊悔", options: [{value:"4", text:"强烈同意"}, {value:"3", text:"同意"}, {value:"2", text:"不同意"}, {value:"1", text:"强烈不同意"}] },
  { id: 10, text: "我能常常在生活的小事里发现美好", options: [{value:"1", text:"强烈同意"}, {value:"2", text:"同意"}, {value:"3", text:"不同意"}, {value:"4", text:"强烈不同意"}] }
];

const hollandCareerQuestionsList = [
  { id: 1, text: "我喜欢修理汽车或小家电", options: [{value:"R", text:"喜欢"}, {value:"0", text:"不喜欢"}] },
  { id: 2, text: "我喜欢解决复杂的数学或科学问题", options: [{value:"I", text:"喜欢"}, {value:"0", text:"不喜欢"}] },
  { id: 3, text: "我喜欢绘画、音乐或其他艺术创作", options: [{value:"A", text:"喜欢"}, {value:"0", text:"不喜欢"}] },
  { id: 4, text: "我喜欢帮助别人解决困难或提供咨询", options: [{value:"S", text:"喜欢"}, {value:"0", text:"不喜欢"}] },
  { id: 5, text: "我喜欢领导团队或发起一项事业", options: [{value:"E", text:"喜欢"}, {value:"0", text:"不喜欢"}] },
  { id: 6, text: "我喜欢整理文件、记录数据并保证它们分类清晰", options: [{value:"C", text:"喜欢"}, {value:"0", text:"不喜欢"}] },
  { id: 7, text: "操作精密的机器或技术设备让我感到舒适", options: [{value:"R", text:"喜欢"}, {value:"0", text:"不喜欢"}] },
  { id: 8, text: "在遇到陌生的现象时，我喜欢进行系统研究", options: [{value:"I", text:"喜欢"}, {value:"0", text:"不喜欢"}] },
  { id: 9, text: "表达个人情感和独特风格对我来说非常重要", options: [{value:"A", text:"喜欢"}, {value:"0", text:"不喜欢"}] },
  { id: 10, text: "我擅长说服别人接受我的商业或项目观点", options: [{value:"E", text:"喜欢"}, {value:"0", text:"不喜欢"}] }
];

const leadershipStyleQuestionsList = [
  { id: 1, text: "在做决策时，我通常：", options: [{value:"1", text:"自己直接拍板定案"}, {value:"2", text:"听取团队意见再决定"}, {value:"3", text:"让团队民主投票决定"}] },
  { id: 2, text: "如果团队成员没有按时完成任务，我会：", options: [{value:"1", text:"严厉批评并警告后果"}, {value:"2", text:"沟通原因并帮助其解决"}, {value:"3", text:"随他去，相信他能补救"}] },
  { id: 3, text: "面对团队目标，我更倾向于：", options: [{value:"1", text:"强调必须完成指标"}, {value:"2", text:"关注团队成长和士气"}, {value:"3", text:"激发创新，愿景大于当前指标"}] },
  { id: 4, text: "在分配任务时，我的做法是：", options: [{value:"1", text:"详尽地说明怎么做"}, {value:"2", text:"说明目标，提供支持指导"}, {value:"3", text:"只给大方向，完全放权"}] },
  { id: 5, text: "对于规则和流程，我的态度是：", options: [{value:"1", text:"不可打破的红线"}, {value:"2", text:"维护秩序，但可根据情况调整"}, {value:"3", text:"流程不重要，成果最重要"}] },
  { id: 6, text: "在表扬或奖励时，我通常：", options: [{value:"1", text:"强调谁做得最好并给予实质奖励"}, {value:"2", text:"表扬整个团队的协同努力"}, {value:"3", text:"少表扬，认为理所当然"}] },
  { id: 7, text: "出现危机局面时，我的反应：", options: [{value:"1", text:"立刻接手指挥所有细节"}, {value:"2", text:"组织核心成员一起商讨对策"}, {value:"3", text:"依赖下面有经验的人提出方案"}] },
  { id: 8, text: "我评价一个员工最重要的标准是：", options: [{value:"1", text:"服从性与执行力"}, {value:"2", text:"团队协作与态度"}, {value:"3", text:"独立思考与创造力"}] },
  { id: 9, text: "开会时，会议的气氛通常是：", options: [{value:"1", text:"紧凑、严肃、我主导"}, {value:"2", text:"开放、互动、大家交流"}, {value:"3", text:"随意、松散、发散讨论"}] },
  { id: 10, text: "我认为领导者的主要作用是：", options: [{value:"1", text:"发出指令并保证监督执行"}, {value:"2", text:"做服务者，扫清成员障碍"}, {value:"3", text:"作为精神领袖指导愿景"}] }
];

const workValuesQuestionsList = [
  { id: 1, text: "如果你有两份工作可选，你会：", options: [{value:"1", text:"选择高薪但压力很大的"}, {value:"2", text:"选择平薪但生活工作平衡的"}] },
  { id: 2, text: "哪种情况会让你更容易辞职：", options: [{value:"1", text:"看不到晋升空间"}, {value:"2", text:"人际关系极其恶劣"}] },
  { id: 3, text: "对于公司的管理制度，你更希望：", options: [{value:"1", text:"非常清晰、稳定、有边界"}, {value:"2", text:"极度自由、宽松、弹性"}] },
  { id: 4, text: "你期望你的工作内容：", options: [{value:"1", text:"每天都充满挑战和变化"}, {value:"2", text:"熟悉、有规律、不出错"}] },
  { id: 5, text: "在工作中，你最渴望得到的是：", options: [{value:"1", text:"独立完成项目的自主权"}, {value:"2", text:"团队配合带来的归属感"}] },
  { id: 6, text: "如果有机会，你在意成为：", options: [{value:"1", text:"某个领域的顶级专家"}, {value:"2", text:"掌控团队的管理者"}] },
  { id: 7, text: "你认为最重要的回报是：", options: [{value:"1", text:"实质的物质财富"}, {value:"2", text:"对社会产生正面影响的使命感"}] },
  { id: 8, text: "如果需要在节假日偶尔加班，你的态度是：", options: [{value:"1", text:"如果是为了成就感和奖金，非常乐意"}, {value:"2", text:"坚决抵制，时间神圣不可侵犯"}] },
  { id: 9, text: "你在工作中最害怕面临：", options: [{value:"1", text:"长期做枯燥缺乏意义的工作"}, {value:"2", text:"随时面临被裁员的不安全感"}] },
  { id: 10, text: "在选择新offer时，你会首先考虑公司的：", options: [{value:"1", text:"福利待遇和发展前景"}, {value:"2", text:"文化氛围和办公地点"}] }
];

const attachmentStyleQuestionsList = [
  { id: 1, text: "我不习惯与伴侣非常亲近", options: [{value:"1", text:"完全符合"}, {value:"2", text:"有点符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 2, text: "我常常担心伴侣不爱我或不想和我在一起", options: [{value:"1", text:"完全符合"}, {value:"2", text:"有点符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 3, text: "我发现我很容易去依赖伴侣", options: [{value:"4", text:"完全符合"}, {value:"3", text:"有点符合"}, {value:"2", text:"不太符合"}, {value:"1", text:"完全不符合"}] },
  { id: 4, text: "有时伴侣想要多亲近一点，我反而会退缩", options: [{value:"1", text:"完全符合"}, {value:"2", text:"有点符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 5, text: "我经常发现我投入感情比对方快得多并且深得多", options: [{value:"1", text:"完全符合"}, {value:"2", text:"有点符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 6, text: "当伴侣不在身边时，我感到很有安全感，并不担心", options: [{value:"4", text:"完全符合"}, {value:"3", text:"有点符合"}, {value:"2", text:"不太符合"}, {value:"1", text:"完全不符合"}] },
  { id: 7, text: "我不愿意向伴侣展现我脆弱和负面的一面", options: [{value:"1", text:"完全符合"}, {value:"2", text:"有点符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 8, text: "当伴侣向我要求更多承诺时，我感到非常有压力", options: [{value:"1", text:"完全符合"}, {value:"2", text:"有点符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 9, text: "我需要很多很多保证，来确认伴侣还在乎我", options: [{value:"1", text:"完全符合"}, {value:"2", text:"有点符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] },
  { id: 10, text: "我很少思考我们的关系会如何发展，顺其自然", options: [{value:"1", text:"完全符合"}, {value:"2", text:"有点符合"}, {value:"3", text:"不太符合"}, {value:"4", text:"完全不符合"}] }
];

const communicationStyleQuestionsList = [
  { id: 1, text: "当对某人不满意时，我通常会：", options: [{value:"1", text:"直接坦率地指出来"}, {value:"2", text:"暗示或者冷处理"}, {value:"3", text:"忍着不说，怕伤和气"}] },
  { id: 2, text: "在小组讨论中，我：", options: [{value:"1", text:"经常打断别人，急于表达自己"}, {value:"2", text:"安静倾听，很少发表意见"}, {value:"3", text:"能够平衡倾听并适时表达"}] },
  { id: 3, text: "当我的观点遭到反对时：", options: [{value:"1", text:"立刻强烈为自己辩护"}, {value:"2", text:"感到委屈但不再争辩"}, {value:"3", text:"认真听对方想法并寻找共识"}] },
  { id: 4, text: "沟通时，遇到复杂的事情我倾向于：", options: [{value:"1", text:"注重细节长篇大论"}, {value:"2", text:"极度简练直奔主题"}, {value:"3", text:"举生活中的例子说明"}] },
  { id: 5, text: "我觉得用肢体语言（手势/表情）：", options: [{value:"1", text:"非常丰富，很自然"}, {value:"2", text:"很少，我注重语言本身"}, {value:"3", text:"看人下菜碟"}] },
  { id: 6, text: "如果要拒绝别人的请求，我会：", options: [{value:"1", text:"干脆利落说不"}, {value:"2", text:"想一大堆借口委婉推脱"}, {value:"3", text:"勉强答应然后后悔"}] },
  { id: 7, text: "当你向上级汇报工作时：", options: [{value:"1", text:"只说结果不讲过程"}, {value:"2", text:"非常详细汇报经过"}, {value:"3", text:"结果、方案以及需要的支持全盘托出"}] },
  { id: 8, text: "聊天时遇到短暂的沉默，我：", options: [{value:"1", text:"感到非常尴尬，必须找话题"}, {value:"2", text:"觉得很正常，享受停顿"}, {value:"3", text:"立刻看手机掩饰"}] },
  { id: 9, text: "听到他人的遭遇不幸，我常常：", options: [{value:"1", text:"马上帮忙分析并给出解决建议"}, {value:"2", text:"表达同情、给予陪伴和安慰"}, {value:"3", text:"不知所措，不知道能说什么"}] },
  { id: 10, text: "我喜欢哪种沟通环境：", options: [{value:"1", text:"高效明快，有明确目的"}, {value:"2", text:"轻松随意，能产生情感链接"}, {value:"3", text:"正式逻辑严密，有邮件留底"}] }
];

const socialSkillsQuestionsList = [
  { id: 1, text: "在社交场合遇到不认识的人，我会感到焦虑", options: [{value:"1", text:"总是"}, {value:"2", text:"经常"}, {value:"3", text:"偶尔"}, {value:"4", text:"从不"}] },
  { id: 2, text: "我很容易听出别人话里的潜台词", options: [{value:"4", text:"总是"}, {value:"3", text:"经常"}, {value:"2", text:"偶尔"}, {value:"1", text:"从不"}] },
  { id: 3, text: "别人常说我是个好听众", options: [{value:"4", text:"总是"}, {value:"3", text:"经常"}, {value:"2", text:"偶尔"}, {value:"1", text:"从不"}] },
  { id: 4, text: "我不擅长主动开启一个话题", options: [{value:"1", text:"总是"}, {value:"2", text:"经常"}, {value:"3", text:"偶尔"}, {value:"4", text:"从不"}] },
  { id: 5, text: "我很难控制自己在他人面前的紧张情绪", options: [{value:"1", text:"总是"}, {value:"2", text:"经常"}, {value:"3", text:"偶尔"}, {value:"4", text:"从不"}] },
  { id: 6, text: "当朋友遇到挫折时，我能提供令其安慰的话语", options: [{value:"4", text:"总是"}, {value:"3", text:"经常"}, {value:"2", text:"偶尔"}, {value:"1", text:"从不"}] },
  { id: 7, text: "如果发生误会，我能很快主动去解开", options: [{value:"4", text:"总是"}, {value:"3", text:"经常"}, {value:"2", text:"偶尔"}, {value:"1", text:"从不"}] },
  { id: 8, text: "在群体中，我常觉得自己是个边缘人", options: [{value:"1", text:"总是"}, {value:"2", text:"经常"}, {value:"3", text:"偶尔"}, {value:"4", text:"从不"}] },
  { id: 9, text: "我懂得如何恰当地赞美他人", options: [{value:"4", text:"总是"}, {value:"3", text:"经常"}, {value:"2", text:"偶尔"}, {value:"1", text:"从不"}] },
  { id: 10, text: "我害怕提出要求会被别人拒绝", options: [{value:"1", text:"总是"}, {value:"2", text:"经常"}, {value:"3", text:"偶尔"}, {value:"4", text:"从不"}] }
];

const stressLevelQuestionsList = [
  { id: 1, text: "我感到情绪极其烦躁，容易为小事发火", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 2, text: "我感到无法应对生活中积累必须要做的事情", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 3, text: "我因为精神压力而感到头痛或肌肉紧绷", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 4, text: "我觉得自己随时都处于神经紧绷状态", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 5, text: "我的饮食习惯因为压力发生了改变（暴食或厌食）", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 6, text: "我非常容易忘事，注意力难以集中", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 7, text: "我入睡困难或者睡眠质量很差", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 8, text: "我感觉生活失去了乐趣，没有动力", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 9, text: "我觉得自己被很多期望压得喘不过气", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 10, text: "我渴望逃离现在的每一天", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] }
];

const copingStrategiesQuestionsList = [
  { id: 1, text: "当遇到重大挫折时，我通常会寻找问题原因并分析解决：", options: [{value:"1", text:"经常"}, {value:"2", text:"有时"}, {value:"3", text:"极少"}] },
  { id: 2, text: "我倾向于通过工作或娱乐来转移注意力：", options: [{value:"1", text:"经常"}, {value:"2", text:"有时"}, {value:"3", text:"极少"}] },
  { id: 3, text: "我会向身边的朋友、家人倾诉并获得安慰：", options: [{value:"1", text:"经常"}, {value:"2", text:"有时"}, {value:"3", text:"极少"}] },
  { id: 4, text: "我会通过运动或身体锻炼来释放压力：", options: [{value:"1", text:"经常"}, {value:"2", text:"有时"}, {value:"3", text:"极少"}] },
  { id: 5, text: "在巨大压力下，我会暴饮暴食或选择喝酒抽烟：", options: [{value:"1", text:"经常"}, {value:"2", text:"有时"}, {value:"3", text:"极少"}] },
  { id: 6, text: "我试图改变自己看待问题的角度，寻找积极的一面：", options: [{value:"1", text:"经常"}, {value:"2", text:"有时"}, {value:"3", text:"极少"}] },
  { id: 7, text: "我容易责怪自己，觉得都是自己的错：", options: [{value:"1", text:"经常"}, {value:"2", text:"有时"}, {value:"3", text:"极少"}] },
  { id: 8, text: "我会拖延不去处理它，逃避面对：", options: [{value:"1", text:"经常"}, {value:"2", text:"有时"}, {value:"3", text:"极少"}] },
  { id: 9, text: "我会祈祷或者通过冥想等精神信仰寻找平静：", options: [{value:"1", text:"经常"}, {value:"2", text:"有时"}, {value:"3", text:"极少"}] },
  { id: 10, text: "我会主动去寻求专业人士（医生/心理咨询师）的帮助：", options: [{value:"1", text:"经常"}, {value:"2", text:"有时"}, {value:"3", text:"极少"}] }
];

const resilienceTestQuestionsList = [
  { id: 1, text: "当我遭遇失败时，我也能比较快地重新振作起来", options: [{value:"4", text:"完全同意"}, {value:"3", text:"部分同意"}, {value:"2", text:"部分不同意"}, {value:"1", text:"完全不同意"}] },
  { id: 2, text: "在遇到极大困难时，我常常觉得自己无法熬过去", options: [{value:"1", text:"完全同意"}, {value:"2", text:"部分同意"}, {value:"3", text:"部分不同意"}, {value:"4", text:"完全不同意"}] },
  { id: 3, text: "我坚信通过自己的努力，总能找到走出困境的办法", options: [{value:"4", text:"完全同意"}, {value:"3", text:"部分同意"}, {value:"2", text:"部分不同意"}, {value:"1", text:"完全不同意"}] },
  { id: 4, text: "我对意外改变适应得很慢，总是充满抗拒", options: [{value:"1", text:"完全同意"}, {value:"2", text:"部分同意"}, {value:"3", text:"部分不同意"}, {value:"4", text:"完全不同意"}] },
  { id: 5, text: "过去的挫折让我变得更加强大和成熟", options: [{value:"4", text:"完全同意"}, {value:"3", text:"部分同意"}, {value:"2", text:"部分不同意"}, {value:"1", text:"完全不同意"}] },
  { id: 6, text: "我面对高压任务时，容易崩溃而不是被激发能力", options: [{value:"1", text:"完全同意"}, {value:"2", text:"部分同意"}, {value:"3", text:"部分不同意"}, {value:"4", text:"完全不同意"}] },
  { id: 7, text: "我相信生活有它的意义，即使在很糟糕的日子里", options: [{value:"4", text:"完全同意"}, {value:"3", text:"部分同意"}, {value:"2", text:"部分不同意"}, {value:"1", text:"完全不同意"}] },
  { id: 8, text: "当计划被打乱时，我能迅速调整心态并制定新计划", options: [{value:"4", text:"完全同意"}, {value:"3", text:"部分同意"}, {value:"2", text:"部分不同意"}, {value:"1", text:"完全不同意"}] },
  { id: 9, text: "发生不好的事情时，我常常反复在脑海里播放那些痛苦场景", options: [{value:"1", text:"完全同意"}, {value:"2", text:"部分同意"}, {value:"3", text:"部分不同意"}, {value:"4", text:"完全不同意"}] },
  { id: 10, text: "在危机时刻，我的头脑通常会更加冷静清晰", options: [{value:"4", text:"完全同意"}, {value:"3", text:"部分同意"}, {value:"2", text:"部分不同意"}, {value:"1", text:"完全不同意"}] }
];

const burnoutAssessmentQuestionsList = [
  { id: 1, text: "我觉得工作完全是在耗尽我的情感和精力", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 2, text: "每天早晨醒来想到要面对一天的工作，我就感到疲惫", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 3, text: "我现在对待某些工作对象/同事比以前冷漠得多", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 4, text: "我觉得我在这份工作中实际上没有产生积极帮助", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 5, text: "工作让我感到极度挫败", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 6, text: "在这份工作中我觉得自己正在逐渐失去同理心", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 7, text: "我觉得现在的许多任务只是在机械重复，毫无意义", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 8, text: "我已经好久没有在工作里体会到成就感了", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 9, text: "我担心这份工作会让我在情绪上完全麻木", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] },
  { id: 10, text: "下班后，我没有任何精力去做其它社交或自己爱好的事", options: [{value:"1", text:"从不"}, {value:"2", text:"偶尔"}, {value:"3", text:"经常"}, {value:"4", text:"总是"}] }
];

// 题目映射表
const questionMap:Record<string, typeof mbtiQuestionsList> = {
    "mbti": mbtiQuestionsList,
    "big_five": bigFiveQuestionsList,
    "introvert_extrovert": introvertExtrovertQuestionsList,
    "enneagram": enneagramQuestionsList,
    "depression_scale": sdsQuestionsList,
    "anxiety_test": sasQuestionsList,
    "emotional_intelligence": emotionalIntelligenceQuestionsList,
    "happiness_index": happinessIndexQuestionsList,
    "holland_career": hollandCareerQuestionsList,
    "leadership_style": leadershipStyleQuestionsList,
    "work_values": workValuesQuestionsList,
    "attachment_style": attachmentStyleQuestionsList,
    "communication_style": communicationStyleQuestionsList,
    "social_skills": socialSkillsQuestionsList,
    "stress_level": stressLevelQuestionsList,
    "coping_strategies": copingStrategiesQuestionsList,
    "resilience_test": resilienceTestQuestionsList,
    "burnout_assessment": burnoutAssessmentQuestionsList,
    "default": mbtiQuestionsList
};

// 获取题目的函数
export const getQuestions = (testId: string) => {
    return questionMap[testId] || questionMap["default"];
};

// 保持兼容性导出
export const mbtiQuestions = mbtiQuestionsList;


// 测试结果示例
export const mbtiResults = {
  "INTJ": {
    type: "INTJ",
    title: "建筑师",
    description: "具有想象力和战略性的思想家，一切皆在计划之中。",
    traits: ["独立", "创新", "战略思维", "完美主义"],
    strengths: ["长远规划", "创新思维", "独立工作", "追求效率"],
    challenges: ["过于理想化", "不善表达情感", "抗拒变化"],
    careers: ["科学家", "工程师", "建筑师", "分析师", "研究员"],
    famous: ["伊隆·马斯克", "史蒂夫·乔布斯", "牛顿"]
  }
  // ... 其他16种类型
};