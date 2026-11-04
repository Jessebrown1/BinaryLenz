import React from "react";
import { Reveal } from "../Motion";
import { toBinary } from "../../data/binary";
import "./ProjectCard.css";

export default function ProjectCard({ title, category, summary, tags = [], image, link, delay = 0 }) {
  return (
    <Reveal as="article" className="project-card" delay={delay}>
      <div className="project-thumb">
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          <span className="project-bits" aria-hidden="true">{toBinary(title)}</span>
        )}
      </div>
      <span className="project-category">{category}</span>
      <h3>{title}</h3>
      <p>{summary}</p>
      <p className="project-tags">{tags.join("  ·  ")}</p>
      {link && (
        <a className="text-link" href={link} target="_blank" rel="noreferrer">
          View project <span aria-hidden="true">→</span>
        </a>
      )}
    </Reveal>
  );
}
