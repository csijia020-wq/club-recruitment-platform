import { Link } from "react-router-dom";
import { BrandMark } from "../components/BrandMark";
import { PortalEntryCard } from "../components/PortalEntryCard";

export function LandingPage() {
  return (
    <main className="page-shell">
      <section className="panel plan-strip">
        <div>
          <p className="section-kicker">Review First</p>
          <strong>评审入口已前置</strong>
        </div>
        <a href="/plan" target="_blank" rel="noreferrer" className="primary-button inline-link-button">
          查看 PLAN.md 设计思路
        </a>
      </section>

      <header className="hero panel">
        <div className="hero-top">
          <BrandMark />
          <div className="hero-actions">
            <Link to="/student" className="ghost-button">
              进入学生端
            </Link>
            <Link to="/club" className="ghost-button">
              进入社团端
            </Link>
            <Link to="/admin" className="ghost-button">
              进入学校端
            </Link>
          </div>
        </div>

        <div className="hero-body">
          <section className="hero-copy">
            <p className="eyebrow">AI-Powered Campus Recruitment</p>
            <h2 className="landing-title">社团招新智能匹配平台</h2>
            <p className="hero-lead">
              用结构化画像、可解释推荐和流程化招新，让新生更快找到合适社团，让社团更高效完成招新，也让学校能统一治理全校招新过程。
            </p>
            <div className="hero-pill-row">
              <span className="hero-pill">突出高校属性</span>
              <span className="hero-pill">可解释推荐</span>
              <span className="hero-pill">一键报名</span>
              <span className="hero-pill">状态全程可见</span>
            </div>
            <div className="hero-metrics">
              <article className="hero-metric">
                <p className="muted">产品定位</p>
                <strong>匹配效率工具</strong>
                <p className="muted">不是校园社区，而是提高发现与报名效率。</p>
              </article>
              <article className="hero-metric">
                <p className="muted">核心闭环</p>
                <strong>画像 → 推荐 → 报名</strong>
                <p className="muted">先跑通最短路径，再追加 AI 增强能力。</p>
              </article>
              <article className="hero-metric">
                <p className="muted">交互重点</p>
                <strong>PLAN 先行</strong>
                <p className="muted">首页第一屏先让评审看到设计思路与入口。</p>
              </article>
            </div>
          </section>
        </div>
      </header>

      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Three Portals</p>
            <h3>产品入口分层</h3>
          </div>
          <p className="section-copy">
            首页只承担评审和导航职责，学生、社团、学校三类角色进入各自页面后，只看与自己相关的内容。
          </p>
        </div>
        <div className="entry-grid">
          <PortalEntryCard
            to="/student"
            badge="Student Portal"
            title="学生端"
            description="通过智能迎新、可解释推荐和一键报名，帮助新生快速完成从了解社团到投递申请的全过程。"
            highlights={["基础信息复用", "14 个具体时间段", "推荐理由可解释"]}
          />
          <PortalEntryCard
            to="/club"
            badge="Club Admin"
            title="社团端"
            description="把 Excel、群公告和手工跟进收敛为统一后台，支持招新配置、看板推进和批量通知。"
            highlights={["自定义报名问题", "看板推进状态", "基础转化数据"]}
          />
          <PortalEntryCard
            to="/admin"
            badge="Super Admin"
            title="学校端"
            description="统一审核社团、观察全校招新走势，并通过治理日历保证校园招新节奏一致。"
            highlights={["社团审核", "全局指标", "招新治理提醒"]}
          />
        </div>
      </section>
    </main>
  );
}
