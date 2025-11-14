import React from "react";
import LiquidEther from "../../Components/LiquidEther/LiquidEther"; // adjust path
import "./Home.css";

export default function Home() {
  return (
    <div className="home-root">
      {/* FULLSCREEN BACKGROUND */}
      <div className="home-background" aria-hidden="true">
      <LiquidEther
  className="liquid-ether"
  style={{ width: "100vw", height: "100vh" }}
  colors={["#0f0630", "#7c3aed", "#06b6d4"]} 
  resolution={0.55}
  cursorSize={120}
  mouseForce={28}

  /* 🚀 Auto animation enabled */
  autoDemo={true}
  autoSpeed={0.5}
  autoIntensity={1.9}
  autoResumeDelay={0}
  autoRampDuration={0.55}
  takeoverDuration={0.36}
/>

      </div>

      {/* NAVBAR can be outside or in App; ensure it uses .site-navbar */}
      {/* FOREGROUND content */}
      <div className="home-foreground">
        

        <header className="hero">

          <h1 className="hero-title">The web, made fluid at your fingertips.</h1>
          <p className="hero-sub">Create immersive, responsive backgrounds that react to the user — perfect for modern landing pages.</p>

          <div className="hero-ctas">
            <a className="btn primary" href="#get-started">Get Started</a>
            <a className="btn ghost" href="#learn-more">Learn More</a>
          </div>
        </header>
      </div>
    </div>
  );
}
