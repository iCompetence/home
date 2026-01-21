import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const HeroSection = () => {
  const valueBullets = [
    "Einheitliche Tracking-Parameter über alle Kampagnen",
    "Keine manuellen Fehler mehr",
    "Saubere Daten für Analytics & Attribution",
    "Optimiert für Media- und Performance-Teams",
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden aurora-bg">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Aurora decorative elements */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -z-10 opacity-30" 
           style={{ background: "radial-gradient(circle, hsl(310 55% 65% / 0.4), transparent 70%)" }} />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[100px] -z-10 opacity-25"
           style={{ background: "radial-gradient(circle, hsl(25 70% 74% / 0.3), transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[150px] -z-10 opacity-20"
           style={{ background: "radial-gradient(ellipse, hsl(185 55% 44% / 0.4), transparent 60%)" }} />

      <div className="section-container py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              <span className="text-gradient">UTM-Automatisierung</span> für Marketing, Media & Analytics Teams
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              Das iCompetence Parameter Tool (iC PT) automatisiert das gesamte
              UTM-Parameter-Management – für konsistente Kampagnen, bessere
              Datenqualität und reibungslose Analysen.
            </p>

            {/* Value Bullets */}
            <ul className="space-y-3 mb-10">
              {valueBullets.map((bullet, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{bullet}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#cta"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex items-center gap-2"
              >
                Trial starten
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <a href="#why" className="btn-secondary inline-flex items-center gap-2">
                Mehr erfahren
              </a>
            </div>
          </motion.div>

          {/* Hero Visual - Tool Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main card with glass effect */}
              <div className="glass-effect p-6 lg:p-8 rounded-2xl animate-float">
                {/* Mock UI Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  <div className="ml-4 h-6 w-32 bg-secondary rounded-md" />
                </div>

                {/* Mock Form Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1.5">Campaign</div>
                      <div className="h-10 bg-secondary rounded-lg border border-border px-3 flex items-center">
                        <span className="text-sm text-foreground">summer_sale_2024</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1.5">Source</div>
                      <div className="h-10 bg-secondary rounded-lg border border-border px-3 flex items-center">
                        <span className="text-sm text-foreground">google</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1.5">Medium</div>
                      <div className="h-10 bg-secondary rounded-lg border border-border px-3 flex items-center">
                        <span className="text-sm text-foreground">cpc</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1.5">Content</div>
                      <div className="h-10 bg-secondary rounded-lg border border-border px-3 flex items-center">
                        <span className="text-sm text-foreground">banner_v2</span>
                      </div>
                    </div>
                  </div>

                  {/* Generated URL */}
                  <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="text-xs text-muted-foreground mb-2">Generated URL</div>
                    <code className="text-xs text-accent break-all">
                      https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale_2024&utm_content=banner_v2
                    </code>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -left-4 glass-effect p-3 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground">Validated</div>
                    <div className="text-xs text-muted-foreground">No errors found</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;