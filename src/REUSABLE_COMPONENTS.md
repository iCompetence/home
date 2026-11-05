# Reusable Landing Page Components

This document explains how to use the modular, reusable components created for your landing page. Each component is designed to be easily configurable and reusable across different projects.

## 🏠 Home Component

**Location:** `/components/Home.tsx`

The hero section with Aurora background, entrance sequence, logo, and scroll indicator.

### Usage
```tsx
import { Home } from './components/Home';

<Home
  logoImage={logoImage}
  headline="We build the personal interface for the agentic era."
  scrollText="Learn more about us"
  onScrollClick={scrollToMission}
  onScrollToPrinciples={scrollToPrinciples}
  onScrollToToolsServices={scrollToToolsServices}
/>
```

### Props
- `logoImage` (string): Logo image source
- `headline` (string): Main headline text
- `scrollText` (string, optional): Scroll indicator text
- `onScrollClick` (function, optional): Callback when scroll indicator clicked
- `onScrollToPrinciples` (function, optional): Callback for principles navigation
- `onScrollToToolsServices` (function, optional): Callback for tools navigation
- `entranceTiming` (object, optional): Custom entrance timing

---

## 📝 Statement Component

**Location:** `/components/Statement.tsx`

A clean statement section with gradient text and customizable content.

### Usage
```tsx
import { Statement } from './components/Statement';

<Statement
  id="mission-section"
  text="Our mission is to build the interface for the agentic era – to make the digital world feel personal again."
  headerContent={<h2>Our Mission</h2>}
/>
```

### Props
- `text` (string): Main statement text
- `id` (string, optional): Section ID for scrolling
- `textStyle` (CSSProperties, optional): Custom text styling
- `headerContent` (ReactNode, optional): Content above statement
- `footerContent` (ReactNode, optional): Content below statement
- `animationType` (string, optional): Animation type

---

## 🪗 Accordion Component

**Location:** `/components/Accordion.tsx`

An expandable accordion section perfect for principles, FAQs, or feature lists.

### Usage
```tsx
import { Accordion } from './components/Accordion';

const items = [
  {
    title: 'Context-rich Data',
    content: 'We build data systems that capture the full human context...'
  },
  // ... more items
];

<Accordion
  id="principles-section"
  title="Our Building Blocks"
  items={items}
  defaultOpen={0}
/>
```

### Props
- `title` (string): Section title
- `items` (AccordionItem[]): Array of accordion items
- `id` (string, optional): Section ID for scrolling
- `allowMultiple` (boolean, optional): Allow multiple items open
- `defaultOpen` (number, optional): Default open item index

---

## 🎠 Carousel Component

**Location:** `/components/Carousel.tsx`

A responsive carousel for showcasing services, products, or features.

### Usage
```tsx
import { Carousel } from './components/Carousel';

const services = [
  {
    title: 'ICU – Customer Journey',
    description: 'With our product, you analyze customer sentiment...',
    icon: Map,
    color: 'var(--brand-accent-1)'
  },
  // ... more services
];

<Carousel
  id="tools-services-section"
  title="Our Tools & Services"
  items={services}
  slidesToShowDesktop={2}
  slidesToShowMobile={1}
/>
```

### Props
- `title` (string): Section title
- `items` (CarouselItem[]): Array of carousel items
- `id` (string, optional): Section ID for scrolling
- `slidesToShowDesktop` (number, optional): Desktop slides count
- `slidesToShowMobile` (number, optional): Mobile slides count
- `itemHeight` (string, optional): Custom item height

---

## 🎯 Teaser Component

**Location:** `/components/Teaser.tsx`

A product teaser section with gradient background, logo, description, and CTA button.

### Usage
```tsx
import { Teaser } from './components/Teaser';

<Teaser
  id="data-gems-section"
  title="Data Gems"
  logoImage={imgRectangle}
  subtitle="The Personal Context Provider for your AI"
  description="Build your personal profile. And inject into your AI conversion in one click."
  heroImage={appScreenshot}
  ctaText="Get early access"
  onCtaClick={() => window.open('https://example.com', '_blank')}
  layout="left-right"
/>
```

### Props
- `title` (string): Product/service name
- `logoImage` (string): Logo image source
- `subtitle` (string): Subtitle text
- `description` (string): Main description
- `heroImage` (string): App screenshot or hero image
- `ctaText` (string, optional): CTA button text
- `onCtaClick` (function, optional): CTA button action
- `layout` (string, optional): 'left-right' or 'right-left'

---

## 🦶 FooterReusable Component

**Location:** `/components/FooterReusable.tsx`

A comprehensive footer with navigation, contact info, social links, and legal links.

