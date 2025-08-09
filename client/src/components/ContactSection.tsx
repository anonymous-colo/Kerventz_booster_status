import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Headphones } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contactez Notre Équipe 📞
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Nous sommes là pour vous accompagner dans votre parcours
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <i className="fab fa-whatsapp text-white text-3xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">WhatsApp</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Support instantané 24/7</p>
            <Button 
              asChild
              className="bg-green-500 hover:bg-green-600 text-white transform hover:scale-105"
            >
              <a href="https://wa.me/+50937911616" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chatter Maintenant
              </a>
            </Button>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Mail className="text-white text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Email</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Support technique professionnel</p>
            <Button 
              asChild
              className="bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105"
            >
              <a href="mailto:support@kerventzstatus.com">
                <Mail className="w-4 h-4 mr-2" />
                Envoyer un Email
              </a>
            </Button>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Headphones className="text-white text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Support Live</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Chat en temps réel</p>
            <Button 
              className="bg-purple-500 hover:bg-purple-600 text-white transform hover:scale-105"
              onClick={() => alert("Chat en cours de développement")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat Live
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Besoin d'aide personnalisée ? 🤝
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Notre équipe d'experts est disponible pour vous accompagner dans la configuration 
              et l'utilisation optimale de KERVENTZ STATUS.
            </p>
            <Button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <i className="fas fa-rocket mr-2"></i>
              Planifier une Démonstration
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
