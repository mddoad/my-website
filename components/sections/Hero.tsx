import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Decorative grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(13_17_23/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(13_17_23/0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black_30%,transparent_85%)]"
      />

      <Container size="full" className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Badge tone="accent">Precision manufacturing since {site.established}</Badge>
            <h1 className="mt-6 text-4xl font-semibold text-ink-900 sm:text-5xl lg:text-6xl">
              Precision components.{" "}
              <span className="text-ink-700">Engineered to spec.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-steel-700 sm:text-xl">
              Meridian Manufacturing is a Tier 1 supplier of precision-machined
              and fabricated components for OEM customers in aerospace,
              automotive, energy, and medical. AS9100D, ISO 9001:2015, and
              ITAR registered.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Request a quote
              </Button>
              <Button href="/case-studies" variant="secondary" size="lg">
                See our work
              </Button>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-steel-200 pt-8 text-sm">
              <div>
                <dt className="text-steel-500">On-time delivery</dt>
                <dd className="mt-1 font-serif text-2xl text-ink-900">99.2%</dd>
              </div>
              <div>
                <dt className="text-steel-500">Active part numbers</dt>
                <dd className="mt-1 font-serif text-2xl text-ink-900">2,400</dd>
              </div>
              <div>
                <dt className="text-steel-500">Years in business</dt>
                <dd className="mt-1 font-serif text-2xl text-ink-900">50+</dd>
              </div>
            </dl>
          </div>

          {/* Visual block — diagram-style card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg border border-steel-200 bg-steel-50 p-8 shadow-card">
              <div className="absolute -top-3 left-8 inline-flex h-6 items-center rounded-sm bg-ink-900 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-paper">
                Capabilities
              </div>
              <ul className="mt-2 space-y-4 text-sm">
                {[
                  ["5-axis CNC", "Tolerances to ±0.0005 in"],
                  ["Sheet metal", "Laser, brake, finishing"],
                  ["Mechanical assembly", "Serialized, tested"],
                  ["Finishing", "Anodize, plate, powder coat"],
                  ["Quality", "CMM, PPAP, AS9102"],
                ].map(([title, sub]) => (
                  <li
                    key={title}
                    className="flex items-start gap-3 border-b border-steel-200 pb-3 last:border-b-0 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500"
                    />
                    <div>
                      <p className="font-medium text-ink-900">{title}</p>
                      <p className="text-steel-500">{sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-steel-200 pt-4 text-xs text-steel-500">
                <span>180,000 sq ft of manufacturing</span>
                <Link
                  href="/products"
                  className="font-medium text-ink-900 hover:text-accent-600"
                >
                  All capabilities →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
