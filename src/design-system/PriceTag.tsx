import { cn } from '@/components/ui/utils';

/** Price per period with the yearly total underneath. */
export function PriceTag({
  amount,
  period,
  yearly,
  tone = 'light',
  className,
}: {
  /** e.g. "35€" */
  amount: string;
  /** e.g. "/Monat" */
  period: string;
  /** e.g. "jährliche Abrechnung 420€" */
  yearly: string;
  /** `dark` on a navy surface. */
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const text = tone === 'dark' ? 'text-lav-white' : 'text-lav-navy';
  return (
    <div data-ds="PriceTag" className={cn('flex flex-col gap-5', text, className)}>
      <p className="m-0 flex items-baseline gap-1">
        <span className="lav-h1">{amount}</span>
        <span className="lav-body font-medium opacity-70">{period}</span>
      </p>
      <p className="lav-small font-medium opacity-70">{yearly}</p>
    </div>
  );
}
