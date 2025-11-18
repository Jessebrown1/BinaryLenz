import React from "react";
import LiquidEther from "../../Components/LiquidEther/LiquidEther"; 
import "./Home.css";
import { TestimonialsSection } from "../../Components/Testimonials/TestimonialsSection";

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
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={1.9}
          autoResumeDelay={0}
          autoRampDuration={0.55}
          takeoverDuration={0.36}
        />
      </div>

      {/* FOREGROUND content */}
      <div className="home-foreground">

        {/* ORIGINAL HERO – UNCHANGED */}
        <header className="hero">
          <h1 className="hero-title">The web, made fluid at your fingertips.</h1>
          <p className="hero-sub">
            Create immersive, responsive backgrounds that react to the user — perfect for modern landing pages.
          </p>

          <div className="hero-ctas">
            <a className="btn primary" href="#get-started">Get Started</a>
            <a className="btn ghost" href="#learn-more">Learn More</a>
          </div>
        </header>


        {/* ⭐ ADDED — WHAT WE DO */}
        <section className="section what-we-do">
          <h2 className="section-title">What We Do</h2>
          <p className="section-sub">
            We design and develop high-end digital products that elevate brands and drive business results.
          </p>

          <div className="services-grid">
            <div className="service-card">
              <h3>High-End Websites</h3>
              <p>Custom, fast, responsive and visually stunning websites.</p>
            </div>

            <div className="service-card">
              <h3>Mobile Apps</h3>
              <p>Android & iOS apps with smooth UI and strong backend systems.</p>
            </div>

            <div className="service-card">
              <h3>Booking Systems</h3>
              <p>Powerful scheduling, automation and customer flow management.</p>
            </div>

            <div className="service-card">
              <h3>Management Dashboards</h3>
              <p>Staff, inventory, sales, analytics — built for your workflow.</p>
            </div>

            <div className="service-card">
              <h3>Portfolio & Brand Sites</h3>
              <p>Elegant personal and business portfolios that stand out.</p>
            </div>

            <div className="service-card">
              <h3>Video Editing & Motion</h3>
              <p>Professional brand videos, ads, reels and storytelling visuals.</p>
            </div>
          </div>
        </section>


        {/* ⭐ ADDED — FEATURED PROJECTS */}
        <section className="section featured-projects">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-sub">A few examples of the digital products we’ve delivered.</p>

          <div className="featured-grid">

            <div className="featured-card">
              <h3>Mobile Wallet App</h3>
              <p>Secure payments, QR checkout, analytics and merchant tools.</p>
            </div>

            <div className="featured-card">
              <h3>Restaurant Booking System</h3>
              <p>Table scheduling, staff management and customer tracking.</p>
            </div>

            <div className="featured-card">
              <h3>Business Management Suite</h3>
              <p>Inventory, HR, sales analytics and reporting tools.</p>
            </div>

          </div>
        </section>


        {/* ⭐ ADDED — WHY CHOOSE US */}
        <section className="section why-us">
          <h2 className="section-title">Why Choose Us</h2>

          <div className="why-grid">
            <div className="why-card">
              <h3>High Quality</h3>
              <p>Every detail is designed and engineered with precision.</p>
            </div>

            <div className="why-card">
              <h3>Fast Delivery</h3>
              <p>Small team means we move quickly and communicate clearly.</p>
            </div>

            <div className="why-card">
              <h3>Multi-Disciplinary</h3>
              <p>Web, mobile and video — everything you need in one place.</p>
            </div>

            <div className="why-card">
              <h3>Reliable Support</h3>
              <p>We stay with you long after the project is delivered.</p>
            </div>
          </div>
        </section>


        <TestimonialsSection
  title="Trusted by developers worldwide"
  description="Join thousands of developers who are already building the future with our platform."
  testimonials={[
    { author: { name: "Emma Thompson", handle: "emmaai", avatar: "/images/testi-1.jpg" }, text: "Using this AI platform has transformed how we handle data analysis. The speed and accuracy are unprecedented." },
    { author: { name: "David Park", handle: "davidtech", avatar: "/images/testi-2.jpg" }, text: "The API integration is flawless. We've reduced our development time by 60% since implementing this solution." },
    { author: { name: "Sofia Rodriguez", handle: "sofiaml", avatar: "/images/testi-3.jpg" }, text: "Finally, an AI tool that actually understands context! The accuracy in natural language processing is impressive." }
  ]}
/>



        {/* ⭐ ADDED — FINAL CTA */}
        <section className="section cta">
          <h2 className="cta-title">Let’s build something amazing together.</h2>
          <a className="btn primary cta-btn" href="#contact">Start Now</a>
        </section>


      </div>
    </div>
  );
}
