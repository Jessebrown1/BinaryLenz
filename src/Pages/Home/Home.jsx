import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import BuildTypes from "../../Components/BuildTypes";
import CallToAction from "../../Components/CallToAction";
import { BinaryText, Reveal } from "../../Components/Motion";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import SectionHead from "../../Components/SectionHead";
import ServiceList from "../../Components/ServiceList";
import StepGrid from "../../Components/StepGrid";
import { BRAND_BITS } from "../../data/binary";
import { process, whyUs } from "../../data/services";
import { projects } from "../../data/projects";

export default function Home() {
  return (
    <>
      <title>BinaryLenz | Mobile App & Website Development</title>

      <header className="hero">
        <BinaryText as="h1" className="hero-title" text="Mobile apps and websites, built without compromise." delay={900} />

        <div className="hero-foot">
          <Reveal as="p" className="hero-sub" delay={1300}>
            We design and engineer apps and websites of every kind, for brands that refuse to look ordinary.
          </Reveal>

          <Reveal className="hero-ctas" delay={1450}>
            <Link className="btn primary" to="/contact">Begin a Project</Link>
            <Link className="text-link" to="/portfolio">Selected Work <span aria-hidden="true">→</span></Link>
          </Reveal>
        </div>

        <span className="hero-bits" aria-hidden="true">{BRAND_BITS}</span>
      </header>

      <section className="section">
        <SectionHead index={0} title="What We Build" sub="One team for the whole product: interface, code, backend and launch." />
        <ServiceList />
      </section>

      <BuildTypes />

      <section className="section">
        <SectionHead index={1} title="Selected Work" sub="Apps and web platforms we’ve designed, built and shipped." />

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
        <SectionHead index={2} title="From Idea to Launch" />
        <StepGrid items={process} />
      </section>

      <section className="section">
        <SectionHead index={3} title="Why BinaryLenz" />
        <StepGrid items={whyUs} />
      </section>

      <CallToAction />
    </>
  );
}
