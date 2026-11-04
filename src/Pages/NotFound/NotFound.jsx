import React from "react";
import { Link } from "react-router-dom";
import PageHero from "../../Components/PageHero";
import "../Pages.css";

export default function NotFound() {
  return (
    <>
      <title>Page not found | BinaryLenz</title>

      <PageHero title="Page not found." sub="That page doesn’t exist or has moved." />
      <section className="section not-found">
        <Link className="btn primary" to="/">Back to Home</Link>
      </section>
    </>
  );
}
