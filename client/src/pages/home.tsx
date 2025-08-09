import { Navigation } from "@/components/Navigation";
import { EnhancedHeroSection } from "@/components/EnhancedHeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { EnhancedContactForm } from "@/components/EnhancedContactForm";
import { EnhancedRecentContactsTable } from "@/components/EnhancedRecentContactsTable";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navigation />
      <EnhancedHeroSection />
      <FeaturesSection />
      <div id="contact-form" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Rejoignez l'Élite KERVENTZ STATUS
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Inscrivez-vous maintenant et découvrez les derniers membres de notre communauté exclusive
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <EnhancedContactForm />
          <EnhancedRecentContactsTable />
        </div>
      </div>
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
