interface BarChartProps {
  items: Array<{ label: string; value: number }>;
}

export function BarChart({ items }: BarChartProps) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="bar-chart">
      {items.map((item) => (
        <div className="bar-row" key={item.label}>
          <span className="muted">{item.label}</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}
