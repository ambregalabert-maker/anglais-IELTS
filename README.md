# Pépin IELTS

Site d'entraînement à l'IELTS Academic (objectif : le maximum, niveau C2), inspiré de la mécanique des applis de langues :
chemin de leçons, XP, série de jours, badges et Pépin, la mascotte.

Pas de compte et pas de serveur : la progression est enregistrée dans le navigateur.
Pense à l'exporter de temps en temps (Profil → Sauvegarde).

## Lancer le site sur ton ordinateur

Il faut [Node.js](https://nodejs.org) (version 20 ou plus).

```bash
npm install      # une seule fois : installe les outils
npm run dev      # lance le site sur http://localhost:5173
```

## Créer la version à mettre en ligne

```bash
npm run build    # crée le dossier dist/, c'est lui qu'on héberge
```

## Où modifier quoi

| Je veux… | Fichier |
|---|---|
| changer le titre ou la couleur d'une unité | `src/data/units.ts` |
| ajouter des mots ou des exercices à une unité | `src/data/vocab/<unité>.ts` (le format est expliqué dans `src/data/vocab/types.ts`) |
| vérifier que le contenu ne contient pas d'erreur | `npm run check:content` |
| ajouter un badge | `src/data/badges.ts` |
| ajouter un module (ex. Speaking) | une page dans `src/pages/`, puis une ligne dans `src/modules/registry.tsx` |
| changer les couleurs | `src/styles/global.css` (en haut du fichier) |

## Avancement

- [x] Étape 1 : navigation, design, mascotte, XP, niveaux, série, objectif du jour, badges, sauvegarde, export / import
- [x] Étape 2 : leçons du chemin (6 unités de mes cours, 217 mots, 7 types d’exercices)
- [x] Étape 3 : révisions (répétition espacée, « Mes erreurs », flashcards) + niveaux Difficile et Expert, personnages
- [x] Étape 4 : 12 thèmes IELTS (B2 → C2, 541 mots au total) et Vocab Lab (7 modes, glossaire)
- [x] Étape 5 : Writing (Task 2 guidée en 9 étapes, 21 sujets avec essais modèles, modes examen, vérifications automatiques, Task 1 avec graphiques, grammaire)
- [x] Étape 6 : Listening (lien vrais audios, prédire, paraphrases, pièges, consignes, dictées, fiche de conseils)
- [x] Étape 7 : mode Tryhard dans chaque module (flux adaptatif, Pomodoro caché, pauses, bilan)
- [ ] Étape 8 : plan de préparation et bloc « Aujourd'hui »
- [ ] Étape 9 : finitions, PWA (appli installable, hors ligne), mise en ligne
