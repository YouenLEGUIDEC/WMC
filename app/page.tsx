import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  MapPin,
  Users,
  Coffee,
  Route,
} from "lucide-react";
import { members, rides } from "@/lib/demo/data";
import { MemberCard, RideCard, SectionTitle } from "@/components/wmc/ui";
export default function Home() {
  return (
    <>
      <section className="hero">
        <img
          width={1672}
          height={941}
          className="hero-photo"
          src="/images/ride.webp"
          alt="Un petit peloton sur les routes de campagne, illustration de l’esprit Watt et Malt"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">
            <span className="live-dot" /> BRANDÉRION · PAYS DE LORIENT ·
            BRETAGNE
          </p>
          <h1>
            LES MÊMES ROUTES.
            <br />
            UN NOUVEAU
            <br />
            <em>PELOTON.</em>
          </h1>
          <p className="hero-sub">Brûler des Watts. Savourer du Malt.</p>
          <p className="hero-description">
            Des gens du coin. Des kilomètres partagés.
            <br />
            Et toujours une bonne raison de s’arrêter.
          </p>
          <div className="hero-actions">
            <Link href="/onboarding" className="btn">
              Trouver mon peloton
              <ArrowUpRight size={20} />
            </Link>
            <Link href="/rides" className="btn glass">
              Découvrir les sorties
              <ArrowUpRight size={20} />
            </Link>
          </div>
          <div className="hero-proof">
            <div className="mini-avatars">
              {members.slice(0, 4).map((m) => (
                <span key={m.id} style={{ background: m.color }}>
                  {m.initials}
                </span>
              ))}
            </div>
            <p>
              21 ou 38 km/h.
              <br />
              <b>Il y a une roue pour toi.</b>
            </p>
          </div>
        </div>
        <div className="hero-coordinate">
          <MapPin size={15} />
          47.792° N / 3.195° O<span>LE DÉPART EST ICI.</span>
        </div>
        <a href="#club" className="hero-scroll">
          <ArrowDown size={16} />
          PRENDRE LA ROUE
        </a>
        <span className="hero-edition">W&M / ÉDITION 001 — 2026</span>
      </section>
      <div className="manifesto-strip">
        <span>DU VÉLO.</span>
        <span>DU LIEN.</span>
        <span>DU CARACTÈRE.</span>
        <i>Et pas besoin d’un KOM pour en faire partie.</i>
      </div>
      <section id="club" className="section intro-grid">
        <div>
          <p className="eyebrow">LE CLUB COMMENCE AU BOUT DE TA RUE</p>
          <h2>
            On roule mieux
            <br />
            quand on roule
            <br />
            <em>bien entouré.</em>
          </h2>
        </div>
        <div className="intro-copy">
          <p>
            Ton prochain compagnon de route habite peut-être à deux kilomètres.
            Même rythme, mêmes envies, même amour des petites routes bretonnes.
          </p>
          <p className="muted">
            Watt & Malt, c’est le point de départ pour se trouver. Du premier
            café ride à la grande échappée du dimanche.
          </p>
          <Link className="text-link" href="/members">
            Rencontrer les cyclistes
            <ArrowUpRight size={18} />
          </Link>
          <div className="values">
            <span>
              <Users />
              Tous les niveaux
            </span>
            <span>
              <Route />
              Ancrés ici
            </span>
            <span>
              <Coffee />
              Le plaisir d’abord
            </span>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <SectionTitle
          eyebrow="LE MEILLEUR PLAN, C’EST DE SORTIR"
          title="La prochaine, c’est avec nous."
          href="/rides"
          link="Toutes les sorties"
        />
        <div className="ride-grid">
          {rides.slice(0, 3).map((r, i) => (
            <RideCard key={r.id} ride={r} index={i} />
          ))}
        </div>
        <p className="data-note">
          Calendrier de démonstration · ces sorties ne sont pas des événements
          réels.
        </p>
      </section>
      <section className="section">
        <SectionTitle
          eyebrow="DES VISAGES, PAS DES SEGMENTS"
          title="Le peloton d’à côté."
          href="/members"
          link="Trouver ma roue"
        />
        <div className="member-grid">
          {members.slice(0, 4).map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
        <p className="data-note">
          16 cyclistes fictifs pour explorer la communauté. Affinités calculées
          sur les profils de démonstration.
        </p>
      </section>
      <section className="garage-teaser">
        <div>
          <p className="eyebrow">CHAQUE VÉLO A UNE HISTOIRE</p>
          <h2>
            DU CARBONE.
            <br />
            ET DU <em>CARACTÈRE.</em>
          </h2>
          <p>
            La machine des grands jours. Celle qui prend la boue.
            <br />
            Fais une place à tes compagnons de route.
          </p>
          <Link href="/garage" className="btn">
            Ouvrir le garage
            <ArrowUpRight size={20} />
          </Link>
        </div>
        <img
          width={1536}
          height={1024}
          src="/images/bike.webp"
          alt="Vélo de route couleur cuivre, concept fictif Watt et Malt"
          loading="lazy"
        />
      </section>
      <section className="final-cta">
        <p className="eyebrow">ON SE RETROUVE AU DÉPART ?</p>
        <h2>
          TA PLACE EST
          <br />
          <em>DANS LE PELOTON.</em>
        </h2>
        <Link href="/onboarding" className="btn">
          Faire les présentations
          <ArrowUpRight size={20} />
        </Link>
        <p>Pas de chrono à battre. Juste de belles sorties à partager.</p>
      </section>
    </>
  );
}
