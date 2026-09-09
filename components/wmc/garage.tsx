"use client";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  Bike as BikeIcon,
  Wrench,
  Maximize2,
} from "lucide-react";
import { bikes, type Bike } from "@/lib/demo/data";
import { Back } from "./ui";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
export function Garage() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">LE COIN OÙ L’ON PARLE BRAQUETS</p>
          <h1>
            Le <em>garage.</em>
          </h1>
          <p className="lead">
            Le vélo qu’on bichonne, celui qu’on prête, celui qui fait encore ce
            petit bruit. On finit par les connaître aussi bien que leurs
            propriétaires.
          </p>
        </div>
        <span className="outline-stamp">
          3 VÉLOS CONCEPTS
          <br />
          COLLECTION DÉMO
        </span>
      </div>
      <Link href="/garage/le-cuivre" className="garage-feature">
        <div>
          <p className="eyebrow">FICHE 01 / CELUI DU DIMANCHE</p>
          <h2>LE CUIVRE.</h2>
          <p>Atelier W&M · All Road 01</p>
          <div className="big-stats">
            <span>
              8,2<small>KG</small>
            </span>
            <span>
              2 843<small>KM AU COMPTEUR</small>
            </span>
          </div>
          <span className="btn">
            Regarder le montage
            <ArrowUpRight size={18} />
          </span>
        </div>
        <img
          width={1536}
          height={1024}
          src="/images/bike.webp"
          alt="Concept fictif de vélo de route couleur cuivre"
        />
      </Link>
      <div className="bike-grid">
        {bikes.slice(1).map((bike, i) => (
          <Link
            key={bike.id}
            href={`/garage/${bike.id}`}
            className="bike-concept"
          >
            <div className="spread">
              <p className="eyebrow">
                0{i + 2} / {bike.type.toUpperCase()}
              </p>
              <ArrowUpRight />
            </div>
            <div className="bike-type">
              <BikeIcon size={80} strokeWidth={1} />
              <span>{bike.type}</span>
            </div>
            <h2>{bike.name}</h2>
            <p>
              {bike.model} · {bike.color}
            </p>
            <div className="member-metrics">
              <span>{bike.weight} kg</span>
              <span>{bike.distance.toLocaleString("fr-FR")} km</span>
              <span>{bike.year}</span>
            </div>
            <p className="data-note">
              Concept fictif · photographie non disponible
            </p>
          </Link>
        ))}
      </div>
      <p className="data-note">
        Vélos et configurations de démonstration. Le visuel cuivre est une
        création illustrative, sans correspondance commerciale garantie.
      </p>
    </div>
  );
}
export function BikeDetail({ bike }: { bike: Bike }) {
  return (
    <div className="page">
      <Back href="/garage" label="Retour au garage" />
      <div className="page-heading">
        <div>
          <p className="eyebrow">
            {bike.brand.toUpperCase()} / {bike.type.toUpperCase()} / CONCEPT
            FICTIF
          </p>
          <h1>
            {bike.name}
            <em>.</em>
          </h1>
          <p className="lead">{bike.description}</p>
        </div>
        <span className="outline-stamp">
          {bike.year}
          <br />
          {bike.model}
        </span>
      </div>
      <div className="bike-detail-visual">
        {bike.id === "le-cuivre" ? (
          <>
            <img
              width={1536}
              height={1024}
              src="/images/bike.webp"
              alt="Vélo cuivre de démonstration en vue de profil"
            />
            <Dialog>
              <DialogTrigger asChild>
                <button className="btn secondary enlarge">
                  <Maximize2 size={17} />
                  Agrandir la photo
                </button>
              </DialogTrigger>
              <DialogContent className="bike-dialog">
                <DialogTitle>{bike.name} · vue studio</DialogTitle>
                <DialogDescription>
                  Illustration d’un vélo fictif. Aucun visualiseur 3D dans cette
                  V0.
                </DialogDescription>
                <img
                  width={1536}
                  height={1024}
                  src="/images/bike.webp"
                  alt="Vélo cuivre agrandi"
                />
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <div className="bike-type">
            <BikeIcon size={140} strokeWidth={1} />
            <h2>
              {bike.type} / {bike.color}
            </h2>
            <p>On n’a pas encore de photo de ce vélo concept.</p>
          </div>
        )}
      </div>
      <div className="bike-spec-head">
        <span>
          <b>{bike.weight}</b> kg
        </span>
        <span>
          <b>{bike.distance.toLocaleString("fr-FR")}</b> km estimés
        </span>
        <span>{bike.color}</span>
      </div>
      <Tabs defaultValue="Configuration">
        <TabsList className="segmented" aria-label="Contenu du vélo">
          {["Configuration", "Carnet de route"].map((t) => (
            <TabsTrigger key={t} value={t}>
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="Configuration">
          <div className="spec-grid">
            {[
              ["Cadre", bike.model],
              ["Transmission", bike.groupset],
              ["Roues", bike.wheels],
              ["Pneus", bike.tires],
              ["Année", String(bike.year)],
              ["Couleur", bike.color],
            ].map(([name, value]) => (
              <div className="spec" key={name}>
                <span>{name}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Carnet de route">
          <section className="panel">
            <p className="eyebrow">CARNET FICTIF</p>
            <h2>Un peu d’attention entre deux sorties.</h2>
            <div className="maintenance-row">
              <Wrench />
              <div>
                <h3>Contrôle général et nettoyage</h3>
                <p>1er septembre 2026 · atelier personnel · 0 €</p>
                <p className="muted">
                  Nettoyage transmission, contrôle des freins et de la pression.
                </p>
              </div>
            </div>
            <p className="small-note">
              Exemple de carnet, sans rappel automatique. Le kilométrage ne
              remplace pas un contrôle de l’état réel des composants.
            </p>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
