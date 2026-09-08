# Watt & Malt Club

**Brûler des Watts, savourer du Malt.**

La communauté cycliste de Brandérion et du pays de Lorient. Cette première version est une **V0 visuelle navigable** destinée à valider la direction artistique et les parcours auprès des cyclistes. Ce n’est pas encore une plateforme communautaire en production.

## Ce qui fonctionne

- Accueil éditorial, dashboard membre et navigation mobile.
- Annuaire de 16 cyclistes fictifs répartis dans 8 communes, recherche et filtres.
- Une fiche par membre, favoris et affinités expliquées.
- Quatre sorties fictives avec détail, participants, étapes indicatives et participation locale réversible.
- Garage de trois vélos concepts, configuration, photo agrandissable du vélo cuivre et exemple de carnet.
- Onboarding en quatre étapes, modification du profil et recalcul des affinités.
- Export JSON et réinitialisation des données locales.
- Navigation clavier, contrôles Radix/shadcn, réduction des mouvements et adaptations mobiles.

**Toutes les personnes, sorties, statistiques météo et configurations sont fictives.** Aucune invitation, aucun email, aucune notification ne sont envoyés. Les parcours ne sont pas des traces utilisables pour naviguer. Les vélos sont des concepts, pas un catalogue commercial.

## Démarrage

Node.js **22.13 minimum** (24 recommandé), npm et un environnement Bash. Le pipeline fourni utilise GNU `timeout`, `flock`, `curl` et `sha256sum` ; sous Windows utiliser WSL, sous macOS fournir les équivalents GNU.

```bash
git clone https://github.com/YouenLEGUIDEC/WMC.git
cd WMC
# Si la V0 est encore en revue :
git checkout feat/watt-malt-v0
npm ci
npm run dev
```

Ouvrir l’URL affichée par Vite. Aucun compte fournisseur, aucune clé API et aucune base de données ne sont nécessaires. `.env.example` documente volontairement cette absence de configuration.

```bash
npm run typecheck
npm run lint
npm run test:unit
npm run build
npm run test:routes
# Ou build + tous les tests :
npm test
```

## Stack réelle

React 19.2.6, TypeScript 5.9 en mode strict, Tailwind CSS 4, API App Router de Next.js 16.2.6, rendu/build **Vinext 0.0.50 sur Vite 8**, Radix/shadcn et Lucide. Zod valide les données locales relues. Les versions exactes sont verrouillées dans `package-lock.json`.

