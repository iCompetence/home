/** Customer quote with the company logo, the person's role and company. */
export function ReviewCard({
  logo,
  logoAlt,
  quote,
  role,
  company,
}: {
  logo: string;
  logoAlt: string;
  quote: string;
  role: string;
  company: string;
}) {
  return (
    <figure data-ds="ReviewCard" className="m-0 flex h-full flex-col gap-8 rounded-card bg-lav-lavender p-8">
      <img src={logo} alt={logoAlt} loading="lazy"className="h-11 w-32 object-contain" />
      <blockquote className="m-0">
        <p className="lav-body font-normal text-lav-navy">{quote}</p>
      </blockquote>
      <figcaption className="flex flex-col gap-4">
        <span className="lav-small block font-medium text-lav-navy">{role}</span>
        <span className="lav-small block font-normal text-lav-navy/70">{company}</span>
      </figcaption>
    </figure>
  );
}
