import React from "react";
import { Link } from "react-router-dom";
import { Reveal } from "./Motion";
import { binaryIndex } from "../data/binary";
import { services } from "../data/services";

export default function ServiceList({ detailed = false }) {
  return (
    <div className="service-list">
      {services.map((service, i) => (
        <Reveal key={service.title}>
          <Link className="service-row" to={detailed ? "/contact" : "/services"}>
            <span className="row-index">{binaryIndex(i)}</span>
            <h3>{service.title}</h3>
            <div className="row-copy">
              <p>{service.summary}</p>
              {detailed && <p className="row-includes">{service.includes.join("  ·  ")}</p>}
            </div>
            <span className="row-arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
