import type {
  ApprovalRecord,
  ClubProfile,
  DemoState,
  SchoolBrand,
  StudentProfile
} from "../types";

export const CURRENT_STUDENT_ID = "student-self";
export const STORAGE_KEY = "club-recruitment-demo-v2";

export const schoolBrand: SchoolBrand = {
  schoolName: "某高校社团招新平台",
  schoolSubtitle: "Campus Club Recruitment",
  logoMode: "placeholder"
};

export const governanceEntries = [
  {
    title: "4 月 1 日 - 校级招新说明会",
    body: "统一向新生解释平台使用方式、报名节奏和注意事项。"
  },
  {
    title: "4 月 12 日 - 第一批社团报名截止",
    body: "建议学校关注热门社团的申请拥堵情况，并协调资源支持。"
  },
  {
    title: "4 月 18 日 - 面试集中周",
    body: "提醒各社团统一同步状态，避免学生多头等待。"
  },
  {
    title: "4 月 25 日 - 招新复盘",
    body: "输出报名量、录取率、热门标签和学院分布等校级数据。"
  }
] as const;

export const clubs: ClubProfile[] = [
  {
    id: "club-ai",
    name: "AI 创新社",
    category: "科技实践",
    slogan: "把灵感变成可运行的原型。",
    description: "面向对大模型、编程和产品实验感兴趣的同学，鼓励成员把创意快速做成可展示的作品。",
    tags: ["AI", "科技", "产品", "创业"],
    desiredSkills: ["编程", "数据分析", "内容写作"],
    timeSlots: ["周二晚上", "周四晚上", "周六白天", "周六晚上"],
    timeCommitment: "每周 4-6 小时",
    careerPaths: ["积累项目经历", "拓展职业方向", "参加比赛拿成果"],
    mbtiTraits: ["N", "P", "J"],
    keywords: ["产品", "原型", "AI", "大模型", "实践", "创新"],
    requirements: [
      "欢迎零基础，但需要愿意持续动手实践。",
      "每月参与至少一次 workshop 或项目冲刺。",
      "对技术产品或创新议题有持续好奇心。"
    ],
    highlights: [
      "学长学姐会带做 AI 原型和比赛项目。",
      "有公开 Demo Day，可以展示作品。",
      "和校内创业团队、实验室联动较多。"
    ],
    activities: [
      "Prompt Engineering 训练营",
      "校园痛点共创 Hack Night",
      "AI 产品 Demo Day"
    ],
    reviews: [
      { author: "24 届社长", text: "不是纯技术卷王社团，产品、运营、设计都能找到角色。" },
      { author: "23 届成员", text: "最有价值的是大家会真的把 idea 做出来，不停留在口头讨论。" }
    ],
    mediaLabel: "近三个月沉淀 12 个可演示作品",
    slots: 28,
    deadline: "2026-04-12",
    process: ["简历初筛", "一面", "二面", "录取"],
    customQuestions: [
      { id: "why-ai", label: "你最想用 AI 解决校园里的什么问题？", type: "textarea" },
      { id: "project-role", label: "如果做一个项目，你更想承担什么角色？", type: "radio", options: ["产品策划", "技术开发", "内容运营", "视觉设计"] },
      { id: "portfolio", label: "如果有作品链接或 GitHub，请填写（可选）", type: "text", optional: true }
    ]
  },
  {
    id: "club-guitar",
    name: "流行乐社",
    category: "艺术表演",
    slogan: "把宿舍的旋律，唱到舞台中央。",
    description: "聚集热爱吉他、乐队排练和校园演出的同学，适合想在大学里拥有稳定音乐社交圈的新生。",
    tags: ["音乐", "舞台表演", "社交活动"],
    desiredSkills: ["演奏", "舞台表演", "社交沟通"],
    timeSlots: ["周三晚上", "周五晚上", "周日晚上"],
    timeCommitment: "每周 3-5 小时",
    careerPaths: ["认识新朋友", "释放创意热情", "提升表达能力"],
    mbtiTraits: ["E", "F", "P"],
    keywords: ["音乐", "舞台", "演出", "乐队", "表达"],
    requirements: [
      "零基础可报名，分层训练。",
      "重要演出周需要增加排练时间。",
      "欢迎会乐器、会唱歌或会活动执行的同学。"
    ],
    highlights: [
      "每学期至少两次专场演出。",
      "内部有新手友好训练营。",
      "社团氛围轻松，适合快速交朋友。"
    ],
    activities: [
      "新生 open mic",
      "秋季草坪音乐会",
      "校园乐队联演"
    ],
    reviews: [
      { author: "24 届主唱", text: "从不敢上台到敢 solo，就是在这里练出来的。" },
      { author: "23 届鼓手", text: "每次大型活动都像一场热闹的同学聚会，归属感很强。" }
    ],
    mediaLabel: "保留近 40 场校园演出照片与视频",
    slots: 35,
    deadline: "2026-04-09",
    process: ["资料筛选", "体验排练", "录取"],
    customQuestions: [
      { id: "music-style", label: "你偏好的音乐风格是什么？", type: "text" },
      { id: "instrument", label: "你想尝试的角色", type: "radio", options: ["主唱", "吉他", "贝斯", "鼓手", "策划后勤"] },
      { id: "performance-exp", label: "是否有舞台经验？请简单介绍。", type: "textarea", optional: true }
    ]
  },
  {
    id: "club-photo",
    name: "光影摄影社",
    category: "内容创作",
    slogan: "用镜头记录大学里真正重要的瞬间。",
    description: "适合喜欢摄影、修图、短视频和校园内容创作的同学，既有创作训练，也有项目实践。",
    tags: ["摄影", "媒体", "设计", "写作"],
    desiredSkills: ["摄影修图", "视频剪辑", "内容写作"],
    timeSlots: ["周三晚上", "周六白天", "周日白天"],
    timeCommitment: "每周 2-4 小时",
    careerPaths: ["释放创意热情", "积累项目经历", "拓展职业方向"],
    mbtiTraits: ["I", "N", "F", "P"],
    keywords: ["镜头", "记录", "内容", "摄影", "视频", "创作"],
    requirements: [
      "欢迎手机摄影党，不强制专业设备。",
      "需要有持续输出和复盘意识。",
      "活动拍摄可能占用周末白天时间。"
    ],
    highlights: [
      "参与学校大型活动官方拍摄。",
      "有剪辑和修图工作坊。",
      "作品会进入社团年度线上展。"
    ],
    activities: [
      "夜景扫街拍摄",
      "校运会视觉报道",
      "毕业季人像企划"
    ],
    reviews: [
      { author: "24 届内容组长", text: "最喜欢的是这里对新手很耐心，但对作品标准又不敷衍。" },
      { author: "23 届成员", text: "很多校园记忆都是在社团任务里拍出来的，特别值。" }
    ],
    mediaLabel: "年度内容曝光量超过 50 万",
    slots: 22,
    deadline: "2026-04-15",
    process: ["简历筛选", "作品沟通", "录取"],
    customQuestions: [
      { id: "device", label: "你平时主要使用什么设备创作？", type: "radio", options: ["手机", "相机", "平板", "暂无设备"] },
      { id: "visual-theme", label: "你最想拍什么主题？", type: "text" },
      { id: "work-link", label: "如果有作品链接，请填写（可选）", type: "text", optional: true }
    ]
  },
  {
    id: "club-debate",
    name: "辩论队",
    category: "表达成长",
    slogan: "在高密度思考里建立表达锋芒。",
    description: "适合希望训练表达、逻辑和临场反应的同学，会组织校内赛、跨校友谊赛和辩题工作坊。",
    tags: ["辩论", "写作", "策划", "媒体"],
    desiredSkills: ["主持表达", "内容写作", "组织协调"],
    timeSlots: ["周二晚上", "周四晚上", "周日白天"],
    timeCommitment: "每周 4 小时",
    careerPaths: ["提升表达能力", "认识新朋友", "参加比赛拿成果"],
    mbtiTraits: ["E", "N", "J", "T"],
    keywords: ["表达", "逻辑", "辩论", "思考", "观点"],
    requirements: [
      "欢迎没有比赛经验的新生。",
      "需要接受高频讨论和赛后复盘。",
      "对公共议题、校园议题保持思考热情。"
    ],
    highlights: [
      "社团内部有系统化新生训练营。",
      "跨校交流机会多，成长反馈快。",
      "对求职面试和课堂表达帮助明显。"
    ],
    activities: [
      "新生辩题拆解课",
      "学院联赛",
      "跨校表演赛"
    ],
    reviews: [
      { author: "24 届队长", text: "最适合想突破自己表达边界的人，成长速度很快。" },
      { author: "23 届成员", text: "很多同学是从社恐慢慢变成了敢带队发言的人。" }
    ],
    mediaLabel: "近两年获得 8 项校级以上奖项",
    slots: 18,
    deadline: "2026-04-11",
    process: ["报名", "体验训练", "一面", "录取"],
    customQuestions: [
      { id: "topic", label: "最近让你最想表达观点的一件事是什么？", type: "textarea" },
      { id: "comfort-zone", label: "你更想提升哪一项能力？", type: "radio", options: ["逻辑结构", "临场表达", "写作准备", "团队协作"] }
    ]
  },
  {
    id: "club-volunteer",
    name: "星火志愿服务队",
    category: "公益实践",
    slogan: "把热心变成持续发生的行动。",
    description: "围绕支教、社区服务、校园公益活动开展长期项目，适合希望在大学里做真实服务实践的同学。",
    tags: ["公益", "志愿服务", "策划", "社交活动"],
    desiredSkills: ["组织协调", "社交沟通", "内容写作"],
    timeSlots: ["周六白天", "周六晚上", "周日白天"],
    timeCommitment: "每周 2-3 小时",
    careerPaths: ["认识新朋友", "积累项目经历", "释放创意热情"],
    mbtiTraits: ["F", "J", "E"],
    keywords: ["公益", "服务", "社区", "行动", "组织"],
    requirements: [
      "需要有稳定责任心和持续参与意愿。",
      "大型公益活动期会增加投入时间。",
      "欢迎愿意承担执行和沟通角色的同学。"
    ],
    highlights: [
      "有成熟的社区合作资源。",
      "项目沉淀完整，适合积累组织经验。",
      "新生成长路径清晰，从执行到负责人都有空间。"
    ],
    activities: [
      "社区陪伴行动",
      "校园公益集市",
      "周末儿童课堂"
    ],
    reviews: [
      { author: "24 届项目负责人", text: "这里最吸引我的是，你能明显感受到自己的投入在影响别人。" },
      { author: "23 届成员", text: "每次活动都很累，但结束后会很有成就感。" }
    ],
    mediaLabel: "累计服务时长 3200+ 小时",
    slots: 30,
    deadline: "2026-04-13",
    process: ["报名", "群面", "录取"],
    customQuestions: [
      { id: "cause", label: "你最关注哪类公益议题？", type: "text" },
      { id: "availability", label: "你每月能稳定参加几次活动？", type: "radio", options: ["1 次", "2 次", "3 次及以上"] }
    ]
  },
  {
    id: "club-dance",
    name: "街舞社",
    category: "艺术表演",
    slogan: "用身体表达个性，让舞台更有存在感。",
    description: "适合喜欢舞蹈、舞台表现和高能量团队氛围的同学，覆盖编舞、表演和活动策划。",
    tags: ["舞蹈", "舞台表演", "音乐", "设计"],
    desiredSkills: ["舞台表演", "组织协调", "视频剪辑"],
    timeSlots: ["周一晚上", "周四晚上", "周六晚上"],
    timeCommitment: "每周 4-6 小时",
    careerPaths: ["释放创意热情", "认识新朋友", "提升表达能力"],
    mbtiTraits: ["E", "P", "S"],
    keywords: ["舞蹈", "舞台", "表演", "活力", "编舞"],
    requirements: [
      "新手可参加基础班。",
      "重要演出周排练频率较高。",
      "欢迎舞者，也欢迎愿意做剪辑和运营的同学。"
    ],
    highlights: [
      "每学期有大型公演。",
      "训练氛围强，成员凝聚力高。",
      "可参与舞台视觉与宣发协作。"
    ],
    activities: [
      "基础舞种训练营",
      "迎新晚会舞台节目",
      "校园 flash mob"
    ],
    reviews: [
      { author: "24 届编舞组长", text: "只要愿意练，进步会非常明显，社团也很会给情绪价值。" },
      { author: "23 届成员", text: "从害怕跳错到享受舞台，整个过程特别有成就感。" }
    ],
    mediaLabel: "社媒短视频累计播放 120 万+",
    slots: 32,
    deadline: "2026-04-10",
    process: ["报名", "试训", "录取"],
    customQuestions: [
      { id: "dance-style", label: "你最想尝试哪种风格？", type: "radio", options: ["Hip-hop", "Jazz", "Locking", "Urban", "还不确定"] },
      { id: "motivation", label: "你加入街舞社最期待的改变是什么？", type: "textarea" }
    ]
  }
];

