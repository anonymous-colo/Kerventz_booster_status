# KERVENTZ STATUS - Professional Contact Management

## Description
KERVENTZ STATUS est un système complet de gestion de contacts professionnels avec site d'inscription public et dashboard administrateur séparé.

## Fonctionnalités
- ✅ Site d'inscription public avec formulaire de contact
- ✅ Dashboard administrateur sécurisé
- ✅ Support multilingue (Français, Anglais, Espagnol)
- ✅ Validation de numéros de téléphone par pays
- ✅ Export VCF et CSV
- ✅ Mode sombre/clair
- ✅ Design responsive
- ✅ Tableau des dernières inscriptions
- ✅ Validation anti-doublon

## Installation

### Déploiement sur Vercel

1. Téléchargez le fichier ZIP du projet
2. Extrayez les fichiers dans un nouveau dossier
3. Initialisez un dépôt Git :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
4. Connectez à Vercel :
   - Allez sur [vercel.com](https://vercel.com)
   - Importez votre projet depuis GitHub/GitLab
   - Vercel détectera automatiquement la configuration

### Variables d'environnement (optionnel)
- `JWT_SECRET` : Clé secrète pour les tokens JWT (valeur par défaut disponible)

## Accès Admin
- URL : `/admin` ou `/admin/login`
- Identifiants par défaut :
  - Nom d'utilisateur : `admin`
  - Mot de passe : `kerventz2025`

## Structure du projet
```
├── client/               # Frontend React + Vite
│   ├── src/
│   │   ├── components/   # Composants UI
│   │   ├── pages/        # Pages de l'application
│   │   ├── lib/          # Utilitaires et configuration
│   │   └── hooks/        # Hooks React personnalisés
├── server/               # Backend Express
│   ├── index.ts          # Point d'entrée du serveur
│   ├── routes.ts         # Routes API
│   ├── storage.ts        # Gestion des données
│   └── vite.ts           # Configuration Vite
├── shared/               # Schémas partagés
│   └── schema.ts         # Validation Zod
├── vercel.json           # Configuration Vercel
└── README.md            # Documentation
```

## Développement local
```bash
npm install
npm run dev
```

## Technologies utilisées
- **Frontend** : React 18, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend** : Express.js, TypeScript
- **Validation** : Zod
- **Authentification** : JWT + bcrypt
- **Base de données** : Stockage en mémoire (extensible vers PostgreSQL)
- **Build** : Vite + esbuild

## Support
Pour toute question ou assistance, contactez l'équipe KERVENTZ STATUS 🚀🔥