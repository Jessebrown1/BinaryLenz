import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

export default function Navbar({
  brand="BinaryLenz",
  links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact Us", href: "#contact" },
  ],
  fixed = true,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  // Close menu on outside click / ESC
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

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={`nav-wrapper ${fixed ? "nav-fixed" : "nav-absolute"}`}>
      <nav className="hero-nav-pill" role="navigation" aria-label="Main">

        {/* LEFT SIDE – brand + icon */}
        <div className="nav-left">
          <img src="/lenz.png" alt="Brand" className="brand-icon" /> 
          <div className="brand">{brand}</div>
        </div>

        {/* DESKTOP LINKS */}
        <div className="nav-right desktop-only" role="menubar">
          {links.map((link, i) => (
            <a key={i} className="nav-link" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        {/* HAMBURGER (MOBILE ONLY) */}
        {/* HAMBURGER (MOBILE ONLY) */}
<button
  ref={btnRef}
  className="nav-toggle mobile-only"
  aria-expanded={open}
  aria-label={open ? "Close menu" : "Open menu"}
  onClick={() => setOpen((s) => !s)}   // <-- toggle instead of setOpen(true)
>
  <span className={`hamburger ${open ? "open" : ""}`} />
</button>

      </nav>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className={`mobile-menu ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        {/* CLOSE BUTTON */}
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
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
