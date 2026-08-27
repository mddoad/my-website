import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd, organizationJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const display = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Meridian Manufacturing — Precision components. Engineered to spec.",
    template: "%s | Meridian Manufacturing",
  },
  description:
    "Meridian Manufacturing is a B2B industrial manufacturer delivering precision components, assemblies, and engineered solutions for OEM customers.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    siteName: "Meridian Manufacturing",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
