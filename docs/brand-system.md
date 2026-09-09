# Watt & Malt Club — système de marque, phase 2

## Positionnement

Le club de vélo de Brandérion où l’on trouve aussi des copains. Ancré dans le pays de Lorient, ouvert aux allures et aux envies différentes. Le vélo crée le rendez-vous ; les habitudes partagées donnent envie de revenir.

**Signature conservée : « Brûler des Watts, savourer du Malt ».**

**Idée directrice : le club du dimanche, les jambes toute la semaine.**

La performance a sa place lorsque le groupe la choisit. Le café, la bière et la terrasse prolongent les sorties sans devenir une condition d’appartenance. On ne transforme ni le cycliste tranquille en débutant permanent, ni le cycliste rapide en adversaire.

## Audit de la V0

Audit fondé sur les composants, les contenus et le système visuel du dépôt.

- Le hero publicitaire et sa lumière spectaculaire mettaient la performance devant la rencontre.
- La même photo de peloton répétée sur les sorties et le dashboard rendait le club abstrait.
- Les initiales, les biographies répétées et le score géant faisaient ressembler les membres à des données.
- Le logo associait une icône éclair standard à un nom peu composé. Aucun signe propre ne reliait les pages.
- Les grandes phrases universelles (« du lien », « du caractère ») occupaient la place des détails concrets.
- La quasi-absence d’alternance entre fonds sombres et clairs aplatissait la hiérarchie.
- Le territoire apparaissait surtout dans les adresses. Il n’existait pas encore dans les habitudes racontées.

## Personnalité et piliers

| Pilier             | Traduction concrète                                                                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Du coin            | Brandérion comme point de départ, Blavet, Plouay, Hennebont et vent sur la côte dans les récits. Pas de monuments fictifs, de commerce présenté comme partenaire ou de folklore. |
| De bonne compagnie | Prénoms avant statistiques, portraits d’adultes ordinaires, biographies singulières, détails de sortie et attention aux autres.                                                  |
| Du vélo, vraiment  | Allure annoncée, distance lisible, machines entretenues, rendez-vous précis. Les watts restent un plaisir possible.                                                              |
| Le temps d’après   | Espresso, verre en terrasse, anecdotes de mécanique. Bière facultative, boissons sans alcool présentes, aucun défi lié à la consommation.                                        |

## Voix

On tutoie. On écrit comme la personne qui organise la prochaine sortie, pas comme un service marketing. Les consignes restent littérales ; la personnalité se place dans les titres, les descriptions et les moments d’attente.

Préférer : « Tu croises les mêmes maillots à Hennebont. » / « L’allure est annoncée avant de partir. » / « On se retrouve à la prochaine. »

Éviter : « communauté d’exception », « libère ton potentiel », « expériences uniques », « premium », « authentique » et les séries de trois abstractions. Ne pas répéter une plaisanterie sur chaque écran. Ne pas attribuer de fausses citations à de vrais membres.

## Logo

Un mot-symbole composé : **WATT** et **MALT** en capitales condensées puissantes, réunis par une esperluette cuivrée, plus souple. La mention CLUB CYCLISTE — BRANDÉRION ancre la signature dans son territoire.

La version emblème W&M encadrée par « Club cycliste » et « Brandérion · 56 » accompagne les photographies et les pages de marque. L’icône éclair générique disparaît. Le favicon reprend le monogramme typographique.

Les formes définitives du logo SVG sont vectorisées, sans dépendance à une police chez le destinataire. Une version principale crème/cuivre et une version sombre sont conservées dans `public/brand/`. Zone de respiration minimale : hauteur de l’esperluette divisée par deux. Ne pas incliner, ajouter un éclair, une pinte, une hermine ou une ombre au logo.

## Palette et matières

| Teinte        | Valeur  | Rôle                                        |
| ------------- | ------- | ------------------------------------------- |
| Encre carbone | #202522 | Header, texte sur crème, fonds de travail   |
| Pin maritime  | #30473D | Vie du club, encarts et contraste local     |
| Papier crème  | #F1E9D9 | Homepage, grandes respirations éditoriales  |
| Malt          | #D5AB65 | Accents clairs sur fond sombre              |
| Cuivre        | #A34E35 | CTA et esperluette sur crème                |
| Craie         | #FFF9EE | Cartes claires et textes principaux sombres |

Le grain provient principalement des photos. Fines doubles règles, numéros de fiches et cadres évoquent le carnet de club et les enseignes. Pas de fond artificiellement grunge derrière les textes. Les lignes de parcours restent discrètes et abstraites : aucune pseudo-carte n’est présentée comme géographiquement fiable.

## Typographies

- **Barlow Condensed 700/800** : logo, titres courts, noms et chiffres. Énergie cycliste, évocation d’une enseigne et d’un dossard.
- **Georgia italique**, police système : petites respirations éditoriales, propos complices, terrasse et temps long. Jamais pour les données ou formulaires.
- **Manrope 400–700** : texte courant, navigation, filtres. Corps cible 16 px, commandes et labels usuels 14 px minimum.

Les caractères condensés ne doivent pas être écrasés ni se chevaucher. On évite de mettre tous les paragraphes en capitales. Les polices redistribuées restent locales, licences OFL incluses.

## Icônes

Famille Lucide conservée, trait homogène de 1,6–1,75 px, sans arrière-plan carré systématique. Les icônes servent les actions et les informations. Café, vélo et vent deviennent des détails de marque ; la bière apparaît une fois dans la scène d’après-sortie. Flèches réservées aux vrais liens, jamais accolées à tous les titres.

## Photographies et membres

Point de vue du cinquième copain, lumière atlantique diffuse, granit, habits et vélos qui servent, gestes ordinaires. La rencontre au départ compte autant que la route. Au retour, montrer les gens avant les verres. Pas de soleil californien, de peloton publicitaire ou de maillots de marques.

Trois nouveaux assets générés : départ de club, moment en terrasse, planche de 16 portraits. Ce sont des scènes imaginées et des adultes fictifs, signalés comme tels. Les biographies possèdent chacune un lieu, une habitude et une envie. Les photos réelles du club devront remplacer ces illustrations avec l’accord des personnes concernées.

## Système UI

- Homepage claire et éditoriale ; espaces membres sombres, plus pratiques.
- Portrait et prénom d’abord ; affinité en repère secondaire, toujours expliquée dans la fiche.
- Sorties présentées comme des rendez-vous, avec l’organisateur, le départ et le rituel de pause.
- Navigation explicite : Au club, Les copains, Les sorties, Le garage. Sur mobile : Club, Copains, Sorties, Garage.
- Cartes membres horizontales sur petit écran : visage, voix et chiffres restent lisibles.
- Une seule illustration forte par section, marges généreuses, pas d’effets vitreux.
- Les informations de démonstration restent visibles mais ne deviennent pas l’identité.

## Périmètre et contrôle

Même structure et mêmes fonctionnalités V0. Matching, favoris, participations, onboarding et stockage local conservés. Les identifiants des fixtures ne changent pas. Aucune intégration, aucune nouvelle grosse fonctionnalité. TypeScript, lint, build et tests existants doivent continuer à passer.

### Vérification de livraison

Les vérifications TypeScript, lint, build et les 43 tests existants passent. Les nouveaux assets ont été inspectés. Le service de prévisualisation navigateur était indisponible lors de cette phase : le contrôle visuel des pages sur desktop et mobile reste à effectuer. Les adaptations responsives sont implémentées, pas certifiées par une inspection navigateur.
