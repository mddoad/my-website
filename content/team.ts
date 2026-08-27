export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export const team: TeamMember[] = [
  {
    name: "Marina Holland",
    role: "Chief Executive Officer",
    bio:
      "Marina joined Meridian in 2008 and became CEO in 2018. She previously led operations at a Tier 1 automotive supplier and holds an MBA from the University of Michigan.",
    initials: "MH",
  },
  {
    name: "David Park",
    role: "VP of Engineering",
    bio:
      "David leads our engineering and quality organizations. He brings 22 years of experience in aerospace and industrial manufacturing, with prior roles at two AS9100-certified suppliers.",
    initials: "DP",
  },
  {
    name: "Aisha Bello",
    role: "VP of Operations",
    bio:
      "Aisha runs our production and supply chain teams. She came to Meridian from a global Tier 1 automotive supplier, where she led the launch of three EV programs.",
    initials: "AB",
  },
  {
    name: "Lukas Renner",
    role: "Director of Quality",
    bio:
      "Lukas leads our quality system, metrology lab, and customer quality engineering. He is a Six Sigma Black Belt and an ASQ Certified Quality Engineer.",
    initials: "LR",
  },
];
