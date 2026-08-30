export type CaseStudyMetric = { label: string; value: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: number;
  summary: string;
  challenge: string;
  approach: string;
  result: string;
  metrics: CaseStudyMetric[];
  /**
   * Stable seed for the random hero image. The image URL is built
   * at render time via `picsumUrl(seed, w, h)` so the same seed
   * always yields the same image across builds.
   */
  picsumSeed: string;
};

/**
 * Build a stable random image URL for a case study. picsum.photos
 * serves a deterministic image for a given seed, so the hero
 * image is the same on every build.
 */
export function picsumUrl(seed: string, w: number, h: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "aerospace-actuator-housing",
    title: "Actuator housing program: 40% lead-time reduction",
    client: "Tier 1 aerospace OEM (NDA)",
    industry: "Aerospace & Defense",
    year: 2024,
    summary:
      "Re-engineered a flight-critical actuator housing from a 14-week to an 8-week lead time without changing the part design.",
    challenge:
      "The customer was losing market share due to a 14-week lead time on a flight-critical actuator housing, with quarterly demand spikes of 40% above baseline. The incumbent supplier could not commit to the volume, and the customer was hesitant to risk a requalification.",
    approach:
      "We ran a 6-week parallel qualification alongside the incumbent, redesigned the tooling for faster changeover, and built capacity for 1.5x the baseline volume. We provided a full PPAP package and held a formal design review with the customer's engineering team.",
    result:
      "After a successful 1,000-unit qualification run, the customer transitioned the program. Lead time dropped to 8 weeks, on-time delivery rose to 99.2%, and the customer recovered the lost market share within two quarters.",
    metrics: [
      { label: "Lead time reduction", value: "40%" },
      { label: "On-time delivery", value: "99.2%" },
      { label: "Annual volume", value: "48,000 units" },
    ],
    picsumSeed: "meridian-actuator-housing-2024",
  },
  {
    slug: "ev-battery-enclosure",
    title: "EV battery enclosure: prototype to production in 11 months",
    client: "EV startup (NDA)",
    industry: "Automotive & Mobility",
    year: 2023,
    summary:
      "Took an EV battery enclosure from initial concept to SOP in 11 months for a Series-B EV startup, with no prior automotive experience.",
    challenge:
      "The customer had a working prototype but no manufacturing partner, no PPAP experience, and a board deadline for SOP in 11 months. The enclosure required tight flatness tolerances, multiple welded sub-assemblies, and a complex surface finish.",
    approach:
      "We embedded a project engineer with the customer, ran a 4-week DFM review, and built a dedicated production cell with a single-piece flow. We held weekly program reviews and provided the full PPAP package, including 2D and 3D dimensional layouts.",
    result:
      "SOP was achieved in 10.5 months. First-time PPM was under 200 across the first three months of production, and the customer raised volume by 30% at month four without adding capacity on our side.",
    metrics: [
      { label: "Time to SOP", value: "10.5 months" },
      { label: "First 90-day PPM", value: "< 200" },
      { label: "Volume ramp", value: "+30%" },
    ],
    picsumSeed: "meridian-ev-enclosure-2023",
  },
  {
    slug: "wind-turbine-hub",
    title: "Wind turbine hub casting conversion",
    client: "Renewable energy OEM",
    industry: "Energy & Industrial",
    year: 2022,
    summary:
      "Converted a wind turbine hub from a sand-cast design to a forged-and-machined design, reducing per-unit cost by 22%.",
    challenge:
      "The customer's wind turbine hub was a sand-cast design with high scrap rates, long lead times, and inconsistent mechanical properties. Cost reduction targets were aggressive: 20% per unit without compromising fatigue performance.",
    approach:
      "We partnered with the customer on a forging conversion, ran FEA alongside their engineering team, and validated the new design with prototype fatigue testing. We then stood up a dedicated machining cell and qualified three forging sources.",
    result:
      "Per-unit cost dropped 22%, scrap dropped from 8% to under 1%, and fatigue life improved 35% over the cast design. The customer rolled the new design into three additional platforms.",
    metrics: [
      { label: "Cost reduction", value: "22%" },
      { label: "Scrap reduction", value: "8% → <1%" },
      { label: "Fatigue life", value: "+35%" },
    ],
    picsumSeed: "meridian-wind-hub-2022",
  },
];
