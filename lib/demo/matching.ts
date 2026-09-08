import type { Member, DemoProfile } from "./data";
export function compatibility(profile: DemoProfile, member: Member) {
  const factors = [
    {
      label: "Secteur",
      weight: 20,
      score:
        profile.town === member.town
          ? 100
          : Math.max(30, 100 - member.kmAway * 2),
      reason:
        profile.town === member.town
          ? "Vous partez de la même commune."
          : `Il ou elle roule à ${member.town}, dans le pays de Lorient.`,
    },
    {
      label: "Allure",
      weight: 20,
      score: Math.max(0, 100 - Math.abs(profile.pace - member.pace) * 10),
      reason:
        Math.abs(profile.pace - member.pace) <= 2
          ? "Vos allures déclarées sont proches."
          : "Vos allures habituelles diffèrent : adaptez la sortie ensemble.",
    },
    {
      label: "Distance",
      weight: 10,
      score: Math.max(0, 100 - Math.abs(profile.distance - member.distance)),
      reason:
        Math.abs(profile.distance - member.distance) <= 20
          ? "Vous aimez les sorties de longueur similaire."
          : "Convenez ensemble d’une distance confortable.",
    },
    {
      label: "Disponibilités",
      weight: 20,
      score: profile.day === member.day ? 100 : 25,
      reason:
        profile.day === member.day
          ? `${member.day} en commun.`
          : "Vos créneaux habituels sont différents.",
    },
    {
      label: "Discipline",
      weight: 15,
      score: profile.discipline === member.discipline ? 100 : 15,
      reason:
        profile.discipline === member.discipline
          ? `Le vélo de ${member.discipline.toLowerCase()} vous rassemble.`
          : "Vous pratiquez surtout des disciplines différentes.",
    },
    {
      label: "Après-vélo",
      weight: 15,
      score: profile.social === member.social ? 100 : 65,
      reason:
        profile.social === member.social
          ? `Une pause ${member.social.toLowerCase()} pour prolonger la sortie.`
          : "À vous de trouver votre rituel après la sortie.",
    },
  ];
  return {
    score: Math.round(
      factors.reduce((sum, f) => sum + f.score * f.weight, 0) / 100,
    ),
    factors,
  };
}
