// ScrollReveal.jsx
import React, { useEffect, useRef } from "react";

/**
 * ScrollReveal
 *
 * Wrap a section (or the whole page) with <ScrollReveal>...</ScrollReveal>
 * and it will:
 *  - add `reveal-init` to matching elements inside the wrapper
 *  - observe them and add `in-view` when they intersect
 *  - apply inline animationDelay for children of grids for staggered reveals
 *
 * Props:
 *  - selectors: array|string of selectors to reveal (defaults are sensible)
 *  - rootMargin, threshold: IntersectionObserver tuning
 *  - staggerBase: milliseconds between children in a grid
 *  - once: whether to unobserve after first reveal (default true)
 *  - className: optional wrapper class name
 */
export default function ScrollReveal({
  children,
  selectors = [
    ".hero .hero-title",
    ".hero .hero-sub",
    ".hero .hero-ctas .btn",
    ".service-card",
    ".why-card",
    ".team-card",
    ".industry",
    ".section.cta .cta-btn"
  ],
  root = null,
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.12,
  staggerBase = 120,
  once = true,
  className = "",
  // optional callback for when an element enters view
  onReveal = null
}) {
  const wrapRef = useRef(null);
  const ioRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = wrapRef.current;
    if (!container) return;

    const SELECTOR = Array.isArray(selectors) ? selectors.join(",") : selectors;

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            // add in-view to trigger CSS animations
            el.classList.add("in-view");

            // optional callback
            if (typeof onReveal === "function") onReveal(el);

            // If element is inside a grid parent, add an inline animationDelay based on index
            const parent = el.parentElement;
            if (parent) {
              if (
                parent.matches(".services-grid") ||
                parent.matches(".why-grid") ||
                parent.matches(".team-grid") ||
                parent.matches(".industries-grid")
              ) {
                const items = Array.from(parent.children).filter(Boolean);
                const idx = items.indexOf(el);
                if (!Number.isNaN(idx) && idx >= 0) {
                  // preserve any existing inline delay by adding to it
                  const existing = parseInt(el.style.animationDelay || "0", 10) || 0;
                  el.style.animationDelay = `${existing + idx * staggerBase}ms`;
                }
              }

              if (parent.matches(".hero-ctas") || parent.matches(".featured-actions")) {
                const items = Array.from(parent.children).filter(Boolean);
                const idx = items.indexOf(el);
                if (!Number.isNaN(idx) && idx >= 0) {
                  const existing = parseInt(el.style.animationDelay || "0", 10) || 0;
                  el.style.animationDelay = `${existing + idx * (staggerBase + 40)}ms`;
                }
              }
            }

            if (once) {
              observerInstance.unobserve(el);
            }
          }
        });
      },
      { root, rootMargin, threshold }
    );

    ioRef.current = observer;

    // query elements inside this wrapper only
    const nodes = Array.from(container.querySelectorAll(SELECTOR));
    nodes.forEach((n) => {
      // add initial hidden class (CSS should define .reveal-init)
      n.classList.add("reveal-init");
      observer.observe(n);
    });

    return () => {
      try {
        if (ioRef.current) ioRef.current.disconnect();
      } catch (e) {
        // ignore
      }
      ioRef.current = null;
    };
  }, [selectors, root, rootMargin, threshold, staggerBase, once, onReveal]);

  return (
    <div ref={wrapRef} className={className}>
      {children}
    </div>
  );
}
