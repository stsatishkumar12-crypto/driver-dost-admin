import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '@/api/admin.api';
import { errMessage } from '@/api/client';
import { AdminUserRow } from '@/api/types';
import { DataTable, Column } from '@/components/DataTable';
import { Badge, BoolBadge } from '@/components/Badge';
import { useListParams } from '@/hooks/useListParams';
import { dateTime, money } from '@/lib/format';

const columns: Column<AdminUserRow>[] = [
  { key: 'name', header: 'Username', sortable: true, render: (u) => u.name || '—' },
  { key: 'email', header: 'Email', render: (u) => u.email || <span className="muted">—</span> },
  { key: 'phone', header: 'Phone', render: (u) => u.phone || '—' },
  {
    key: 'provider',
    header: 'Auth',
    render: (u) => <Badge tone="blue">{u.provider || '—'}</Badge>,
  },
  {
    key: 'password',
    header: 'Password',
    render: (u) => <BoolBadge value={u.hasPassword} yes="Set" no="Not set" />,
  },
  { key: 'verified', header: 'Verified', render: (u) => <BoolBadge value={u.isPhoneVerified} /> },
  {
    key: 'walletBalance',
    header: 'Wallet',
    sortable: true,
    align: 'right',
    render: (u) => money(u.walletBalance),
  },
  { key: 'ridesCount', header: 'Rides', align: 'right', render: (u) => u.ridesCount },
  { key: 'createdAt', header: 'Joined', sortable: true, render: (u) => dateTime(u.createdAt) },
];

export function UsersPage() {
  const navigate = useNavigate();
  const lp = useListParams();

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['users', lp.params],
    queryFn: () => adminApi.users(lp.params),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className="row between wrap gap-12">
        <div>
          <div className="page-title">Users</div>
          <div className="page-sub">All riders on the platform.</div>
        </div>
        <input
          className="input search"
          placeholder="Search name, email or phone…"
          value={lp.search}
          onChange={(e) => lp.setSearch(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 18 }}>
        <DataTable
          columns={columns}
          rows={data?.data}
          loading={isFetching && !data}
          error={error ? errMessage(error) : null}
          onRetry={refetch}
          rowKey={(u) => u.id}
          onRowClick={(u) => navigate(`/users/${u.id}`)}
          emptyText="No users found"
          sortBy={lp.sortBy}
          order={lp.order}
          onSort={lp.onSort}
          page={data?.page ?? 1}
          totalPages={data?.totalPages ?? 1}
          total={data?.total ?? 0}
          limit={lp.limit}
          onPage={lp.setPage}
          onLimit={lp.setLimit}
        />
      </div>
    </div>
  );
}
