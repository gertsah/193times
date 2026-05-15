import Header from "@/components/Header";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import DesignPreview from "@/components/DesignPreview";
import SelectedConcepts from "@/components/SelectedConcepts";
import Manifesto from "@/components/Manifesto";
import Process from "@/components/Process";
import Services from "@/components/Services";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/**
 * Sticky intro → hero hand-off
 * ────────────────────────────
 * • `Intro` sits in a `fixed inset-0 z-0` layer that lives behind
 *   everything for the whole page lifetime — so it's truly pinned to
 *   the viewport, no parent-height math required.
 * • A transparent `h-screen` spacer at the top of the document gives
 *   the intro one full viewport of "uncovered" space at scroll = 0.
 * • `<main>` has `z-10` + a solid `bg-bg`, so as the user scrolls past
 *   the spacer the hero literally slides up from the bottom of the
 *   viewport and progressively covers the intro behind it.
 * • Scroll back to the top and the intro reappears.
 */
export default function Page() {
  return (
    <div className="relative bg-bg text-ink">
      <Cursor />
      <Header />

      {/* Fixed background layer */}
      <div className="fixed inset-0 z-0" aria-hidden="false">
        <Intro />
      </div>

      {/* Transparent spacer — lets the fixed intro show through at scrollY=0 */}
      <div className="relative z-10 h-screen pointer-events-none" aria-hidden />

      {/* Real page content with solid bg slides up over the intro */}
      <main className="noise relative z-10 overflow-x-clip bg-bg text-ink">
        <Hero />
        <WhatWeDo />
        <DesignPreview />
        <SelectedConcepts />
        <Manifesto />
        <Process />
        <Services />
        <CTA />
        <Footer />
      </main>
    </div>
  );
}
