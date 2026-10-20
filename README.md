# Pépin IELTS

Site d'entraînement à l'IELTS Academic, de B1 jusqu'au C2 (objectif : le maximum de points).
Inspiré de la mécanique des applis de langues : chemin de leçons, XP, série de jours, badges,
et une bande de personnages (Pépin, Earl Grey, Mia, Bolt et Nimbus).

Pas de compte et pas de serveur : la progression est enregistrée dans le navigateur.
Pense à l'exporter de temps en temps (Profil → Sauvegarde) pour ne rien perdre.

## Ce que contient le site

| Section | Contenu |
|---|---|
| **Chemin** | 18 unités : les 6 de tes cours, puis 12 thèmes IELTS (B2 → C1 → C2), 541 mots, 7 types d'exercices, évaluation de fin d'unité, niveaux Normale / Difficile / Expert. Bloc « Aujourd'hui » avec le plan de préparation |
| **Vocab Lab** | Familles de mots, collocations, paraphrase, synonymes par niveau, registre formel, expressions idiomatiques, orthographe (dictée), glossaire avec recherche |
| **Writing** | Task 2 guidée (les 9 étapes du guide), 21 sujets avec essai modèle, modes examen Task 1 et Task 2 chronométrés, vérifications automatiques surlignées, « Copier pour correction », Task 1 sur graphiques, grammaire du Booklet 2 |
| **Listening** | Lien vers de vrais tests audio, stratégies d'anticipation (prédire, paraphrases, pièges, consignes), dictées de noms, numéros, dates et prix, fiche de conseils |
| **Révisions** | Répétition espacée (5 boîtes), « Mes erreurs », flashcards par paquet |
| **Profil** | Statistiques, badges, réglages (date d'examen, objectif du jour, difficulté, voix, sons, thème), export / import |
| **Tryhard** | Dans chaque module : séance longue et adaptative, Pomodoro caché en option, bilan avec points faibles |

## Mettre le site en ligne (gratuit, une seule fois)

Le site se publie tout seul sur **GitHub Pages** à chaque modification, grâce au fichier
`.github/workflows/deploy.yml`. Il suffit d'activer GitHub Pages une fois :

1. Ouvre le dépôt sur GitHub : **Settings** → **Pages** (menu de gauche).
2. Dans **Build and deployment** → **Source**, choisis **GitHub Actions**.
3. Va dans l'onglet **Actions**, ouvre « Mise en ligne », et clique sur **Run workflow** (ou attends la prochaine modification).
4. Après une à deux minutes, le site est en ligne à l'adresse :
   **https://ambregalabert-maker.github.io/anglais-IELTS/** (attention aux majuscules de « IELTS »)

Le site est aussi publié sur **Vercel** : **https://anglais-ielts-public.vercel.app**

### L'installer sur ton téléphone

- **iPhone (Safari)** : ouvre l'adresse du site → bouton Partager → **Sur l'écran d'accueil**.
- **Android (Chrome)** : ouvre l'adresse → menu ⋮ → **Installer l'application**.

Une fois installé, le site s'ouvre comme une appli et fonctionne **hors ligne**.

> Autres hébergeurs gratuits possibles : [Netlify](https://app.netlify.com) ou [Vercel](https://vercel.com).
> Importe le dépôt GitHub, commande de build `npm run build`, dossier à publier `dist`.

## Lancer le site sur un ordinateur

Il faut [Node.js](https://nodejs.org) (version 20 ou plus).

```bash
npm install            # une seule fois : installe les outils
npm run dev            # lance le site sur http://localhost:5173
npm run build          # crée la version à publier dans dist/
npm run check:content  # vérifie tout le contenu (doublons, réponses absentes…)
```

## Où modifier quoi

| Je veux… | Fichier |
|---|---|
| changer le titre ou la couleur d'une unité | `src/data/units.ts` |
| ajouter des mots ou des exercices à une unité | `src/data/vocab/<unité>.ts` (format expliqué dans `src/data/vocab/types.ts`) |
| ajouter une unité | un fichier dans `src/data/vocab/`, puis une ligne dans `src/data/vocab/index.ts` et `src/data/units.ts` |
| ajouter des exercices au Vocab Lab | `src/data/lab/content.ts` et `src/data/lab/families.ts` |
| ajouter un sujet Task 2 (avec essai modèle) | `src/data/writing/topics.ts` |
| ajouter un graphique Task 1 | `src/data/writing/task1.ts` |
| ajouter de la grammaire | `src/data/writing/grammar.ts` |
| modifier le Listening | `src/data/listening.ts` |
| modifier le plan de préparation | `src/plan/plan.ts` |
| ajouter un badge | `src/data/badges.ts` |
| ajouter un personnage | `src/characters/cast.ts` et `src/characters/Character.tsx` |
| ajouter un module (ex. Speaking) | une page dans `src/pages/`, puis une ligne dans `src/modules/registry.tsx` |
| changer les couleurs | `src/styles/global.css` (en haut du fichier) |

Après une modification du contenu, lance `npm run check:content` : le script signale les erreurs
(phrase à trous sans `___`, réponse absente des options, doublons…). La mise en ligne lance aussi
cette vérification et s'arrête s'il y a un problème.

## Avancement

- [x] Étape 1 : navigation, design, mascotte, XP, niveaux, série, objectif du jour, badges, sauvegarde
- [x] Étape 2 : leçons du chemin (unités des cours, 7 types d'exercices)
- [x] Étape 3 : révisions (répétition espacée, « Mes erreurs », flashcards), niveaux Difficile et Expert, personnages
- [x] Étape 4 : 12 thèmes IELTS (B2 → C2, 541 mots au total) et Vocab Lab (7 modes, glossaire)
- [x] Étape 5 : Writing (Task 2 guidée, 21 sujets avec essais modèles, modes examen, vérifications automatiques, Task 1, grammaire)
- [x] Étape 6 : Listening (vrais audios, prédire, paraphrases, pièges, consignes, dictées, conseils)
- [x] Étape 7 : mode Tryhard dans chaque module (flux adaptatif, Pomodoro caché, bilan)
- [x] Étape 8 : plan de préparation (4 phases) et bloc « Aujourd'hui »
- [x] Étape 9 : finitions, appli installable et hors ligne (PWA), mise en ligne automatique
