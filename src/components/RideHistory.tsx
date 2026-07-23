import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { adminApi } from '@/api/admin.api';
import { errMessage } from '@/api/client';
import { Ride } from '@/api/types';
import { DataTable, Column } from './DataTable';
import { StatusBadge, PaymentBadge } from './Badge';
import { money, dateTime } from '@/lib/format';

function RouteCell({ ride }: { ride: Ride }) {
  const from = ride.pickupLabel || ride.pickupAddress || 'Pickup';
  const to = ride.destinationLabel || ride.destinationAddress || (ride.type === 'HOURLY' ? 'Hourly' : '—');
  return (
    <div>
      <div className="route">
        <span className="dot" />
        <span title={ride.pickupAddress || ''}>{from}</span>
      </div>
      <div className="route" style={{ marginTop: 2 }}>
        <span className="dot end" />
        <span className="muted" title={ride.destinationAddress || ''}>
          {to}
        </span>
      </div>
    </div>
  );
}

/** Paginated ride/route history for a user (kind='user') or driver (kind='driver'). */
export function RideHistory({ kind, id }: { kind: 'user' | 'driver'; id: string }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: [kind, 'bookings', id, page, limit],
    queryFn: () =>
      kind === 'user'
        ? adminApi.userBookings(id, { page, limit })
        : adminApi.driverBookings(id, { page, limit }),
    placeholderData: keepPreviousData,
  });

  const columns: Column<Ride>[] = [
    { key: 'route', header: 'Route (Pickup → Destination)', render: (r) => <RouteCell ride={r} /> },
    { key: 'type', header: 'Type', render: (r) => r.type },
    {
      key: 'counterpart',
      header: kind === 'user' ? 'Driver' : 'Rider',
      render: (r) => (kind === 'user' ? r.driver?.name || '—' : r.rider?.name || '—'),
    },
    { key: 'distanceKm', header: 'Distance', align: 'right', render: (r) => (r.distanceKm != null ? `${r.distanceKm} km` : '—') },
    { key: 'amount', header: 'Amount', align: 'right', render: (r) => money(r.amount) },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'paymentStatus', header: 'Payment', render: (r) => <PaymentBadge status={r.paymentStatus} /> },
    { key: 'createdAt', header: 'Date', render: (r) => dateTime(r.createdAt) },
  ];

  return (
    <DataTable
      columns={columns}
      rows={data?.data}
      loading={isFetching && !data}
      error={error ? errMessage(error) : null}
      onRetry={refetch}
      rowKey={(r) => r.id}
      emptyText="No rides yet"
      page={data?.page ?? 1}
      totalPages={data?.totalPages ?? 1}
      total={data?.total ?? 0}
      limit={limit}
      onPage={setPage}
      onLimit={(l) => {
        setLimit(l);
        setPage(1); // avoid landing on an out-of-range empty page
      }}
    />
  );
}
