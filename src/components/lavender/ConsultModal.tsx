'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Script from 'next/script';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackFormSuccess } from '@/lib/tracking';
import { Button, FormError, FormField, TextAreaField, ValidatedForm } from '@/design-system';

const RECAPTCHA_SITE_KEY = '6LdI1S8sAAAAANG9NRRpioS8kVfZgn3wE5tRRY61';
const RECAPTCHA_SRC = 'https://www.google.com/recaptcha/api.js?render=explicit';

/**
 * "Book your initial consultation" (Figma: ConsultModal). Opens in place of
 * the jump to the contact page. Same Netlify form ("contact") and fields as
 * the contact page plus "topic", prefilled with the page's product and
 * editable. On success it thanks inline and closes after two seconds, like
 * the TrialModal.
 */
export function ConsultModal({
  open,
  onOpenChange,
  topic = '',
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Product of the page, e.g. "iKnow"; empty on general pages. */
  topic?: string;
}) {
  const { t, language } = useLanguage();
  const [state, setState] = useState<'form' | 'submitting' | 'success'>('form');

  // Fresh form each time it opens.
  useEffect(() => {
    if (open) setState('form');
  }, [open]);

  // reCAPTCHA widget once the form is in the DOM and the script has loaded
  // (it loads with the first opening).
  useEffect(() => {
    if (!open || state !== 'form') return;
    const timer = setInterval(() => {
      const g = (
        window as unknown as {
          grecaptcha?: { render?: (el: Element, o: object) => void };
        }
      ).grecaptcha;
      const container = document.querySelector('[data-consult-recaptcha="true"]');
      if (!g?.render || !container) return;
      if (container.childElementCount === 0) {
        g.render(container, { sitekey: RECAPTCHA_SITE_KEY, theme: 'light' });
      }
      clearInterval(timer);
    }, 300);
    return () => clearInterval(timer);
  }, [open, state]);

  const onValidSubmit = async (
    form: HTMLFormElement,
    setFormError: (message: string | null) => void,
  ) => {
    setState('submitting');
    const params = new URLSearchParams();
    new FormData(form).forEach((value, key) => {
      params.append(key, typeof value === 'string' ? value : '');
    });
    try {
      // Same endpoint as submitNetlifyForm (src/lib/tracking.ts).
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      if (!res.ok) throw new Error(`Netlify form submission failed: ${res.status}`);
      trackFormSuccess('contact', language);
      setState('success');
      setTimeout(() => onOpenChange(false), 2000);
    } catch {
      setState('form');
      setFormError(t('form.submitError'));
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {open && <Script src={RECAPTCHA_SRC} strategy="afterInteractive" />}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] overflow-y-auto bg-black/70">
          {/* Centred while it fits, scrolls with the overlay when it does not. */}
          <div className="flex min-h-full items-center justify-center px-4 py-4">
            <Dialog.Content
              data-ds="ConsultModal"
              // Start in the first field rather than on the close button.
              onOpenAutoFocus={(e) => {
                e.preventDefault();
                document.getElementById('consult-name')?.focus();
              }}
              className="lavender-page relative flex w-full max-w-[480px] flex-col gap-8 rounded-card bg-lav-lavender p-4 font-brand text-lav-navy md:p-10"
            >
              <div className="flex flex-col gap-5 pr-10">
                <Dialog.Title className="lav-h3 m-0 text-lav-navy">{t('cta.button')}</Dialog.Title>
                <Dialog.Description className="lav-body m-0 font-normal text-lav-navy/80">
                  {t('ct.trial.modal.subtitle')}
                </Dialog.Description>
              </div>
              <Dialog.Close
                aria-label={t('lavender.common.close')}
                className="absolute right-4 top-4 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-pill border-0 bg-transparent p-2 text-lav-navy"
              >
                <X aria-hidden size={20} strokeWidth={2} />
              </Dialog.Close>

              {state === 'success' ? (
                <div className="flex flex-col items-center gap-5 py-8 text-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-pill bg-lav-blue/20 text-lav-navy">
                    <Check aria-hidden size={32} strokeWidth={2} />
                  </span>
                  <p role="status" className="lav-body font-medium text-lav-navy">
                    {t('ct.trial.modal.success')}
                  </p>
                </div>
              ) : (
                <ValidatedForm
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  onValidSubmit={onValidSubmit}
                  className="flex flex-col gap-8"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <FormField
                    id="consult-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    requiredMark={false}
                    label={t('contact.form.name')}
                  />
                  <FormField
                    id="consult-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    requiredMark={false}
                    label={t('contact.form.email')}
                  />
                  <FormField
                    id="consult-topic"
                    name="topic"
                    type="text"
                    defaultValue={topic}
                    label={t('lavender.consult.topic')}
                  />
                  <TextAreaField
                    id="consult-message"
                    name="message"
                    rows={3}
                    required
                    requiredMark={false}
                    label={t('contact.form.message')}
                  />
                  <div data-consult-recaptcha="true" data-netlify-recaptcha="true" />
                  <FormError />
                  <Button type="submit" className="w-full" disabled={state === 'submitting'}>
                    {state === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit')}
                  </Button>
                </ValidatedForm>
              )}
            </Dialog.Content>
          </div>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/**
 * "Book your initial consultation" button that opens the ConsultModal —
 * for the closing block and the buy boxes.
 */
export function ConsultButton({
  topic,
  variant,
  className,
  children,
}: {
  topic?: string;
  variant?: 'primary' | 'dark' | 'outline' | 'white';
  className?: string;
  /** Defaults to cta.button with the arrow. */
  children?: ReactNode;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={variant} className={className} onClick={() => setOpen(true)}>
        {children ?? (
          <>
            {t('cta.button')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </>
        )}
      </Button>
      <ConsultModal open={open} onOpenChange={setOpen} topic={topic} />
    </>
  );
}
