import { clubs } from "../data/mockData";
import type { ClubProfile, MatchResult, RankedClub, StudentProfile } from "../types";

export function findClub(clubId: string): ClubProfile {
  return clubs.find((club) => club.id === clubId) ?? clubs[0];
}

export function getRankedClubs(student: StudentProfile): RankedClub[] {
  return clubs
    .map((club) => ({
      ...club,
      match: computeMatchScore(student, club)
    }))
    .sort((left, right) => right.match.score - left.match.score);
}

export function computeMatchScore(student: StudentProfile, club: ClubProfile): MatchResult {
  const intro = student.intro ?? "";
  const interestHits = club.tags.filter((tag) => student.interests.some((interest) => interest === tag));
  const skillHits = club.desiredSkills.filter((skill) => student.skills.some((studentSkill) => studentSkill === skill));
  const availabilityOverlap = club.timeSlots.filter((slot) => student.availability.includes(slot));
  const goalHit = club.careerPaths.includes(student.goal);
  const mbtiHit = club.mbtiTraits.some((trait) => student.mbti.includes(trait));
  const introHits = club.keywords.filter((keyword) => intro.includes(keyword));

  let score = 42;
  score += Math.min(interestHits.length * 10, 30);
  score += Math.min(skillHits.length * 6, 18);
  score += availabilityOverlap.length ? Math.min(availabilityOverlap.length * 5, 20) : 2;
  score += goalHit ? 8 : 0;
  score += mbtiHit ? 6 : 0;
  score += Math.min(introHits.length * 2, 6);
  score = Math.max(50, Math.min(98, score));

  const shortReasons: string[] = [];
  const longReasons: string[] = [];

  if (interestHits.length) {
    shortReasons.push(`${interestHits.slice(0, 2).join(" / ")} 高重合`);
    longReasons.push(`你的兴趣标签与社团核心标签 ${interestHits.join("、")} 存在明显重合。`);
  }

  if (skillHits.length) {
    shortReasons.push("已有技能可直接上手");
    longReasons.push(`你已经具备 ${skillHits.join("、")} 等能力，上手成本较低。`);
  }

  if (availabilityOverlap.length) {
    shortReasons.push(`时间重合 ${availabilityOverlap.length} 个时段`);
    longReasons.push(`你的空闲时间与社团活跃时间重合于 ${availabilityOverlap.join("、")}，参与稳定性更高。`);
  }

  if (goalHit) {
    shortReasons.push("成长目标一致");
    longReasons.push(`你希望通过社团获得“${student.goal}”，而这正是该社团的主要价值之一。`);
  }

  if (mbtiHit) {
    shortReasons.push("协作风格契合");
    longReasons.push("你的 MBTI 风格与社团偏好的协作方式较为契合。");
  }

  if (introHits.length) {
    longReasons.push(`你的自我介绍中出现了 ${introHits.join("、")} 等关键词，与社团方向形成语义呼应。`);
  }

  if (!shortReasons.length) {
    shortReasons.push("基础画像相关");
    longReasons.push("即便你尚未完善全部画像，该社团仍和你的部分兴趣方向存在连接。");
  }

  return {
    score,
    reasons: shortReasons.slice(0, 3),
    longReasons: longReasons.slice(0, 4),
    explanation: shortReasons.slice(0, 3).join("，")
  };
}
