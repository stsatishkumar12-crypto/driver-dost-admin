import { ReactNode } from 'react';

type Tone = 'gray' | 'green' | 'red' | 'blue' | 'amber';

export function Badge({ tone = 'gray', children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

const RIDE_TONE: Record<string, Tone> = {
  COMPLETED: 'green',
  CANCELLED: 'red',
  REQUESTED: 'amber',
  ACCEPTED: 'blue',
  ARRIVING: 'blue',
  ONGOING: 'blue',
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge tone={RIDE_TONE[status] ?? 'gray'}>{status}</Badge>;
}

export function PaymentBadge({ status }: { status: string }) {
  const tone: Tone = status === 'PAID' ? 'green' : status === 'FAILED' ? 'red' : 'amber';
  return <Badge tone={tone}>{status}</Badge>;
}

export function BoolBadge({ value, yes = 'Yes', no = 'No' }: { value: boolean; yes?: string; no?: string }) {
  return <Badge tone={value ? 'green' : 'gray'}>{value ? yes : no}</Badge>;
}
