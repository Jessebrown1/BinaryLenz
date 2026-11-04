import React from "react";
import { Reveal } from "./Motion";
import { binaryIndex } from "../data/binary";

export default function StepGrid({ items }) {
  return (
    <div className="step-grid">
      {items.map((item, i) => (
        <Reveal className="step" key={item.title} delay={i * 110}>
          <span className="row-index">{binaryIndex(i)}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
