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
  "Ton prénom, ton coin",
  "Ton vélo, ton rythme",
  "Quand on te retrouve",
  "Ce que tu partages",
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
          La prochaine,
          <br />
          <em>tu viens ?</em>
        </h1>
        <p>
          On te garde une place au départ.
          <br />
          Dis-nous juste à quoi ressemble ton dimanche.
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
                <h2>Salut, toi c’est… ?</h2>
                <p className="muted">
                  Un prénom pour t’appeler au départ. Une commune pour trouver
                  les sorties qui ne commencent pas à l’autre bout du
                  département.
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
                  Ton adresse reste chez toi. La commune nous suffit.
                </p>
              </>
            )}
            {step === 1 && (
              <>
                <Bike className="step-icon" />
                <h2>À quelle allure on bavarde ?</h2>
                <p className="muted">
                  Pense à ton allure habituelle sur le plat. Celle que tu tiens
                  confortablement, même quand les jambes ne sont pas dans un
                  grand jour.
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
                <h2>Quand est-ce qu’on te voit ?</h2>
                <p className="muted">
                  Mercredi après le boulot ? Dimanche avant le déjeuner ?
                  Choisis le moment que tu arrives vraiment à garder pour le
                  vélo.
                </p>
                <Choice
                  label="Ton créneau habituel"
                  value={profile.day}
                  onChange={(v) => change("day", v)}
                  options={["Dimanche matin", "Mercredi soir", "Samedi matin"]}
                />
                <Choice
                  label="Ce que tu viens chercher"
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
                  label="Le vélo posé, tu fais quoi ?"
                  value={profile.social}
                  onChange={(v) => change("social", v)}
                  options={["Café", "Terrasse", "Retour maison", "Pâtisserie"]}
                />
              </>
            )}
            {step === 3 && (
              <>
                <Coffee className="step-icon" />
                <h2>On peut faire les présentations.</h2>
                <p className="muted">
                  Voilà ce que les copains apprendraient de toi au départ. Tu
                  peux encore revenir sur tes choix.
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
                  label="Qui pourra voir ces infos dans le futur club ?"
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
              {step === 3 ? "Voir les copains du coin" : "Continuer"}
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
      On prépare ta fiche de club…
    </div>
  );
}
