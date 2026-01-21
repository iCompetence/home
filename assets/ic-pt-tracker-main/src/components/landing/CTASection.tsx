import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const emailSchema = z.string().trim().email("Bitte geben Sie eine gültige E-Mail-Adresse ein");

const CTASection = () => {
  const ref = useRef(null);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <section id="cta" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 -z-10" style={{ background: "hsl(195 85% 5%)" }} />
      
      {/* Aurora decorative elements */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full blur-[150px] -z-10 opacity-20"
           style={{ background: "radial-gradient(ellipse, hsl(185 55% 44% / 0.6), transparent 60%)" }} />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full blur-[120px] -z-10 opacity-15"
           style={{ background: "radial-gradient(ellipse, hsl(310 55% 65% / 0.5), transparent 60%)" }} />

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center p-8 lg:p-12 rounded-2xl border-2 border-accent/40 bg-accent/5 backdrop-blur-sm"
          style={{
            boxShadow: "0 0 60px hsl(185 55% 44% / 0.15), inset 0 1px 0 hsl(185 55% 44% / 0.1)",
          }}
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="py-8"
              >
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6 border border-accent/30">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Vielen Dank für Ihre Anfrage!
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail("");
                  }}
                  className="text-accent hover:text-accent/80 font-medium transition-colors"
                >
                  Weitere Demo anfragen
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-8 border border-accent/30">
                  <Calendar className="w-8 h-8 text-accent" />
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                  Erleben Sie <span className="text-gradient">iC PT</span> in der Live-Demo
                </h2>

                <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Wir zeigen Ihnen, wie das Tool Datenqualität steigert, Workflows
                  beschleunigt und Reporting vereinfacht.
                </p>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-2">
                    <div className="w-full sm:flex-1">
                      <Input
                        type="email"
                        placeholder="Ihre E-Mail-Adresse"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        className={`h-14 px-5 text-base bg-background/80 border-accent/30 focus:border-accent placeholder:text-muted-foreground/60 ${
                          error ? "border-destructive" : ""
                        }`}
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 text-primary-foreground whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{
                        background: "var(--gradient-cta)",
                        boxShadow: "0 0 40px hsl(185 55% 44% / 0.3)",
                      }}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Wird gesendet...
                        </>
                      ) : (
                        <>
                          Demo anfragen
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                  {error && (
                    <p className="text-sm text-destructive mt-2">{error}</p>
                  )}
                </form>

                <p className="mt-6 text-sm text-muted-foreground">
                  Kostenlos • Unverbindlich • 30 Minuten
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;