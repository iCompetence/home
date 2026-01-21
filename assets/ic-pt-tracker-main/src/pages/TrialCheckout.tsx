import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich").max(100, "Name ist zu lang"),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255, "E-Mail ist zu lang"),
  company: z.string().trim().min(1, "Firma ist erforderlich").max(200, "Firmenname ist zu lang"),
  message: z.string().trim().max(1000, "Nachricht ist zu lang").optional(),
});

const TrialCheckout = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    // Simulate form submission (replace with actual API call later)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsLoading(false);
    toast({
      title: "Anfrage gesendet!",
      description: "Wir melden uns in Kürze bei Ihnen.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div
          className="absolute top-1/4 right-1/4 w-[600px] h-[400px] rounded-full blur-[150px] -z-10 opacity-20"
          style={{ background: "radial-gradient(ellipse, hsl(185 55% 44% / 0.6), transparent 60%)" }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6 border border-accent/30">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Vielen Dank!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full blur-[150px] -z-10 opacity-20"
        style={{ background: "radial-gradient(ellipse, hsl(185 55% 44% / 0.6), transparent 60%)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full blur-[120px] -z-10 opacity-15"
        style={{ background: "radial-gradient(ellipse, hsl(310 55% 65% / 0.5), transparent 60%)" }}
      />

      {/* Header */}
      <header className="py-6">
        <div className="section-container">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 lg:py-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
                Trial starten
              </h1>
              <p className="text-lg text-muted-foreground">
                Füllen Sie das Formular aus und wir kontaktieren Sie für Ihre 14-tägige Trial-Version.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="p-8 lg:p-10 rounded-2xl border-2 border-accent/40 bg-accent/5 backdrop-blur-sm space-y-6"
              style={{
                boxShadow: "0 0 60px hsl(185 55% 44% / 0.15), inset 0 1px 0 hsl(185 55% 44% / 0.1)",
              }}
            >
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ihr vollständiger Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`h-12 bg-background/80 border-accent/30 focus:border-accent placeholder:text-muted-foreground/60 ${
                    errors.name ? "border-destructive" : ""
                  }`}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  E-Mail *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ihre@email.de"
                  value={formData.email}
                  onChange={handleChange}
                  className={`h-12 bg-background/80 border-accent/30 focus:border-accent placeholder:text-muted-foreground/60 ${
                    errors.email ? "border-destructive" : ""
                  }`}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              {/* Company Field */}
              <div className="space-y-2">
                <label htmlFor="company" className="block text-sm font-medium text-foreground">
                  Firma *
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Firmenname"
                  value={formData.company}
                  onChange={handleChange}
                  className={`h-12 bg-background/80 border-accent/30 focus:border-accent placeholder:text-muted-foreground/60 ${
                    errors.company ? "border-destructive" : ""
                  }`}
                />
                {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                  Nachricht (optional)
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Haben Sie spezielle Anforderungen oder Fragen?"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`bg-background/80 border-accent/30 focus:border-accent placeholder:text-muted-foreground/60 resize-none ${
                    errors.message ? "border-destructive" : ""
                  }`}
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 text-primary-foreground disabled:opacity-70 disabled:cursor-not-allowed"
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
                    Anfrage senden
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              <p className="text-center text-sm text-muted-foreground">
                Kostenlos • Unverbindlich • 14 Tage Trial
              </p>
            </motion.form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrialCheckout;
