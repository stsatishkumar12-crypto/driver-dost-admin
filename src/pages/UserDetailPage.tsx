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

export function UserDetailPage() {
  const { id = '' } = useParams();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user', id],
    queryFn: () => adminApi.user(id),
  });

  return (
    <div>
      <Link to="/users" className="back-link">
        <ArrowLeft size={16} className="back-icon" />
        <span>Back to Users</span>
      </Link>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorState message={errMessage(error)} onRetry={refetch} />
      ) : (
        <>
          <div className="page-title">{data!.user.name || 'User'}</div>
          <div className="page-sub">User profile &amp; ride history</div>

          <div className="detail-grid" style={{ marginTop: 18 }}>
            <div className="card card-pad">
              <div className="row gap-12" style={{ marginBottom: 12 }}>
                <div className="avatar">{initials(data!.user.name)}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{data!.user.name || '—'}</div>
                  <Badge tone="blue">{data!.user.role}</Badge>
                </div>
              </div>
              <KV k="Email" v={data!.user.email || '—'} />
              <KV k="Phone" v={data!.user.phone || '—'} />
              <KV k="Auth method" v={<Badge tone="blue">{data!.user.provider || '—'}</Badge>} />
              <KV k="Password" v={<BoolBadge value={data!.user.hasPassword} yes="Set" no="Not set" />} />
              <KV k="Phone verified" v={<BoolBadge value={data!.user.isPhoneVerified} />} />
              <KV k="Wallet balance" v={money(data!.user.walletBalance)} />
              <KV k="Joined" v={dateTimeFull(data!.user.createdAt)} />
            </div>

            <div>
              <div className="stat-grid" style={{ marginBottom: 18 }}>
                <StatCard label="Total Rides" value={data!.stats.totalRides} />
                <StatCard label="Completed" value={data!.stats.completedRides} />
                <StatCard label="Total Spent" value={money(data!.stats.totalSpent)} />
              </div>
              <div style={{ fontWeight: 800, margin: '4px 2px 10px' }}>Booked Rides &amp; History</div>
              <RideHistory kind="user" id={id} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
