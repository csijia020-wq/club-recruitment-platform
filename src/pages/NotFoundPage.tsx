import { Link } from "react-router-dom";
import { PortalHeader } from "../components/PortalHeader";

export function NotFoundPage() {
  return (
    <main className="page-shell">
      <PortalHeader
        title="页面不存在"
        description="当前路由没有对应页面，请返回首页重新进入。"
      />
      <section className="panel empty-state large-empty">
        <h3>没有找到你访问的页面</h3>
        <p className="muted">可以从首页重新进入评审页、学生端、社团端或学校端。</p>
        <Link to="/" className="primary-button">
          返回首页
        </Link>
      </section>
    </main>
  );
}
