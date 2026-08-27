export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Meridian's engineering team worked alongside ours from the first review. They flagged a manufacturability issue on our top-selling part that no other supplier had caught, and the fix paid for itself in the first month of production.",
    author: "Director of Manufacturing",
    role: "Director of Manufacturing",
    company: "Tier 1 aerospace OEM",
  },
  {
    quote:
      "We needed a partner who could take a rough prototype to SOP in under a year. Meridian did it in 10.5 months and the program has been on quality ever since. They are our first call for new programs.",
    author: "VP of Operations",
    role: "VP of Operations",
    company: "Series B EV startup",
  },
  {
    quote:
      "The team treats our program like it's their own. When we had a supply issue with a tier-2 supplier last year, Meridian's buyers helped us source an alternate within 72 hours. We never missed a shipment.",
    author: "Supply Chain Manager",
    role: "Supply Chain Manager",
    company: "Industrial OEM",
  },
];
