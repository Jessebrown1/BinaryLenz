import React from "react";
import { BinaryText, Reveal } from "./Motion";
import { binaryIndex } from "../data/binary";

export default function SectionHead({ index, title, sub }) {
  return (
    <div className="section-head">
      <span className="section-index">{binaryIndex(index)}</span>
      <div>
        <BinaryText as="h2" className="section-title" text={title} />
        {sub && <Reveal as="p" className="section-sub">{sub}</Reveal>}
      </div>
    </div>
  );
}
