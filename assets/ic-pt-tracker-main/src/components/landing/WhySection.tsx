import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, TrendingUp, Shield, Zap } from "lucide-react";

const WhySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-section)" }}
      />
      
      {/* Subtle aurora effect */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] -z-10 opacity-15"
           style={{ background: "radial-gradient(circle, hsl(185 55% 44% / 0.5), transparent 70%)" }} />
      
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Warum saubere UTM-Parameter{" "}
            <span className="text-gradient">entscheidend</span> sind
          </h2>
          <p className="text-lg text-muted-foreground">
            Kampagnen werden immer komplexer. Touchpoints vervielfachen sich.
            Ohne konsistente Tracking-Parameter entstehen Datenlücken,
            Reporting-Brüche und ineffiziente Workflows – mit direktem Impact
            auf Media Spend und Performance.
          </p>
        </motion.div>

        {/* Problem/Solution Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Problem Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-effect p-8 rounded-2xl border-l-4 border-destructive"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Ohne Standards</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">×</span>
                Inkonsistente Kampagnenbezeichnungen
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">×</span>
                Tippfehler in UTM-Parametern
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">×</span>
                Fragmentierte Daten im Reporting
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-1">×</span>
                Ineffiziente manuelle Prozesse
              </li>
            </ul>
          </motion.div>

          {/* Solution Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-effect p-8 rounded-2xl border-l-4 border-accent"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Mit iC PT</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                Standardisierte Parameter über alle Channels
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                Automatische Validierung & Fehlerprävention
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                Einheitliches Reporting & Attribution
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">✓</span>
                Effiziente, skalierbare Workflows
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WhySection;