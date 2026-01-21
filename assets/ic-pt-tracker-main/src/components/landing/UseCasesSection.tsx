import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, BarChart2, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const UseCasesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const useCases = [
    {
      icon: Target,
      title: "Performance & Media Teams",
      description:
        "Sauberes Tracking. Schnellere Kampagnen. Weniger Fehler.",
    },
    {
      icon: BarChart2,
      title: "Marketing Ops & Analytics",
      description:
        "Verbesserte Datenqualität für Reporting, Attribution & BI.",
    },
    {
      icon: Building2,
      title: "Media Agencies",
      description:
        "Standardisierung über Kunden & Brands hinweg – auch bei hohen Volumina.",
    },
  ];

  return (
    <section id="use-cases" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Darker section background */}
      <div className="absolute inset-0 -z-10" style={{ background: "hsl(195 85% 5%)" }} />
      
      {/* Aurora effects */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] -z-10 opacity-20"
           style={{ background: "radial-gradient(circle, hsl(185 55% 44% / 0.6), transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] -z-10 opacity-15"
           style={{ background: "radial-gradient(circle, hsl(25 70% 74% / 0.4), transparent 70%)" }} />
      
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Für wen ist iC PT gemacht?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von kleinen Performance-Teams bis zu großen Agenturen – iC PT
            skaliert mit Ihren Anforderungen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group text-center p-8 rounded-2xl glass-effect hover:border-accent/40 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-accent/25 transition-all duration-300">
                <useCase.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{useCase.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Demo CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/trial">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 text-primary-foreground"
              style={{
                background: "var(--gradient-cta)",
                boxShadow: "0 0 40px hsl(185 55% 44% / 0.3)",
              }}
            >
              Trial starten
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;