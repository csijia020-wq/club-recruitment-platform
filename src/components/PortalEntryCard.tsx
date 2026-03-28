import { Link } from "react-router-dom";

interface PortalEntryCardProps {
  to: string;
  badge: string;
  title: string;
  description: string;
  highlights: string[];
}

export function PortalEntryCard({
  to,
  badge,
  title,
  description,
  highlights
}: PortalEntryCardProps) {
  return (
    <article className="entry-card">
      <span className="hero-badge">{badge}</span>
      <h3>{title}</h3>
      <p className="card-copy">{description}</p>
      <ul className="text-list compact-list">
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <Link to={to} className="primary-button entry-link">
        进入 {title}
      </Link>
    </article>
  );
}
