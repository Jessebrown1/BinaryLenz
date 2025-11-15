import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

export default function Navbar({
  brand = "BinaryLenz",
  links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ],
  fixed = true,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (open && !menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  // prevent background scroll while menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={`nav-wrapper ${fixed ? "nav-fixed" : "nav-absolute"}`}>
      <nav className="hero-nav-pill" role="navigation" aria-label="Main">
        <div className="nav-left">
          <img src="/lenz.png" alt="Brand" className="brand-icon" />
          <div className="brand">{brand}</div>
        </div>

        <div className="nav-right desktop-only" role="menubar">
          {links.map((link, i) => (
            <a key={i} className="nav-link" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <button
          ref={btnRef}
          className="nav-toggle mobile-only"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((s) => !s)}
        >
          <span className={`hamburger ${open ? "open" : ""}`} />
        </button>
      </nav>

      <div
        ref={menuRef}
        className={`mobile-menu ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <button
          className="mobile-close-btn"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        <div className="mobile-menu-inner">
          {links.map((l, i) => (
            <a
              key={i}
              className="mobile-link"
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${0.08 + i * 0.08}s` }} // JS fallback for stagger
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