### Usage
```tsx
import { FooterReusable } from './components/FooterReusable';

const navigationItems = [
  { label: 'Home', onClick: () => scrollToTop() },
  { label: 'Services', onClick: () => scrollToServices() }
];

const contactInfo = [
  { label: '(Email)', value: 'hello@company.com' },
  { label: '(Phone)', value: '+1 555 123 4567' }
];

<FooterReusable
  navigationItems={navigationItems}
  contactInfo={contactInfo}
  socialLinks={socialLinks}
  legalLinks={legalLinks}
/>
```

### Props
- `navigationItems` (NavigationItem[]): Footer navigation items
- `contactInfo` (ContactInfo[]): Contact information
- `socialLinks` (SocialLink[], optional): Social media links
- `legalLinks` (NavigationItem[], optional): Legal page links
- `backToTopText` (string, optional): Back to top button text

---

## 📰 ContentArticlePage Component

**Location:** `/components/ContentArticlePage.tsx` · Model and helpers: `/lib/content-article.ts`

Template for content article pages (guides that answer one search question and link back to a tool
landing page). Generalised from `EmpCoClusterPage` with the same look; adds a numbered source list with
"last updated" (`#quellen`) and superscript source references. Used for indexable guide pages in the
live design.

### Usage (route `app/[lang]/<tool>/<slug>/page.tsx`)
```tsx
import ContentArticlePage from '@/components/ContentArticlePage';
import { buildArticleJsonLd, toPlainText, type ContentArticleContent } from '@/lib/content-article';

const content: ContentArticleContent = {
  title: 'Greenwashing-Strafen: …',
  kicker: 'Ratgeber',
  pillar: { label: 'EmpCo Audit', href: '/de/empco-audit/' },
  intro: ['**Antwort zuerst.** [^1]'],
  sections: [{ id: 'abschnitt', heading: 'H2', paragraphs: ['Text mit Beleg. [^1,2]'] }],
  faqTitle: 'Häufige Fragen', faq: [{ q: 'Frage?', a: 'Antwort. [^2]' }],
  relatedTitle: 'Weiterlesen', related: [{ label: 'EmpCo Audit', href: '/de/empco-audit/' }],
  cta: { headline: '…', button: 'Zum EmpCo Audit', href: '/de/empco-audit/' },
  ctaIdPrefix: 'empco_strafe',
  sources: [{ title: 'UWG, § 19', url: 'https://www.gesetze-im-internet.de/uwg_2004/__19.html', retrieved: '2026-11-04' }],
  published: '2026-11-04',
  updated: '2026-11-04',
};

// JSON-LD (Article, BreadcrumbList, FAQPage) from the same object, so it matches the visible text
buildArticleJsonLd(content, '/de/empco-audit/greenwashing-strafe/', 'de').map((block, i) => (
  <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }} />
));
<ContentArticlePage content={content} initialLanguage="de" />
```

### Inline markup in all text fields
- `**bold**` – emphasis
- `[label](/path/)` – internal link (with trailing slash)
- `[^1]` / `[^1,3]` – reference to entry 1 (and 3) of `sources`, rendered as superscript link to the source list

### Props
- `content` (ContentArticleContent): see `/lib/content-article.ts` for all fields
- `initialLanguage` ('de' | 'en', optional)

---

## 🎨 Styling & Customization

All components use your established design system:

### CSS Variables
Components reference your CSS custom properties:
- `--gray-white`: Primary text color
- `--gray-light`: Secondary text color  
- `--brand-primary-light`: Accent color
- `--brand-accent-1`, `--brand-accent-2`, etc.: Brand colors

### Animation Types
Most components support these animation types:
- `fadeInUp` (default)
- `fadeIn`
- `slideInLeft`
- `slideInRight`

### Responsive Design
All components are mobile-responsive and follow your established breakpoints:
- Mobile: `≤ 768px`
- Desktop: `> 768px`

---

## 🚀 Quick Start Examples

### Simple Blog Landing Page
```tsx
<Home logoImage="/logo.png" headline="Welcome to Our Blog" />
<Statement text="We share insights about technology and innovation." />
<Accordion title="Topics We Cover" items={blogCategories} />
<FooterReusable navigationItems={blogNavigation} contactInfo={contactDetails} />
```

### Product Showcase
```tsx
<Home logoImage="/logo.png" headline="Revolutionary New Product" />
<Teaser 
  title="Product Name"
  subtitle="The future is here"
  description="Experience the next generation of innovation."
  heroImage="/product-screenshot.png"
/>
<Carousel title="Features" items={productFeatures} />
```

### Service Company
```tsx
<Home logoImage="/logo.png" headline="Professional Services" />
<Statement text="We help businesses transform through technology." />
<Carousel title="Our Services" items={servicesList} />
<Accordion title="Why Choose Us" items={benefits} />
```

---

## 📝 Notes

- Each component includes TypeScript interfaces for type safety
- Components are optimized for performance with proper React patterns
- All animations respect user's motion preferences
- Components follow accessibility best practices
- Mobile-first responsive design approach

**Need a component modified?** Just ask! The modular structure makes it easy to customize or extend any component while maintaining consistency across your design system.