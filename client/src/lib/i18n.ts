export const translations = {
  fr: {
    title: "KERVENTZ STATUS 🚀🔥",
    subtitle: "Gestion de Contacts Professionnelle",
    tagline: "🚀 Plateforme Professionnelle de Gestion",
    heroTitle: "KERVENTZ STATUS",
    heroDescription: "Gérez vos contacts professionnels avec notre solution moderne et sécurisée. Exportation VCF, validation avancée, et interface intuitive.",
    startNow: "Commencer Maintenant",
    learnMore: "En Savoir Plus",
    features: "Fonctionnalités Professionnelles 🔥",
    featuresDescription: "Une solution complète pour la gestion de vos contacts avec des outils avancés et une interface moderne.",
    contact: "Rejoignez KERVENTZ STATUS 🚀",
    contactDescription: "Enregistrez-vous dès maintenant et profitez de nos services professionnels",
    name: "Nom Complet",
    email: "Email",
    phone: "Numéro de Téléphone",
    country: "Pays",
    message: "Message (Optionnel)",
    register: "S'enregistrer Maintenant 🚀🔥",
    success: "Inscription Réussie ! 🎉",
    successMessage: "Votre contact a été ajouté avec succès. Vous pouvez maintenant nous contacter via WhatsApp.",
    whatsappContact: "Contactez-nous sur WhatsApp",
  },
  en: {
    title: "KERVENTZ STATUS 🚀🔥",
    subtitle: "Professional Contact Management",
    tagline: "🚀 Professional Management Platform",
    heroTitle: "KERVENTZ STATUS",
    heroDescription: "Manage your professional contacts with our modern and secure solution. VCF export, advanced validation, and intuitive interface.",
    startNow: "Start Now",
    learnMore: "Learn More",
    features: "Professional Features 🔥",
    featuresDescription: "A complete solution for managing your contacts with advanced tools and modern interface.",
    contact: "Join KERVENTZ STATUS 🚀",
    contactDescription: "Register now and enjoy our professional services",
    name: "Full Name",
    email: "Email",
    phone: "Phone Number",
    country: "Country",
    message: "Message (Optional)",
    register: "Register Now 🚀🔥",
    success: "Registration Successful! 🎉",
    successMessage: "Your contact has been successfully added. You can now contact us via WhatsApp.",
    whatsappContact: "Contact us on WhatsApp",
  },
  es: {
    title: "KERVENTZ STATUS 🚀🔥",
    subtitle: "Gestión Profesional de Contactos",
    tagline: "🚀 Plataforma Profesional de Gestión",
    heroTitle: "KERVENTZ STATUS",
    heroDescription: "Gestiona tus contactos profesionales con nuestra solución moderna y segura. Exportación VCF, validación avanzada e interfaz intuitiva.",
    startNow: "Empezar Ahora",
    learnMore: "Saber Más",
    features: "Características Profesionales 🔥",
    featuresDescription: "Una solución completa para gestionar tus contactos con herramientas avanzadas e interfaz moderna.",
    contact: "Únete a KERVENTZ STATUS 🚀",
    contactDescription: "Regístrate ahora y disfruta de nuestros servicios profesionales",
    name: "Nombre Completo",
    email: "Correo Electrónico",
    phone: "Número de Teléfono",
    country: "País",
    message: "Mensaje (Opcional)",
    register: "Registrarse Ahora 🚀🔥",
    success: "¡Registro Exitoso! 🎉",
    successMessage: "Tu contacto ha sido agregado exitosamente. Ahora puedes contactarnos vía WhatsApp.",
    whatsappContact: "Contáctanos en WhatsApp",
  },
};

export type Language = keyof typeof translations;

export function useTranslation() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "fr";
    }
    return "fr";
  });

  const t = (key: keyof typeof translations.fr) => {
    return translations[language][key] || translations.fr[key];
  };

  const setLanguage_ = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  return { t, language, setLanguage: setLanguage_ };
}

import { useState } from "react";
