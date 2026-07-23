import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/api/admin.api';
import { errMessage } from '@/api/client';
import { KpiTile } from '@/components/KpiTile';
import { TopDrivers } from '@/components/TopDrivers';
import { StatusDonut } from '@/components/StatusDonut';
import { RecentBookings } from '@/components/RecentBookings';
import { Loading, ErrorState } from '@/components/States';
import { IconUsers, IconCar, IconSignal, IconCompass, IconBolt, IconWallet, IconCalendar } from '@/components/icons';
import { money } from '@/lib/format';

const RANGES = [7, 14, 30];

export function DashboardPage() {
  const [days, setDays] = useState(14);

  const ov = useQuery({ queryKey: ['overview'], queryFn: adminApi.overview });
  const ch = useQuery({ queryKey: ['charts', days], queryFn: () => adminApi.chartStats(days) });

  return (
    <div>
      <div className="dash-head">
        <div className="page-sub" style={{ marginTop: 0 }}>
          Platform overview · trends over the last {days} days
        </div>
        <div className="range-container">
          <span className="range-icon"><IconCalendar size={16} /></span>
          <div className="range-picker">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setDays(r)}
                className={`range-picker-btn ${days === r ? 'active' : ''}`}
              >
                {r} Days
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI tiles */}
      {ov.isLoading ? (
        <Loading />
      ) : ov.error ? (
        <ErrorState message={errMessage(ov.error)} onRetry={ov.refetch} />
      ) : (
        <div className="kpi-grid">
          <KpiTile label="Total Users" value={ov.data!.totalUsers} icon={<IconUsers />} tone="blue" />
          <KpiTile label="Total Drivers" value={ov.data!.totalDrivers} icon={<IconCar />} tone="green" />
          <KpiTile label="Online Drivers" value={ov.data!.onlineDrivers} icon={<IconSignal />} tone="teal" dot />
          <KpiTile label="Total Rides" value={ov.data!.totalRides} icon={<IconCompass />} tone="red" />
          <KpiTile label="Active Rides" value={ov.data!.activeRides} icon={<IconBolt />} tone="amber" />
          <KpiTile label="Total Revenue" value={money(ov.data!.totalRevenue)} icon={<IconWallet />} tone="purple" />
        </div>
      )}

      {/* Top drivers + rides distribution */}
      <div className="dash-row" style={{ marginTop: 20 }}>
        <TopDrivers items={ch.data?.topDrivers ?? []} />
        <div className="card card-pad">
          <div className="section-head">
            <div className="card-title">Rides Distribution</div>
          </div>
          {ch.isLoading ? (
            <Loading />
          ) : ch.error ? (
            <ErrorState message={errMessage(ch.error)} onRetry={ch.refetch} />
          ) : (
            <StatusDonut data={ch.data!.statusBreakdown} />
          )}
        </div>
      </div>

      {/* Recent activity */}
      <div style={{ marginTop: 20 }}>
        <RecentBookings />
      </div>
    </div>
  );
}
