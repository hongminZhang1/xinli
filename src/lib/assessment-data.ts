// 评估分类
export const assessmentCategories = [
  {
    id: "personality",
    name: "人格分析",
    icon: "🧠",
    description: "深入了解你的性格特质和行为模式"
  },
  {
    id: "emotion",
    name: "情绪健康",
    icon: "💝",
    description: "评估你的情绪状态和心理健康水平"
  },
  {
    id: "career",
    name: "职业倾向",
    icon: "🎯",
    description: "发现你的职业兴趣和能力倾向"
  },
  {
    id: "social",
    name: "人际交往",
    icon: "🤝",
    description: "了解你的社交风格和人际关系模式"
  },
  {
    id: "stress",
    name: "压力评估",
    icon: "⚡",
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
    icon: "🔮",
    category: "personality",
    duration: "3分钟",
    questions: 5,
    participants: 342,
    difficulty: "medium",
    tags: ["性格", "职场", "人际关系"],
    completed: false
  },
  {
    id: "big_five",
    title: "大五人格测试",
    description: "科学权威的人格测试，从开放性、责任心、外向性、亲和性、神经质五个维度全面分析你的性格。",
    icon: "⭐",
    category: "personality",
    duration: "4分钟",
    questions: 5,
    participants: 215,
    difficulty: "easy",
    tags: ["科学", "权威", "全面"],
    completed: true
  },
  {
    id: "introvert_extrovert",
    title: "内外向指数评估",
    description: "深入了解你的社交能量来源，是从独处中获得能量还是从与他人互动中充电。",
    icon: "🌓",
    category: "personality",
    duration: "3分钟",
    questions: 5,
    participants: 456,
    difficulty: "easy",
    tags: ["内向", "外向", "社交"],
    completed: false
  },
  {
    id: "enneagram",
    title: "九型人格测试",
    description: "古老而深刻的人格分析系统，帮你发现内在动机、恐惧和欲望，找到成长的方向。",
    icon: "🎭",
    category: "personality",
    duration: "5分钟",
    questions: 5,
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
    icon: "🌧️",
    category: "emotion",
    duration: "3分钟",
    questions: 5,
    participants: 892,
    difficulty: "easy",
    tags: ["情绪", "健康", "自测"],
    completed: false
  },
  {
    id: "anxiety_test",
    title: "焦虑程度测试",
    description: "评估你的焦虑水平，了解焦虑对日常生活的影响程度，学会更好地管理焦虑情绪。",
    icon: "😰",
    category: "emotion",
    duration: "3分钟",
    questions: 5,
    participants: 675,
    difficulty: "easy",
    tags: ["焦虑", "管理", "缓解"],
    completed: false
  },
  {
    id: "emotional_intelligence",
    title: "情商测试",
    description: "测试你的情绪智力，包括自我觉察、情绪管理、社会觉察和人际关系管理四个方面。",
    icon: "💡",
    category: "emotion",
    duration: "4分钟",
    questions: 5,
    participants: 432,
    difficulty: "medium",
    tags: ["情商", "智力", "管理"],
    completed: false
  },
  {
    id: "happiness_index",
    title: "幸福感指数",
    description: "评估你的生活满意度和主观幸福感，发现提升生活质量的关键因素。",
    icon: "😊",
    category: "emotion",
    duration: "3分钟",
    questions: 5,
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
    icon: "💼",
    category: "career",
    duration: "4分钟",
    questions: 5,
    participants: 321,
    difficulty: "medium",
    tags: ["职业", "兴趣", "规划"],
    completed: false
  },
  {
    id: "leadership_style",
    title: "领导风格测试",
    description: "了解你的领导特质和管理风格，发现你在团队中的角色定位和影响力模式。",
    icon: "👑",
    category: "career",
    duration: "3分钟",
    questions: 5,
    participants: 145,
    difficulty: "medium",
    tags: ["领导力", "管理", "团队"],
    completed: false
  },
  {
    id: "work_values",
    title: "职业价值观测试",
    description: "探索你在工作中最看重的价值，帮助你选择与内心价值观一致的职业道路。",
    icon: "💎",
    category: "career",
    duration: "3分钟",
    questions: 5,
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
    icon: "💕",
    category: "social",
    duration: "3分钟",
    questions: 5,
    participants: 421,
    difficulty: "medium",
    tags: ["依恋", "关系", "沟通"],
    completed: false
  },
  {
    id: "communication_style",
    title: "沟通风格测试",
    description: "发现你的沟通偏好和表达方式，提升人际交往的有效性和和谐度。",
    icon: "💬",
    category: "social",
    duration: "3分钟",
    questions: 5,
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
    questions: 5,
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
    icon: "⚖️",
    category: "stress",
    duration: "3分钟",
    questions: 5,
    participants: 789,
    difficulty: "easy",
    tags: ["压力", "状况", "影响"],
    completed: false
  },
  {
    id: "coping_strategies",
    title: "压力应对方式",
    description: "了解你处理压力的策略和模式，学会更健康有效的压力管理方法。",
    icon: "🛡️",
    category: "stress",
    duration: "4分钟",
    questions: 5,
    participants: 267,
    difficulty: "medium",
    tags: ["应对", "策略", "管理"],
    completed: true
  },
  {
    id: "resilience_test",
    title: "心理韧性测试",
    description: "测试你面对挫折和困难时的恢复能力，提升心理抗压和适应能力。",
    icon: "🌱",
    category: "stress",
    duration: "4分钟",
    questions: 5,
    participants: 156,
    difficulty: "medium",
    tags: ["韧性", "恢复", "适应"],
    completed: false
  },
  {
    id: "burnout_assessment",
    title: "职业倦怠评估",
    description: "评估工作中的疲惫感和倦怠程度，预防职业倦怠，维护工作热情。",
    icon: "🔥",
    category: "stress",
    duration: "3分钟",
    questions: 5,
    participants: 345,
    difficulty: "easy",
    tags: ["倦怠", "工作", "热情"],
    completed: false
  }
];

