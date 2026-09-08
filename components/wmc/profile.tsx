"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Shield, Download, RotateCcw, Check } from "lucide-react";
import { useDemo } from "@/lib/demo/store";
import { members, rides } from "@/lib/demo/data";
import { MemberCard, RideCard } from "./ui";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
export function Profile() {
  const { state } = useDemo();
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">MON PROFIL LOCAL · DÉMONSTRATION</p>
          <h1>
            {state.profile.name}
            <em> · {state.profile.town}</em>
          </h1>
          <p className="lead">
            {state.profile.style}. {state.profile.day}. {state.profile.social}{" "}
            au retour.
          </p>
        </div>
        <Link href="/onboarding" className="btn">
          Modifier mon profil
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="profile-stats panel">
        <div>
          <b>{state.profile.discipline}</b>
          <span>Discipline</span>
        </div>
        <div>
          <b>{state.profile.pace} km/h</b>
          <span>Allure confortable</span>
        </div>
        <div>
          <b>{state.profile.distance} km</b>
          <span>Distance habituelle</span>
        </div>
      </div>
      <section className="inner-section">
        <h2>Mes prochaines sorties</h2>
        {state.joined.length ? (
          <div className="ride-grid">
            {rides
              .filter((r) => state.joined.includes(r.id))
              .map((r) => (
                <RideCard key={r.id} ride={r} />
              ))}
          </div>
        ) : (
          <div className="empty">
            <p>Ton calendrier attend sa première échappée.</p>
            <Link href="/rides" className="btn">
              Découvrir les sorties
              <ArrowUpRight size={18} />
            </Link>
          </div>
        )}
      </section>
      <section className="inner-section">
        <h2>Les roues que je garde en tête</h2>
        {state.saved.length ? (
          <div className="member-grid">
            {members
              .filter((m) => state.saved.includes(m.id))
              .map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
          </div>
        ) : (
          <div className="empty">
            <p>
              Garde un cycliste dans ta roue depuis sa fiche pour le retrouver
              ici.
            </p>
            <Link href="/members" className="text-link">
              Rencontrer le peloton
              <ArrowUpRight size={18} />
            </Link>
          </div>
        )}
      </section>
      <Link className="privacy-link" href="/settings/privacy">
        <Shield />
        Mes données, mes choix
        <ArrowUpRight size={18} />
      </Link>
    </div>
  );
}
export function Privacy() {
  const { state, reset } = useDemo();
  const [done, setDone] = useState(false);
  function download() {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "watt-malt-demo.json";
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="page narrow">
      <p className="eyebrow">LA CONFIANCE FAIT PARTIE DU CLUB</p>
      <h1>
        Tes données.
        <br />
        <em>Tes choix.</em>
      </h1>
      <p className="lead">
        Cette V0 est une démonstration. Aucun compte Watt & Malt n’est créé et
        aucune donnée Strava n’est collectée.
      </p>
      <section className="panel inner-section">
        <h2>Ce qui reste sur cet appareil</h2>
        <p className="bio">
          Ton prénom ou pseudo, ta commune, tes préférences de pratique, tes
          cyclistes favoris et tes participations fictives sont stockés dans ton
          navigateur. Ils ne sont pas partagés avec d’autres visiteurs.
        </p>
        <p className="muted">
          Les 16 autres cyclistes sont entièrement fictifs. Les images sont des
          illustrations créées pour la démo. L’hébergeur peut traiter les
          données techniques nécessaires au fonctionnement du site.
        </p>
        <div className="privacy-row">
          <span>Visibilité souhaitée pour la suite</span>
          <b>{state.profile.visibility}</b>
        </div>
        <div className="privacy-row">
          <span>Connexion Strava</span>
          <b>Non implémentée</b>
        </div>
        <div className="privacy-row">
          <span>Emails et notifications</span>
          <b>Aucun envoi</b>
        </div>
        <Link href="/onboarding" className="text-link">
          Modifier mes choix
          <ArrowUpRight size={18} />
        </Link>
      </section>
      <section className="panel inner-section">
        <h2>Tu gardes la main.</h2>
        <p className="bio">
          Exporte le contenu de la démo ou repars de zéro. Réinitialiser
          supprime tes choix enregistrés et restaure le profil fictif par
          défaut.
        </p>
        <div className="button-row">
          <button className="btn secondary" onClick={download}>
            <Download size={17} />
            Exporter mes données locales
          </button>
          <Dialog>
            <DialogTrigger asChild>
              <button className="btn secondary">
                <RotateCcw size={17} />
                Réinitialiser la démo
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Repartir de zéro ?</DialogTitle>
              <DialogDescription>
                Ton profil local, tes favoris et tes participations fictives
                seront remplacés par les valeurs initiales.
              </DialogDescription>
              <div className="button-row">
                <DialogClose asChild>
                  <button className="btn secondary">Conserver mes choix</button>
                </DialogClose>
                <DialogClose asChild>
                  <button
                    className="btn"
                    onClick={() => {
                      reset();
                      setDone(true);
                    }}
                  >
                    Réinitialiser
                  </button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {done && (
          <p role="status" className="small-note">
            <Check />
            La démonstration a été réinitialisée.
          </p>
        )}
      </section>
    </div>
  );
}
