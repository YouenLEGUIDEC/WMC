import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import { Shell } from "@/components/wmc/shell";
export const metadata: Metadata = {
  title: {
    default: "Watt & Malt Club — Le vélo, ensemble.",
    template: "%s · Watt & Malt",
  },
  description:
    "La communauté cycliste du pays de Lorient. Brûler des Watts, savourer du Malt. V0 de démonstration.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
