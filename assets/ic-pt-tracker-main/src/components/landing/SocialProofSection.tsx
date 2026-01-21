import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote } from "lucide-react";

import freudenbergLogo from "@/assets/logos/freudenberg-white.png";
import eventimLogo from "@/assets/logos/eventim-white.png";
import pepxpressLogo from "@/assets/logos/pepxpress-white.webp";

const testimonials = [
  {
    id: "freudenberg",
    company: "freudenberg",
    companyFull: "freudenberg SE",
    logo: freudenbergLogo,
    role: "Marketing Lead",
    quote:
      "Mit iC PT haben wir unsere Kampagnen-Parameter endlich im Griff. Die Datenqualität in unserem Reporting hat sich massiv verbessert – und das Setup neuer Kampagnen geht jetzt in Minuten statt Stunden.",
  },
  {
    id: "eventim",
    company: "Eventim",
    companyFull: "Eventim",
    logo: eventimLogo,
    role: "Digital Analytics Manager",
    quote:
      "Endlich keine Diskussionen mehr über falsche UTM-Parameter. iC PT hat unsere Prozesse standardisiert und spart uns jede Woche Stunden an manueller Arbeit.",
  },
  {
    id: "pepxpress",
    company: "pepXpress",
    companyFull: "pepXpress",
    logo: pepxpressLogo,
    role: "Head of Performance Marketing",
    quote:
      "Die Kombination aus Automatisierung und klaren Namenskonventionen hat unsere Attribution auf ein neues Level gehoben. Absolute Empfehlung für jedes Performance-Team.",
  },
];

const SocialProofSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="trusted" className="py-16 lg:py-24 border-y border-border relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-section)" }}
      />

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by Experts
          </p>
        </motion.div>

        {/* Clickable Company Names */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveIndex(index)}
              className={`transition-all duration-300 cursor-pointer ${
                activeIndex === index
                  ? "opacity-100 scale-110"
                  : "opacity-30 hover:opacity-60"
              }`}
            >
              <img
                src={testimonial.logo}
                alt={testimonial.company}
                className="h-14 lg:h-[68px] w-auto object-contain"
              />
            </button>
          ))}
        </motion.div>

        {/* Single Testimonial with Animation */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-effect p-8 lg:p-12 rounded-2xl relative">
                <Quote className="absolute top-6 left-6 w-8 h-8 text-accent/20" />
                <blockquote className="text-lg lg:text-xl text-foreground text-center mb-6 relative z-10">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
                <div className="text-center">
                  <div className="font-semibold text-foreground">
                    {testimonials[activeIndex].role}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[activeIndex].companyFull}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;