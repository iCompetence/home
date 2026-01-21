import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    {
      question: "Ist das Tool cloudbasiert?",
      answer:
        "Ja. iC PT ist eine moderne SaaS-Lösung, die vollständig in der Cloud läuft. Keine lokale Installation erforderlich – einfach im Browser starten.",
    },
    {
      question: "Kann ich eigene Parameterstrukturen definieren?",
      answer:
        "Ja – komplett konfigurierbar. Sie können eigene Templates, Naming Conventions und Validierungsregeln erstellen, die zu Ihrer Unternehmensstruktur passen.",
    },
    {
      question: "Wie funktioniert Team-Kollaboration?",
      answer:
        "Roles, Templates & Workflows sind vollständig integriert. Teammitglieder können mit unterschiedlichen Berechtigungen arbeiten, und alle Änderungen werden protokolliert.",
    },
    {
      question: "Wie wird abgerechnet?",
      answer:
        "Die Abrechnung erfolgt pro Seat oder pro Team – je nach Use Case. Kontaktieren Sie uns für ein individuelles Angebot, das zu Ihren Anforderungen passt.",
    },
    {
      question: "Gibt es eine Integration mit bestehenden Tools?",
      answer:
        "Ja, iC PT lässt sich in bestehende MarTech Stack-Workflows integrieren und bietet Export-Funktionen für gängige Analytics- und BI-Tools.",
    },
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-section)" }}
      />
      
      {/* Aurora effect */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-[120px] -z-10 opacity-10"
           style={{ background: "radial-gradient(circle, hsl(25 70% 74% / 0.5), transparent 70%)" }} />

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Häufig gestellte Fragen
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-effect px-6 border-none rounded-xl"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6 hover:text-accent transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;