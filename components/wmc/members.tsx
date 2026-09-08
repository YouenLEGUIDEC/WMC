"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  ArrowUpRight,
  Calendar,
  Coffee,
  Shield,
  Check,
} from "lucide-react";
import { members, communes, bikes, type Member } from "@/lib/demo/data";
import { compatibility } from "@/lib/demo/matching";
import { useDemo } from "@/lib/demo/store";
import { MemberCard, Choice, Empty, Back, Avatar } from "./ui";
export function Members() {
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState("Toutes les disciplines");
  const [town, setTown] = useState("Tout le pays de Lorient");
  const [day, setDay] = useState("Tous les créneaux");
  const { state } = useDemo();
  const results = members
    .filter(
      (m) =>
        `${m.name} ${m.town}`
          .toLocaleLowerCase("fr")
          .includes(query.toLocaleLowerCase("fr")) &&
        (discipline === "Toutes les disciplines" ||
          m.discipline === discipline) &&
        (town === "Tout le pays de Lorient" || m.town === town) &&
        (day === "Tous les créneaux" || m.day === day),
    )
    .sort(
      (a, b) =>
        compatibility(state.profile, b).score -
        compatibility(state.profile, a).score,
    );
  function reset() {
    setQuery("");
    setDiscipline("Toutes les disciplines");
    setTown("Tout le pays de Lorient");
    setDay("Tous les créneaux");
  }
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">LE BON RYTHME. LES BONNES PERSONNES.</p>
          <h1>
            Trouve <em>ta roue.</em>
          </h1>
          <p className="lead">
            Des cyclistes du coin, avec un peu de toi dans leur façon de rouler.
          </p>
        </div>
        <span className="outline-stamp">
          16 PROFILS
          <br />
          100 % FICTIFS
        </span>
      </div>
      <div className="match-banner">
        <span className="match-symbol">&</span>
        <div>
          <h3>Des affinités, pas une compétition.</h3>
          <p>
            Les scores comparent votre secteur, allure, distance et vos envies.
            Aucun niveau n’est meilleur qu’un autre.
          </p>
        </div>
        <Link href="/onboarding" className="text-link">
          Ajuster mon profil
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="filters">
        <label className="search-field">
          <span className="field-label">Rechercher</span>
          <div>
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Prénom, commune…"
            />
          </div>
        </label>
        <Choice
          label="Discipline"
          value={discipline}
          onChange={setDiscipline}
          options={["Toutes les disciplines", "Route", "Gravel", "VTT"]}
        />
        <Choice
          label="Secteur"
          value={town}
          onChange={setTown}
          options={["Tout le pays de Lorient", ...communes]}
        />
        <Choice
          label="Disponibilité"
          value={day}
          onChange={setDay}
          options={[
            "Tous les créneaux",
            "Dimanche matin",
            "Mercredi soir",
            "Samedi matin",
          ]}
        />
      </div>
      <div className="results-bar">
        <span role="status">{results.length} cyclistes fictifs</span>
        <span>Triés par affinités avec {state.profile.name}</span>
        <button onClick={reset}>Effacer les filtres</button>
      </div>
      {results.length ? (
        <div className="member-grid">
          {results.map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      ) : (
        <Empty
          text="Essaie un autre créneau ou élargis ton secteur."
          action={reset}
        />
      )}
    </div>
  );
}
export function MemberDetail({ member }: { member: Member }) {
  const { state, toggleSave } = useDemo();
  const match = compatibility(state.profile, member);
  const saved = state.saved.includes(member.id);
  return (
    <div className="page">
      <Back href="/members" label="Tous les cyclistes" />
      <div className="profile-cover">
        <span>{member.town.toUpperCase()} / BRETAGNE</span>
        <strong>
          LA ROUTE
          <br />
          SE PARTAGE.
        </strong>
        <span>PROFIL FICTIF · W&M</span>
      </div>
      <div className="profile-heading">
        <Avatar member={member} large />
        <div>
          <p className="eyebrow">MEMBRE DE DÉMONSTRATION</p>
          <h1>
            {member.name}
            <em> · {member.town}</em>
          </h1>
          <p>{member.style}. Et toujours une bonne raison de repartir.</p>
        </div>
        <button
          className="btn secondary"
          aria-pressed={saved}
          onClick={() => toggleSave(member.id)}
        >
          {saved ? <Check size={18} /> : <UsersIcon />}
          {saved ? "Dans mes favoris" : "Garder dans ma roue"}
        </button>
      </div>
      <div className="profile-columns">
        <div>
          <section className="panel">
            <p className="eyebrow">DANS SA ROUE</p>
            <h2>Le plaisir avant le compteur.</h2>
            <p className="bio">{member.bio}</p>
            <div className="profile-stats">
              <div>
                <b>
                  {member.pace}
                  <small> km/h</small>
                </b>
                <span>Allure confortable</span>
              </div>
              <div>
                <b>
                  {member.distance}
                  <small> km</small>
                </b>
                <span>Distance habituelle</span>
              </div>
              <div>
                <b>{member.discipline}</b>
                <span>Discipline favorite</span>
              </div>
            </div>
            <div className="profile-facts">
              <p>
                <MapPin />
                {member.town} · commune uniquement
              </p>
              <p>
                <Calendar />
                {member.day}
              </p>
              <p>
                <Coffee />
                Après la sortie : {member.social.toLowerCase()}
              </p>
            </div>
          </section>
          <section className="panel inner-section">
            <p className="eyebrow">SON COMPAGNON DE ROUTE · EXEMPLE</p>
            <Link href={`/garage/${bikes[0].id}`} className="profile-bike">
              <img
                width={1536}
                height={1024}
                src="/images/bike.webp"
                alt="Vélo de route fictif couleur cuivre"
                loading="lazy"
              />
              <div>
                <h3>{bikes[0].name}</h3>
                <span>
                  Découvrir ce vélo
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          </section>
        </div>
        <aside className="compatibility-panel">
          <p className="eyebrow">VOUS DEUX · RIDE MATCH</p>
          <div className="huge-score">
            {match.score}
            <span>%</span>
          </div>
          <h2>
            {match.score >= 80
              ? "Une belle roue à prendre."
              : "Une rencontre à explorer."}
          </h2>
          <p className="muted">Affinités avec ton profil de démonstration.</p>
          <div className="factor-list">
            {match.factors.map((f) => (
              <div key={f.label}>
                <div className="spread">
                  <b>{f.label}</b>
                  <span>{Math.round(f.score)} / 100</span>
                </div>
                <div className="meter">
                  <span style={{ width: `${f.score}%` }} />
                </div>
                <p>{f.reason}</p>
              </div>
            ))}
          </div>
          <Link className="btn" href={`/rides?buddy=${member.id}`}>
            Trouver une sortie ensemble
            <ArrowUpRight size={18} />
          </Link>
          <p className="small-note">
            <Shield size={16} />
            Basé uniquement sur les préférences fictives déclarées. Aucune
            donnée Strava.
          </p>
        </aside>
      </div>
    </div>
  );
}
function UsersIcon() {
  return <span aria-hidden="true">+</span>;
}
