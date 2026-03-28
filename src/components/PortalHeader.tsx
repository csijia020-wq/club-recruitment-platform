import { Link, NavLink } from "react-router-dom";
import { BrandMark } from "./BrandMark";
import type { PortalId } from "../types";

interface PortalHeaderProps {
  current?: PortalId;
  title: string;
  description: string;
  onReset?: () => void;
}

export function PortalHeader({ current, title, description, onReset }: PortalHeaderProps) {
  return (
    <header className="panel portal-header-shell">
      <div className="portal-toolbar">
        <Link to="/" className="plain-link">
          <BrandMark compact />
        </Link>
        <div className="toolbar-actions">
          <nav className="route-pills" aria-label="Portal navigation">
            <NavLink to="/" className={({ isActive }) => getNavClass(isActive && current === undefined)}>
              首页
            </NavLink>
            <NavLink to="/student" className={({ isActive }) => getNavClass(isActive || current === "student")}>
              学生端
            </NavLink>
            <NavLink to="/club" className={({ isActive }) => getNavClass(isActive || current === "club")}>
              社团端
            </NavLink>
            <NavLink to="/admin" className={({ isActive }) => getNavClass(isActive || current === "admin")}>
              学校端
            </NavLink>
          </nav>
          {onReset ? (
            <button type="button" className="ghost-button" onClick={onReset}>
              重置演示数据
            </button>
          ) : null}
        </div>
      </div>
      <div className="portal-heading">
        <div>
          <p className="section-kicker">Portal View</p>
          <h2>{title}</h2>
        </div>
        <p className="section-copy">{description}</p>
      </div>
    </header>
  );
}

function getNavClass(active: boolean) {
  return `route-pill ${active ? "is-active" : ""}`;
}
