import { isValidElement } from "react";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Link, NavLink } from "react-router-dom";
import planMarkdown from "../../PLAN.md?raw";
import { BrandMark } from "../components/BrandMark";

const CORE_JUDGMENT_MINDMAP_MARKER = "[[CORE_JUDGMENT_MINDMAP]]";
const ROLE_MODULE_MINDMAP_MARKER = "[[ROLE_MODULE_MINDMAP]]";

export function PlanPage() {
  const renderedPlanMarkdown = planMarkdown
    .replace(/^\uFEFF?# .+\n+/, "")
    .replace(
      /\n- 对学生（C端）：追求极致的体验闭环，“看得全、看得懂、投得快、能跟踪”。\n- 对社团（B端）：追求极致的管理效率，“配置标准化、筛选高效化、通知自动化、数据可视化”。\n- 对学校（G端）：追求极致的治理规范，“审核统一、节奏统一、数据统一”。/,
      `\n${CORE_JUDGMENT_MINDMAP_MARKER}`,
    )
    .replace(
      /\n### 3\.1 学生端（侧重体验与转化）[\s\S]*?\n## 4\. 核心数据对象/,
      `\n${ROLE_MODULE_MINDMAP_MARKER}\n\n## 4. 核心数据对象`,
    );

  return (
    <main className="page-shell page-shell-doc">
      <section className="panel doc-hero">
        <div className="doc-topbar">
          <Link to="/" className="plain-link">
            <BrandMark compact />
          </Link>
          <p className="doc-topbar-note">
            这是一个高校社团招新智能匹配平台，我展示的内容分为「首页」「学生端」「社团端」「学校端」4
            个部分。当前展示的「首页」部分，是我在 AI Coding 阶段根据产品内容整理的 PLAN 文档。
          </p>
          <nav className="route-pills" aria-label="Portal navigation">
            <NavLink to="/" className={({ isActive }) => getNavClass(isActive)}>
              首页
            </NavLink>
            <NavLink to="/student" className={({ isActive }) => getNavClass(isActive)}>
              学生端
            </NavLink>
            <NavLink to="/club" className={({ isActive }) => getNavClass(isActive)}>
              社团端
            </NavLink>
            <NavLink to="/admin" className={({ isActive }) => getNavClass(isActive)}>
              学校端
            </NavLink>
          </nav>
        </div>

        <div className="doc-hero-grid">
          <div className="doc-copy">
            <div>
              <p className="section-kicker">Design Document</p>
              <h1 className="doc-title">PLAN.md</h1>
              <p className="doc-subtitle">社团招新智能匹配平台设计文档</p>
            </div>
            <p className="section-copy doc-description">
              `PLAN.md` 的作用不是展示文件本身，而是先把目标、方案和任务拆解写清楚，把“规划”和“执行”明确分开。它也是人和 AI 共同审阅、反复修正并最终指导实现的核心文档。
            </p>
            <div className="doc-actions">
              <Link to="/" className="primary-button">
                返回评审首页
              </Link>
              <Link to="/student" className="ghost-button">
                查看学生端演示
              </Link>
            </div>
          </div>

          <aside className="doc-meta">
            <article className="doc-meta-card">
              <p className="section-kicker">Source Of Truth</p>
              <strong>先定方向，再进入实现</strong>
              <p className="muted">目标、取舍、任务拆解和阶段进度先落在这里，后续设计、开发和 AI Coding 都以它为准。</p>
            </article>
            <article className="doc-meta-card">
              <p className="section-kicker">Audience</p>
              <strong>评审、产品、AI 共用一份计划</strong>
              <p className="muted">评审借它理解方案，产品借它对齐边界、完成功能的补充迭代，AI 借它沿着同一任务上下文继续执行。</p>
            </article>
            <article className="doc-meta-card">
              <p className="section-kicker">Reading Order</p>
              <strong>先看计划，再看原型与结果</strong>
              <p className="muted">先确认问题定义和实现路径，再进入页面原型，最后对照计划检查结果有没有跑偏。</p>
            </article>
          </aside>
        </div>
      </section>

      <article className="panel markdown-article">
        <div className="markdown-inner">
          <ReactMarkdown
            components={{
              p({ children }) {
                if (getNodeText(children).trim() === CORE_JUDGMENT_MINDMAP_MARKER) {
                  return <CoreJudgmentMindMap />;
                }

                if (getNodeText(children).trim() === ROLE_MODULE_MINDMAP_MARKER) {
                  return <RoleModuleMindMap />;
                }

                return <p>{children}</p>;
              },
            }}
          >
            {renderedPlanMarkdown}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}

function getNavClass(active: boolean) {
  return `route-pill ${active ? "is-active" : ""}`;
}

function getNodeText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getNodeText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(children)) {
    return getNodeText(children.props.children);
  }

  return "";
}

function CoreJudgmentMindMap() {
  const branches = [
    {
      label: "学生（C端）",
      title: "体验闭环",
      copy: "看得全、看得懂、投得快、能跟踪",
    },
    {
      label: "社团（B端）",
      title: "管理效率",
      copy: "配置标准化、筛选高效化、通知自动化、数据可视化",
    },
    {
      label: "学校（G端）",
      title: "治理规范",
      copy: "审核统一、节奏统一、数据统一",
    },
  ];

  return (
    <section className="mindmap-block" aria-label="核心判断思维导图">
      <div className="mindmap-root">
        <p className="mindmap-kicker">产品定位</p>
        <strong>提升匹配效率与报名转化率</strong>
        <p>这是一个效能工具，而不是泛校园社交社区。</p>
      </div>

      <div className="mindmap-branches">
        {branches.map((branch) => (
          <article key={branch.label} className="mindmap-branch">
            <p className="mindmap-branch-label">{branch.label}</p>
            <strong>{branch.title}</strong>
            <p>{branch.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RoleModuleMindMap() {
  const branches = [
    {
      label: "学生端",
      focus: "侧重体验与转化",
      features: ["智能迎新", "发现与推荐", "社团主页", "极简报名", "进度追踪", "通知中心"],
    },
    {
      label: "社团管理端",
      focus: "侧重提效与协同",
      features: ["招新配置", "申请管理看板", "智能触达", "数据洞察"],
    },
    {
      label: "系统管理端",
      focus: "侧重合规与统筹",
      features: ["社团准入", "全局看板", "活动治理"],
    },
  ];

  return (
    <section className="mindmap-block role-mindmap-block" aria-label="用户角色与功能模块思维导图">
      <div className="mindmap-root role-mindmap-root">
        <p className="mindmap-kicker">Role Map</p>
        <strong>用户角色与功能模块</strong>
        <p>围绕学生、社团和学校三类角色，组织一站式招新流程与后台能力。</p>
      </div>

      <div className="mindmap-branches role-mindmap-branches">
        {branches.map((branch) => (
          <article key={branch.label} className="mindmap-branch role-mindmap-branch">
            <p className="mindmap-branch-label">{branch.label}</p>
            <strong>{branch.focus}</strong>
            <div className="role-mindmap-chip-row">
              {branch.features.map((feature) => (
                <span key={feature} className="role-mindmap-chip">
                  {feature}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
