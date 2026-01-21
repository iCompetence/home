import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  FileText,
  ClipboardList,
  Users2,
  Globe,
  Repeat,
  Plug,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(1); // Start with first item in center (index 1 means item 0 is centered)

  const features = [
    { icon: Sparkles, label: "Automatisierte UTM-Generierung" },
    { icon: FileText, label: "Parameter Templates & Governance Layer" },
    { icon: ClipboardList, label: "Logging & Dokumentation" },
    { icon: Users2, label: "Multi-User Workflow" },
    { icon: Globe, label: "Channel & Vendor Standardisierung" },
    { icon: Repeat, label: "Wiederverwendbare Kampagnenstrukturen" },
    { icon: Plug, label: "Integration in bestehende MarTech Stack-Workflows" },
    { icon: Download, label: "Export in Analytics & BI-Tools" },
  ];

  const getVisibleItems = () => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + features.length) % features.length;
      items.push({ ...features[index], position: i, originalIndex: index });
    }
    return items;
  };

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  // Set initial state to have "Automatisierte UTM-Generierung" in center
  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-section)" }}
      />
      
      {/* Aurora effect */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full blur-[150px] -z-10 opacity-15"
           style={{ background: "radial-gradient(circle, hsl(197 99% 59% / 0.5), transparent 70%)" }} />

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Alles, was Sie für sauberes Tracking brauchen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ein zentrales Tool für die komplette Verwaltung Ihrer
            Kampagnen-Parameter.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:bg-accent/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:bg-accent/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Carousel Items */}
          <div className="flex items-center justify-center gap-6 px-16 py-8">
            {getVisibleItems().map((feature, idx) => {
              const isCenter = feature.position === 0;
              const Icon = feature.icon;
              
              return (
                <motion.div
                  key={feature.originalIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: isCenter ? 1 : 0.5, 
                    scale: isCenter ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    p-8 rounded-2xl transition-all duration-300 flex-shrink-0
                    ${isCenter 
                      ? 'glass-effect border-accent/50 shadow-lg shadow-accent/20 w-72' 
                      : 'glass-effect w-56 hidden md:block'
                    }
                  `}
                >
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300
                    ${isCenter ? 'bg-accent' : 'bg-accent/15'}
                  `}>
                    <Icon className={`w-7 h-7 ${isCenter ? 'text-primary-foreground' : 'text-accent'}`} />
                  </div>
                  <p className={`
                    font-medium leading-snug
                    ${isCenter ? 'text-foreground text-lg' : 'text-muted-foreground text-sm'}
                  `}>
                    {feature.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${index === activeIndex ? 'bg-accent w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;