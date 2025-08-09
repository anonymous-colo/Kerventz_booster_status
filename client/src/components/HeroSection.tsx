import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Rocket, Info } from "lucide-react";

export function HeroSection() {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
              {t('tagline')}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            {t('heroTitle')}
            <span className="block text-3xl md:text-4xl text-primary-600 dark:text-primary-400 mt-2">🚀🔥</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection('contact-form')}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Rocket className="w-5 h-5 mr-2" />
              {t('startNow')}
            </Button>
            <Button
              onClick={() => scrollToSection('features')}
              variant="outline"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 rounded-xl font-semibold text-lg"
            >
              <Info className="w-5 h-5 mr-2" />
              {t('learnMore')}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Cards Animation */}
      <div className="absolute top-20 left-10 animate-pulse-slow">
        <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-orange-600 rounded-2xl shadow-lg opacity-20"></div>
      </div>
      <div className="absolute bottom-20 right-10 animate-pulse-slow" style={{animationDelay: '1s'}}>
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg opacity-20"></div>
      </div>
    </section>
  );
}
