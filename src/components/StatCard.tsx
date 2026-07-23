import { ReactNode } from 'react';

export type Tone = 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'teal';

export function StatCard({
  label,
  value,
  icon,
  tone = 'blue',
}: {
  label: string;
  value: string | number;
  icon?: ReactNode;
  tone?: Tone;
}) {
  return (
    <div className="stat">
      {icon != null && <div className={`stat-icon tone-${tone}`}>{icon}</div>}
      <div className="stat-body">
        <div className="value mono">{value}</div>
        <div className="label">{label}</div>
      </div>
    </div>
  );
}
