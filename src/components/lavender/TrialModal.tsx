'use client';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Check, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackFormSuccess } from '@/lib/tracking';
import { Button, FormError, FormField, TextAreaField, ValidatedForm } from '@/design-system';

const RECAPTCHA_SITE_KEY = '6LdI1S8sAAAAANG9NRRpioS8kVfZgn3wE5tRRY61';

export type TrialMode = 'trial' | 'demo';

/**
 * Trial / demo request of the Campaign Parameter Tool (Figma: TrialModal).
 * Same Netlify form ("trial") and fields as the live CTTrialModal; on success
 * it thanks inline and closes after two seconds, as there. Radix Dialog
 * brings focus trap, Escape and scroll lock; the overlay scrolls when the
 * card is taller than the viewport (the live modal cuts it off on phones).
 */
export function TrialModal({
  open,
  mode,
  onOpenChange,
}: {
  open: boolean;
  mode: TrialMode;
  onOpenChange: (open: boolean) => void;
}) {
  const { t, language } = useLanguage();
  const [state, setState] = useState<'form' | 'submitting' | 'success'>('form');

  // Fresh form each time it opens.
  useEffect(() => {
    if (open) setState('form');
  }, [open]);

  // reCAPTCHA widget, rendered once the form is in the DOM (as on the live modal).
  useEffect(() => {
    if (!open || state !== 'form') return;
    const timer = setTimeout(() => {
      const g = (
        window as unknown as {
          grecaptcha?: { render?: (el: Element, o: object) => void };
        }
      ).grecaptcha;
      const container = document.querySelector('[data-trial-recaptcha="true"]');
      if (g?.render && container && container.childElementCount === 0) {
        g.render(container, { sitekey: RECAPTCHA_SITE_KEY, theme: 'light' });
      }
    }, 1000);
    return () => clearTimeout(timer);
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
      trackFormSuccess('trial', language);
      setState('success');
      setTimeout(() => onOpenChange(false), 2000);
    } catch {
      setState('form');
      setFormError(t('form.submitError'));
    }
  };

  const title = mode === 'demo' ? t('ct.demo.modal.title') : t('ct.trial.modal.title');
  const subtitle = mode === 'demo' ? t('ct.demo.modal.subtitle') : t('ct.trial.modal.subtitle');
  const submit = mode === 'demo' ? t('ct.demo.modal.submit') : t('ct.trial.modal.submit');

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] overflow-y-auto bg-black/70">
          {/* Centred while it fits, scrolls with the overlay when it does not. */}
          <div className="flex min-h-full items-center justify-center px-4 py-4">
            <Dialog.Content
              data-ds="TrialModal"
              // Start in the first field rather than on the close button.
              onOpenAutoFocus={(e) => {
                e.preventDefault();
                document.getElementById('trial-name')?.focus();
              }}
              className="lavender-page relative flex w-full max-w-[480px] flex-col gap-8 rounded-card bg-lav-lavender p-4 font-brand text-lav-navy md:p-10"
            >
              <div className="flex flex-col gap-5 pr-10">
                <Dialog.Title className="lav-h3 m-0 text-lav-navy">{title}</Dialog.Title>
                <Dialog.Description className="lav-body m-0 font-normal text-lav-navy/80">
                  {subtitle}
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
                  name="trial"
                  method="POST"
                  data-netlify="true"
                  onValidSubmit={onValidSubmit}
                  className="flex flex-col gap-8"
                >
                  <input type="hidden" name="form-name" value="trial" />
                  <FormField
                    id="trial-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    label={t('ct.trial.modal.name')}
                  />
                  <FormField
                    id="trial-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    label={t('ct.trial.modal.email')}
                  />
                  <FormField
                    id="trial-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    required
                    label={t('ct.trial.modal.company')}
                  />
                  <TextAreaField
                    id="trial-message"
                    name="message"
                    rows={3}
                    label={`${t('ct.trial.modal.message')} (${t('ct.trial.modal.optional')})`}
                  />
                  <div data-trial-recaptcha="true" data-netlify-recaptcha="true" />
                  <FormError />
                  <Button type="submit" className="w-full" disabled={state === 'submitting'}>
                    {state === 'submitting' ? t('ct.trial.modal.submitting') : submit}
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
