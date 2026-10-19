# Pépin IELTS

Site d'entraînement à l'IELTS Academic (objectif : 7), inspiré de la mécanique des applis de langues :
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
| ajouter ou modifier une unité du chemin | `src/data/units.ts` |
| ajouter un badge | `src/data/badges.ts` |
| ajouter un module (ex. Speaking) | une page dans `src/pages/`, puis une ligne dans `src/modules/registry.tsx` |
| changer les couleurs | `src/styles/global.css` (en haut du fichier) |

## Avancement

- [x] Étape 1 : navigation, design, mascotte, XP, niveaux, série, objectif du jour, badges, sauvegarde, export / import
- [ ] Étape 2 : leçons du chemin (unités de mes cours, tous les types d'exercices)
- [ ] Étape 3 : révisions (répétition espacée, erreurs, flashcards)
- [ ] Étape 4 : Vocab Lab et nouveaux thèmes IELTS
- [ ] Étape 5 : Writing (Task 2 guidée, mode examen, Task 1, grammaire)
- [ ] Étape 6 : Listening (stratégies)
- [ ] Étape 7 : mode Tryhard et Pomodoro caché
- [ ] Étape 8 : plan de préparation et bloc « Aujourd'hui »
- [ ] Étape 9 : finitions, PWA (appli installable, hors ligne), mise en ligne
