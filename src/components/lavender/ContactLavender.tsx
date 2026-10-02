'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { submitNetlifyForm, trackCtaClick } from '@/lib/tracking';
import {
  Button,
  Eyebrow,
  FormError,
  FormField,
  Hero,
  PageShell,
  Section,
  TextAreaField,
  TopNav,
  ValidatedForm,
  Footer,
  siteHref,
} from '@/design-system';

const RECAPTCHA_SITE_KEY = '6LdI1S8sAAAAANG9NRRpioS8kVfZgn3wE5tRRY61';
const EMAIL = 'info@icompetence.de';
const PHONE = '+49 40 22636380';

/**
 * Contact page in the new design (preview under /lavender/): hero, contact
 * details next to the form, footer. Same Netlify form ("contact") and fields
 * as the live page.
 */
export default function ContactLavender() {
  const { t, language } = useLanguage();
  const home = siteHref(language, '/');

  return (
    <PageShell
      nav={<TopNav sections={[]} logoHref={home} />}
      footer={<Footer />}
    >
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <Hero title={t('contact.hero.title')} />
      <ContactForm />
    </PageShell>
  );
}

function ContactForm() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // The widget is rendered client-side only (see the note on the container).
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      const g = (window as unknown as { grecaptcha?: { render?: (el: Element, o: object) => void } })
        .grecaptcha;
      const container = document.querySelector('[data-netlify-recaptcha="true"]');
      if (g?.render && container && container.innerHTML === '') {
        g.render(container, { sitekey: RECAPTCHA_SITE_KEY, theme: 'light' });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [mounted]);

  const onValidSubmit = (form: HTMLFormElement, setFormError: (message: string) => void) =>
    submitNetlifyForm(form, {
      formId: 'contact',
      language,
      recaptchaErrorMessage: t('form.recaptchaError'),
      submitErrorMessage: t('form.submitError'),
      onError: setFormError,
    });

  const detail = (label: string, value: string, href: string, trackId: string) => (
    <div className="flex flex-col gap-4">
      <Eyebrow>{label}</Eyebrow>
      <a
        href={href}
        onClick={() => trackCtaClick(trackId, value)}
        // H2 hyphenates long words; an address must never get a hyphen. Where
        // the column is too narrow (1024–1090px) it breaks after the "@".
        className="lav-h2 text-lav-navy no-underline hyphens-none [overflow-wrap:anywhere]"
      >
        {value.split('@').flatMap((part, i) => (i === 0 ? [part] : ['@', <wbr key={i} />, part]))}
      </a>
    </div>
  );

  return (
    <Section id="form" innerClassName="flex flex-col gap-8 md:gap-10 lg:flex-row lg:gap-16">
      <address className="flex flex-col gap-8 not-italic md:gap-10 lg:w-[44.2%]">
        {detail(t('footer.inquiries'), EMAIL, `mailto:${EMAIL}`, 'contact_mail')}
        {detail(t('footer.phone'), PHONE, 'tel:+494022636380', 'contact_phone')}
      </address>

      <ValidatedForm
        name="contact"
        method="POST"
        data-netlify="true"
        onValidSubmit={onValidSubmit}
        className="flex flex-1 flex-col gap-6 rounded-card bg-lav-lavender p-4 md:p-8 lg:p-10"
      >
        <input type="hidden" name="form-name" value="contact" />
        <FormField
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          requiredMark={false}
          label={t('contact.form.name')}
        />
        <FormField
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          requiredMark={false}
          label={t('contact.form.email')}
        />
        <TextAreaField
          id="contact-message"
          name="message"
          rows={5}
          required
          requiredMark={false}
          label={t('contact.form.message')}
        />

        {/* Rendered after mount only, so it is absent from the exported HTML:
            Netlify's deploy-time processing would otherwise inject the widget
            here and break hydration (React #418). */}
        {mounted && <div data-netlify-recaptcha="true" />}

        <FormError />
        <Button type="submit" className="w-full">
          {t('contact.form.submit')}
          <ArrowUpRight size={20} strokeWidth={2} />
        </Button>
      </ValidatedForm>
    </Section>
  );
}
