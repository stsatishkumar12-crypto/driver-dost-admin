const PAGE_SIZES = [10, 20, 50, 100];

interface Props {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPage: (p: number) => void;
  onLimit: (l: number) => void;
}

export function Pagination({ page, totalPages, total, limit, onPage, onLimit }: Props) {
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(total, page * limit);

  return (
    <div className="pagination">
      <div className="row gap-12 wrap">
        <span className="muted">
          Showing <b>{from}–{to}</b> of <b>{total}</b>
        </span>
        <div className="row gap-8">
          <span className="muted">Rows:</span>
          <select
            className="select"
            style={{ width: 'auto' }}
            value={limit}
            onChange={(e) => onLimit(Number(e.target.value))}
          >
            {PAGE_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pages">
        <button className="page-btn" disabled={page <= 1} onClick={() => onPage(1)}>
          « First
        </button>
        <button className="page-btn" disabled={page <= 1} onClick={() => onPage(page - 1)}>
          ‹ Prev
        </button>
        <span className="muted" style={{ padding: '0 8px' }}>
          Page <b>{page}</b> / {totalPages}
        </span>
        <button className="page-btn" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
          Next ›
        </button>
        <button className="page-btn" disabled={page >= totalPages} onClick={() => onPage(totalPages)}>
          Last »
        </button>
      </div>
    </div>
  );
}
