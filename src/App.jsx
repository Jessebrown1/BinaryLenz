import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import PageCurtain from "./Components/PageCurtain";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Services from "./Pages/Services/Services";
import Portfolio from "./Pages/Portfolio/Portfolio";
import Contact from "./Pages/Contact/Contact";
import NotFound from "./Pages/NotFound/NotFound";
import useScrollBinary from "./hooks/useScrollBinary";
import { navLinks, site } from "./data/site";
import { prefersReducedMotion } from "./data/binary";

// three.js is most of the bundle: load it after the page content has rendered
const LiquidEther = lazy(() => import("./Components/LiquidEther/LiquidEther"));

// Defined once so the background never rebuilds its WebGL scene on a re-render
const FLUID_COLORS = ["#0f0630", "#7c3aed", "#06b6d4"];
const FLUID_STYLE = { width: "100vw", height: "100vh" };

const COVER_MS = prefersReducedMotion ? 0 : 900; // curtain in + a beat to read the page name
const INTRO_MS = 1100;
const LIFT_MS = 800; // matches .curtain-lift

function pageName(pathname) {
  return navLinks.find((link) => link.href === pathname)?.label ?? site.name;
}

function App() {
  const location = useLocation();
  const [shown, setShown] = useState(location); // the page on screen, behind the curtain
  const [intro, setIntro] = useState(!prefersReducedMotion);
  const [lifting, setLifting] = useState(false);
  const covering = intro || location.pathname !== shown.pathname;

  useEffect(() => {
    if (!covering) return;
    let swapped = false;
    const timer = setTimeout(() => {
      swapped = true;
      setShown(location);
      setIntro(false);
      setLifting(!prefersReducedMotion);
      window.scrollTo(0, 0);
    }, intro ? INTRO_MS : COVER_MS);
    return () => {
      clearTimeout(timer);
      if (!swapped) setLifting(!prefersReducedMotion); // back button mid-cover: still lift away
    };
  }, [covering, intro, location]);

  useEffect(() => {
    if (!lifting || covering) return;
    const timer = setTimeout(() => setLifting(false), LIFT_MS);
    return () => clearTimeout(timer);
  }, [lifting, covering]);

  useScrollBinary(shown.pathname);

  const curtain = covering ? "cover" : lifting ? "lift" : "idle";

  return (
    <div className="home-root">

      {/* FULLSCREEN BACKGROUND, shared by every page so it never restarts */}
      <div className="home-background" aria-hidden="true">
        {!prefersReducedMotion && (
          <Suspense fallback={null}>
            <LiquidEther
              className="liquid-ether"
              style={FLUID_STYLE}
              colors={FLUID_COLORS}
              resolution={0.25}
              iterationsPoisson={12}
              BFECC={false}
              cursorSize={55}
              mouseForce={28}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={1.9}
              autoResumeDelay={600}
              autoRampDuration={0.55}
              takeoverDuration={0.36}
            />
          </Suspense>
        )}
      </div>

      <PageCurtain
        state={curtain}
        label={intro ? site.name : pageName(location.pathname)}
      />

      <Navbar />

      {/* FOREGROUND content */}
      <div className="home-foreground">
        <main key={shown.pathname}>
          <Routes location={shown}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
