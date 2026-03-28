import { schoolBrand } from "../data/mockData";

interface BrandMarkProps {
  compact?: boolean;
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className={`brand-mark ${compact ? "is-compact" : ""}`}>
      <div className="brand-logo" aria-hidden="true">
        <svg viewBox="0 0 80 80" role="img">
          <circle cx="40" cy="40" r="36" />
          <path d="M24 30h32v6H24zm6 12h20v6H30zm-2 12h24v6H28z" />
          <path d="M40 16 20 24v10c0 15.2 8.6 28.7 20 34 11.4-5.3 20-18.8 20-34V24L40 16Z" />
        </svg>
      </div>
      <div>
        <p className="eyebrow">{schoolBrand.schoolSubtitle}</p>
        <h1 className={compact ? "brand-title compact" : "brand-title"}>
          {schoolBrand.schoolName}
        </h1>
      </div>
    </div>
  );
}