Le runtime Vinext provient du socle d’hébergement de cette V0. Il reste une dépendance jeune : ne pas assimiler cette démo à une validation de son usage pour le futur backend communautaire. Les écrans utilisent des routes et composants React séparés ; une migration vers le runtime Next.js officiel reste possible. Les versions officielles ont été consultées : [React](https://react.dev/versions), [Vite](https://vite.dev/guide/). Le projet conserve les versions compatibles du socle, sans prétendre utiliser chaque dernier patch disponible.

## Architecture

```text
app/                    Routes, metadata, styles et polices locales
components/wmc/         Écrans et composants du produit
components/ui/          Primitives accessibles du socle
lib/demo/data.ts        Source unique des membres, sorties et vélos fictifs
lib/demo/matching.ts    Calcul d’affinités pur et déterministe
lib/demo/store.tsx      État local validé et abonnement React
public/images/          Deux images originales, optimisées en WebP
public/fonts/           Polices locales et licences
worker/                 Entrée de rendu pour l’hébergement Cloudflare
build/                  Adaptation du build pour l’hébergement
scripts/                Commandes vérifiées de développement/build
tests/                 Tests du matching, des données et du rendu des routes
```

Pas de base PostgreSQL, de schéma SQL, de migration ou de faux serveur API dans cette V0. Les entités typées Member, Ride, Bike et DemoProfile constituent le contrat de démonstration. Les identifiants référencent les organisateurs, participants, favoris et participations. Pour P0, remplacer l’adaptateur de démonstration par de vrais services avec autorisations serveur, puis définir les tables PostgreSQL et politiques de visibilité avant toute collecte réelle.

## Routes

`/`, `/dashboard`, `/members`, `/members/[username]`, `/rides`, `/rides/[id]`, `/garage`, `/garage/[bikeId]`, `/onboarding`, `/profile`, `/settings/privacy`.

Les identifiants inconnus affichent une page 404. Les routes non livrées (messages, Lab, administration, carte avancée) ne sont pas présentées comme disponibles.

## RideMatch

Les chiffres sont calculés sur des **données fictives**, pas tirés au hasard. Moyenne pondérée :

| Dimension  | Poids | Règle démo                                                                                  |
| ---------- | ----: | ------------------------------------------------------------------------------------------- |
| Secteur    |  20 % | 100 pour une même commune ; sinon distance indicative au secteur de référence de Brandérion |
| Allure     |  20 % | 100 − 10 × écart en km/h, minimum 0                                                         |
| Distance   |  10 % | 100 − écart de distance habituelle en km, minimum 0                                         |
| Créneau    |  20 % | 100 si identique, 25 sinon                                                                  |
| Discipline |  15 % | 100 si identique, 15 sinon                                                                  |
| Après-vélo |  15 % | 100 si identique, 65 sinon                                                                  |

Le secteur est une approximation scénarisée, **pas un calcul PostGIS ni une distance réelle entre deux domiciles**. La fiche explique chaque dimension. Modifier le profil démo modifie les scores et leur classement. Le style choisi est mémorisé mais n’entre pas encore dans la formule. Aucune donnée FTP ou Strava.

## Données et confidentialité

Clé locale : `wmc-demo-v1`. Profil, favoris et participations restent dans le navigateur. Sans stockage disponible, les actions restent en mémoire pendant la visite avec un avertissement visible. Aucun secret ni token. Les ressources visuelles et polices sont servies localement, sans pisteur, carte tierce ou appel Google Fonts au chargement.

La préférence « privé / membres » n’est pas une politique d’accès serveur : personne d’autre n’accède au profil local. Elle sert uniquement à valider l’onboarding. La page confidentialité explique ces limites. Export et réinitialisation se font depuis `/settings/privacy`. Pour retirer la démo en production, remplacer les imports de `lib/demo` et le provider ; ne pas publier les fixtures comme de vrais membres.

## Direction artistique et assets

Carbone végétal `#141713`, anthracite `#1d211c`, crème `#f2efdf`, malt `#dbad70`. Barlow Condensed pour les grands titres sportifs, Manrope pour le texte. Grands espaces, accents mécaniques et photographie originale. Les deux images ont été générées pour cette V0 : elles ne représentent ni les membres du club ni une sortie réelle. Seul le vélo cuivre dispose d’une image ; les autres concepts affichent une icône et une indication explicite d’absence de photo. Pas de fausse 3D.

Polices sous SIL Open Font License, redistribuées avec leurs licences dans `public/fonts/`. Sources : [Barlow Condensed](https://github.com/google/fonts/tree/main/ofl/barlowcondensed), [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope).

## Déploiement

Le build génère un Worker Cloudflare dans `dist/server/index.js` et les assets dans `dist/client`. `.openai/hosting.json` contient l’identité de l’aperçu privé et aucune clé secrète. Le déploiement Sites utilise ce build. Pour un autre hébergeur, adapter explicitement le runtime et les commandes ; le dépôt n’est pas présenté comme déployable sur Vercel sans adaptation Vinext → Next.js.

Le rendu SSR est le seul usage du Worker. Aucun stockage serveur n’est branché. Le site porte `noindex` pour éviter l’indexation de la démonstration. Aucun domaine personnalisé n’est configuré.

## Suite après validation

Vérifier visuellement cette V0 sur appareils réels, recueillir les retours puis prioriser la vraie création de compte, les permissions, la base PostgreSQL, les sorties réelles et l’administration. Aucune intégration Strava à ce stade. Avant de l’implémenter, vérifier les documentations et accords officiels alors en vigueur ; ne jamais baser les fonctions sociales sur des endpoints de club supprimés ou des données personnelles non autorisées.
