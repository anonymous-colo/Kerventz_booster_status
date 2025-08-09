export const COUNTRIES = [
  { code: "HT", name: "🇭🇹 Haïti", dialCode: "+509", phoneLength: 8 },
  { code: "FR", name: "🇫🇷 France", dialCode: "+33", phoneLength: 9 },
  { code: "US", name: "🇺🇸 États-Unis", dialCode: "+1", phoneLength: 10 },
  { code: "CA", name: "🇨🇦 Canada", dialCode: "+1", phoneLength: 10 },
  { code: "GB", name: "🇬🇧 Royaume-Uni", dialCode: "+44", phoneLength: 10 },
  { code: "DE", name: "🇩🇪 Allemagne", dialCode: "+49", phoneLength: 11 },
  { code: "ES", name: "🇪🇸 Espagne", dialCode: "+34", phoneLength: 9 },
  { code: "IT", name: "🇮🇹 Italie", dialCode: "+39", phoneLength: 10 },
  { code: "BR", name: "🇧🇷 Brésil", dialCode: "+55", phoneLength: 11 },
  { code: "MX", name: "🇲🇽 Mexique", dialCode: "+52", phoneLength: 10 },
];

export const TESTIMONIALS = [
  {
    name: "Marie Dupont K.B.S🚀🔥",
    role: "Directrice Marketing",
    content: "KERVENTZ STATUS a révolutionné notre gestion de contacts. Interface intuitive et fonctionnalités avancées !",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Jean Martin K.B.S🚀🔥",
    role: "CEO Tech Solutions",
    content: "L'export VCF est parfait et la validation anti-doublon nous fait gagner énormément de temps.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Sophie Laurent K.B.S🚀🔥",
    role: "Chef de Projet",
    content: "Interface magnifique et support multilingue parfait pour notre équipe internationale.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Pierre Blanc K.B.S🚀🔥",
    role: "Administrateur IT",
    content: "Le dashboard administrateur est incroyable. Statistiques claires et gestion simplifiée.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Laura Chen K.B.S🚀🔥",
    role: "UX Designer",
    content: "Mode sombre magnifique et interface responsive parfaite sur tous nos appareils.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Marc Rodriguez K.B.S🚀🔥",
    role: "Responsable Commercial",
    content: "Intégration WhatsApp fantastique ! Communication directe avec nos clients en un clic.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
  }
];

export const FEATURES = [
  {
    icon: "fas fa-shield-alt",
    title: "Sécurité Avancée",
    description: "Validation anti-doublon, vérification email et protection des données personnelles.",
    gradient: "from-primary-500 to-primary-700"
  },
  {
    icon: "fas fa-globe",
    title: "Multilingue",
    description: "Support complet pour Français, Anglais et Espagnol avec interface adaptative.",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    icon: "fas fa-download",
    title: "Export VCF",
    description: "Exportation automatique en format VCF avec encodage UTF-8 et emojis.",
    gradient: "from-accent-500 to-orange-600"
  },
  {
    icon: "fas fa-mobile-alt",
    title: "Responsive Design",
    description: "Interface optimisée pour mobile, tablette et desktop avec mode sombre.",
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    icon: "fas fa-chart-line",
    title: "Dashboard Admin",
    description: "Interface d'administration complète avec statistiques et gestion CRUD.",
    gradient: "from-red-500 to-pink-600"
  },
  {
    icon: "fab fa-whatsapp",
    title: "Intégration WhatsApp",
    description: "Bouton WhatsApp stylé pour confirmation et communication directe.",
    gradient: "from-blue-500 to-cyan-600"
  }
];

export const FAQS = [
  {
    question: "Comment fonctionne l'export VCF ?",
    answer: "L'export VCF est automatique et inclut tous les contacts avec un encodage UTF-8 pour préserver les emojis et caractères spéciaux. Le fichier généré est compatible avec tous les clients email et applications de contact modernes."
  },
  {
    question: "Le dashboard admin est-il sécurisé ?",
    answer: "Oui, le dashboard est hébergé sur un sous-domaine séparé avec authentification sécurisée. Sessions limitées à 24h et aucun accès possible depuis le site public pour maximiser la sécurité."
  },
  {
    question: 'Pourquoi le suffixe "K.B.S🚀🔥" est-il ajouté ?',
    answer: "C'est notre signature KERVENTZ STATUS qui identifie tous les membres de notre communauté. Cette distinction permet une reconnaissance immédiate et renforce l'appartenance à notre réseau professionnel."
  },
  {
    question: "Comment fonctionne la validation anti-doublon ?",
    answer: "Notre système vérifie automatiquement les emails et numéros de téléphone existants pour éviter les doublons. Une notification vous informe si un contact similaire existe déjà dans la base de données."
  },
  {
    question: "Quels sont les pays supportés ?",
    answer: "Nous supportons plus de 200 pays avec leurs indicatifs téléphoniques respectifs. Haïti est configuré par défaut, mais vous pouvez sélectionner n'importe quel pays depuis le menu déroulant."
  }
];
