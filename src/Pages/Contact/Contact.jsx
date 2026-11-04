import React, { useState } from "react";
import { BinaryText, Reveal } from "../../Components/Motion";
import { BRAND_BITS, toBinary } from "../../data/binary";
import { site } from "../../data/site";
import "../Pages.css";

const projectTypes = ["Mobile app", "Website", "Web platform", "Online store", "Not sure yet"];

export default function Contact() {
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  // No backend yet: hand the message to the visitor's email app.
  function handleSubmit(e) {
    e.preventDefault();
    const { email, type, message } = Object.fromEntries(new FormData(e.currentTarget));
    const subject = `Project enquiry: ${type}`;
    const body = `${message}\n\nFrom: ${name} (${email})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <title>Contact | BinaryLenz</title>

      <section className="contact">
        <div className="contact-intro">
          <BinaryText as="h1" className="contact-title" text="Let’s talk." delay={500} />
          <Reveal as="p" className="page-sub" delay={700}>
            Tell us what you want to build. We’ll arrange a 15-minute call to scope it and share a plan.
          </Reveal>

          <Reveal className="contact-direct" delay={850}>
            <span>Write to us directly</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </Reveal>
        </div>

        <Reveal as="form" className="contact-form" delay={600} onSubmit={handleSubmit}>
          <fieldset className="type-picker">
            <legend>I’m looking to build</legend>
            {projectTypes.map((type, i) => (
              <label key={type}>
                <input type="radio" name="type" value={type} defaultChecked={i === 0} />
                <span>{type}</span>
              </label>
            ))}
          </fieldset>

          <label className="field">
            <input name="name" placeholder=" " autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
            <span>Your name</span>
          </label>

          <label className="field">
            <input name="email" type="email" placeholder=" " autoComplete="email" required />
            <span>Email address</span>
          </label>

          <label className="field">
            <textarea name="message" placeholder=" " rows="4" required />
            <span>About your project</span>
          </label>

          <p className="name-bits" aria-hidden="true">{name ? toBinary(name.slice(0, 24)) : BRAND_BITS}</p>

          <button className="btn primary" type="submit">Send Enquiry</button>
          {sent && <p className="contact-status" role="status">Your email app should now open with this message ready to send.</p>}
        </Reveal>
      </section>
    </>
  );
}
