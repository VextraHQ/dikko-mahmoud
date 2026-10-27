import { FirmAtAGlanceSection } from "@/components/home/firm-at-a-glance-section";
import { FirmStorySection } from "@/components/home/firm-story-section";
import { Hero } from "@/components/home/hero-section";

export default function Home() {
  return (
    <>
      <Hero />
      <FirmAtAGlanceSection />
      <FirmStorySection />
    </>
  );
}
