import { type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';
import { Badge } from './Badge';
import { PriceTag } from './PriceTag';

/** One price tier: optional badge, name, scope, price and a call to action. */
export function PricingCard({
  name,
  scope,
  amount,
  period,
  yearly,
  badge,
  highlight = false,
  action,
}: {
  name: string;
  /** What the tier covers, e.g. "1 Parameter-Raum". */
  scope: string;
  amount: string;
  period: string;
  yearly: string;
  badge?: string;
  /** Navy card for the recommended tier; lavender otherwise. */
  highlight?: boolean;
  /** The CTA, composed by the page (white on navy, dark on lavender). */
  action: ReactNode;
}) {
  return (
    <article
      data-ds="PricingCard"
      className={cn(
        'flex h-full flex-col gap-8 rounded-card p-10',
        highlight ? 'bg-lav-navy text-lav-white' : 'bg-lav-lavender text-lav-navy',
      )}
    >
      {badge && <Badge tone={highlight ? 'lavender' : 'navy'}>{badge}</Badge>}
      <div className="flex flex-col gap-6">
        <h3 className="lav-lead font-medium">{name}</h3>
        <p className={cn('lav-body font-normal', highlight ? 'opacity-70' : 'opacity-80')}>{scope}</p>
      </div>
      <PriceTag amount={amount} period={period} yearly={yearly} tone={highlight ? 'dark' : 'light'} />
      <div className="mt-auto">{action}</div>
    </article>
  );
}
