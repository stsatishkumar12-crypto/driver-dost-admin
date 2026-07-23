import { ReactNode } from 'react';
import { Tone } from './StatCard';

export function KpiTile({
  label,
  value,
  icon,
  tone = 'blue',
  dot,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  tone?: Tone;
  dot?: boolean;
}) {
  return (
    <div className="kpi">
      <div className={`kpi-icon tone-${tone}`}>
        {icon}
        {dot && <span className="kpi-dot" />}
      </div>
      <div className="kpi-meta">
        <div className="kpi-value mono">{value}</div>
        <div className="kpi-label">{label}</div>
      </div>
    </div>
  );
}
