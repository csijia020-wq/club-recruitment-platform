import { useEffect, useState } from "react";
import {
  AVAILABILITY_SLOTS,
  GOAL_OPTIONS,
  INTEREST_OPTIONS,
  MBTI_OPTIONS,
  SKILL_OPTIONS,
  type AvailabilitySlot,
  type GoalOption,
  type InterestOption,
  type SkillOption,
  type StudentProfile
} from "../types";

interface StudentProfileFormProps {
  profile: StudentProfile;
  onSubmit: (profile: StudentProfile) => void;
}

export function StudentProfileForm({ profile, onSubmit }: StudentProfileFormProps) {
  const [formState, setFormState] = useState<StudentProfile>(profile);

  useEffect(() => {
    setFormState(profile);
  }, [profile]);

  function toggleInterest(value: InterestOption) {
    setFormState((prev) => ({
      ...prev,
      interests: toggleValue(prev.interests, value)
    }));
  }

  function toggleSkill(value: SkillOption) {
    setFormState((prev) => ({
      ...prev,
      skills: toggleValue(prev.skills, value)
    }));
  }

  function toggleAvailability(value: AvailabilitySlot) {
    setFormState((prev) => ({
      ...prev,
      availability: toggleValue(prev.availability, value)
    }));
  }

  return (
    <form
      className="form-stack"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(formState);
      }}
    >
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Basic Profile</p>
            <h3>个人基础信息</h3>
          </div>
          <p className="section-note">这些字段优先服务身份识别与报名复用。</p>
        </div>
        <div className="form-grid two-columns">
          <label>
            <span>姓名</span>
            <input
              type="text"
              value={formState.name}
              maxLength={20}
              onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
          </label>
          <label>
            <span>专业</span>
            <input
              type="text"
              value={formState.major}
              maxLength={30}
              onChange={(event) => setFormState((prev) => ({ ...prev, major: event.target.value }))}
              required
            />
          </label>
          <label>
            <span>学号</span>
            <input
              type="text"
              value={formState.studentNo}
              maxLength={20}
              onChange={(event) => setFormState((prev) => ({ ...prev, studentNo: event.target.value }))}
              required
            />
          </label>
          <label>
            <span>年级</span>
            <select
              value={formState.grade}
              onChange={(event) => setFormState((prev) => ({ ...prev, grade: event.target.value }))}
            >
              <option value="大一">大一</option>
              <option value="大二">大二</option>
              <option value="大三">大三</option>
              <option value="大四">大四</option>
              <option value="研一">研一</option>
              <option value="研二">研二</option>
              <option value="研三">研三</option>
            </select>
          </label>
          <label className="span-2">
            <span>MBTI</span>
            <select
              value={formState.mbti}
              onChange={(event) => setFormState((prev) => ({ ...prev, mbti: event.target.value }))}
            >
              {MBTI_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Matching Preference</p>
            <h3>匹配偏好</h3>
          </div>
          <p className="section-note">这些字段用于计算推荐和生成“为什么推荐你”。</p>
        </div>

        <div className="form-grid two-columns">
          <label className="span-2">
            <span>希望通过社团获得什么</span>
            <select
              value={formState.goal}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, goal: event.target.value as GoalOption }))
              }
            >
              {GOAL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <fieldset className="option-fieldset">
          <legend>兴趣标签</legend>
          <div className="option-grid">
            {INTEREST_OPTIONS.map((option) => (
              <button
                type="button"
                key={option}
                className={`option-pill ${formState.interests.includes(option) ? "is-selected" : ""}`}
                onClick={() => toggleInterest(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="option-fieldset">
          <legend>已有技能</legend>
          <div className="option-grid">
            {SKILL_OPTIONS.map((option) => (
              <button
                type="button"
                key={option}
                className={`option-pill ${formState.skills.includes(option) ? "is-selected" : ""}`}
                onClick={() => toggleSkill(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="option-fieldset">
          <legend>可投入时间</legend>
          <div className="option-grid detailed-grid">
            {AVAILABILITY_SLOTS.map((option) => (
              <button
                type="button"
                key={option}
                className={`option-pill ${formState.availability.includes(option) ? "is-selected" : ""}`}
                onClick={() => toggleAvailability(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        <label>
          <span>一句话自我介绍</span>
          <textarea
            rows={4}
            maxLength={220}
            value={formState.intro}
            placeholder="例如：我喜欢把创意变成真实活动，也想认识更多有表达欲的同学。"
            onChange={(event) => setFormState((prev) => ({ ...prev, intro: event.target.value }))}
          />
        </label>
      </section>

      <button type="submit" className="primary-button">
        更新画像并刷新推荐
      </button>
    </form>
  );
}

function toggleValue<T extends string>(items: T[], value: T): T[] {
  return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
}
