import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import WhySection from "@/components/landing/WhySection";
import ValuePropositionSection from "@/components/landing/ValuePropositionSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import DemoPreviewSection from "@/components/landing/DemoPreviewSection";
import WhyNowSection from "@/components/landing/WhyNowSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import PricingSection from "@/components/landing/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ValuePropositionSection />
        <DemoPreviewSection />
        <SocialProofSection />
        <FeaturesSection />
        <UseCasesSection />
        <WhySection />
        <WhyNowSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
