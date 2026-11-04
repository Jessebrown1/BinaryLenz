import React from "react";
import BuildTypes from "../../Components/BuildTypes";
import CallToAction from "../../Components/CallToAction";
import { Reveal } from "../../Components/Motion";
import PageHero from "../../Components/PageHero";
import SectionHead from "../../Components/SectionHead";
import ServiceList from "../../Components/ServiceList";
import { techStack } from "../../data/services";
import "../Pages.css";

export default function Services() {
  return (
    <>
      <title>Services | BinaryLenz</title>

      <PageHero
        title="Engineered end to end."
        sub="Bring the idea. We handle the design, the code, the launch and everything after it."
      />

      <section className="section">
        <ServiceList detailed />
      </section>

      <BuildTypes />

      <section className="section">
        <SectionHead index={0} title="Our Stack" sub="Proven tools, chosen to fit each project." />
        <Reveal as="p" className="stack-line">{techStack.join("  ·  ")}</Reveal>
      </section>

      <CallToAction />
    </>
  );
}
