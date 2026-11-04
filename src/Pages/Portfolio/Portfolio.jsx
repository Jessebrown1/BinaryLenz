import React from "react";
import CallToAction from "../../Components/CallToAction";
import PageHero from "../../Components/PageHero";
import ProjectCard from "../../Components/ProjectCard/ProjectCard";
import { projects } from "../../data/projects";
import "../Pages.css";

export default function Portfolio() {
  return (
    <>
      <title>Portfolio | BinaryLenz</title>

      <PageHero title="Selected work." sub="Apps and web platforms we’ve designed, built and shipped." />

      <section className="section">
        <div className="project-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} delay={(i % 3) * 120} />
          ))}
        </div>
      </section>

      <CallToAction />
    </>
  );
}
