"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Mountain,
  Users,
  Coffee,
} from "lucide-react";
import { members, type Member, type Ride } from "@/lib/demo/data";
import { compatibility } from "@/lib/demo/matching";
import { useDemo } from "@/lib/demo/store";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
export function Choice({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="choice">
      <span className="field-label">{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((x) => (
            <SelectItem key={x} value={x}>
              {x}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
export function Avatar({
  member,
  large = false,
}: {
  member: Member;
  large?: boolean;
}) {
  return (
    <span
      className={`avatar portrait ${large ? "large" : ""}`}
      role="img"
      aria-label={`Portrait fictif de ${member.name}`}
      style={{
        backgroundColor: member.color,
        backgroundImage: "url(/images/portraits.webp)",
        backgroundSize: "400% 400%",
        backgroundPosition: `${((member.portrait % 4) * 100) / 3}% ${(Math.floor(member.portrait / 4) * 100) / 3}%`,
      }}
    />
  );
}
export function SectionTitle({
  eyebrow,
  title,
  href,
  link = "Tout découvrir",
}: {
  eyebrow: string;
  title: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-title">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {link}
          <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
export function MemberCard({ member }: { member: Member }) {
  const { state } = useDemo();
  const match = compatibility(state.profile, member);
  return (
    <Link href={`/members/${member.id}`} className="member-card">
      <div className="member-portrait-frame">
        <Avatar member={member} />
        <span className="member-discipline">{member.discipline}</span>
        <span className="member-number">
          W&M / {String(member.portrait + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="member-card-body">
        <div className="member-name-line">
          <h3>{member.name}</h3>
          <span>{member.town}</span>
        </div>
        <p className="member-quote">« {member.quote} »</p>
        <div className="member-metrics">
          <span>{member.pace} km/h</span>
          <span>{member.distance} km</span>
          <span>{member.day}</span>
        </div>
        <div className="card-bottom">
          <span className="match-number">
            <b>{match.score}%</b> d’affinités
          </span>
          <span className="member-meet">
            Faire connaissance
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
export function RideCard({ ride, index = 0 }: { ride: Ride; index?: number }) {
  const host = members.find((m) => m.id === ride.host)!;
  return (
    <Link
      href={`/rides/${ride.id}`}
      className={`ride-card ride-color-${index % 3}`}
    >
      <div className="ride-art">
        <img
          width={1672}
          height={941}
          src={index === 0 ? "/images/club-morning.webp" : "/images/ride.webp"}
          alt="Cyclistes sur une route de campagne, illustration de la sortie"
          loading="lazy"
        />
        <div className="date-block">
          <b>{ride.day}</b>
          <span>{ride.month}</span>
        </div>
        <span className="ride-discipline">{ride.discipline}</span>
      </div>
      <div className="ride-content">
        <p className="eyebrow">
          {ride.town} · {ride.time}
        </p>
        <h3>{ride.title}</h3>
        <p className="ride-host">
          <Avatar member={host} /> Une sortie avec {host.name}
        </p>
        <div className="ride-stats">
          <span>
            <b>{ride.km}</b> km
          </span>
          <span>
            <Mountain size={15} />
            {ride.elevation} m
          </span>
          <span>{ride.pace} km/h</span>
        </div>
        <p className="ride-ritual">
          <Coffee size={15} />
          {ride.cafe}
        </p>
        <div className="card-bottom">
          <span>
            <Users size={15} />
            {ride.participants.length}/{ride.max} cyclistes
          </span>
          <span className="tag">{ride.tag}</span>
        </div>
      </div>
    </Link>
  );
}
export function Empty({ text, action }: { text: string; action?: () => void }) {
  return (
    <div className="empty">
      <h3>Pas encore de copain sur ce créneau.</h3>
      <p>{text}</p>
      {action && (
        <button className="btn secondary" onClick={action}>
          Effacer les filtres
        </button>
      )}
    </div>
  );
}
export function Back({ href, label }: { href: string; label: string }) {
  return (
    <Link className="back" href={href}>
      <ArrowRight size={16} style={{ transform: "rotate(180deg)" }} />
      {label}
    </Link>
  );
}
