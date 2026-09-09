import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  Coffee,
  Wind,
  Bike,
  Beer,
  MapPin,
} from "lucide-react";
import { members, rides } from "@/lib/demo/data";
import { MemberCard, RideCard, SectionTitle } from "@/components/wmc/ui";
import { ClubSeal } from "@/components/wmc/brand";
export default function Home() {
  return (
    <div className="club-home">
      <section className="club-hero">
        <div className="club-hero-copy">
          <p className="eyebrow">WATT & MALT CLUB / BRANDÉRION, MORBIHAN</p>
          <h1>
            Du Blavet
            <br />à la <em>terrasse.</em>
          </h1>
          <p className="hero-invitation">
            Il y a des sorties qu’on prolonge
            <br />
            bien après avoir posé le vélo.
          </p>
          <p className="hero-story">
            On part de Brandérion, on prend les petites routes et on apprend à
            se connaître en roulant. Le vent fait le reste. Bienvenue chez Watt
            & Malt.
          </p>
          <div className="hero-actions">
            <Link href="/rides" className="btn">
              Trouver ma prochaine sortie
              <ArrowRight size={18} />
            </Link>
            <Link href="/onboarding" className="text-link">
              Faire les présentations
            </Link>
          </div>
          <div className="hero-handnote">
            <Coffee size={20} />
            <span>Le café d’abord. Les watts juste après.</span>
          </div>
        </div>
        <div className="club-hero-photo">
          <img
            width={1536}
            height={1024}
            src="/images/club-morning.webp"
            alt="Scène imaginée de copains cyclistes au départ, devant une maison de granit"
            fetchPriority="high"
          />
          <div className="photo-caption">
            <span>UN MATIN PAR CHEZ NOUS</span>
            <span>SCÈNE IMAGINÉE · W&M</span>
          </div>
          <ClubSeal />
        </div>
        <div className="hero-baseline">
          <span>Brûler des Watts. Savourer du Malt.</span>
          <a href="#esprit">
            L’esprit du club
            <ArrowDown size={15} />
          </a>
        </div>
      </section>
      <section className="club-territory" aria-label="Notre coin de Bretagne">
        <span>
          <MapPin size={16} />
          NOTRE TERRAIN DE JEU
        </span>
        <p>
          Brandérion <b>—</b> Hennebont <b>—</b> Lorient <b>—</b> Plouay{" "}
          <b>—</b> la côte <b>—</b> et les chemins entre les deux.
        </p>
      </section>
      <section id="esprit" className="section club-manifesto">
        <div>
          <p className="eyebrow">01 / UN CLUB À HAUTEUR DE COPAINS</p>
          <h2>
            On ne connaît pas
            <br />
            encore ton prénom.
            <br />
            <em>Ça peut s’arranger.</em>
          </h2>
        </div>
        <div className="manifesto-copy">
          <p>
            Tu croises les mêmes maillots à Hennebont. Tu reconnais deux vélos
            au feu, à Lanester. Mais au moment de sortir, tu te demandes encore
            qui appeler.
          </p>
          <p>
            Watt & Malt est né de cette envie toute simple : se retrouver pour
            rouler ici. Une boucle après le boulot, les bosses vers Plouay, un
            dimanche qui file jusqu’à la mer.
          </p>
          <p>
            Tu viens pour discuter à 22 km/h ou pour te faire les jambes ?
            L’allure est annoncée avant de partir. À toi de choisir la sortie
            qui te ressemble.
          </p>
          <Link href="/members" className="text-link">
            Mettre des prénoms sur les maillots
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <div className="club-rules">
        <p>
          <span>01</span>Le rythme se dit au départ.
        </p>
        <p>
          <span>02</span>On veille les uns sur les autres.
        </p>
        <p>
          <span>03</span>Le dernier verre n’est jamais obligatoire.
        </p>
      </div>
      <section className="section club-rides">
        <SectionTitle
          eyebrow="02 / ON MET QUOI AU PROGRAMME ?"
          title="Les rendez-vous du coin."
          href="/rides"
          link="Voir le calendrier"
        />
        <div className="ride-grid">
          {rides.slice(0, 3).map((ride, i) => (
            <RideCard key={ride.id} ride={ride} index={i} />
          ))}
        </div>
        <p className="data-note">
          Sorties imaginées pour essayer le site. Aucun rendez-vous réel pour le
          moment.
        </p>
      </section>
      <section className="club-afterride">
        <div className="afterride-photo">
          <img
            width={1536}
            height={1024}
            src="/images/after-ride.webp"
            alt="Scène imaginée de cyclistes adultes discutant en terrasse, vélos à proximité"
            loading="lazy"
          />
          <span className="photo-caption">
            LES VÉLOS SONT POSÉS. PAS LA CONVERSATION.
          </span>
        </div>
        <div className="afterride-copy">
          <p className="eyebrow">LE MALT DANS WATT & MALT</p>
          <h2>
            « On en prend
            <br />
            <em>une petite ? »</em>
          </h2>
          <p>
            Celle-là, on la connaît. On devait rentrer à midi. On parle encore
            de cette bosse, du vent à Guidel et du bruit que fait le vélo de
            Maël.
          </p>
          <p>
            Un café, une bière, un jus. Ce qui nous plaît, c’est la table qu’on
            agrandit quand quelqu’un arrive. Tu peux aussi filer : on se
            retrouve à la prochaine.
          </p>
          <div className="afterride-ritual">
            <Coffee />
            <Beer />
            <span>
              Chacun son verre.
              <br />
              La même tablée.
            </span>
          </div>
          <p className="data-note">
            Scène et anecdote fictives, pour donner le ton du club.
          </p>
        </div>
      </section>
      <section className="section club-members">
        <SectionTitle
          eyebrow="03 / IL Y A DU MONDE DANS LE COIN"
          title="Des jambes. Et des caractères."
          href="/members"
          link="Rencontrer tout le monde"
        />
        <div className="member-grid">
          {members.slice(0, 4).map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
        <p className="data-note">
          Portraits générés et membres fictifs. Leurs petites manies aussi.
        </p>
      </section>
      <section className="club-garage">
        <div>
          <p className="eyebrow">04 / LE COIN DES MONTURES</p>
          <h2>
            Celui qu’on essuie.
            <br />
            Celui qu’on <em>croit</em>
            <br />
            avoir fini de régler.
          </h2>
          <p>
            Du carbone des grands jours au gravel couvert de terre, chaque vélo
            finit par avoir son surnom. On ouvre le garage ?
          </p>
          <Link className="text-link" href="/garage">
            Voir les vélos du club
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="garage-photo-frame">
          <img
            src="/images/bike.webp"
            width={1536}
            height={1024}
            alt="Le Cuivre, vélo concept fictif du garage Watt et Malt"
            loading="lazy"
          />
          <span>FICHE N° 01 — LE CUIVRE / VÉLO CONCEPT</span>
        </div>
      </section>
      <section className="club-final">
        <div className="club-final-icon">
          <Bike size={30} />
          <Wind size={27} />
        </div>
        <p className="eyebrow">ÇA COMMENCE PAR UN PRÉNOM</p>
        <h2>
          La prochaine fois,
          <br />
          <em>viens avec nous.</em>
        </h2>
        <p>
          Dis-nous où tu roules et ce que tu aimes.
          <br />
          On te présentera quelques bonnes roues du coin.
        </p>
        <Link className="btn" href="/onboarding">
          Salut, moi c’est…
          <ArrowRight size={18} />
        </Link>
        <small>Deux minutes. Aucun palmarès demandé.</small>
      </section>
    </div>
  );
}
