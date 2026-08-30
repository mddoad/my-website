import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd, organizationJsonLd } from "@/components/seo/JsonLd";
import { MotionProvider } from "@/components/motion/MotionProvider";
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
        {/*
         * MotionProvider wraps only `{children}` (the route
         * content), not the chrome. This keeps the layout
         * itself a server component and means the Header,
         * Footer, and JSON-LD never cross the client
         * boundary they don't need. The `reducedMotion="user"`
         * setting in MotionProvider reads the OS preference
         * and is the third layer of the reduced-motion
         * defense (CSS in globals.css and per-component
         * useReducedMotion checks are layers one and two).
         */}
        <main id="main" className="flex-1">
          <MotionProvider>{children}</MotionProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
