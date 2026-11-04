import React, { useState } from "react";
import { BinaryText, Reveal } from "../../Components/Motion";
import { BRAND_BITS, toBinary } from "../../data/binary";
import { site } from "../../data/site";
import "../Pages.css";

const projectTypes = ["Mobile app", "Website", "Web platform", "Online store", "Not sure yet"];

// Google Apps Script URL. See google-apps-script/README.md
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

export default function Contact() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle"); // idle, sending, sent, email, error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!endpoint) {
      const subject = `Project enquiry: ${data.type}`;
      const body = `${data.message}\n\nFrom: ${data.name} (${data.email})`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("email");
      return;
    }

    setStatus("sending");
    try {
      // text/plain keeps this a simple request, which Apps Script can answer across origins
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.ok) throw new Error(result.error);
      form.reset();
      setName("");
      setStatus("sent");
    } catch {
      setStatus("error"); // the typed message stays in the form so nothing is lost
    }
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

          <label className="field-trap" aria-hidden="true">
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>

          <button className="btn primary" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send Enquiry"}
          </button>

          <div role="status">
            {status === "sent" && <p className="contact-status">Thank you. Your enquiry has been received and we’ll be in touch soon.</p>}
            {status === "email" && <p className="contact-status">Your email app should now open with this message ready to send.</p>}
            {status === "error" && (
              <p className="contact-status error">
                Sorry, that didn’t send. Please try again, or email us at <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
