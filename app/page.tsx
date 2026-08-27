import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ValueProps } from "@/components/sections/ValueProps";
import { CapabilitiesPreview } from "@/components/sections/CapabilitiesPreview";
import { FeaturedCaseStudy } from "@/components/sections/FeaturedCaseStudy";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ValueProps />
      <CapabilitiesPreview />
      <FeaturedCaseStudy />
      <Process />
      <Stats />
      <Testimonials />
      <FinalCta />
    </>
  );
}
