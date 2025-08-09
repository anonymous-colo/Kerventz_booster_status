import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n";
import { Shield, Star, Zap, Globe, Users, CheckCircle } from "lucide-react";

export function EnhancedHeroSection() {
  const { t } = useTranslation();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Shield,
      title: "Sécurité Avancée",
      description: "Protection maximale des données"
    },
    {
      icon: Globe,
      title: "Multi-Pays",
      description: "Support international complet"
    },
    {
      icon: Zap,
      title: "Ultra Rapide",
      description: "Performance optimisée"
    },
    {
      icon: Users,
      title: "Communauté K.B.S",
      description: "Réseau professionnel exclusif"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Premium Badge */}
        <div className="mb-8 flex justify-center">
          <Badge className="bg-gradient-to-r from-primary-500 to-blue-600 text-white px-6 py-2 text-sm font-medium rounded-full shadow-lg">
            <Star className="w-4 h-4 mr-2" />
            Plateforme Premium KERVENTZ STATUS 🚀🔥
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-600 to-blue-600 dark:from-white dark:via-primary-400 dark:to-blue-400 bg-clip-text text-transparent leading-tight">
          KERVENTZ STATUS
        </h1>

        {/* Subheading */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Système de Gestion de Contacts Professionnel
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
          Rejoignez l'élite professionnelle avec notre plateforme de gestion de contacts révolutionnaire. 
          Validation anti-doublon, export VCF, support multilingue et bien plus.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`
                p-6 rounded-2xl transition-all duration-300 transform
                ${hoveredFeature === index 
                  ? 'scale-105 bg-gradient-to-br from-primary-500 to-blue-600 text-white shadow-2xl' 
                  : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl'
                }
              `}>
                <feature.icon className={`w-8 h-8 mx-auto mb-3 transition-colors duration-300 ${
                  hoveredFeature === index ? 'text-white' : 'text-primary-600 dark:text-primary-400'
                }`} />
                <h3 className={`font-semibold text-sm mb-1 transition-colors duration-300 ${
                  hoveredFeature === index ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-xs transition-colors duration-300 ${
                  hoveredFeature === index ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Rejoindre KERVENTZ STATUS
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Sécurité Garantie
          </div>
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            Support International
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Communauté Exclusive
          </div>
        </div>
      </div>
    </section>
  );
}