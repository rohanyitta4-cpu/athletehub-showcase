import { SiteNav } from "@/components/nav/SiteNav";
import { ShowcaseShell } from "@/components/ShowcaseShell";
import { HeroSection } from "@/components/sections/HeroSection";
import { SystemTourSection } from "@/components/sections/SystemTourSection";
import { TraceSection } from "@/components/sections/TraceSection";
import { FrontendSection } from "@/components/sections/FrontendSection";
import { DataSection } from "@/components/sections/DataSection";
import { BackendSection } from "@/components/sections/BackendSection";
import { ClosingSection } from "@/components/sections/ClosingSection";

export default function Home() {
  return (
    <ShowcaseShell>
      <main className="relative">
        <SiteNav />
        <HeroSection />
        <SystemTourSection />
        <TraceSection />
        <FrontendSection />
        <DataSection />
        <BackendSection />
        <ClosingSection />
      </main>
    </ShowcaseShell>
  );
}
