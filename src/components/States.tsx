import { Inbox, AlertCircle } from 'lucide-react';

export function Spinner() {
  return <div className="spinner" />;
}

export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="state">
      <Spinner />
      <div>{label}</div>
    </div>
  );
}

export function EmptyState({ title = 'Nothing here yet', hint }: { title?: string; hint?: string }) {
  return (
    <div className="state">
      <Inbox size={32} style={{ color: 'var(--text-muted)', marginBottom: 4 }} />
      <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{title}</div>
      {hint && <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{hint}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="state">
      <AlertCircle size={32} style={{ color: 'var(--danger)', marginBottom: 4 }} />
      <div style={{ fontWeight: 600, color: 'var(--danger)' }}>{message}</div>
      {onRetry && (
        <button className="btn btn-outline btn-sm" onClick={onRetry} style={{ marginTop: 8 }}>
          Retry
        </button>
      )}
    </div>
  );
}
