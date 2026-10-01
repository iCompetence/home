import { type ComponentProps, type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';

const inputCls =
  'h-12 w-full rounded-card-sm border border-lav-navy/50 bg-lav-white px-4 font-brand text-body font-normal text-lav-navy placeholder:text-lav-navy/70 aria-[invalid=true]:border-2 aria-[invalid=true]:border-[#b3433d]';

/** Label + input (+ hint). The visible `*` marks a required field. */
export function FormField({
  label,
  hint,
  id,
  required,
  className,
  ...input
}: {
  label: string;
  hint?: ReactNode;
  id: string;
} & ComponentProps<'input'>) {
  return (
    <div data-ds="FormField" className={cn('flex flex-col gap-3', className)}>
      <label htmlFor={id} className="lav-small font-medium text-lav-navy">
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <input
        id={id}
        required={required}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={inputCls}
        {...input}
      />
      {hint && (
        <p id={`${id}-hint`} className="lav-small font-normal text-lav-navy/70">
          {hint}
        </p>
      )}
    </div>
  );
}

/** Required consent line: a 20px checkbox and its label. */
export function ConsentCheckbox({
  id,
  name,
  value,
  children,
  required,
}: {
  id: string;
  name: string;
  /** Submitted value (defaults to "on"). */
  value?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <div data-ds="ConsentCheckbox" className="flex items-start gap-3">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        required={required}
        className="mt-0 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-lav-navy/50 bg-lav-white bg-center bg-no-repeat checked:border-lav-navy checked:bg-lav-navy checked:bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%2F%3E%3C%2Fsvg%3E')]"
      />
      <label htmlFor={id} className="lav-small cursor-pointer py-[5px] font-normal text-lav-navy/80">
        {children}
        {required && <span aria-hidden> *</span>}
      </label>
    </div>
  );
}
