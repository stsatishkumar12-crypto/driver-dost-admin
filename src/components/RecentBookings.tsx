import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '@/api/admin.api';
import { errMessage } from '@/api/client';
import { Ride } from '@/api/types';
import { DataTable, Column } from './DataTable';
import { StatusBadge } from './Badge';
import { initials, money } from '@/lib/format';

const csvCell = (v: unknown) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

function exportCsv(rows: Ride[]) {
  const header = ['Customer', 'Phone', 'Driver', 'Pickup', 'Destination', 'Status', 'Fare', 'Date'];
  const body = rows.map((r) =>
    [
      r.rider?.name ?? '',
      r.rider?.phone ?? '',
      r.driver?.name ?? '',
      r.pickupLabel || r.pickupAddress || '',
      r.destinationLabel || r.destinationAddress || '',
      r.status,
      r.amount,
      r.createdAt,
    ]
      .map(csvCell)
      .join(',')
  );
  const blob = new Blob([[header.join(','), ...body].join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'recent-activity.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function routeLine(r: Ride) {
  const from = r.pickupLabel || r.pickupAddress || 'Pickup';
  const to = r.destinationLabel || r.destinationAddress || (r.type === 'HOURLY' ? 'Hourly' : '—');
  return (
    <span className="route-line">
      <span>{from}</span>
      <span className="route-arrow">→</span>
      <span className="muted">{to}</span>
    </span>
  );
}

export function RecentBookings() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['recent-bookings', page, limit],
    queryFn: () => adminApi.recentBookings({ page, limit }),
    placeholderData: keepPreviousData,
  });

  const columns: Column<Ride>[] = [
    {
      key: 'customer',
      header: 'Customer',
      render: (r) => (
        <div className="cust">
          <div className="cust-av">{initials(r.rider?.name)}</div>
          <div>
            <div className="cust-name">{r.rider?.name || '—'}</div>
            <div className="cust-phone">{r.rider?.phone || '—'}</div>
          </div>
        </div>
      ),
    },
    { key: 'driver', header: 'Driver', render: (r) => r.driver?.name || <span className="muted">Unassigned</span> },
    { key: 'route', header: 'Trip Route', render: routeLine },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'amount', header: 'Fare', align: 'right', render: (r) => <b>{money(r.amount)}</b> },
  ];

  return (
    <DataTable
      title="Recent Activity"
      titleAction={
        <button className="btn btn-outline btn-sm" onClick={() => exportCsv(data?.data ?? [])} disabled={!data?.data?.length}>
          Export CSV
        </button>
      }
      columns={columns}
      rows={data?.data}
      loading={isFetching && !data}
      error={error ? errMessage(error) : null}
      onRetry={refetch}
      rowKey={(r) => r.id}
      onRowClick={(r) => r.rider && navigate(`/users/${r.rider.id}`)}
      emptyText="No activity yet"
      page={data?.page ?? 1}
      totalPages={data?.totalPages ?? 1}
      total={data?.total ?? 0}
      limit={limit}
      onPage={setPage}
      onLimit={(l) => {
        setLimit(l);
        setPage(1);
      }}
    />
  );
}
