'use client';

import { NightClosing } from './NightFooter';
import { NightNav } from './NightNav';
import { NightPage } from './NightPage';
import { TopicSection } from './TopicSection';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ConsultButton } from './ConsultModal';
import { submitNetlifyForm } from '@/lib/tracking';
import {
  ANCHOR_SCROLL_MARGIN,
  Button,
  ButtonStack,
  FormError,
  FormField,
  ProductHead,
  MoreProducts,
  Section,
  SectionHeader,
  ValidatedForm,
  siteHref,
  smoothAnchor,
} from '@/design-system';

const RECAPTCHA_SITE_KEY = '6LdI1S8sAAAAANG9NRRpioS8kVfZgn3wE5tRRY61';

/** Names, roles (job titles stay English) and photos as on the live page. */
const EXPERTS = [
  { name: 'Dennis Breuer', role: 'Head of Innovation', photo: '/images/experts/Dennis_4x.png' },
  { name: 'Matthias Postel', role: 'CEO iCompetence GmbH', photo: '/images/experts/Matthias_4x.png', credit: true },
  { name: 'Marc-André Lampe', role: 'Applied Intelligence Lead', photo: '/images/experts/Marc_4x.png' },
  { name: 'Lionel Schulz', role: 'Product Innovation Lead', photo: '/images/experts/Lionel_4x.png' },
] as const;

/**
 * Value of the form's `date` field. The page names no dates and no free run
 * any more (Dennis, 26.11.2026: the three free dates of November 2026 are
 * over), so the field is sent hidden with the value the old form's only
 * remaining option had. That keeps the Netlify submissions comparable.
 */
const DATE_CUSTOM_VALUE = 'Individuellen Termin buchen';

/**
 * AI Workshop page in the new design (preview under /lavender/). The live
 * page is German only and hard-coded; the copy here comes from the
 * workshop.* keys (DE in "du", EN as drafted in docs/i18n-luecken.md §2).
 */
export default function AIWorkshopLavender() {
  const { t, language } = useLanguage();

  // In the order of the page. "About the workshop" is the topic section
  // since the workshop's own text moved into the head (26.11.2026).
  const tabs = [
    { id: 'experts', label: t('workshop.anchor.experts') },
    { id: 'form', label: t('workshop.anchor.apply') },
    { id: 'explained', label: t('workshop.anchor.about') },
    { id: 'contact', label: t('workshop.anchor.contact') },
  ];

  return (
    <NightPage
      nav={<NightNav logoHref={siteHref(language, '/')} bar="always" sections={tabs} />}
      footer={
        <NightClosing
          id="contact"
          className={ANCHOR_SCROLL_MARGIN}
          heading={t('lavender.cta.heading')}
          action={
            <ConsultButton variant="solid" topic={t('burgerMenu.aiWorkshop')} />
          }
        />
      }
    >
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
      />

      <ProductHead
        breadcrumbLabel={t('lavender.common.breadcrumb')}
        breadcrumb={[
          { label: t('topNav.products'), href: siteHref(language, '/#products') },
          { label: t('workshop.hero.title') },
        ]}
        media={<Experts />}
        title={t('workshop.hero.title')}
        subline={t('workshop.hero.subline')}
      >
        {/* The workshop's text above the buttons (Dennis, 26.11.2026: next to
            the experts the head was nearly empty; before, a section of its
            own below). Order of the print ad (11/2026) without its line on
            the free seats: promise, body, then the people behind it. Running
            text in one size; the promise stands out by weight. */}
        <div className="flex max-w-measure-lead flex-col gap-6">
          <p className="lav-body font-semibold text-lav-navy">{t('workshop.intro.run3')}</p>
          <p className="lav-body font-normal text-lav-navy/80">{t('workshop.intro.run2')}</p>
          <p className="lav-body font-normal italic text-lav-navy">{t('workshop.intro.run1')}</p>
        </div>
        <ButtonStack>
          <Button asChild variant="primary">
            <a href="#form" onClick={smoothAnchor}>
              {t('workshop.anchor.apply')}
              <ArrowUpRight size={20} strokeWidth={2} />
            </a>
          </Button>
          {/* Jumps past the form to the topic section, the page's "more". */}
          <Button asChild variant="soft">
            <a href="#explained" onClick={smoothAnchor}>
              {t('lavender.jump.workshop')}
              <ArrowDown size={20} strokeWidth={2} />
            </a>
          </Button>
        </ButtonStack>
      </ProductHead>

      <ApplicationForm />
      {/* The general topic after the workshop (orientation sheet: SEO & LLM content). */}
      <TopicSection prefix="lavender.seo.workshop" route="ai-workshop" blockCount={3} faqCount={3} />
      <MoreProducts products={['iknow', 'intelligenticSearch']} />
    </NightPage>
  );
}

