"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Bike,
  ArrowUpRight,
  Compass,
  Menu,
  X,
  Zap,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { DemoProvider, useDemo } from "@/lib/demo/store";
const navigation = [
  { href: "/dashboard", label: "Mon peloton", icon: Home },
  { href: "/members", label: "Les cyclistes", icon: Users },
  { href: "/rides", label: "Les sorties", icon: Compass },
  { href: "/garage", label: "Le garage", icon: Bike },
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
        V0 · EXPLORATION DU CLUB{" "}
        <span>
          Profils et sorties fictifs · actions enregistrées sur cet appareil
        </span>
      </div>
      <header className="header">
        <Link href="/" aria-label="Watt et Malt, accueil" className="wordmark">
          <span className="brand-icon">
            <Zap size={23} fill="currentColor" />
          </span>
          <span>
            WATT <i>&</i> MALT<small>CYCLING CLUB · BRETAGNE</small>
          </span>
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
        >
          {path === "/" ? "Entrer dans le club" : state.profile.name}
          <ArrowUpRight size={17} />
        </Link>
        <button
          className="menu-button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {storageError && (
        <p className="storage-warning" role="status">
          Le stockage local est indisponible. Vos actions restent disponibles
          pendant cette visite.
        </p>
      )}
      <main id="main">{children}</main>
      <footer>
        <Link className="footer-brand" href="/">
          WATT <i>&</i> MALT.
        </Link>
        <p>Né à Brandérion. Pour tous les cyclistes du coin.</p>
        <div>
          <span>47°47′ N · 3°11′ O</span>
          <Link href="/settings/privacy">
            <Shield size={14} />
            Confidentialité
          </Link>
          <span>© 2026 Watt & Malt Club · Démonstration</span>
        </div>
      </footer>
      <nav className="mobile-nav" aria-label="Navigation mobile">
        {navigation.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={path.startsWith(href) ? "page" : undefined}
          >
            <Icon size={21} />
            <span>
              {label
                .replace("Les ", "")
                .replace("Le ", "")
                .replace("Mon peloton", "Accueil")}
            </span>
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
