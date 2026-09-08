"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  ArrowRight,
  Mountain,
  Users,
  ChevronRight,
} from "lucide-react";
import type { Member, Ride } from "@/lib/demo/data";
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
      className={`avatar ${large ? "large" : ""}`}
      style={{ background: member.color }}
      aria-label={member.name}
    >
      {member.initials}
    </span>
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
      <div className="member-top">
        <Avatar member={member} />
        <span className="match-number">
          {match.score}
          <small>% affinités</small>
        </span>
      </div>
      <h3>
        {member.name}
        <ArrowUpRight size={21} />
      </h3>
      <p className="muted location">
        <MapPin size={14} />
        {member.town}
      </p>
      <p className="member-style">{member.style}</p>
      <div className="member-metrics">
        <span>
          <b>{member.pace}</b> km/h
        </span>
        <span>
          <b>{member.distance}</b> km
        </span>
        <span>{member.discipline}</span>
      </div>
      <div className="card-bottom">
        {member.day}
        <ChevronRight size={16} />
      </div>
    </Link>
  );
}
export function RideCard({ ride, index = 0 }: { ride: Ride; index?: number }) {
  return (
    <Link
      href={`/rides/${ride.id}`}
      className={`ride-card ride-color-${index % 3}`}
    >
      <div className="ride-art">
        <img
          width={1672}
          height={941}
          src="/images/ride.webp"
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
      <h3>Personne dans la roue pour l’instant.</h3>
      <p>{text}</p>
      {action && (
        <button className="btn secondary" onClick={action}>
          Réinitialiser les filtres
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
