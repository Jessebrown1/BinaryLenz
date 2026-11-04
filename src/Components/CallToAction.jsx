import React from "react";
import { Link } from "react-router-dom";
import { BinaryText, Reveal } from "./Motion";

export default function CallToAction() {
  return (
    <section className="cta">
      <BinaryText as="h2" className="cta-title" text="Have something in mind?" />
      <Reveal as="p" className="cta-note">
        A 15-minute call is all it takes to scope your idea and share a plan.
      </Reveal>
      <Reveal delay={150}>
        <Link className="btn primary" to="/contact">Begin a Project</Link>
      </Reveal>
    </section>
  );
}
