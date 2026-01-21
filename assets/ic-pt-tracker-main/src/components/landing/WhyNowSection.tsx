import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldAlert, Database, TrendingUp } from "lucide-react";

const WhyNowSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-section)" }}
      />
      
      {/* Aurora effect */}
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[400px] rounded-full blur-[150px] -z-10 opacity-15"
           style={{ background: "radial-gradient(ellipse, hsl(185 55% 44% / 0.5), transparent 60%)" }} />
      
      <div className="section-container" ref={ref}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Die Zeit für sauberes Tracking ist jetzt
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="text-center p-6 glass-effect rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Third-Party Cookie Ende
              </h3>
              <p className="text-sm text-muted-foreground">
                Klassische Tracking-Methoden funktionieren nicht mehr
              </p>
            </div>

            <div className="text-center p-6 glass-effect rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                First-Party Daten
              </h3>
              <p className="text-sm text-muted-foreground">
                Eigene Daten werden zum wichtigsten Asset
              </p>
            </div>

            <div className="text-center p-6 glass-effect rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                ROI Messbarkeit
              </h3>
              <p className="text-sm text-muted-foreground">
                Saubere Daten = bessere Entscheidungen
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center p-8 rounded-2xl glass-effect border-accent/20"
          >
            <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
              Der Verlust von Third-Party-Daten macht First-Party-Daten,
              Zero-Party-Daten und saubere Tracking-Strukturen{" "}
              <strong className="text-gradient">essenziell</strong>. iC PT stellt
              sicher, dass Media-Spend Messbarkeit und Performance liefert.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyNowSection;