'use client';

import {
  createContext,
  useContext,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
} from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/components/ui/utils';

/*
 * Form fields and their states (Figma: FormField, State=default|filled|focus|error):
 * focus = 2 px navy border, error = 2 px lav-error border + the message in
 * place of the hint. Errors come from <ValidatedForm>, which runs the browser's
 * own constraint checks (required, type=email/url) on submit and shows the
 * result here instead of the browser's bubbles.
 */

type FormErrors = { fields: Readonly<Record<string, string>>; form: string | null };
const FormErrorsContext = createContext<FormErrors>({ fields: {}, form: null });

const inputCls =
  'h-12 w-full rounded-card-sm border border-lav-navy/50 bg-lav-white px-4 font-brand text-body font-normal text-lav-navy placeholder:text-lav-navy/70 focus:border-2 focus:border-lav-navy focus:outline-hidden aria-[invalid=true]:border-2 aria-[invalid=true]:border-lav-error aria-[invalid=true]:focus:border-lav-error';

/** Error (if any) and the aria wiring for one field. */
function useFieldError(id: string, hint?: ReactNode) {
  const error = useContext(FormErrorsContext).fields[id];
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return { error, aria: { 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy } };
}

/** The hint under a field, replaced by the error message when there is one. */
function FieldMessage({ id, hint, error }: { id: string; hint?: ReactNode; error?: string }) {
  if (error) {
    return (
      <p id={`${id}-error`} className="lav-small font-normal text-lav-error">
        {error}
      </p>
    );
  }
  if (!hint) return null;
  return (
    <p id={`${id}-hint`} className="lav-small font-normal text-lav-navy/70">
      {hint}
    </p>
  );
}

/** Label + input (+ hint or error). The visible `*` marks a required field. */
export function FormField({
  label,
  hint,
  id,
  required,
  requiredMark = true,
  className,
  ...input
}: {
  label: string;
  hint?: ReactNode;
  id: string;
  /** Show the `*` after the label of a required field (default). */
  requiredMark?: boolean;
} & ComponentProps<'input'>) {
  const { error, aria } = useFieldError(id, hint);
  return (
    <div data-ds="FormField" className={cn('flex flex-col gap-3', className)}>
      <label htmlFor={id} className="lav-small font-medium text-lav-navy">
        {label}
        {required && requiredMark && <span aria-hidden> *</span>}
      </label>
      <input id={id} required={required} className={inputCls} {...input} {...aria} />
      <FieldMessage id={id} hint={hint} error={error} />
    </div>
  );
}

/** Label + multi-line text area (three to four lines). */
export function TextAreaField({
  label,
  id,
  required,
  requiredMark = true,
  className,
  ...textarea
}: {
  label: string;
  id: string;
  /** Show the `*` after the label of a required field (default). */
  requiredMark?: boolean;
} & ComponentProps<'textarea'>) {
  const { error, aria } = useFieldError(id);
  return (
    <div data-ds="FormField" className={cn('flex flex-col gap-3', className)}>
      <label htmlFor={id} className="lav-small font-medium text-lav-navy">
        {label}
        {required && requiredMark && <span aria-hidden> *</span>}
      </label>
      <textarea
        id={id}
        required={required}
        className={cn(inputCls, 'h-36 resize-y py-3')}
        {...textarea}
        {...aria}
      />
      <FieldMessage id={id} error={error} />
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
  const { error, aria } = useFieldError(id);
  return (
    <div data-ds="ConsentCheckbox" className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          required={required}
          {...aria}
          className="mt-0 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-lav-navy/50 bg-lav-white bg-center bg-no-repeat checked:border-lav-navy checked:bg-lav-navy checked:bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%2F%3E%3C%2Fsvg%3E')] aria-[invalid=true]:border-2 aria-[invalid=true]:border-lav-error"
        />
        <label htmlFor={id} className="lav-small cursor-pointer py-[5px] font-normal text-lav-navy/80">
          {children}
          {required && <span aria-hidden> *</span>}
        </label>
      </div>
      {/* Indented to the label: 20 px box + 12 px gap. */}
      {error && (
        <p id={`${id}-error`} className="lav-small pl-8 font-normal text-lav-error">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * <form> that validates before `onValidSubmit` runs. `noValidate` turns off
 * the browser's bubbles; the same constraint checks run on submit, every
 * invalid field gets its message and the first one the focus. A message
 * disappears as soon as its field is valid. `onValidSubmit` receives a setter
 * for an error of the whole form (reCAPTCHA, sending), shown by <FormError>.
 */
export function ValidatedForm({
  onValidSubmit,
  children,
  ...form
}: Omit<ComponentProps<'form'>, 'onSubmit' | 'onChange' | 'noValidate'> & {
  onValidSubmit: (form: HTMLFormElement, setFormError: (message: string | null) => void) => void;
}) {
  const { t } = useLanguage();
  const [fields, setFields] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const messageFor = (el: HTMLInputElement | HTMLTextAreaElement) => {
    const v = el.validity;
    if (v.valueMissing) return t(el.type === 'checkbox' ? 'form.error.consent' : 'form.error.required');
    if (v.typeMismatch) return t(el.type === 'email' ? 'form.error.email' : 'form.error.url');
    return el.validationMessage;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const invalid = Array.from(formEl.elements).filter(
      (el): el is HTMLInputElement | HTMLTextAreaElement =>
        (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) &&
        el.willValidate &&
        !el.validity.valid &&
        el.id !== '',
    );
    setFields(Object.fromEntries(invalid.map((el) => [el.id, messageFor(el)])));
    setFormError(null);
    if (invalid.length > 0) {
      invalid[0].focus();
      return;
    }
    onValidSubmit(formEl, setFormError);
  };

  const onChange = (e: ChangeEvent<HTMLFormElement>) => {
    const el = e.target as unknown as HTMLInputElement;
    if (!el.id || !fields[el.id] || !el.validity?.valid) return;
    setFields((prev) => {
      const next = { ...prev };
      delete next[el.id];
      return next;
    });
  };

  return (
    <FormErrorsContext.Provider value={{ fields, form: formError }}>
      <form noValidate onSubmit={onSubmit} onChange={onChange} {...form}>
        {children}
      </form>
    </FormErrorsContext.Provider>
  );
}

/** Error of the whole form (reCAPTCHA, sending); place it above the submit button. */
export function FormError() {
  const { form } = useContext(FormErrorsContext);
  if (!form) return null;
  return (
    <p role="alert" className="lav-small font-normal text-lav-error">
      {form}
    </p>
  );
}
