export type Industry = {
  slug: string;
  name: string;
  short: string;
  description: string;
  outcomes: string[];
};

export const industries: Industry[] = [
  {
    slug: "aerospace-defense",
    name: "Aerospace & Defense",
    short:
      "AS9100-certified manufacturing for flight-critical and defense components.",
    description:
      "Long-running programs across commercial aerospace, business aviation, and defense primes. AS9100D quality systems, ITAR registration, and full documentation packages for every shipment.",
    outcomes: [
      "Zero-defect track record on long-running programs",
      "Approved supplier for two Tier 1 aerospace OEMs",
      "Full PPAP and First Article documentation",
    ],
  },
  {
    slug: "automotive",
    name: "Automotive & Mobility",
    short:
      "Tier 1 automotive supply for drivetrain, chassis, and electrification.",
    description:
      "Tier 1 supply into OEM automotive programs. Stamping, machining, and assembly for drivetrain and chassis applications, plus emerging work in EV thermal management and battery enclosures.",
    outcomes: [
      "Multi-year Tier 1 contracts",
      "Sub-1 PPM defect rate on running programs",
      "Capacity to scale with EV program ramps",
    ],
  },
  {
    slug: "energy",
    name: "Energy & Industrial",
    short:
      "Components and assemblies for oil & gas, renewables, and heavy industrial.",
    description:
      "Heavy-duty components for upstream energy, wind turbine subsystems, and material handling equipment. Long lead-time parts with full traceability and material certifications.",
    outcomes: [
      "Material certifications on every shipment",
      "NACE-compliant surface treatments",
      "Capacity for low-volume, high-mix programs",
    ],
  },
  {
    slug: "medical",
    name: "Medical & Life Sciences",
    short:
      "Precision components for medical devices, with full traceability.",
    description:
      "ISO 13485-aligned quality systems, validated cleaning processes, and full lot traceability for medical device OEMs. Class II and Class III device components.",
    outcomes: [
      "ISO 13485-aligned quality system",
      "Validated cleaning and packaging",
      "Full lot and material traceability",
    ],
  },
];
