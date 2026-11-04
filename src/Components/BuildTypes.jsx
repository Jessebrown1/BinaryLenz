import React from "react";
import { websiteTypes } from "../data/services";

export default function BuildTypes() {
  return (
    <section className="build-types" aria-label="Types of website we build">
      <div className="build-track">
        {[...websiteTypes, ...websiteTypes].map((type, i) => (
          <span className="build-item" key={i} aria-hidden={i >= websiteTypes.length}>
            {type}
          </span>
        ))}
      </div>
    </section>
  );
}
