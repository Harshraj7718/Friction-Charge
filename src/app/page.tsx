import Hero from "@/components/sections/Hero";
import NetworkStats from "@/components/sections/NetworkStats";
import IndiaGoingElectric from "@/components/sections/IndiaGoingElectric";
import WhyChargingNow from "@/components/sections/WhyChargingNow";
import BusinessModel from "@/components/sections/BusinessModel";
import PartnerPlans from "@/components/sections/PartnerPlans";
import HowItWorksHome from "@/components/sections/HowItWorksHome";
import NetworkTeaser from "@/components/sections/NetworkTeaser";
import TechnologyTeaser from "@/components/sections/TechnologyTeaser";
import ServicesHorizontal from "@/components/sections/ServicesHorizontal";
import WhyFrictionCharge from "@/components/sections/WhyFrictionCharge";
import AppSection from "@/components/sections/AppSection";
import PartnerLogosPlaceholder from "@/components/sections/PartnerLogosPlaceholder";
import Testimonials from "@/components/sections/Testimonials";
import MediaTeaser from "@/components/sections/MediaTeaser";
import MissionVision from "@/components/sections/MissionVision";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { homeFaqs } from "@/lib/data/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NetworkStats />
      <IndiaGoingElectric />
      <WhyChargingNow />
      <BusinessModel />
      <PartnerPlans />
      <HowItWorksHome />
      <NetworkTeaser />
      <TechnologyTeaser />
      <ServicesHorizontal />
      <WhyFrictionCharge />
      <AppSection />
      <PartnerLogosPlaceholder />
      <Testimonials />
      <MediaTeaser />
      <MissionVision />
      <FAQ items={homeFaqs} />
      <FinalCTA />
    </>
  );
}
