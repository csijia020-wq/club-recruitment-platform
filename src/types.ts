export const PORTAL_IDS = ["student", "club", "admin"] as const;
export type PortalId = (typeof PORTAL_IDS)[number];

export const STATUS_FLOW = ["已提交", "审核中", "一面", "二面", "已录取", "婉拒"] as const;
export type ApplicationStatus = (typeof STATUS_FLOW)[number];

export const APPROVAL_STATUSES = ["待审核", "已通过", "已驳回"] as const;
export type ApprovalStatus = (typeof APPROVAL_STATUSES)[number];

export const MBTI_OPTIONS = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP"
] as const;

export const GOAL_OPTIONS = [
  "认识新朋友",
  "提升表达能力",
  "积累项目经历",
  "释放创意热情",
  "拓展职业方向",
  "参加比赛拿成果"
] as const;

export const INTEREST_OPTIONS = [
  "音乐", "舞蹈", "摄影", "公益", "科技", "AI", "辩论", "创业",
  "策划", "写作", "运动", "媒体", "设计", "志愿服务", "舞台表演", "产品", "社交活动"
] as const;

export const SKILL_OPTIONS = [
  "编程", "视频剪辑", "内容写作", "活动策划", "主持表达", "组织协调",
  "海报设计", "摄影修图", "社交沟通", "数据分析", "演奏", "舞台表演"
] as const;

export const AVAILABILITY_SLOTS = [
  "周一白天", "周一晚上",
  "周二白天", "周二晚上",
  "周三白天", "周三晚上",
  "周四白天", "周四晚上",
  "周五白天", "周五晚上",
  "周六白天", "周六晚上",
  "周日白天", "周日晚上"
] as const;

export type AvailabilitySlot = (typeof AVAILABILITY_SLOTS)[number];
export type GoalOption = (typeof GOAL_OPTIONS)[number];
export type InterestOption = (typeof INTEREST_OPTIONS)[number];
export type SkillOption = (typeof SKILL_OPTIONS)[number];

export type RecruitmentQuestionType = "text" | "textarea" | "radio";

export interface RecruitmentQuestion {
  id: string;
  label: string;
  type: RecruitmentQuestionType;
  options?: string[];
  optional?: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  gender: string;
  major: string;
  studentNo: string;
  grade: string;
  mbti: string;
  goal: GoalOption;
  interests: InterestOption[];
  skills: SkillOption[];
  availability: AvailabilitySlot[];
  intro: string;
}

export interface ClubProfile {
  id: string;
  name: string;
  category: string;
  slogan: string;
  description: string;
  tags: string[];
  desiredSkills: string[];
  timeSlots: AvailabilitySlot[];
  timeCommitment: string;
  careerPaths: GoalOption[];
  mbtiTraits: string[];
  keywords: string[];
  requirements: string[];
  highlights: string[];
  activities: string[];
  reviews: { author: string; text: string }[];
  mediaLabel: string;
  slots: number;
  deadline: string;
  process: string[];
  customQuestions: RecruitmentQuestion[];
}

export interface ClubConfig {
  deadline: string;
  slots: number;
  process: string[];
  questions: RecruitmentQuestion[];
}

export interface ApplicationRecord {
  id: string;
  studentId: string;
  clubId: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  note: string;
  matchScore: number;
  answers: Record<string, string>;
}

export interface NotificationMessage {
  id: string;
  studentId: string;
  type: string;
  title: string;
  body: string;
  date: string;
}

export interface ApprovalRecord {
  id: string;
  name: string;
  sponsor: string;
  focus: string;
  submittedAt: string;
  status: ApprovalStatus;
}

export interface MatchResult {
  score: number;
  reasons: string[];
  longReasons: string[];
  explanation: string;
}

export interface RankedClub extends ClubProfile {
  match: MatchResult;
}

export interface DemoState {
  selectedClubId: string;
  activeClubId: string;
  studentProfiles: Record<string, StudentProfile>;
  applications: ApplicationRecord[];
  notifications: NotificationMessage[];
  clubConfigs: Record<string, ClubConfig>;
  approvals: ApprovalRecord[];
}

export interface SchoolBrand {
  schoolName: string;
  schoolSubtitle: string;
  logoMode: "placeholder" | "image";
  logoSrc?: string;
}
