export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  capabilities: string[];
};

export const services: Service[] = [
  {
    slug: "precision-machining",
    name: "Precision Machining",
    short:
      "Tight-tolerance CNC turning, milling, and grinding for OEM components.",
    description:
      "Five-axis CNC machining centers and Swiss turning capability produce complex, tight-tolerance components from a wide range of metals and engineered plastics. In-process inspection and full traceability from raw stock to finished part.",
    capabilities: [
      "5-axis milling up to 1.2m",
      "Swiss turning down to 2mm",
      "Tolerances to ±0.0005 in",
      "CMM inspection on every batch",
      "PPAP and First Article Reports",
    ],
  },
  {
    slug: "sheet-metal-fabrication",
    name: "Sheet Metal Fabrication",
    short:
      "Cutting, forming, and finishing for prototype through production runs.",
    description:
      "Laser cutting, brake forming, and a range of finishing services produce enclosures, brackets, and structural components for OEM applications. Quick-turn prototyping through high-volume production.",
    capabilities: [
      "Fiber laser cutting",
      "CNC press brake forming",
      "Powder coat and wet paint",
      "Hardware insertion",
      "Sub-assembly kitting",
    ],
  },
  {
    slug: "assembly",
    name: "Mechanical Assembly",
    short:
      "Sub-assemblies and complete builds, including electromechanical integration.",
    description:
      "From simple sub-assemblies to full electromechanical builds, our assembly cells handle low-mix high-volume production with consistent quality. Torque-controlled fastening, functional testing, and serialized tracking.",
    capabilities: [
      "Torque-controlled fastening",
      "Functional and leak testing",
      "Serialized unit tracking",
      "Sub-assembly kitting",
      "Pack and ship configuration",
    ],
  },
  {
    slug: "engineering",
    name: "Design & Engineering",
    short:
      "DFM review, fixture design, and process engineering for OEM programs.",
    description:
      "Our engineering team partners with customer design groups early in the product lifecycle to optimize manufacturability, reduce cost, and de-risk production. Fixture design, process documentation, and quality planning included.",
    capabilities: [
      "Design for manufacturability",
      "Fixture and tooling design",
      "Process flow development",
      "Quality and inspection plans",
      "PPAP and ISIR documentation",
    ],
  },
  {
    slug: "finishing",
    name: "Finishing & Surface Treatment",
    short:
      "Anodizing, plating, powder coating, and passivation through approved partners.",
    description:
      "In-house powder coating and passivation, plus long-standing relationships with approved partners for anodizing, plating, and specialty coatings. All finishes are processed with full certifications and traceability.",
    capabilities: [
      "Powder coat (in-house)",
      "Passivation (in-house)",
      "Anodizing (Type II and III)",
      "Electroless nickel",
      "Zinc and zinc-nickel plating",
    ],
  },
  {
    slug: "quality",
    name: "Quality & Metrology",
    short:
      "In-house CMM inspection, plus PPAP, ISIR, and full documentation packages.",
    description:
      "Quality is built into every step. Our metrology lab includes temperature-controlled CMM inspection, and we provide full PPAP, ISIR, and First Article documentation for regulated industries.",
    capabilities: [
      "Temperature-controlled CMM",
      "PPAP level 1-5",
      "First Article (AS9102)",
      "Material certifications",
      "SPC and MSA programs",
    ],
  },
];
