import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../../data/site";
import "./Navbar.css";

export default function Navbar({
  brand = "BinaryLenz",
  links = navLinks,
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
        <Link className="nav-left" to="/">
          <img src="/lenz.png" alt="" className="brand-icon" />
          <div className="brand">{brand}</div>
        </Link>

        <div className="nav-right desktop-only" role="menubar">
          {links.map((link, i) => (
            <NavLink key={i} className="nav-link" to={link.href} end={link.href === "/"}>
              {link.label}
            </NavLink>
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
        <div className="mobile-menu-inner">
          {links.map((l, i) => (
            <NavLink
              key={i}
              className="mobile-link"
              to={l.href}
              end={l.href === "/"}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${0.12 + i * 0.07}s` : "0s" }}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
