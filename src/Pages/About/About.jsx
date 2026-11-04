import React from "react";
import CallToAction from "../../Components/CallToAction";
import { Reveal } from "../../Components/Motion";
import PageHero from "../../Components/PageHero";
import SectionHead from "../../Components/SectionHead";
import StepGrid from "../../Components/StepGrid";
import { process, whyUs } from "../../data/services";
import "../Pages.css";

export default function About() {
  return (
    <>
      <title>About | BinaryLenz</title>

      <PageHero title="Technology, held to a higher standard." />

      <section className="section">
        <Reveal as="p" className="statement">
          BinaryLenz turns ideas into software that feels considered in every detail. We are a small
          team by choice: you speak directly to the people building your product.
        </Reveal>
      </section>

      <section className="section">
        <SectionHead index={0} title="How We Work" />
        <StepGrid items={process} />
      </section>

      <section className="section">
        <SectionHead index={1} title="What Sets Us Apart" />
        <StepGrid items={whyUs} />
      </section>

      <CallToAction />
    </>
  );
}
