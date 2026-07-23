import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Aurion Jewels | Fine Jewelry & Certified Diamonds",
  description: "Exquisite handcrafted gold and platinum jewelry set with certified diamonds. Manufacturer and exporter of fine rings, necklaces, bracelets, and earrings.",
  keywords: "fine jewelry, certified diamonds, gold rings, engagement rings, wedding bands, necklaces, diamond catalog, exporter, manufacturer",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-brand-cream text-brand-charcoal font-sans">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
