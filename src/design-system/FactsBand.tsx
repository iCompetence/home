import { BrandStar } from './BrandStar';

export type Fact = { label: string; value: string };

/**
 * Dark band with a short explainer and key figures set large.
 *
 * The mint star never sits behind text: on desktop it fills the left third
 * and the content takes the right eight columns; on tablet and mobile it sits
 * in the top-left corner and the band reserves that space above the content.
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
    <section
      id={id}
      data-ds="FactsBand"
      data-surface="inverse"
      className="relative w-full overflow-hidden bg-lav-navy text-lav-white"
    >
      <div className="relative mx-auto w-full max-w-frame px-6 pb-[var(--section-pad-v)] pt-[144px] md:px-12 md:pt-[186px] lg:px-24 lg:pt-[var(--section-pad-v)]">
        <BrandStar variant="facts" />
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
    </section>
  );
}
