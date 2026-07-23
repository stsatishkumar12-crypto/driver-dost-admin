import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '@/api/admin.api';
import { errMessage } from '@/api/client';
import { AdminDriverRow } from '@/api/types';
import { DataTable, Column } from '@/components/DataTable';
import { Badge, BoolBadge } from '@/components/Badge';
import { useListParams } from '@/hooks/useListParams';
import { dateTime, money } from '@/lib/format';

const columns: Column<AdminDriverRow>[] = [
  { key: 'code', header: 'Code', render: (d) => <span className="mono">{d.code}</span> },
  { key: 'name', header: 'Username', sortable: true, render: (d) => d.name },
  { key: 'email', header: 'Email', render: (d) => d.email || <span className="muted">—</span> },
  { key: 'phone', header: 'Phone', render: (d) => d.phone || '—' },
  {
    key: 'rating',
    header: 'Rating',
    sortable: true,
    align: 'right',
    render: (d) => `★ ${d.rating.toFixed(1)} (${d.ratingCount})`,
  },
  { key: 'isVerified', header: 'Verified', render: (d) => <BoolBadge value={d.isVerified} /> },
  {
    key: 'isAvailable',
    header: 'Status',
    render: (d) => <Badge tone={d.isAvailable ? 'green' : 'gray'}>{d.isAvailable ? 'Online' : 'Offline'}</Badge>,
  },
  { key: 'ridesCount', header: 'Rides', align: 'right', render: (d) => d.ridesCount },
  { key: 'totalRevenue', header: 'Revenue', align: 'right', render: (d) => money(d.totalRevenue) },
  { key: 'createdAt', header: 'Joined', sortable: true, render: (d) => dateTime(d.createdAt) },
];

export function DriversPage() {
  const navigate = useNavigate();
  const lp = useListParams();

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['drivers', lp.params],
    queryFn: () => adminApi.drivers(lp.params),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className="row between wrap gap-12">
        <div>
          <div className="page-title">Drivers</div>
          <div className="page-sub">All drivers on the platform.</div>
        </div>
        <input
          className="input search"
          placeholder="Search name, code, phone or email…"
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
          rowKey={(d) => d.id}
          onRowClick={(d) => navigate(`/drivers/${d.id}`)}
          emptyText="No drivers found"
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
