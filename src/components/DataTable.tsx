import { ReactNode } from 'react';
import { Pagination } from './Pagination';
import { Loading, EmptyState, ErrorState } from './States';

export interface TableColumnHeader {
  title?: string;
  action?: ReactNode;
}

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  align?: 'right';
}

interface Props<T> {
  columns: Column<T>[];
  rows: T[] | undefined;
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyText?: string;

  // Optional in-card header (title + right-aligned action).
  title?: string;
  titleAction?: ReactNode;

  // Server-side sort (optional)
  sortBy?: string;
  order?: 'asc' | 'desc';
  onSort?: (key: string) => void;

  // Server-side pagination
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPage: (p: number) => void;
  onLimit: (l: number) => void;
}

export function DataTable<T>({
  columns,
  rows,
  loading,
  error,
  onRetry,
  rowKey,
  onRowClick,
  emptyText,
  sortBy,
  order,
  onSort,
  page,
  totalPages,
  total,
  limit,
  onPage,
  onLimit,
  title,
  titleAction,
}: Props<T>) {
  const showBody = !loading && !error && rows && rows.length > 0;

  return (
    <div className="card">
      {title && (
        <div className="section-head" style={{ padding: '16px 20px' }}>
          <div className="card-title">{title}</div>
          {titleAction}
        </div>
      )}
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              {columns.map((c) => {
                const active = sortBy === c.key;
                return (
                  <th
                    key={c.key}
                    className={`${c.sortable && onSort ? 'sortable' : ''} ${c.align === 'right' ? 'text-right' : ''}`}
                    onClick={() => c.sortable && onSort?.(c.key)}
                  >
                    {c.header}
                    {active ? (order === 'asc' ? ' ▲' : ' ▼') : ''}
                  </th>
                );
              })}
            </tr>
          </thead>
          {showBody && (
            <tbody>
              {rows!.map((row) => (
                <tr
                  key={rowKey(row)}
                  className={onRowClick ? 'clickable' : ''}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((c) => (
                    <td key={c.key} className={c.align === 'right' ? 'text-right' : ''}>
                      {c.render ? c.render(row) : ((row as any)[c.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {loading && <Loading />}
      {!loading && error && <ErrorState message={error} onRetry={onRetry} />}
      {!loading && !error && rows && rows.length === 0 && (
        <EmptyState title={emptyText || 'No records found'} />
      )}

      {/* Show pagination whenever there ARE records — even if this page is empty
          (out-of-range after a page-size change), so the user can navigate back. */}
      {!loading && !error && total > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          limit={limit}
          onPage={onPage}
          onLimit={onLimit}
        />
      )}
    </div>
  );
}
