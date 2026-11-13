import { Section } from './Section';

export type Fact = { label: string; value: string };

/**
 * Key figures set large, with a short explainer: night inside the day, as the
 * field of the home page's service tabs. A navy field on the light page that
 * reaches the same outer edge as the large pictures; its side padding equals
 * that overhang, so the text inside stays on the page's text edge.
 *
 * The mint star stands inside the field (coloured stars only live in fields
 * now) and never behind text: on desktop it fills the left third next to the
 * content, on tablet and mobile it peeks from the field's top-left corner and
 * the field keeps that space free above the content. A pre-sized webp (1200 px)
 * instead of the 3000 px PNG, as on the home page.
 */
export function FactsBand({
  title,
  lead,
  facts,
  id,
}: {
  title: string;
  lead?: string;
  facts: readonly Fact[];
  id?: string;
}) {
  return (
    <Section id={id} dsName="FactsBand">
      <div
        data-surface="inverse"
        className="relative -mx-4 overflow-hidden rounded-card bg-lav-navy px-4 pb-10 pt-[144px] text-lav-white md:-mx-8 md:px-8 md:pb-14 md:pt-[186px] lg:-mx-10 lg:rounded-frame lg:px-10 lg:py-20"
      >
        <img
          src="/images/nacht-stern-mint.webp"
          alt=""
          aria-hidden
          decoding="async"
          className="pointer-events-none absolute left-[-120px] top-[-120px] w-[320px] max-w-none select-none md:left-[-150px] md:top-[-160px] md:w-[420px] lg:left-[17%] lg:top-1/2 lg:w-[44%] lg:-translate-x-1/2 lg:-translate-y-1/2"
        />
        <div className="relative flex flex-col gap-12 lg:ml-auto lg:w-[65.4%]">
          <div className="flex flex-col gap-6">
            <h2 className="lav-h2 text-lav-white">{title}</h2>
            {lead && <p className="lav-paragraph font-normal text-lav-white/70">{lead}</p>}
          </div>
          <dl className="m-0 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-4 border-t border-lav-white/[0.32] pt-6">
                <dt className="lav-small font-normal text-lav-white/70">{fact.label}</dt>
                <dd className="lav-h2 m-0 text-lav-white">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
