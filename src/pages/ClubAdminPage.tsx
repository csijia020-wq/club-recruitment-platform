import { useEffect, useState } from "react";
import { BarChart } from "../components/BarChart";
import { KanbanColumn } from "../components/KanbanColumn";
import { PortalHeader } from "../components/PortalHeader";
import { clubs } from "../data/mockData";
import { useDemoContext } from "../context/DemoContext";
import { STATUS_FLOW, type ApplicationStatus } from "../types";

export function ClubAdminPage() {
  const {
    state,
    resetDemoData,
    setActiveClubId,
    updateClubConfig,
    sendBulkNotification,
    moveApplicationStatus
  } = useDemoContext();

  const activeClub = clubs.find((club) => club.id === state.activeClubId) ?? clubs[0];
  const activeConfig = state.clubConfigs[activeClub.id];
  const applications = state.applications.filter((item) => item.clubId === activeClub.id);
  const accepted = applications.filter((item) => item.status === "已录取").length;
  const avgMatch = applications.length
    ? Math.round(applications.reduce((sum, item) => sum + item.matchScore, 0) / applications.length)
    : 0;

  const [deadline, setDeadline] = useState(activeConfig.deadline);
  const [slots, setSlots] = useState(String(activeConfig.slots));
  const [processText, setProcessText] = useState(activeConfig.process.join(" -> "));
  const [questionsText, setQuestionsText] = useState(
    activeConfig.questions.map((question) => question.label).join("\n")
  );
  const [notifyStatus, setNotifyStatus] = useState<ApplicationStatus>("已提交");
  const [notifyMessage, setNotifyMessage] = useState("");

  useEffect(() => {
    setDeadline(activeConfig.deadline);
    setSlots(String(activeConfig.slots));
    setProcessText(activeConfig.process.join(" -> "));
    setQuestionsText(activeConfig.questions.map((question) => question.label).join("\n"));
  }, [activeClub.id, activeConfig]);

  const statusDistribution = STATUS_FLOW.map((status) => ({
    label: status,
    value: applications.filter((item) => item.status === status).length
  }));

  const majorMap = applications.reduce<Record<string, number>>((accumulator, application) => {
    const student = state.studentProfiles[application.studentId];
    const key = student?.major ?? "未知";
    accumulator[key] = (accumulator[key] ?? 0) + 1;
    return accumulator;
  }, {});

  const majorDistribution = Object.entries(majorMap)
    .map(([label, value]) => ({ label, value }))
    .sort((left, right) => right.value - left.value);

  return (
    <main className="page-shell">
      <PortalHeader
        current="club"
        title="社团管理端"
        description="社团负责人通过统一后台完成招新配置、筛选推进、批量通知和过程复盘。"
        onReset={resetDemoData}
      />

      <div className="portal-grid club-layout">
        <aside className="stack">
          <article className="panel compact-panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Club Selector</p>
                <h3>当前管理社团</h3>
              </div>
            </div>
            <label className="single-field">
              <span>切换社团</span>
              <select value={activeClub.id} onChange={(event) => setActiveClubId(event.target.value)}>
                {clubs.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="insight-stack">
              <article className="club-summary-card">
                <p className="muted">社团定位</p>
                <strong>{activeClub.category}</strong>
                <p className="muted">{activeClub.slogan}</p>
              </article>
              <article className="club-summary-card">
                <p className="muted">当前申请 / 已录取</p>
                <strong>
                  {applications.length} / {accepted}
                </strong>
                <p className="muted">申请人会按统一状态机沉淀到看板中。</p>
              </article>
            </div>
          </article>
        </aside>

        <div className="stack">
          <article className="panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Recruitment Config</p>
                <h3>招新配置</h3>
              </div>
              <p className="section-note">支持修改招新周期、名额、流程和自定义问题。</p>
            </div>
            <form
              className="form-stack"
              onSubmit={(event) => {
                event.preventDefault();
                updateClubConfig(activeClub.id, {
                  deadline,
                  slots: Number(slots),
                  process: processText
                    .split("->")
                    .map((item) => item.trim())
                    .filter(Boolean),
                  questions: questionsText
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)
                });
              }}
            >
              <div className="form-grid two-columns">
                <label>
                  <span>报名截止日期</span>
                  <input type="date" value={deadline} onChange={(event) => setDeadline(event.target.value)} />
                </label>
                <label>
                  <span>计划招募名额</span>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={slots}
                    onChange={(event) => setSlots(event.target.value)}
                  />
                </label>
                <label className="span-2">
                  <span>面试流程</span>
                  <input
                    type="text"
                    value={processText}
                    onChange={(event) => setProcessText(event.target.value)}
                    placeholder="例如：简历初筛 -> 一面 -> 二面 -> 录取"
                  />
                </label>
                <label className="span-2">
                  <span>自定义问题（每行一个）</span>
                  <textarea
                    rows={5}
                    value={questionsText}
                    onChange={(event) => setQuestionsText(event.target.value)}
                  />
                </label>
              </div>
              <button type="submit" className="primary-button">
                保存招新配置
              </button>
            </form>
          </article>

          <article className="panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Kanban</p>
                <h3>申请管理看板</h3>
              </div>
              <p className="section-note">通过状态流转快速推进筛选过程。</p>
            </div>
            <div className="kanban-board">
              {STATUS_FLOW.map((status) => (
                <KanbanColumn
                  key={status}
                  status={status}
                  applications={applications.filter((item) => item.status === status)}
                  studentProfiles={state.studentProfiles}
                  onShift={moveApplicationStatus}
                />
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Bulk Notify</p>
                <h3>批量通知</h3>
              </div>
              <p className="section-note">对某个阶段的申请人统一发送面试或结果通知。</p>
            </div>
            <form
              className="form-stack"
              onSubmit={(event) => {
                event.preventDefault();
                sendBulkNotification(activeClub.id, notifyStatus, notifyMessage);
                setNotifyMessage("");
              }}
            >
              <div className="form-grid two-columns">
                <label>
                  <span>目标状态</span>
                  <select
                    value={notifyStatus}
                    onChange={(event) => setNotifyStatus(event.target.value as ApplicationStatus)}
                  >
                    {STATUS_FLOW.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="span-2">
                  <span>消息内容</span>
                  <textarea
                    rows={4}
                    value={notifyMessage}
                    onChange={(event) => setNotifyMessage(event.target.value)}
                    placeholder="例如：请于周三 19:00 到创新楼 203 参加一面。"
                  />
                </label>
              </div>
              <button type="submit" className="primary-button">
                发送站内通知
              </button>
            </form>
          </article>

          <article className="panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Club Analytics</p>
                <h3>社团数据看板</h3>
              </div>
              <p className="section-note">快速查看漏斗、专业分布和匹配质量。</p>
            </div>
            <div className="stats-grid">
              <article className="funnel-card">
                <p className="muted">平均匹配质量</p>
                <strong>{avgMatch}%</strong>
                <p className="muted">用于辅助判断招募画像是否清晰。</p>
              </article>
              <article className="funnel-card">
                <p className="muted">当前漏斗</p>
                <strong>{applications.length} 份申请</strong>
                <p className="muted">
                  已录取 {accepted} 人，待处理{" "}
                  {applications.filter((item) => !["已录取", "婉拒"].includes(item.status)).length} 人。
                </p>
              </article>
            </div>
            <div className="stats-grid">
              <article className="insight-card">
                <p className="muted">状态分布</p>
                <BarChart items={statusDistribution} />
              </article>
              <article className="insight-card">
                <p className="muted">专业分布</p>
                <BarChart items={majorDistribution.length ? majorDistribution : [{ label: "暂无", value: 0 }]} />
              </article>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
