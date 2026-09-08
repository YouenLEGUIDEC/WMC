"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Check,
  MapPin,
  Clock,
  Coffee,
  Users,
  Shield,
  ArrowUpRight,
  Mountain,
} from "lucide-react";
import { rides, members, type Ride } from "@/lib/demo/data";
import { useDemo } from "@/lib/demo/store";
import { RideCard, Choice, Empty, Back, Avatar } from "./ui";
export function Rides() {
  const [discipline, setDiscipline] = useState("Toutes les disciplines");
  const [filter, setFilter] = useState("Toutes les sorties");
  const { state } = useDemo();
  const results = rides
    .filter(
      (r) =>
        (discipline === "Toutes les disciplines" ||
          r.discipline === discipline) &&
        (filter !== "Mes participations" || state.joined.includes(r.id)),
    )
    .sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">LES BONS MOMENTS NE SE ROULENT PAS SEUL</p>
          <h1>
            Dehors, <em>ensemble.</em>
          </h1>
          <p className="lead">
            Une heure après le boulot ou toute la matinée. Trouve ta prochaine
            échappée.
          </p>
        </div>
        <span className="outline-stamp">
          SEPTEMBRE
          <br />
          ÉDITION DÉMO
        </span>
      </div>
      <div className="ride-list-banner">
        <Coffee size={36} />
        <p>
          <b>On part ensemble. On rentre ensemble.</b>
          <br />
          Toutes les sorties de cette démo privilégient le plaisir et la
          convivialité.
        </p>
        <span className="tag">Aucun événement réel</span>
      </div>
      <div className="filters compact">
        <Choice
          label="Discipline"
          value={discipline}
          onChange={setDiscipline}
          options={["Toutes les disciplines", "Route", "Gravel", "VTT"]}
        />
        <Choice
          label="Afficher"
          value={filter}
          onChange={setFilter}
          options={["Toutes les sorties", "Mes participations"]}
        />
        <span className="muted" role="status">
          {results.length} sorties fictives · dates fixes pour la démonstration
        </span>
      </div>
      {results.length ? (
        <div className="ride-grid">
          {results.map((r, i) => (
            <RideCard key={r.id} ride={r} index={i} />
          ))}
        </div>
      ) : (
        <Empty
          text="Aucune sortie ne correspond. Découvre les autres disciplines ou rejoins une sortie en démo."
          action={() => {
            setFilter("Toutes les sorties");
            setDiscipline("Toutes les disciplines");
          }}
        />
      )}
    </div>
  );
}
export function RideDetail({ ride }: { ride: Ride }) {
  const { state, toggleRide } = useDemo();
  const joined = state.joined.includes(ride.id);
  const host = members.find((m) => m.id === ride.host)!;
  return (
    <div className="page">
      <Back href="/rides" label="Toutes les sorties" />
      <div className="ride-detail-hero">
        <img
          width={1672}
          height={941}
          src="/images/ride.webp"
          alt="Cyclistes en campagne, illustration de cette sortie fictive"
        />
        <div>
          <p className="eyebrow">
            {ride.discipline.toUpperCase()} · {ride.tag.toUpperCase()}
          </p>
          <h1>{ride.title}</h1>
          <p>
            <MapPin size={18} />
            {ride.town} · {ride.day} septembre 2026 · {ride.time}
          </p>
        </div>
      </div>
      <div className="ride-detail-columns">
        <div>
          <div className="ride-numbers">
            <div>
              <strong>{ride.km}</strong>
              <span>KILOMÈTRES</span>
            </div>
            <div>
              <strong>{ride.elevation}</strong>
              <span>MÈTRES D+</span>
            </div>
            <div>
              <strong>{ride.pace}</strong>
              <span>KM/H · ALLURE</span>
            </div>
          </div>
          <section className="panel">
            <p className="eyebrow">AU PROGRAMME</p>
            <h2>Des kilomètres. Et du bon temps.</h2>
            <p className="bio">{ride.description}</p>
            <div className="ride-info">
              <p>
                <Coffee />
                {ride.cafe}
              </p>
              <p>
                <Shield />
                Casque demandé · respect du code de la route
              </p>
              <p>
                <Users />
                On s’attend et on adapte le rythme ensemble.
              </p>
            </div>
          </section>
          <section className="panel inner-section">
            <p className="eyebrow">L’IDÉE DE PARCOURS</p>
            <h2>Une boucle bien de chez nous.</h2>
            <ol className="route-stops">
              {ride.route.map((town, i) => (
                <li key={`${town}-${i}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <b>{town}</b>
                    <small>
                      {i === 0
                        ? "Départ"
                        : i === ride.route.length - 1
                          ? "Retour"
                          : "Passage envisagé"}
                    </small>
                  </div>
                </li>
              ))}
            </ol>
            <p className="data-note">
              Itinéraire indicatif fictif, non vérifié. Aucune trace de
              navigation fournie.
            </p>
          </section>
          <section className="panel inner-section">
            <h2>
              Dans le peloton{" "}
              <span className="amber">
                ({ride.participants.length + (joined ? 1 : 0)})
              </span>
            </h2>
            <div className="participants">
              {ride.participants.map((id) => {
                const m = members.find((x) => x.id === id)!;
                return (
                  <Link href={`/members/${m.id}`} key={id}>
                    <Avatar member={m} />
                    <span>{m.name}</span>
                  </Link>
                );
              })}
              {joined && (
                <div>
                  <span className="avatar you">
                    {state.profile.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span>Toi · démo</span>
                </div>
              )}
            </div>
          </section>
        </div>
        <aside>
          <div className="booking panel">
            <p className="eyebrow">LE RENDEZ-VOUS</p>
            <div className="booking-date">
              <b>{ride.day}</b>
              <div>
                SEPTEMBRE 2026
                <br />
                <strong>{ride.time}</strong>
              </div>
            </div>
            <p>
              <MapPin size={18} />
              {ride.town} · centre-bourg
            </p>
            <p>
              <Clock size={18} />
              Environ {Math.ceil(ride.km / Number(ride.pace.slice(0, 2)))} h de
              vélo + pause
            </p>
            <p>
              <Mountain size={18} />
              {ride.discipline} · {ride.tag}
            </p>
            <div className="booking-capacity">
              <span>
                {ride.participants.length + (joined ? 1 : 0)} / {ride.max}{" "}
                participants
              </span>
              <div className="meter">
                <span
                  style={{
                    width: `${((ride.participants.length + (joined ? 1 : 0)) / ride.max) * 100}%`,
                  }}
                />
              </div>
            </div>
            <button
              className={`btn ${joined ? "secondary" : ""}`}
              onClick={() => toggleRide(ride.id)}
            >
              {joined ? <Check size={19} /> : <ArrowUpRight size={19} />}{" "}
              {joined ? "Annuler ma participation démo" : "Je viens · en démo"}
            </button>
            <p className="participation-status" role="status">
              {joined
                ? "Tu es dans le peloton ! Participation enregistrée sur cet appareil."
                : "Simulation uniquement. Aucun organisateur ne sera contacté."}
            </p>
            <Link className="host" href={`/members/${host.id}`}>
              <Avatar member={host} />
              <div>
                <small>Une sortie imaginée par</small>
                <b>
                  {host.name}
                  <ArrowUpRight size={15} />
                </b>
              </div>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
