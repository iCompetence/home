import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Copy, Check, ChevronDown } from "lucide-react";

const DemoPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="demo" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-section)" }}
      />
      
      {/* Aurora effect */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full blur-[120px] -z-10 opacity-15"
           style={{ background: "radial-gradient(circle, hsl(310 55% 65% / 0.4), transparent 70%)" }} />

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            So funktioniert das Tool
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In wenigen Klicks generieren Teams die passenden Tracking-Parameter
            für neue Kampagnen – inklusive Governance, Logging und Export.
          </p>
        </motion.div>

        {/* Demo UI Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-effect rounded-2xl overflow-hidden">
            {/* Window Header */}
            <div className="bg-secondary px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                iC Parameter Tool
              </div>
              <div className="w-16" />
            </div>

            {/* Tool Interface */}
            <div className="p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Form */}
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Template auswählen
                    </label>
                    <div className="relative">
                      <div className="h-11 bg-secondary rounded-lg border border-border px-4 flex items-center justify-between cursor-pointer hover:border-accent/50 transition-colors">
                        <span className="text-sm text-foreground">
                          Performance Campaign (Google Ads)
                        </span>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Campaign Name
                      </label>
                      <div className="h-11 bg-secondary/50 rounded-lg border border-border px-4 flex items-center">
                        <span className="text-sm text-foreground">
                          Q1_Sale_2024
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Source
                      </label>
                      <div className="h-11 bg-secondary/50 rounded-lg border border-border px-4 flex items-center">
                        <span className="text-sm text-foreground">google</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Medium
                      </label>
                      <div className="h-11 bg-secondary/50 rounded-lg border border-border px-4 flex items-center">
                        <span className="text-sm text-foreground">cpc</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Content
                      </label>
                      <div className="h-11 bg-secondary/50 rounded-lg border border-border px-4 flex items-center">
                        <span className="text-sm text-foreground">
                          hero_banner
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="btn-primary w-full flex items-center justify-center gap-2 pointer-events-none cursor-default">
                    <Play className="w-4 h-4" />
                    Parameter generieren
                  </div>
                </div>

                {/* Right: Output */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Generierte URL
                    </label>
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <div className="flex items-start justify-between gap-4">
                        <code className="text-xs text-accent break-all leading-relaxed">
                          https://shop.example.com/sale?utm_source=google&utm_medium=cpc&utm_campaign=Q1_Sale_2024&utm_content=hero_banner
                        </code>
                        <button className="flex-shrink-0 p-2 rounded-md bg-accent/20 hover:bg-accent/30 transition-colors">
                          <Copy className="w-4 h-4 text-accent" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Validierung
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">
                          Naming Convention ✓
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">
                          Required Parameters ✓
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">
                          URL-Encoding ✓
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-accent" />
                      <span className="text-sm font-medium text-foreground">
                        In Kampagnen-Log gespeichert
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-muted-foreground mt-8 max-w-xl mx-auto"
        >
          Der gesamte Workflow wird zentralisiert und dokumentiert – für
          maximale Transparenz und Nachvollziehbarkeit.
        </motion.p>
      </div>
    </section>
  );
};

export default DemoPreviewSection;