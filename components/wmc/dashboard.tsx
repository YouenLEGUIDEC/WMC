"use client";
import Link from "next/link";
import { ArrowUpRight, Sun, Wind, Coffee, Check, Plus } from "lucide-react";
import { useDemo } from "@/lib/demo/store";
import { members, rides, bikes } from "@/lib/demo/data";
import { compatibility } from "@/lib/demo/matching";
import { SectionTitle, MemberCard } from "./ui";
export function Dashboard() {
  const { state } = useDemo();
  const recommended = [...members].sort(
    (a, b) =>
      compatibility(state.profile, b).score -
      compatibility(state.profile, a).score,
  );
  const next = rides.find((r) => state.joined.includes(r.id)) ?? rides[0];
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">LA PORTE DU CLUB EST OUVERTE</p>
          <h1>
            Salut {state.profile.name}.<br />
            <em>Tu sors le vélo ?</em>
          </h1>
        </div>
        <Link className="btn" href="/rides">
          Je veux rouler
          <ArrowUpRight size={20} />
        </Link>
      </div>
      <div className="dashboard-top">
        <div className="featured-ride">
          <img
            width={1672}
            height={941}
            src="/images/ride.webp"
            alt="Peloton dans la campagne"
          />
          <div className="featured-content">
            <p className="eyebrow">
              {state.joined.includes(next.id)
                ? "TU ES DANS LE PELOTON"
                : "ON TE PROPOSE CE TOUR"}
            </p>
            <h2>{next.title}</h2>
            <p>
              {next.day} septembre · {next.time} · {next.town}
            </p>
            <div className="big-stats">
              <span>
                {next.km}
                <small>KM</small>
              </span>
              <span>
                {next.elevation}
                <small>M D+</small>
              </span>
              <span>
                {next.pace}
                <small>KM/H</small>
              </span>
            </div>
            <Link href={`/rides/${next.id}`} className="btn">
              {state.joined.includes(next.id)
                ? "Voir ma sortie"
                : "Prendre la roue"}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="dashboard-aside">
          <article className="weather">
            <div className="spread">
              <span className="eyebrow">MÉTÉO · EXEMPLE</span>
              <Sun size={30} />
            </div>
            <div className="temperature">
              18°<small>Brandérion</small>
            </div>
            <p>Une couche légère, et le vent dans le dos au retour ?</p>
            <div className="weather-details">
              <span>
                <Wind size={16} />
                Ouest · 12 km/h
              </span>
              <span>Risque de pluie · 10 %</span>
            </div>
            <p className="data-note">
              Données fictives, à ne pas utiliser pour préparer une sortie.
            </p>
          </article>
          <Link href="/onboarding" className="profile-prompt">
            <span className="eyebrow">FAIS LES PRÉSENTATIONS</span>
            <h3>
              {state.onboarded
                ? "Tes habitudes ont changé ?"
                : "On ne s’est pas encore présentés."}
            </h3>
            <p>
              {state.onboarded
                ? "Ajuste tes envies et tes disponibilités."
                : "Ton coin, ton allure et le jour où tu es libre."}
              <ArrowUpRight size={19} />
            </p>
          </Link>
        </div>
      </div>
      <section className="inner-section">
        <SectionTitle
          eyebrow="RIDE MATCH · À TON RYTHME"
          title="Ces copains-là roulent un peu comme toi."
          href="/members"
          link="Mes affinités"
        />
        <div className="member-grid">
          {recommended.slice(0, 4).map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      </section>
      <div className="dashboard-bottom">
        <section className="panel">
          <SectionTitle
            eyebrow="LES RENDEZ-VOUS DU COIN"
            title="Les prochains rendez-vous."
            href="/rides"
            link="Voir tout"
          />
          {rides.slice(0, 3).map((r) => (
            <Link className="event-row" key={r.id} href={`/rides/${r.id}`}>
              <span className="small-date">
                <b>{r.day}</b>SEP
              </span>
              <div>
                <h3>{r.title}</h3>
                <p>
                  {r.town} · {r.time} · {r.km} km
                </p>
              </div>
              {state.joined.includes(r.id) ? (
                <Check className="amber" />
              ) : (
                <Plus />
              )}
            </Link>
          ))}
        </section>
        <section className="panel">
          <SectionTitle
            eyebrow="LES COMPAGNONS DE ROUTE"
            title="Dans ton garage."
            href="/garage"
            link="Ouvrir"
          />
          <Link className="dashboard-bike" href={`/garage/${bikes[0].id}`}>
            <img
              width={1536}
              height={1024}
              src="/images/bike.webp"
              alt="Vélo cuivre fictif"
              loading="lazy"
            />
            <div>
              <h3>{bikes[0].name}</h3>
              <p>
                {bikes[0].distance.toLocaleString("fr-FR")} km · {bikes[0].type}
              </p>
            </div>
            <ArrowUpRight />
          </Link>
          <p className="small-note">
            <Coffee size={17} />
            Le petit bruit attendra moins longtemps si on en parle au garage.
          </p>
        </section>
      </div>
    </div>
  );
}
