const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Produkt",
      links: [
        { label: "Features", href: "#features" },
        { label: "Use Cases", href: "#use-cases" },
        { label: "Demo", href: "#demo" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Unternehmen",
      links: [
        { label: "Über iCompetence", href: "https://icompetence.de" },
        { label: "Kontakt", href: "#cta" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Impressum", href: "#" },
        { label: "Datenschutz", href: "#" },
      ],
    },
  ];

  return (
    <footer className="py-16 border-t border-border" style={{ background: "hsl(195 85% 5%)" }}>
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand - iCompetence Style */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-accent font-bold text-2xl">i</span>
              <span className="font-bold text-foreground text-xl">Competence</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Das iCompetence Parameter Tool für professionelles UTM-Management.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold mb-4 text-foreground">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} iCompetence GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;