const studentProfiles: Record<string, StudentProfile> = {
  [CURRENT_STUDENT_ID]: {
    id: CURRENT_STUDENT_ID,
    name: "陈斯佳",
    gender: "女",
    major: "应用统计",
    studentNo: "2026001842",
    grade: "研一",
    mbti: "ENFP",
    goal: "积累项目经历",
    interests: ["音乐", "AI", "创业", "写作", "产品"],
    skills: ["内容写作", "活动策划", "编程"],
    availability: ["周二晚上", "周四晚上", "周六白天", "周六晚上"],
    intro: "我想在大学里做出真实作品，也希望认识有创造力、愿意把想法落地的人。"
  },
  "student-lu": {
    id: "student-lu",
    name: "卢嘉宁",
    gender: "男",
    major: "电子信息工程",
    studentNo: "2026000921",
    grade: "大一",
    mbti: "INTJ",
    goal: "拓展职业方向",
    interests: ["AI", "科技", "创业"],
    skills: ["编程", "数据分析"],
    availability: ["周二晚上", "周四晚上", "周日白天"],
    intro: "想接触更多技术项目，也想了解 AI 应用方向。"
  },
  "student-zhao": {
    id: "student-zhao",
    name: "赵以然",
    gender: "女",
    major: "新闻传播学",
    studentNo: "2026002276",
    grade: "大一",
    mbti: "INFP",
    goal: "释放创意热情",
    interests: ["摄影", "媒体", "写作"],
    skills: ["视频剪辑", "内容写作", "摄影修图"],
    availability: ["周三晚上", "周六白天", "周日白天"],
    intro: "喜欢用内容记录校园生活，希望作品被更多人看到。"
  },
  "student-he": {
    id: "student-he",
    name: "何知行",
    gender: "男",
    major: "法学",
    studentNo: "2026001458",
    grade: "大一",
    mbti: "ENTJ",
    goal: "提升表达能力",
    interests: ["辩论", "写作", "媒体"],
    skills: ["主持表达", "内容写作"],
    availability: ["周二晚上", "周四晚上", "周日白天"],
    intro: "想锻炼逻辑表达，也愿意参加有竞技感的活动。"
  },
  "student-song": {
    id: "student-song",
    name: "宋予安",
    gender: "女",
    major: "社会工作",
    studentNo: "2026003117",
    grade: "大一",
    mbti: "ESFJ",
    goal: "认识新朋友",
    interests: ["公益", "志愿服务", "策划"],
    skills: ["组织协调", "社交沟通"],
    availability: ["周六白天", "周六晚上", "周日白天"],
    intro: "想在大学做有意义的服务实践，也想认识靠谱的伙伴。"
  }
};

