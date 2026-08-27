import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
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

// Mobile browser chrome tinting. Brand teal deep (`#001e2b`) so the
// Safari iOS / Chrome Android address bar matches the header.
export const viewport: Viewport = {
  themeColor: "#001e2b",
};

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
      className={`${body.variable} h-full antialiased`}
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
