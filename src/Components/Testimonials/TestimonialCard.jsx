import React from "react";
import "./testimonials.css"; // ensure this file exists and is imported

export function TestimonialCard({ author = {}, text = "" }) {
  const { name = "Anonymous", handle = "", avatar = "" } = author;
  return (
    <article className="testimonial-card" role="article" aria-label={`Testimonial by ${name}`}>
      <div className="testimonial-inner">
        <div className="testimonial-top">
          <div className="testimonial-avatar">
            {avatar ? <img src={avatar} alt={`${name} avatar`} /> : <div className="avatar-fallback">{name.slice(0,1)}</div>}
          </div>
          <div className="testimonial-author">
            <div className="author-name">{name}</div>
            {handle && <div className="author-handle">@{handle}</div>}
          </div>
        </div>
        <blockquote className="testimonial-text">{text}</blockquote>
      </div>
    </article>
  );
}
