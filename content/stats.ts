export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "50+", label: "Years in business" },
  { value: "180k", label: "Square feet of manufacturing" },
  { value: "2,400", label: "Active part numbers" },
  { value: "99.2%", label: "On-time delivery" },
];

export type ProcessStep = {
  step: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    body: "We start with a deep review of your drawings, volumes, and program timeline. We confirm fit and align on the right quality plan.",
  },
  {
    step: "02",
    title: "Engineer",
    body: "Our engineers run DFM, design fixtures, and lock in the process. You get a complete plan with cost, lead time, and quality gates.",
  },
  {
    step: "03",
    title: "Produce",
    body: "We build, inspect, and document every part. Real-time program reporting keeps you informed from first article through delivery.",
  },
  {
    step: "04",
    title: "Deliver",
    body: "Parts ship on time with full documentation. We support your program for the long run, including engineering changes and volume ramps.",
  },
];
