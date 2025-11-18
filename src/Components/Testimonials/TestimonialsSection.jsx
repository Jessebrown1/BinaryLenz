import React from "react";
// remove: import { cn } from "@/lib/utils";
const cn = (...args) => args.filter(Boolean).join(" ");
import { TestimonialCard } from "./TestimonialCard";
import "./testimonials.css"; // ensure this file exists and is imported
import avatar1 from "../../assets/avatar1.webp"


    export function TestimonialsSection({
    title = "Trusted by developers worldwide",
    description = "Join thousands of developers who are already using our platform.",
    testimonials = [],
    className = ""
    }) {
    // fallback data if none provided
    const items = testimonials.length
        ? testimonials
        : [
            {
            author: {
                name: "Emma Thompson",
                handle: "@emmaai",
                avatar: avatar1
            },
            text:
                "Using this platform transformed how we handle data. Speed and accuracy are unmatched."
            },
            {
            author: {
                name: "David Park",
                handle: "@davidtech",
                avatar: "/images/testi-2.jpg"
            },
            text:
                "Integration is flawless. We cut development time by over 60% after switching."
            },
            {
            author: {
                name: "Sofia Rodriguez",
                handle: "@sofiaml",
                avatar: "/images/testi-3.jpg"
            },
            text:
                "Finally, a tool that understands context. The accuracy in NLP tasks is impressive."
            }
        ];

    return (
        <section className={cn("testimonials-section", className)}>
        <div className="testimonials-container">

            {/* Header */}
            <div className="testimonials-header">
            <h2 className="testimonials-title">{title}</h2>
            <p className="testimonials-sub">{description}</p>
            </div>

            {/* Marquee */}
            <div className="testimonials-marquee-wrap">
            <div className="marquee group">
                <div className="marquee-track">
                {Array.from({ length: 4 }).map((_, setIndex) =>
                    items.map((t, i) => (
                    <div key={`${setIndex}-${i}`} className="marquee-item">
                        <TestimonialCard {...t} />
                    </div>
                    ))
                )}
                </div>
            </div>

            {/* Gradient fades */}
            <div className="fade-left" />
            <div className="fade-right" />
            </div>

        </div>
        </section>
    );
    }
