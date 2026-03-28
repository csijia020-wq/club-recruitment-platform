import { useRef } from "react";
import { ApplicationForm } from "../components/ApplicationForm";
import { PortalHeader } from "../components/PortalHeader";
import { StudentProfileForm } from "../components/StudentProfileForm";
import { CURRENT_STUDENT_ID } from "../data/mockData";
import { useDemoContext } from "../context/DemoContext";
import { getStatusClass } from "../lib/helpers";
import { getRankedClubs } from "../lib/matching";
import { STATUS_FLOW } from "../types";

export function StudentPage() {
  const {
    state,
    currentStudent,
    resetDemoData,
    setSelectedClubId,
    updateCurrentStudentProfile,
    submitApplication
  } = useDemoContext();

  const rankedClubs = getRankedClubs(currentStudent);
  const selectedClub = rankedClubs.find((club) => club.id === state.selectedClubId) ?? rankedClubs[0];
  const selectedConfig = state.clubConfigs[selectedClub.id];
  const selectedApplication = state.applications.find(
    (application) =>
      application.studentId === CURRENT_STUDENT_ID && application.clubId === selectedClub.id
  );
  const studentApplications = state.applications
    .filter((application) => application.studentId === CURRENT_STUDENT_ID)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  const notifications = state.notifications
    .filter((item) => item.studentId === CURRENT_STUDENT_ID)
    .sort((left, right) => right.date.localeCompare(left.date));
  const clubProfileRef = useRef<HTMLElement | null>(null);
  const applicationRef = useRef<HTMLElement | null>(null);

  function jumpToSection(clubId: string, target: "club" | "apply") {
    setSelectedClubId(clubId);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const node = target === "club" ? clubProfileRef.current : applicationRef.current;
        node?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  return (
    <main className="page-shell">
      <PortalHeader
        current="student"
        title="学生端"
        description="这里是新生真实会看到的产品页面，只保留与选社、报名和跟进直接相关的内容。"
        onReset={resetDemoData}
      />

      <div className="portal-grid student-layout">
        <aside className="stack">
          <article className="panel compact-panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Profile Snapshot</p>
                <h3>{currentStudent.name}</h3>
              </div>
            </div>
            <p className="section-note">
              {currentStudent.major} · {currentStudent.gender} · {currentStudent.grade} · {currentStudent.mbti}
            </p>
            <div className="tag-row">
              {currentStudent.interests.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="insight-stack">
              <article className="club-summary-card">
                <p className="muted">当前最适合的社团</p>
                <strong>{selectedClub.name}</strong>
                <p className="muted">{selectedClub.match.score}% 匹配度</p>
              </article>
              <article className="club-summary-card">
                <p className="muted">已投递 / 进行中</p>
                <strong>
                  {studentApplications.length} /{" "}
                  {studentApplications.filter((item) => !["已录取", "婉拒"].includes(item.status)).length}
                </strong>
                <p className="muted">投递后所有状态统一收拢到 Dashboard。</p>
              </article>
            </div>
          </article>
        </aside>

        <div className="stack">
          <article className="panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Onboarding</p>
                <h3>智能迎新画像</h3>
              </div>
              <p className="section-note">已改为“基础身份信息 + 匹配偏好”两段结构。</p>
            </div>
            <StudentProfileForm
              profile={currentStudent}
              onSubmit={(profile) => updateCurrentStudentProfile(profile)}
            />
          </article>

          <article className="panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Discover</p>
                <h3>发现与推荐</h3>
              </div>
              <p className="section-note">推荐逻辑结合兴趣、技能、具体时间重合和文字语义线索。</p>
            </div>
            <div className="recommendation-grid">
              {rankedClubs.map((club) => {
                const applied = state.applications.find(
                  (application) =>
                    application.studentId === CURRENT_STUDENT_ID && application.clubId === club.id
                );

                return (
                  <article
                    className={`club-card ${club.id === selectedClub.id ? "is-selected" : ""}`}
                    key={club.id}
                  >
                    <div className="club-card-top">
                      <div>
                        <span className="hero-badge">{club.category}</span>
                        <h4>{club.name}</h4>
                        <p className="card-copy">{club.slogan}</p>
                      </div>
                      <div className="score-badge">
                        <strong>{club.match.score}</strong>
                        <span>匹配</span>
                      </div>
                    </div>
                    <div className="tag-row">
                      {club.tags.slice(0, 4).map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="score-breakdown">
                      {club.match.reasons.map((reason) => (
                        <span className="score-chip" key={reason}>
                          {reason}
                        </span>
                      ))}
                    </div>
                    <p className="card-copy">{club.description}</p>
                    <div className="card-actions">
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => jumpToSection(club.id, "club")}
                      >
                        查看社团主页
                      </button>
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => jumpToSection(club.id, "apply")}
                      >
                        {applied ? "更新申请" : "一键报名"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </article>

          <article className="panel" ref={clubProfileRef}>
            <div className="section-heading">
              <div>
                <p className="section-kicker">Club Profile</p>
                <h3>社团主页</h3>
              </div>
              <p className="section-note">把“海报信息”升级成“可决策信息”。</p>
            </div>
            <div className="detail-shell">
              <section className="detail-panel">
                <div className="club-cover">
                  <span className="hero-badge">{selectedClub.category}</span>
                  <h3>{selectedClub.name}</h3>
                  <p>{selectedClub.description}</p>
                  <div className="tag-row">
                    {selectedClub.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="stats-grid">
                  <article className="stat-card">
                    <p className="muted">推荐解释</p>
                    <strong>{selectedClub.match.score}%</strong>
                    <p className="muted">{selectedClub.match.explanation}</p>
                  </article>
                  <article className="stat-card">
                    <p className="muted">时间投入</p>
                    <strong>{selectedClub.timeCommitment}</strong>
                    <p className="muted">主要活跃时间：{selectedClub.timeSlots.join(" / ")}</p>
                  </article>
                  <article className="stat-card">
                    <p className="muted">招新截止</p>
                    <strong>{selectedConfig.deadline}</strong>
                    <p className="muted">计划招募 {selectedConfig.slots} 人</p>
                  </article>
                </div>

                <div className="detail-section">
                  <h4>你为什么会被推荐</h4>
                  <ul className="detail-list">
                    {selectedClub.match.longReasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h4>社团亮点与活动</h4>
                  <ul className="detail-list">
                    {[...selectedClub.highlights, ...selectedClub.activities].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h4>招新要求</h4>
                  <ul className="detail-list">
                    {selectedClub.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <aside className="detail-aside">
                <article className="insight-card">
                  <p className="muted">社团信息浓缩</p>
                  <strong>{selectedClub.mediaLabel}</strong>
                  <p className="muted">适合目标：{selectedClub.careerPaths.join(" / ")}</p>
                </article>
                <article className="insight-card">
                  <p className="muted">当前招新流程</p>
                  <div className="timeline-step-list">
                    {selectedConfig.process.map((item) => (
                      <span className="timeline-step" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
                <article className="insight-card">
                  <p className="muted">往届评价</p>
                  <div className="review-list">
                    {selectedClub.reviews.map((review) => (
                      <div className="review-card" key={review.author}>
                        <strong>{review.author}</strong>
                        <p className="muted">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="insight-card">
                  <p className="muted">你的当前状态</p>
                  <span className={`status-pill ${getStatusClass(selectedApplication?.status ?? "未投递")}`}>
                    {selectedApplication?.status ?? "未投递"}
                  </span>
                  <p className="muted">
                    {selectedApplication?.note ?? "查看完信息后，可直接在下方提交申请。"}
                  </p>
                </article>
              </aside>
            </div>
          </article>

          <article className="panel" ref={applicationRef}>
            <div className="section-heading">
              <div>
                <p className="section-kicker">One-Click Apply</p>
                <h3>一键报名</h3>
              </div>
              <p className="section-note">复用基础资料，只填写社团的差异化问题。</p>
            </div>
            <ApplicationForm
              club={selectedClub}
              config={selectedConfig}
              existingApplication={selectedApplication}
              student={currentStudent}
              onSubmit={submitApplication}
            />
          </article>

          <article className="panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Dashboard</p>
                <h3>进度追踪</h3>
              </div>
              <p className="section-note">申请状态统一可见，不再靠群消息和私聊追进度。</p>
            </div>
            {studentApplications.length ? (
              <div className="application-list">
                {studentApplications.map((application) => {
                  const club = rankedClubs.find((item) => item.id === application.clubId);
                  const currentIndex = STATUS_FLOW.indexOf(application.status);

                  return (
                    <article className="application-card" key={application.id}>
                      <div className="application-card-top">
                        <div>
                          <span className="hero-badge">{club?.category ?? "社团"}</span>
                          <h4>{club?.name ?? application.clubId}</h4>
                        </div>
                        <span className={`status-pill ${getStatusClass(application.status)}`}>
                          {application.status}
                        </span>
                      </div>
                      <p className="muted">{application.note}</p>
                      <div className="timeline-step-list">
                        {STATUS_FLOW.map((status, index) => (
                          <span
                            className={`timeline-step ${index <= currentIndex ? "is-active" : ""}`}
                            key={status}
                          >
                            {status}
                          </span>
                        ))}
                      </div>
                      <p className="muted">
                        提交于 {application.submittedAt}，最近更新 {application.updatedAt}
                      </p>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">你还没有提交任何社团申请。先去推荐列表中挑一个最感兴趣的社团试试。</div>
            )}
          </article>

          <article className="panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Notification Center</p>
                <h3>通知中心</h3>
              </div>
              <p className="section-note">站内提醒聚合展示，保证关键节点可触达。</p>
            </div>
            {notifications.length ? (
              <div className="notification-list">
                {notifications.map((item) => (
                  <article className="notification-card" key={item.id}>
                    <div className="application-card-top">
                      <div>
                        <span className="hero-badge">{item.type}</span>
                        <h4>{item.title}</h4>
                      </div>
                      <span className="muted">{item.date}</span>
                    </div>
                    <p className="muted">{item.body}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">暂无通知。状态变化后会第一时间出现在这里。</div>
            )}
          </article>
        </div>
      </div>
    </main>
  );
}
