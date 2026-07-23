import { useNavigate } from 'react-router-dom';
import { TopDriver } from '@/api/types';
import { initials, money } from '@/lib/format';
import { IconChevronRight } from './icons';

export function TopDrivers({ items }: { items: TopDriver[] }) {
  const navigate = useNavigate();
  return (
    <div className="card card-pad">
      <div className="section-head">
        <div className="card-title">Top Performing Drivers</div>
        <button className="link-btn" onClick={() => navigate('/drivers')}>
          View All Drivers <IconChevronRight size={14} />
        </button>
      </div>

      <div className="tdlist">
        {items.length === 0 && <div className="muted" style={{ padding: '14px 0' }}>No completed rides yet.</div>}
        {items.map((d) => (
          <div className="td-item" key={d.id} onClick={() => navigate(`/drivers/${d.id}`)}>
            <div className="td-avatar">
              {initials(d.name)}
              <span className={`td-dot ${d.isAvailable ? 'on' : 'off'}`} />
            </div>
            <div className="td-meta">
              <div className="td-name">{d.name}</div>
              <div className="td-sub">
                <span className="star">★</span> {d.rating.toFixed(1)} · {d.completedRides} rides completed
              </div>
            </div>
            <div className="td-right">
              <div className="td-rev">{money(d.revenue)}</div>
              <div className="td-cap">EARNINGS</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