const approvals: ApprovalRecord[] = [
  {
    id: "approval-1",
    name: "校园播客联盟",
    sponsor: "传媒学院",
    focus: "播客制作、采访与声音表达",
    submittedAt: "2026-03-24",
    status: "待审核"
  },
  {
    id: "approval-2",
    name: "绿色校园行动组",
    sponsor: "环境学院",
    focus: "环保倡议与校园可持续项目",
    submittedAt: "2026-03-25",
    status: "待审核"
  },
  {
    id: "approval-3",
    name: "青年戏剧工坊",
    sponsor: "艺术学院",
    focus: "戏剧排演与公共表达训练",
    submittedAt: "2026-03-18",
    status: "已通过"
  }
];

export function createInitialState(): DemoState {
  const clubConfigs = Object.fromEntries(
    clubs.map((club) => [
      club.id,
      {
        deadline: club.deadline,
        slots: club.slots,
        process: [...club.process],
        questions: club.customQuestions.map((question) => ({
          ...question,
          options: question.options ? [...question.options] : undefined
        }))
      }
    ])
  );

  return {
    selectedClubId: "club-ai",
    activeClubId: "club-ai",
    studentProfiles: {
      ...studentProfiles
    },
    applications: [
      {
        id: "app-self-photo",
        studentId: CURRENT_STUDENT_ID,
        clubId: "club-photo",
        status: "一面",
        submittedAt: "2026-03-22",
        updatedAt: "2026-03-27",
        note: "作品沟通安排在本周六下午。",
        matchScore: 82,
        answers: {
          device: "手机",
          "visual-theme": "我最想拍校园里那些容易被忽略的夜晚和情绪。",
          "work-link": ""
        }
      },
      {
        id: "app-ai-1",
        studentId: "student-lu",
        clubId: "club-ai",
        status: "二面",
        submittedAt: "2026-03-20",
        updatedAt: "2026-03-26",
        note: "技术表达清晰，建议进入终面。",
        matchScore: 94,
        answers: {
          "why-ai": "我想做一个能帮助新生找信息的 AI 校园助手。",
          "project-role": "技术开发",
          portfolio: "https://github.com/demo"
        }
      },
      {
        id: "app-ai-2",
        studentId: "student-he",
        clubId: "club-ai",
        status: "审核中",
        submittedAt: "2026-03-24",
        updatedAt: "2026-03-24",
        note: "对产品表达强，但项目经历较少。",
        matchScore: 79,
        answers: {
          "why-ai": "我想尝试用 AI 做校园信息聚合和问答。",
          "project-role": "产品策划",
          portfolio: ""
        }
      },
      {
        id: "app-guitar-1",
        studentId: "student-song",
        clubId: "club-guitar",
        status: "已提交",
        submittedAt: "2026-03-25",
        updatedAt: "2026-03-25",
        note: "暂无",
        matchScore: 74,
        answers: {
          "music-style": "民谣和流行",
          instrument: "主唱",
          "performance-exp": "高中参加过一次校园歌手大赛。"
        }
      },
      {
        id: "app-photo-1",
        studentId: "student-zhao",
        clubId: "club-photo",
        status: "已录取",
        submittedAt: "2026-03-19",
        updatedAt: "2026-03-28",
        note: "作品风格成熟，适合内容组。",
        matchScore: 91,
        answers: {
          device: "相机",
          "visual-theme": "我想拍人物故事和校园空间感。",
          "work-link": "https://portfolio.example.com/zhao"
        }
      },
      {
        id: "app-debate-1",
        studentId: "student-he",
        clubId: "club-debate",
        status: "一面",
        submittedAt: "2026-03-21",
        updatedAt: "2026-03-27",
        note: "观点表达好，继续观察临场发挥。",
        matchScore: 90,
        answers: {
          topic: "我最想表达的是 AI 时代大学教育的变化。",
          "comfort-zone": "临场表达"
        }
      },
      {
        id: "app-volunteer-1",
        studentId: "student-song",
        clubId: "club-volunteer",
        status: "审核中",
        submittedAt: "2026-03-23",
        updatedAt: "2026-03-26",
        note: "志愿经历匹配度高。",
        matchScore: 88,
        answers: {
          cause: "社区陪伴和儿童教育",
          availability: "2 次"
        }
      },
      {
        id: "app-dance-1",
        studentId: "student-zhao",
        clubId: "club-dance",
        status: "婉拒",
        submittedAt: "2026-03-20",
        updatedAt: "2026-03-28",
        note: "时间冲突较大，建议下学期再报名。",
        matchScore: 68,
        answers: {
          "dance-style": "Jazz",
          motivation: "想让自己更自信，也想在舞台上表达。"
        }
      }
    ],
    notifications: [
      {
        id: "note-1",
        studentId: CURRENT_STUDENT_ID,
        type: "系统提醒",
        title: "欢迎来到社团招新智能匹配平台",
        body: "完善画像后，你会获得第一批带解释的社团推荐。",
        date: "2026-03-28 09:00"
      },
      {
        id: "note-2",
        studentId: CURRENT_STUDENT_ID,
        type: "面试提醒",
        title: "光影摄影社已安排一面沟通",
        body: "请于 3 月 30 日 14:00 前确认到场，地点：艺术楼 204。",
        date: "2026-03-27 19:20"
      }
    ],
    clubConfigs,
    approvals
  };
}
