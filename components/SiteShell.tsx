"use client";

import { useState } from "react";
import Hero from "./Hero";
import Header from "./Header";
import AboutHero from "./AboutHero";
import WhatWeDo from "./WhatWeDo";
import SelectedConcepts from "./SelectedConcepts";
import Process from "./Process";
import Manifesto from "./Manifesto";
import CTA from "./CTA";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import CustomCursor from "./CustomCursor";
import SmoothScroll from "./SmoothScroll";
import Marquee from "./Marquee";

export default function SiteShell() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="theme-light relative min-h-screen bg-bg text-ink">
      <CustomCursor />
      {entered && <SmoothScroll />}
      {entered && <Header />}

      <main>
        <Hero onEnter={() => setEntered(true)} />
        <AboutHero />
        <Marquee />
        <WhatWeDo />
        <SelectedConcepts />
        <Marquee reverse fast />
        <Process />
        <Manifesto />
        <CTA />
      </main>

      <Footer />
      {entered && <CookieBanner />}
    </div>
  );
}
