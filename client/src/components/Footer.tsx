export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">KERVENTZ STATUS</h3>
                <p className="text-gray-400">🚀🔥 Professional Contact Management</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg mb-6 max-w-md">
              La solution professionnelle de gestion de contacts pour les entreprises modernes. 
              Sécurisé, efficace et intuitif.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <i className="fab fa-facebook-f text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <i className="fab fa-twitter text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <i className="fab fa-linkedin-in text-white"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors">
                <i className="fab fa-instagram text-white"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Fonctionnalités</a></li>
              <li><a href="#contact-form" className="text-gray-300 hover:text-white transition-colors">S'inscrire</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tarifs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Confidentialité</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 KERVENTZ STATUS. Tous droits réservés. 🚀🔥
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Fabriqué avec ❤️ en Haïti</span>
            <div className="flex space-x-2">
              <span className="text-xs bg-gray-800 px-2 py-1 rounded">v2.0</span>
              <span className="text-xs bg-green-600 px-2 py-1 rounded">En ligne</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
