import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd, organizationJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
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
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    siteName: site.name,
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
