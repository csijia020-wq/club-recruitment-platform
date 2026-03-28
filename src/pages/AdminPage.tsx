import { BarChart } from "../components/BarChart";
import { PortalHeader } from "../components/PortalHeader";
import { clubs, governanceEntries } from "../data/mockData";
import { useDemoContext } from "../context/DemoContext";

export function AdminPage() {
  const { state, resetDemoData, updateApprovalStatus } = useDemoContext();
  const pending = state.approvals.filter((item) => item.status === "待审核").length;
  const totalApplications = state.applications.length;
  const admitted = state.applications.filter((item) => item.status === "已录取").length;
  const inProgress = state.applications.filter(
    (item) => !["已录取", "婉拒"].includes(item.status)
  ).length;

  const categoryMap = clubs.reduce<Record<string, number>>((accumulator, club) => {
    accumulator[club.category] = (accumulator[club.category] ?? 0) + 1;
    return accumulator;
  }, {});

  const categoryStats = Object.entries(categoryMap).map(([label, value]) => ({ label, value }));
  const conversionStats = [
    { label: "已提交", value: state.applications.filter((item) => item.status === "已提交").length },
    { label: "审核中", value: state.applications.filter((item) => item.status === "审核中").length },
    { label: "面试中", value: state.applications.filter((item) => item.status === "一面" || item.status === "二面").length },
    { label: "已录取", value: admitted }
  ];

  return (
    <main className="page-shell">
      <PortalHeader
        current="admin"
        title="学校管理端"
        description="审核社团、统一治理招新节奏，并从全校维度观察平台运行效果。"
        onReset={resetDemoData}
      />

      <div className="portal-grid admin-layout">
        <div className="stack">
          <article className="panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Global Metrics</p>
                <h3>全局数据概览</h3>
              </div>
            </div>
            <div className="metric-grid">
              <article className="stat-card">
                <p className="muted">入驻社团</p>
                <strong>{clubs.length}</strong>
                <p className="muted">覆盖科技、艺术、公益、表达等类型。</p>
              </article>
              <article className="stat-card">
                <p className="muted">待审核社团</p>
                <strong>{pending}</strong>
                <p className="muted">统一处理入驻与年度注册。</p>
              </article>
              <article className="stat-card">
                <p className="muted">全校申请总量</p>
                <strong>{totalApplications}</strong>
                <p className="muted">持续沉淀招新季数据资产。</p>
              </article>
              <article className="stat-card">
                <p className="muted">流程进行中</p>
                <strong>{inProgress}</strong>
                <p className="muted">帮助学校关注招新节点拥塞。</p>
              </article>
              <article className="stat-card">
                <p className="muted">已录取人数</p>
                <strong>{admitted}</strong>
                <p className="muted">直接体现平台转化效率。</p>
              </article>
            </div>
          </article>

          <article className="panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Club Audit</p>
                <h3>社团审核</h3>
              </div>
              <p className="section-note">统一审核新社团入驻和年度注册申请。</p>
            </div>
            <div className="approval-list">
              {state.approvals
                .slice()
                .sort((left, right) => right.submittedAt.localeCompare(left.submittedAt))
                .map((item) => (
                  <article className="approval-card" key={item.id}>
                    <div className="approval-card-top">
                      <div>
                        <span className="hero-badge">{item.status}</span>
                        <h4>{item.name}</h4>
                      </div>
                      <span className="muted">{item.submittedAt}</span>
                    </div>
                    <p className="muted">挂靠单位：{item.sponsor}</p>
                    <p className="muted">方向：{item.focus}</p>
                    {item.status === "待审核" ? (
                      <div className="approval-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => updateApprovalStatus(item.id, "已通过")}
                        >
                          通过
                        </button>
                        <button
                          type="button"
                          className="chip-button"
                          onClick={() => updateApprovalStatus(item.id, "已驳回")}
                        >
                          驳回
                        </button>
                      </div>
                    ) : null}
                  </article>
                ))}
            </div>
          </article>
        </div>

        <div className="stack">
          <article className="panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Campus Pulse</p>
                <h3>全校招新走势</h3>
              </div>
              <p className="section-note">帮助学校在招新季统一资源和节奏安排。</p>
            </div>
            <div className="stats-grid">
              <article className="insight-card">
                <p className="muted">社团类型分布</p>
                <BarChart items={categoryStats} />
              </article>
              <article className="insight-card">
                <p className="muted">招新转化漏斗</p>
                <BarChart items={conversionStats} />
              </article>
            </div>
          </article>

          <article className="panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Governance Calendar</p>
                <h3>活动治理提醒</h3>
              </div>
            </div>
            <ul className="timeline-list">
              {governanceEntries.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <p className="muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </main>
  );
}
