import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pricingPlans = [
  {
    name: "Basic",
    rooms: "1 Parameter-Raum",
    price: "35",
    yearlyNote: "jährliche Abrechnung 420€",
    highlighted: true,
    badge: "14 Tage Trial Version",
  },
  {
    name: "Advanced",
    rooms: "2 bis 4 Parameter-Räume je Raum",
    price: "30",
    yearlyNote: "jährliche Abrechnung je Raum 360€",
    highlighted: false,
    badge: null,
  },
  {
    name: "Premium",
    rooms: "ab 5 Parameter-Räume je Raum",
    price: "25",
    yearlyNote: "jährliche Abrechnung je Raum 300€",
    highlighted: false,
    badge: null,
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Pricing
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Unser Pricing orientiert sich ausschließlich an der Anzahl der gewünschten Parameter-Räume. 
            Ein Parameter-Raum umfasst individuell definierbare Vorgabewerte, die bei der Erstellung von 
            UTM-Parametern für Kampagnen z.B. eines bestimmten Sprachraums oder einer bestimmten 
            Domain verbindlich genutzt werden sollen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <Card
                className={`relative h-full text-center ${
                  plan.highlighted
                    ? "border-2 border-accent bg-accent/5 shadow-lg"
                    : "bg-card border shadow-sm"
                }`}
              >
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1">
                    {plan.badge}
                  </Badge>
                )}
                <CardHeader className="pb-4 pt-8">
                  <CardTitle className="text-xl md:text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm md:text-base font-medium text-foreground">
                    {plan.rooms}
                  </p>
                  <p className="text-3xl md:text-4xl font-bold text-accent">
                    {plan.price}€<span className="text-lg font-normal">/Monat</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {plan.yearlyNote}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trial CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
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

export default PricingSection;
