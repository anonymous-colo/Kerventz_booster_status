# Guide de Déploiement KERVENTZ STATUS

## 📦 Fichier de Déploiement
Le fichier `kerventz-status-deploy.zip` contient tous les fichiers nécessaires pour le déploiement sur Vercel.

## 🚀 Instructions de Déploiement

### Étape 1 : Télécharger le projet
1. Téléchargez le fichier `kerventz-status-deploy.zip`
2. Extrayez le contenu dans un nouveau dossier

### Étape 2 : Préparer Git
```bash
git init
git add .
git commit -m "Initial commit: KERVENTZ STATUS"
```

### Étape 3 : Déployer sur Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub/GitLab
3. Cliquez sur "New Project"
4. Importez votre repository
5. Vercel détectera automatiquement la configuration

### Étape 4 : Configuration (Optionnel)
- Variables d'environnement :
  - `JWT_SECRET` : Clé pour les tokens (optionnel, valeur par défaut disponible)

## 🔑 Accès Admin
- URL : `https://votre-domaine.vercel.app/admin`
- Identifiants :
  - Nom d'utilisateur : `admin`
  - Mot de passe : `kerventz2025`

## ✅ Fonctionnalités Incluses
- ✅ Site public avec formulaire d'inscription
- ✅ Dashboard admin sécurisé et séparé
- ✅ Validation des numéros par pays (Haïti : 8 chiffres, France : 9 chiffres, etc.)
- ✅ Email optionnel (pas obligatoire)
- ✅ Tableau des 5 dernières inscriptions sur le site public
- ✅ Export VCF et CSV
- ✅ Design responsive (mobile et desktop)
- ✅ Mode sombre/clair
- ✅ Support multilingue

## 📱 Responsive Design
Le site s'adapte automatiquement :
- Mobile : Formulaire et tableau empilés
- Desktop : Formulaire et tableau côte à côte

## 🎯 Points Importants
1. **Email optionnel** : Les utilisateurs peuvent s'inscrire sans email
2. **Validation téléphone** : Vérifie la longueur selon le pays sélectionné
3. **Admin séparé** : Aucun lien vers l'admin depuis le site public
4. **Données sécurisées** : Le tableau public ne montre que nom, pays et date

## 📞 Support
Pour toute assistance, contactez l'équipe KERVENTZ STATUS 🚀🔥