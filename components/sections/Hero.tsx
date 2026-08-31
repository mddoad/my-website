import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Counter } from "@/components/motion/Counter";
import { site } from "@/lib/site";
import { parseStat } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas">
      {/* Decorative grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(0_30_43/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_30_43/0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black_30%,transparent_85%)]"
      />

      <Container size="full" className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <Stagger className="lg:col-span-7">
            <Reveal>
              <Badge tone="accent">Precision manufacturing since {site.established}</Badge>
            </Reveal>
            <Reveal>
              <h1 className="mt-6 text-[40px] font-medium leading-[1.10] tracking-[-1.5px] text-ink sm:text-[56px] lg:text-[72px]">
                Precision components.{" "}
                <span className="text-charcoal">Engineered to spec.</span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="mt-6 max-w-2xl text-lg text-slate sm:text-xl">
                Meridian Manufacturing is a Tier 1 supplier of precision-machined
                and fabricated components for OEM customers in aerospace,
                automotive, energy, and medical. AS9100D, ISO 9001:2015, and
                ITAR registered.
              </p>
            </Reveal>
            <Reveal>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" size="lg">
                  Request a quote
                </Button>
                <Button href="/case-studies" variant="secondary" size="lg">
                  See our work
                </Button>
              </div>
            </Reveal>
            <Reveal>
              <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-hairline pt-8 text-sm">
                {(
                  [
                    ["99.2%", "On-time delivery"],
                    ["2,400", "Active part numbers"],
                    ["50+", "Years in business"],
                  ] as const
                ).map(([raw, label]) => {
                  // parseStat returns null for unparseable strings.
                  // We control the input, so this never triggers;
                  // the fallback renders the raw text in case the
                  // shape ever changes.
                  const stat = parseStat(raw);
                  return (
                    <div key={label}>
                      <dt className="text-slate">{label}</dt>
                      <dd className="mt-1 text-2xl text-ink">
                        {stat ? (
                          <Counter
                            value={stat.value}
                            decimals={stat.decimals}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                          />
                        ) : (
                          raw
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </Reveal>
          </Stagger>

          {/* Visual block — diagram-style card. Revealed on a
              small delay so it lands just after the headline. */}
          <Reveal className="lg:col-span-5" delay={0.15}>
            <div className="relative rounded-lg border border-hairline bg-surface p-6">
              <div className="absolute -top-3 left-6 inline-flex h-6 items-center rounded-sm bg-brand-teal-deep px-2 text-[11px] font-semibold uppercase tracking-[1px] text-on-dark">
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
                    className="flex items-start gap-3 border-b border-hairline-soft pb-3 last:border-b-0 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-green"
                    />
                    <div>
                      <p className="font-medium text-ink">{title}</p>
                      <p className="text-slate">{sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4 text-xs text-slate">
                <span>180,000 sq ft of manufacturing</span>
                <Link
                  href="/products"
                  className="font-medium text-ink hover:text-brand-green-dark"
                >
                  All capabilities →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
