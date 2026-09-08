"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Shield,
  Bike,
  MapPin,
  Calendar,
  Coffee,
} from "lucide-react";
import { useDemo } from "@/lib/demo/store";
import { communes, type DemoProfile } from "@/lib/demo/data";
import { Choice } from "./ui";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
const steps = [
  "Les présentations",
  "Ta façon de rouler",
  "Tes rendez-vous",
  "À toi de choisir",
];
function OnboardingForm() {
  const { state, saveProfile } = useDemo();
  const [profile, setProfile] = useState<DemoProfile>(state.profile);
  const [step, setStep] = useState(0);
  const [consent, setConsent] = useState(false);
  const router = useRouter();
  function change<K extends keyof DemoProfile>(key: K, value: DemoProfile[K]) {
    setProfile({ ...profile, [key]: value });
  }
  return (
    <div className="onboarding">
      <aside className="onboarding-aside">
        <p className="eyebrow">BIENVENUE DANS LE CLUB</p>
        <h1>
          CHAQUE{" "}
          <br />
          PELOTON{" "}
          <br />
          COMMENCE{" "}
          <br />
          PAR <em>TOI.</em>
        </h1>
        <p>
          Pas besoin d’être le plus rapide.
          <br />
          Juste d’avoir envie de rouler ensemble.
        </p>
        <ol>
          {steps.map((s, i) => (
            <li
              className={i === step ? "active" : i < step ? "done" : ""}
              key={s}
            >
              <span>
                {i < step ? (
                  <Check size={17} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <p className="small-note">
          <Shield size={16} />
          Aucun compte réel créé. Tes choix restent sur cet appareil.
        </p>
      </aside>
      <section className="onboarding-form">
        <p className="eyebrow">ÉTAPE {step + 1} / 4</p>
        <Progress
          value={(step + 1) * 25}
          aria-label="Progression de l’onboarding"
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 3) setStep(step + 1);
            else if (consent) {
              saveProfile(profile);
              router.push("/dashboard");
            }
          }}
        >
          <div className="form-step" key={step}>
            {step === 0 && (
              <>
                <MapPin className="step-icon" />
                <h2>On fait connaissance ?</h2>
                <p className="muted">
                  Un prénom et ton coin de Bretagne. Le reste viendra en
                  roulant.
                </p>
                <label className="field">
                  <span>Ton prénom ou pseudo</span>
                  <input
                    required
                    maxLength={40}
                    minLength={1}
                    value={profile.name}
                    onChange={(e) => change("name", e.target.value)}
                    placeholder="Comment on t’appelle ?"
                    onBlur={() => change("name", profile.name.trim())}
                  />
                </label>
                <Choice
                  label="Ta commune"
                  value={profile.town}
                  onChange={(v) => change("town", v)}
                  options={communes}
                />
                <p className="small-note">
                  <Shield size={16} />
                  Ta commune suffit. On ne te demande jamais ton adresse.
                </p>
              </>
            )}
            {step === 1 && (
              <>
                <Bike className="step-icon" />
                <h2>À chacun son rythme.</h2>
                <p className="muted">
                  Pense à une sortie où tu te sens bien, pas à ton meilleur
                  jour.
                </p>
                <Choice
                  label="Ta discipline principale"
                  value={profile.discipline}
                  onChange={(v) =>
                    change("discipline", v as DemoProfile["discipline"])
                  }
                  options={["Route", "Gravel", "VTT"]}
                />
                <div className="range-field">
                  <div className="spread">
                    <label id="pace-label">
                      Allure confortable sur le plat
                    </label>
                    <strong>{profile.pace} km/h</strong>
                  </div>
                  <Slider
                    aria-labelledby="pace-label"
                    min={10}
                    max={45}
                    step={1}
                    value={[profile.pace]}
                    onValueChange={(v) => change("pace", v[0])}
                  />
                  <div className="range-captions">
                    <span>10 km/h</span>
                    <span>45 km/h</span>
                  </div>
                </div>
                <div className="range-field">
                  <div className="spread">
                    <label id="distance-label">Ta distance habituelle</label>
                    <strong>{profile.distance} km</strong>
                  </div>
                  <Slider
                    aria-labelledby="distance-label"
                    min={10}
                    max={250}
                    step={5}
                    value={[profile.distance]}
                    onValueChange={(v) => change("distance", v[0])}
                  />
                  <div className="range-captions">
                    <span>10 km</span>
                    <span>250 km</span>
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <Calendar className="step-icon" />
                <h2>On se retrouve quand ?</h2>
                <p className="muted">
                  Choisis ton créneau préféré et ce qui rend une sortie vraiment
                  bonne.
                </p>
                <Choice
                  label="Ton créneau habituel"
                  value={profile.day}
                  onChange={(v) => change("day", v)}
                  options={["Dimanche matin", "Mercredi soir", "Samedi matin"]}
                />
                <Choice
                  label="Ton esprit vélo"
                  value={profile.style}
                  onChange={(v) => change("style", v)}
                  options={[
                    "Café ride",
                    "Sans pression",
                    "Exploration",
                    "Performance",
                    "Longue distance",
                  ]}
                />
                <Choice
                  label="Après la sortie, plutôt…"
                  value={profile.social}
                  onChange={(v) => change("social", v)}
                  options={["Café", "Terrasse", "Retour maison", "Pâtisserie"]}
                />
              </>
            )}
            {step === 3 && (
              <>
                <Coffee className="step-icon" />
                <h2>Ton peloton est presque prêt.</h2>
                <p className="muted">
                  Voici ta carte de visite pour la démo. Tu pourras la modifier
                  à tout moment.
                </p>
                <div className="onboarding-recap">
                  <h3>
                    {profile.name} · {profile.town}
                  </h3>
                  <p>
                    {profile.discipline} · {profile.pace} km/h ·{" "}
                    {profile.distance} km
                  </p>
                  <p>
                    {profile.day} · {profile.social}
                  </p>
                </div>
                <Choice
                  label="Visibilité souhaitée pour le futur compte"
                  value={profile.visibility}
                  onChange={(v) => change("visibility", v)}
                  options={["Membres uniquement", "Privé"]}
                />
                <label className="consent">
                  <Checkbox
                    checked={consent}
                    onCheckedChange={(v) => setConsent(v === true)}
                  />
                  <span>
                    J’accepte d’enregistrer ce profil de démonstration sur cet
                    appareil. Il n’est transmis à aucun autre membre.
                  </span>
                </label>
                <p className="small-note">
                  Aucune connexion Strava. Aucun email demandé. Cette préférence
                  de visibilité prépare la suite ; aucun profil n’est publié
                  dans la V0.
                </p>
              </>
            )}
          </div>
          <div className="form-actions">
            {step > 0 ? (
              <button
                type="button"
                className="btn secondary"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft size={17} />
                Retour
              </button>
            ) : (
              <Link href="/" className="text-link">
                Retour à l’accueil
              </Link>
            )}
            <button
              type="submit"
              className="btn"
              disabled={!profile.name.trim() || (step === 3 && !consent)}
            >
              {step === 3 ? "Trouver mon peloton" : "Continuer"}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
export function Onboarding() {
  const { ready } = useDemo();
  return ready ? (
    <OnboardingForm />
  ) : (
    <div className="page" role="status">
      Préparation de ton profil…
    </div>
  );
}
