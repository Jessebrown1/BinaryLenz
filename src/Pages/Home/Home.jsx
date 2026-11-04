import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import BuildTypes from "../../Components/BuildTypes";
import CallToAction from "../../Components/CallToAction";
import HeroDevices from "../../Components/HeroDevices";
import { BinaryText, Reveal } from "../../Components/Motion";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import SectionHead from "../../Components/SectionHead";
import StepGrid from "../../Components/StepGrid";
import { binaryIndex } from "../../data/binary";
import { offers, process, services } from "../../data/services";
import { projects } from "../../data/projects";

export default function Home() {
  return (
    <>
      <title>BinaryLenz | Mobile App & Website Development</title>

      <header className="hero">
        <div>
          <BinaryText as="h1" className="hero-title" text="Mobile apps and websites, built without compromise." delay={900} />
          <Reveal as="p" className="hero-sub" delay={1300}>
            We design and engineer apps and websites of every kind, for brands that refuse to look ordinary.
          </Reveal>
          <Reveal className="hero-ctas" delay={1450}>
            <Link className="btn primary" to="/contact">Begin a Project</Link>
            <Link className="text-link" to="/portfolio">Selected Work <span aria-hidden="true">→</span></Link>
          </Reveal>
          <Reveal as="p" className="hero-platforms" delay={1600}>iOS  ·  Android  ·  Web</Reveal>
        </div>

        <Reveal delay={1100}>
          <HeroDevices />
        </Reveal>
      </header>

      <section className="section">
        <SectionHead index={0} title="Two Things We Do Best" />
        <div className="offer-grid">
          {offers.map((offer, i) => (
            <Reveal key={offer.title} delay={i * 120}>
              <Link className="offer-card" to="/services">
                <h3>{offer.title}</h3>
                <p>{offer.text}</p>
                <ul>
                  {offer.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <span className="offer-more">Explore →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <BuildTypes />

      <section className="section">
        <SectionHead index={1} title="What We Build" sub="One team for the whole product: interface, code, backend and launch." />
        <div className="card-grid">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 100}>
              <div className="mini-card">
                <span className="row-index">{binaryIndex(i)}</span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead index={2} title="Selected Work" sub="Apps and web platforms we’ve designed, built and shipped." />

        <div className="project-grid">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.title} {...project} delay={i * 120} />
          ))}
        </div>

        <Reveal className="section-more">
          <Link className="text-link" to="/portfolio">All Projects <span aria-hidden="true">→</span></Link>
        </Reveal>
      </section>

      <section className="section">
        <SectionHead index={3} title="From Idea to Launch" />
        <StepGrid items={process} />
      </section>

      <CallToAction />
    </>
  );
}
