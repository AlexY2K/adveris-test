# Test Technique

## 🎯 Vue d'ensemble du projet

Cette application Next.js implémente un design de plateforme de podcasts avec animations, contenu dynamique et mises en page responsives. Développée pour une évaluation technique démontrant les pratiques modernes React/Next.js.

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Lancer les tests
npm test

# Lancer les tests avec couverture
npm run test:coverage
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l'application.

## 📋 Fonctionnalités implémentées

- ✅ **Design Responsive** : Mises en page desktop et mobile
- ✅ **Animations** : Parallaxe au scroll, rotation CTA, effets de dégradé au survol, incrémentation des chiffres
- ✅ **API personnalisée** : Endpoint `/api/numbers` pour les statistiques
- ✅ **Intégration API externe** : DummyJSON pour les articles avec routage dynamique
- ✅ **Server Components** : Récupération de données optimisée avec ISR
- ✅ **TypeScript** : Sécurité de type complète
- ✅ **Tests** : Tests unitaires pour les hooks, composants et fonctions API

## 🏗️ Architecture

### Stack technique

- **Framework** : Next.js 16.0.5 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS 4
- **Animations** : Framer Motion
- **Tests** : Jest + React Testing Library

### Structure du projet

```
├── app/                    # Next.js App Router
│   ├── api/               # Routes API
│   ├── articles/           # Pages d'articles dynamiques
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── layout/            # Header, Footer
│   ├── sections/          # Sections de page (Hero, Articles, etc.)
│   └── ui/                # Composants UI réutilisables
├── hooks/                 # Hooks React personnalisés
├── lib/                   # Utilitaires et clients API
│   ├── api/               # Fonctions API
│   ├── types/             # Types TypeScript
│   └── utils/             # Fonctions utilitaires
└── public/                # Assets statiques
```

## 📊 Stratégie de récupération de données

Voir [TECHNICAL_DECISIONS.md](./TECHNICAL_DECISIONS.md) pour les justifications détaillées.

### Résumé

- **Server Components** : Utilisés pour la récupération initiale de données (Articles, contenu statique)
- **ISR (Incremental Static Regeneration)** : Revalidation d'1 heure pour les articles
- **Récupération côté client** : Hook personnalisé (`useNumbers`) pour les statistiques avec valeurs de fallback
- **Routes API** : Endpoint personnalisé `/api/numbers` pour les données statistiques

## 🧪 Tests

Les tests sont situés dans les répertoires `__tests__` co-localisés avec les fichiers sources.

```bash
npm test              # Lancer tous les tests
npm run test:watch    # Mode watch
npm run test:coverage # Rapport de couverture
```

**Couverture des tests :**

- Hooks personnalisés (récupération de données, nettoyage)
- Composants (rendu, interactions utilisateur)
- Fonctions API (gestion d'erreurs, fallbacks)

## 🎨 Implémentation du design

- **Design Figma** : Intégration complète avec breakpoints responsives
- **Animations** :
  - Parallaxe au scroll sur la section hero
  - Rotation du bouton CTA au survol
  - Filtre dégradé radial sur les cartes d'articles
  - Compteurs de chiffres animés au scroll
- **Polices** : Darker Grotesque (titres), Open Sans (corps)

## 📦 Build & Déploiement

```bash
npm run build  # Build de production
npm start      # Démarrer le serveur de production
```

L'application est optimisée pour la production avec :

- Génération de pages statiques (SSG)
- Optimisation d'images (Next.js Image)
- Optimisation de polices (next/font)
- Code splitting

## 🌐 Déploiement

L'application est déployée sur Vercel et accessible à l'adresse suivante :

**🔗 [https://adveris-test.vercel.app/](https://adveris-test.vercel.app/)**

Vous pouvez tester toutes les fonctionnalités directement en ligne :

- Parallaxe sur la section hero
- Animations des boutons CTA
- Navigation vers les articles
- Compteurs animés des statistiques

## 🔧 Développement

### Qualité du code

- **ESLint** : Configuré avec les règles Next.js
- **Prettier** : Formatage du code
- **TypeScript** : Mode strict activé
- **Git** : Commits conventionnels

### Bonnes pratiques

- Composition et réutilisabilité des composants
- Hooks personnalisés pour la récupération de données
- Sécurité de type partout
- Gestion d'erreurs et fallbacks
- Optimisations de performance

## 📝 Notes

- Toutes les animations utilisent Framer Motion pour des interactions fluides et performantes
- La gestion d'erreurs API inclut des valeurs de fallback pour une dégradation gracieuse
- Design responsive testé sur les points de rupture courants
- Le build passe sans erreurs ni avertissements

## 🚀 Améliorations futures

- Error boundaries pour une meilleure gestion d'erreurs
- Squelettes de chargement pour une meilleure UX
- Améliorations d'accessibilité (labels ARIA, navigation au clavier)
- Tests E2E avec Playwright
- Monitoring de performance