// 题目定义
const mbtiQuestionsList = [
  {
    id: 1,
    text: "在聚会中，你更倾向于：",
    options: [
      { value: "E", text: "与很多人交谈，享受社交的乐趣" },
      { value: "I", text: "与少数几个人深入交谈" }
    ]
  },
  {
    id: 2,
    text: "当解决问题时，你更依靠：",
    options: [
      { value: "S", text: "已知的事实和经验" },
      { value: "N", text: "直觉和可能性" }
    ]
  },
  {
    id: 3,
    text: "做决定时，你更看重：",
    options: [
      { value: "T", text: "逻辑分析和客观标准" },
      { value: "F", text: "个人价值观和他人感受" }
    ]
  },
  {
    id: 4,
    text: "你更喜欢：",
    options: [
      { value: "J", text: "有计划、有条理的生活" },
      { value: "P", text: "灵活、自发的生活方式" }
    ]
  },
  {
    id: 5,
    text: "在团队项目中，你通常：",
    options: [
      { value: "E", text: "主动分享想法，推动讨论" },
      { value: "I", text: "先思考再发言，提供深思熟虑的观点" }
    ]
  }
];

const sdsQuestionsList = [
  {
    id: 1,
    text: "我觉得闷闷不乐，情绪低沉",
    options: [
      { value: "1", text: "没有或很少时间" },
      { value: "2", text: "小部分时间" },
      { value: "3", text: "相当多时间" },
      { value: "4", text: "绝大部分或全部时间" }
    ]
  },
  {
    id: 2,
    text: "我觉得一天之中早晨最好",
    options: [
      { value: "4", text: "没有或很少时间" },
      { value: "3", text: "小部分时间" },
      { value: "2", text: "相当多时间" },
      { value: "1", text: "绝大部分或全部时间" }
    ]
  },
  {
    id: 3,
    text: "我一阵阵哭出来或觉得想哭",
    options: [
      { value: "1", text: "没有或很少时间" },
      { value: "2", text: "小部分时间" },
      { value: "3", text: "相当多时间" },
      { value: "4", text: "绝大部分或全部时间" }
    ]
  },
  {
    id: 4,
    text: "我晚上睡眠不好",
    options: [
      { value: "1", text: "没有或很少时间" },
      { value: "2", text: "小部分时间" },
      { value: "3", text: "相当多时间" },
      { value: "4", text: "绝大部分或全部时间" }
    ]
  },
  {
    id: 5,
    text: "我吃得跟平常一样多",
    options: [
      { value: "4", text: "没有或很少时间" },
      { value: "3", text: "小部分时间" },
      { value: "2", text: "相当多时间" },
      { value: "1", text: "绝大部分或全部时间" }
    ]
  }
];

const sasQuestionsList = [
    {
      id: 1,
      text: "我觉得比平常容易紧张和着急",
      options: [
        { value: "1", text: "没有或很少时间" },
        { value: "2", text: "小部分时间" },
        { value: "3", text: "相当多时间" },
        { value: "4", text: "绝大部分或全部时间" }
      ]
    },
    {
      id: 2,
      text: "我无缘无故地感到害怕",
      options: [
        { value: "1", text: "没有或很少时间" },
        { value: "2", text: "小部分时间" },
        { value: "3", text: "相当多时间" },
        { value: "4", text: "绝大部分或全部时间" }
      ]
    },
    {
      id: 3,
      text: "我容易心里烦乱或觉得惊恐",
      options: [
        { value: "1", text: "没有或很少时间" },
        { value: "2", text: "小部分时间" },
        { value: "3", text: "相当多时间" },
        { value: "4", text: "绝大部分或全部时间" }
      ]
    },
    {
      id: 4,
      text: "我觉得我可能将要发疯",
      options: [
        { value: "1", text: "没有或很少时间" },
        { value: "2", text: "小部分时间" },
        { value: "3", text: "相当多时间" },
        { value: "4", text: "绝大部分或全部时间" }
      ]
    },
    {
      id: 5,
      text: "我觉得一切都很好，也不会发生什么不幸",
      options: [
        { value: "4", text: "没有或很少时间" },
        { value: "3", text: "小部分时间" },
        { value: "2", text: "相当多时间" },
        { value: "1", text: "绝大部分或全部时间" }
      ]
    }
];

// 题目映射表
const questionMap:Record<string, typeof mbtiQuestionsList> = {
    "mbti": mbtiQuestionsList,
    "depression_scale": sdsQuestionsList,
    "anxiety_test": sasQuestionsList,
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