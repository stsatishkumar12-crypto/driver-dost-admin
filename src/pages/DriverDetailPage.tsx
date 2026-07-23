import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { adminApi } from '@/api/admin.api';
import { errMessage } from '@/api/client';
import { Badge, BoolBadge } from '@/components/Badge';
import { StatCard } from '@/components/StatCard';
import { KV } from '@/components/KV';
import { RideHistory } from '@/components/RideHistory';
import { Loading, ErrorState } from '@/components/States';
import { dateTimeFull, initials, money } from '@/lib/format';

export function DriverDetailPage() {
  const { id = '' } = useParams();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['driver', id],
    queryFn: () => adminApi.driver(id),
  });

  return (
    <div>
      <Link to="/drivers" className="back-link">
        <ArrowLeft size={16} className="back-icon" />
        <span>Back to Drivers</span>
      </Link>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorState message={errMessage(error)} onRetry={refetch} />
      ) : (
        <>
          <div className="page-title">{data!.driver.name}</div>
          <div className="page-sub">
            <span className="mono">{data!.driver.code}</span> · Driver profile &amp; statistics
          </div>

          <div className="detail-grid" style={{ marginTop: 18 }}>
            <div className="card card-pad">
              <div className="row gap-12" style={{ marginBottom: 12 }}>
                <div className="avatar">{initials(data!.driver.name)}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{data!.driver.name}</div>
                  <div className="row gap-8">
                    <Badge tone="amber">★ {data!.driver.rating.toFixed(1)}</Badge>
                    <span className="muted">{data!.driver.ratingCount} reviews</span>
                  </div>
                </div>
              </div>
              <KV k="Title" v={data!.driver.title} />
              <KV k="Email" v={data!.driver.email || '—'} />
              <KV k="Phone" v={data!.driver.phone || '—'} />
              <KV k="Auth method" v={<Badge tone="blue">{data!.driver.provider || '—'}</Badge>} />
              <KV k="Password" v={<BoolBadge value={data!.driver.hasPassword} yes="Set" no="Not set" />} />
              <KV k="Verified" v={<BoolBadge value={data!.driver.isVerified} />} />
              <KV
                k="Status"
                v={<Badge tone={data!.driver.isAvailable ? 'green' : 'gray'}>{data!.driver.isAvailable ? 'Online' : 'Offline'}</Badge>}
              />
              <KV
                k="Last location"
                v={
                  data!.driver.lat != null && data!.driver.lng != null
                    ? `${data!.driver.lat.toFixed(4)}, ${data!.driver.lng.toFixed(4)}`
                    : '—'
                }
              />
              <KV k="Joined" v={dateTimeFull(data!.driver.createdAt)} />
            </div>

            <div>
              <div className="stat-grid" style={{ marginBottom: 18 }}>
                <StatCard label="Total Revenue" value={money(data!.stats.totalRevenue)} />
                <StatCard label="Total Rides" value={data!.stats.totalRides} />
                <StatCard label="Completed" value={data!.stats.completedRides} />
                <StatCard label="Cancelled" value={data!.stats.cancelledRides} />
              </div>
              <div style={{ fontWeight: 800, margin: '4px 2px 10px' }}>Ride &amp; Route History</div>
              <RideHistory kind="driver" id={id} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
