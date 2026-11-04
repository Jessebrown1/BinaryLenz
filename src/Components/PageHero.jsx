import React from "react";
import { BinaryText, Reveal } from "./Motion";

export default function PageHero({ title, sub }) {
  return (
    <header className="page-hero">
      <BinaryText as="h1" className="page-title" text={title} delay={500} />
      {sub && <Reveal as="p" className="page-sub" delay={700}>{sub}</Reveal>}
    </header>
  );
}
