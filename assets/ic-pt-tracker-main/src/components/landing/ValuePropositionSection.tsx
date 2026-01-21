import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link2, Users, Clock, BarChart3 } from "lucide-react";

const ValuePropositionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      number: "01",
      icon: Link2,
      title: "Konsistente UTM-Parameter – über alle Channels",
      description:
        "Definiert einmal, genutzt überall. Standardisierte Parameterlogs verhindern Wildwuchs, Tippfehler und unklare Kampagnenbezeichnungen.",
    },
    {
      number: "02",
      icon: Users,
      title: "Zero Maintenance – klare Governance im Team",
      description:
        "Workflows und Templates sorgen dafür, dass Kampagnen vom Setup bis zur Aussteuerung einheitlich sind – auch über mehrere Teams, Brands oder Länder hinweg.",
    },
    {
      number: "03",
      icon: Clock,
      title: "Weniger Zeitverlust – mehr Kampagnen",
      description:
        "Keine mühsame manuelle Parameterpflege mehr in Excel-Sheets oder Slack-Threads. Parameter werden automatisch generiert und dokumentiert.",
    },
    {
      number: "04",
      icon: BarChart3,
      title: "Saubere Analytics & Attribution",
      description:
        "Perfekt vorbereitet für Web Analytics, BI und MMPs. Konsistente Benennungen = bessere Auswertung + bessere Entscheidungsgrundlagen.",
    },
  ];

  return (
    <section id="mehrwerte" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-section)" }}
      />
      
      {/* Aurora effect */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] -z-10 opacity-10"
           style={{ background: "radial-gradient(circle, hsl(310 55% 65% / 0.5), transparent 70%)" }} />
      
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Der Mehrwert für Ihr Team
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group p-8 rounded-2xl glass-effect hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;