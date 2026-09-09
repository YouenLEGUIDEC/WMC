"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Bike,
  ArrowRight,
  Compass,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { DemoProvider, useDemo } from "@/lib/demo/store";
import { Brand } from "./brand";
const navigation = [
  { href: "/dashboard", label: "Au club", mobile: "Club", icon: Home },
  { href: "/members", label: "Les copains", mobile: "Copains", icon: Users },
  { href: "/rides", label: "Les sorties", mobile: "Sorties", icon: Compass },
  { href: "/garage", label: "Le garage", mobile: "Garage", icon: Bike },
];
function Chrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { state, storageError } = useDemo();
  return (
    <>
      <a className="skip" href="#main">
        Aller au contenu
      </a>
      <div className="demo-ribbon">
        <span className="demo-label">DÉMONSTRATION</span> Des personnages
        fictifs, un vrai projet de club.
        <span className="demo-detail">
          Tes essais restent sur cet appareil.
        </span>
      </div>
      <header className="header">
        <Link href="/" className="wordmark" aria-label="Watt & Malt, accueil">
          <Brand />
        </Link>
        <nav
          className={open ? "desktop-nav is-open" : "desktop-nav"}
          aria-label="Navigation principale"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={path.startsWith(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={path === "/" ? "/onboarding" : "/profile"}
          className="header-cta"
          onClick={() => setOpen(false)}
        >
          {path === "/" ? "Viens rouler" : state.profile.name}
          <ArrowRight size={17} />
        </Link>
        <button
          className="menu-button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {storageError && (
        <p className="storage-warning" role="status">
          Ton navigateur ne peut pas enregistrer tes choix. Tu peux continuer à
          essayer le site pendant cette visite.
        </p>
      )}
      <main id="main">{children}</main>
      <footer className="club-footer">
        <div className="footer-top">
          <Link className="footer-brand" href="/">
            <Brand />
          </Link>
          <p>
            Brûler des Watts.
            <br />
            <em>Savourer du Malt.</em>
          </p>
          <Link className="text-link" href="/rides">
            On se retrouve au départ ?<ArrowRight size={18} />
          </Link>
        </div>
        <div className="footer-local">
          <span>
            Brandérion, Morbihan.
            <br />
            Du Blavet aux routes du pays de Lorient.
          </span>
          <Link href="/settings/privacy">
            <Shield size={15} />
            Tes données, tes choix
          </Link>
          <span>
            © 2026 Watt & Malt Club
            <br />
            Personnages, portraits et sorties de démonstration.
          </span>
        </div>
      </footer>
      <nav className="mobile-nav" aria-label="Navigation mobile">
        {navigation.map(({ href, mobile, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={path.startsWith(href) ? "page" : undefined}
          >
            <Icon size={22} strokeWidth={1.7} />
            <span>{mobile}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider>
      <Chrome>{children}</Chrome>
    </DemoProvider>
  );
}