/* ---------------- Experts (in place of the gallery) ---------------- */

function Experts() {
  const { t } = useLanguage();
  return (
    <div
      id="experts"
      // In the gallery's place, with the gallery's big corner from desktop up.
      className={`flex flex-col gap-10 rounded-card bg-lav-lavender p-6 md:p-8 lg:rounded-frame lg:p-12 ${ANCHOR_SCROLL_MARGIN}`}
    >
      <h2 className="lav-h2 text-lav-navy">{t('workshop.experts.title')}</h2>
      <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 md:gap-y-10">
        {EXPERTS.map((expert) => (
          <li key={expert.name} className="flex flex-col items-center gap-3 text-center">
            <img
              src={expert.photo}
              alt={expert.name}
              title={'credit' in expert ? t('workshop.experts.photoCredit') : undefined}
              className="mb-5 h-[140px] w-[140px] rounded-full object-cover"
            />
            <h3 className="lav-h3 text-lav-navy">{expert.name}</h3>
            <p className="lav-body font-normal text-lav-navy/70">{expert.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Application form ---------------- */

function ApplicationForm() {
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
      formId: 'ai-workshop',
      language,
      thankYouHref: siteHref(language, 'thank-you'),
      recaptchaErrorMessage: t('form.recaptchaError'),
      submitErrorMessage: t('form.submitError'),
      onError: setFormError,
    });

  return (
    <Section
      id="form"
      className={ANCHOR_SCROLL_MARGIN}
      innerClassName="flex flex-col gap-8 md:gap-10 lg:flex-row lg:gap-16"
    >
      <div className="flex flex-col gap-10 lg:w-[44.2%]">
        <SectionHeader title={t('workshop.form.title')} />
        <p className="lav-lead font-normal text-lav-navy/80">{t('workshop.form.intro')}</p>
      </div>

      <ValidatedForm
        name="ai-workshop"
        id="ai-workshop"
        method="POST"
        data-netlify="true"
        onValidSubmit={onValidSubmit}
        className="flex flex-1 flex-col gap-6 rounded-card bg-lav-lavender p-4 md:p-8 lg:p-10"
      >
        <input type="hidden" name="form-name" value="ai-workshop" />
        <FormField id="workshop-name" name="name" type="text" autoComplete="name" required label={t('workshop.form.name')} />
        <FormField id="workshop-email" name="email" type="email" autoComplete="email" required label={t('workshop.form.email')} />
        <FormField id="workshop-phone" name="phone" type="tel" autoComplete="tel" label={t('workshop.form.phone')} />
        <FormField
          id="workshop-position"
          name="position"
          type="text"
          autoComplete="organization-title"
          required
          label={t('workshop.form.position')}
        />
        <FormField
          id="workshop-company"
          name="company"
          type="text"
          autoComplete="organization"
          required
          label={t('workshop.form.company')}
        />
        <input type="hidden" name="date" value={DATE_CUSTOM_VALUE} />

        {/* Rendered after mount only, so it is absent from the exported HTML:
            Netlify's deploy-time processing would otherwise inject the widget
            here and break hydration (React #418). */}
        {mounted && <div data-netlify-recaptcha="true" />}

        <FormError />
        <Button type="submit" variant="primary" className="w-full">
          {t('workshop.form.submit')}
          <ArrowUpRight size={20} strokeWidth={2} />
        </Button>
      </ValidatedForm>
    </Section>
  );
}

