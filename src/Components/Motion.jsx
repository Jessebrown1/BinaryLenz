import React, { useCallback, useEffect, useRef } from "react";
import { prefersReducedMotion } from "../data/binary";

function useOnEnter(ref, onEnter) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen: run now. The observer only reports on painted frames,
    // and the top of the page must never wait on that.
    const { top, bottom } = el.getBoundingClientRect();
    if (bottom > 0 && top < window.innerHeight && !el.closest(".curtain")) {
      const timer = setTimeout(() => onEnter(el), 30); // let the hidden state apply so it can transition
      return () => clearTimeout(timer);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        onEnter(el);
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, onEnter]);
}

const showReveal = (el) => el.classList.add("in");

// Fades its children up the first time they scroll into view
export function Reveal({ as = "div", className = "", delay = 0, children, ...rest }) {
  const Tag = as;
  const ref = useRef(null);
  useOnEnter(ref, showReveal);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

function decode(el, delay) {
  const chars = [...el.querySelectorAll(".bt-char")];
  const finish = (char) => char.classList.add("done");
  if (prefersReducedMotion) {
    chars.forEach(finish);
    return () => {};
  }

  const start = performance.now() + delay;
  const duration = 500 + chars.length * 16;
  const timer = setInterval(() => {
    const progress = (performance.now() - start) / duration;
    if (progress < -0.3) return;
    const solved = Math.floor(Math.max(progress, 0) * chars.length);
    chars.forEach((char, i) => {
      if (i < solved) finish(char);
      else char.lastChild.textContent = Math.random() > 0.5 ? "1" : "0";
    });
    if (solved >= chars.length) clearInterval(timer);
  }, 50);
  return () => clearInterval(timer);
}

// Text that resolves out of 0s and 1s. Each digit sits over its real letter so nothing reflows.
export function BinaryText({ as = "span", text, className = "", delay = 0 }) {
  const Tag = as;
  const ref = useRef(null);
  const stop = useRef(null);
  const onEnter = useCallback((el) => {
    stop.current = decode(el, delay);
  }, [delay]);
  useOnEnter(ref, onEnter);
  useEffect(() => () => stop.current?.(), []);

  return (
    <Tag ref={ref} className={`binary-text ${className}`} aria-label={text}>
      {text.split(" ").map((word, w) => (
        <React.Fragment key={w}>
          {w > 0 && " "}
          <span className="bt-word" aria-hidden="true">
            {[...word].map((char, i) => (
              <span className="bt-char" key={i}>
                <span className="bt-real">{char}</span>
                <span className="bt-bit" />
              </span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </Tag>
  );
}
