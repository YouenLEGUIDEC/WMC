import { memberStories } from "./stories.ts";
export type Discipline = "Route" | "Gravel" | "VTT";
export type Member = {
  id: string;
  name: string;
  town: string;
  discipline: Discipline;
  pace: number;
  distance: number;
  day: string;
  style: string;
  social: string;
  bio: string;
  color: string;
  kmAway: number;
  initials: string;
  quote: string;
  road: string;
  ritual: string;
  portrait: number;
};
const names = [
  "Maël",
  "Léna",
  "Thomas",
  "Camille",
  "Erwan",
  "Nolwenn",
  "Hugo",
  "Manon",
  "Baptiste",
  "Alice",
  "Ronan",
  "Jade",
  "Yann",
  "Louise",
  "Arthur",
  "Marine",
];
const towns = [
  "Brandérion",
  "Hennebont",
  "Lorient",
  "Kervignac",
  "Languidic",
  "Lanester",
  "Guidel",
  "Plouay",
];
export const communes = towns;
export const members: Member[] = names.map((name, i) => ({
  id: name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""),
  name,
  town: towns[i % 8],
  discipline: i % 5 === 3 ? "VTT" : i % 3 === 2 ? "Gravel" : "Route",
  pace: [28, 27, 24, 21, 31, 26, 29, 23, 34, 25, 28, 22, 30, 27, 32, 24][i],
  distance: [
    80, 75, 60, 35, 110, 70, 90, 50, 120, 65, 85, 45, 100, 75, 110, 60,
  ][i],
  day:
    i % 3 === 0
      ? "Dimanche matin"
      : i % 3 === 1
        ? "Mercredi soir"
        : "Samedi matin",
  style: [
    "Café ride",
    "Sans pression",
    "Exploration",
    "Nature & sentiers",
    "Les longues échappées",
    "Afterwork",
    "Un peu de rythme",
    "On part ensemble",
  ][i % 8],
  social: i % 4 === 2 ? "Terrasse" : "Café",
  bio: memberStories[i].bio,
  quote: memberStories[i].quote,
  road: memberStories[i].road,
  ritual: memberStories[i].ritual,
  portrait: i,
  color: ["#b58e68", "#788b81", "#8899aa", "#aa8176"][i % 4],
  kmAway: [2, 8, 19, 6, 10, 15, 26, 21][i % 8],
  initials: name.slice(0, 2).toUpperCase(),
}));
export type Ride = {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  town: string;
  discipline: Discipline;
  km: number;
  elevation: number;
  pace: string;
  participants: string[];
  max: number;
  host: string;
  description: string;
  cafe: string;
  route: string[];
  tag: string;
};
export const rides: Ride[] = [
  {
    id: "sunday-malt-ride",
    title: "Le dimanche de Brandérion",
    date: "2026-09-13",
    day: "13",
    month: "SEP",
    time: "08:30",
    town: "Brandérion",
    discipline: "Route",
    km: 82,
    elevation: 680,
    pace: "26–28",
    participants: ["mael", "lena", "erwan", "hugo", "alice", "ronan"],
    max: 12,
    host: "mael",
    description:
      "Départ à 8 h 30 de Brandérion. Maël propose de remonter vers Languidic et Plouay, puis de revenir par Hennebont. Quelques bosses, une allure régulière et une pause café. On attend en haut : personne ne fait le retour tout seul. Prévoir un peu de marge si la conversation continue au retour.",
    cafe: "Pause café à Hennebont • km 58",
    route: ["Brandérion", "Languidic", "Plouay", "Hennebont", "Brandérion"],
    tag: "Personne derrière",
  },
  {
    id: "gravel-au-fil-du-blavet",
    title: "Le Blavet, côté chemins",
    date: "2026-09-12",
    day: "12",
    month: "SEP",
    time: "09:00",
    town: "Hennebont",
    discipline: "Gravel",
    km: 54,
    elevation: 420,
    pace: "21–24",
    participants: ["thomas", "marine", "jade"],
    max: 8,
    host: "thomas",
    description:
      "Thomas propose de suivre le Blavet au départ d’Hennebont, puis de quitter le halage pour quelques chemins. On part pour découvrir, avec une pause casse-croûte au bord de l’eau. Pneus de 35 mm ou plus conseillés. La boucle est indicative : on ajuste selon l’état du terrain.",
    cafe: "Pique-nique au bord du Blavet",
    route: ["Hennebont", "Lochrist", "Languidic", "Hennebont"],
    tag: "Esprit découverte",
  },
  {
    id: "afterwork-cote",
    title: "Après le boulot, la côte",
    date: "2026-09-09",
    day: "09",
    month: "SEP",
    time: "18:00",
    town: "Lorient",
    discipline: "Route",
    km: 46,
    elevation: 280,
    pace: "25–27",
    participants: ["lena", "nolwenn", "louise", "yann"],
    max: 10,
    host: "lena",
    description:
      "Léna propose une boucle après le boulot depuis Lorient, par Larmor-Plage et Guidel. On part à 18 h pour profiter de la lumière, avec un rythme qui laisse parler. Prends tes lumières pour le retour. S’il reste un peu de temps, on cherche une terrasse.",
    cafe: "Une terrasse si le cœur vous en dit",
    route: ["Lorient", "Larmor-Plage", "Guidel", "Lorient"],
    tag: "Afterwork",
  },
  {
    id: "premiers-tours",
    title: "On reprend doucement",
    date: "2026-09-19",
    day: "19",
    month: "SEP",
    time: "10:00",
    town: "Kervignac",
    discipline: "Route",
    km: 32,
    elevation: 160,
    pace: "20–22",
    participants: ["camille", "manon"],
    max: 8,
    host: "camille",
    description:
      "Camille a imaginé une petite boucle au départ de Kervignac pour celles et ceux qui débutent ou reprennent. On vérifie les vélos ensemble avant de partir. Le rythme est doux, les arrêts possibles et les questions bienvenues. On vise la boulangerie au retour.",
    cafe: "Boulangerie au retour",
    route: ["Kervignac", "Nostang", "Brandérion", "Kervignac"],
    tag: "Débutants bienvenus",
  },
];
export type Bike = {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: Discipline;
  color: string;
  weight: string;
  year: number;
  distance: number;
  groupset: string;
  wheels: string;
  tires: string;
  description: string;
};
export const bikes: Bike[] = [
  {
    id: "le-cuivre",
    name: "Le Cuivre",
    brand: "Atelier W&M",
    model: "All Road 01",
    type: "Route",
    color: "Cuivre brossé",
    weight: "8,2",
    year: 2025,
    distance: 2843,
    groupset: "Shimano 105 Di2 · 50/34",
    wheels: "Carbone · profil 40 mm",
    tires: "28 mm · tubeless",
    description:
      "Le vélo des dimanches vers Plouay. Une guidoline qu’on surveille, un petit bruit qu’on cherche encore et déjà quelques bonnes histoires au compteur.",
  },
  {
    id: "passe-partout",
    name: "Passe-partout",
    brand: "Atelier W&M",
    model: "Explore 02",
    type: "Gravel",
    color: "Vert forêt",
    weight: "9,4",
    year: 2024,
    distance: 1260,
    groupset: "Shimano GRX · 40 dents",
    wheels: "Aluminium · 700C",
    tires: "42 mm · tubeless",
    description:
      "Celui qu’on prend pour longer le Blavet, puis voir ce qu’il y a derrière le prochain chemin. Les sacoches restent dessus : on ne sait jamais.",
  },
  {
    id: "les-sous-bois",
    name: "Les Sous-bois",
    brand: "Atelier W&M",
    model: "Trail 03",
    type: "VTT",
    color: "Carbone mat",
    weight: "11,8",
    year: 2023,
    distance: 870,
    groupset: "SRAM NX · 32 dents",
    wheels: "29 pouces · aluminium",
    tires: "2,35 pouces",
    description:
      "Il revient rarement propre des chemins de Languidic. On le rince, on vérifie la transmission et il attend déjà le dimanche suivant.",
  },
];
export const defaultProfile = {
  name: "Youen",
  town: "Brandérion",
  discipline: "Route" as Discipline,
  pace: 28,
  distance: 80,
  day: "Dimanche matin",
  social: "Café",
  style: "Café ride",
  visibility: "Membres uniquement",
};
export type DemoProfile = typeof defaultProfile;
