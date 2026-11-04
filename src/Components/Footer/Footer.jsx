import React from "react";
import { Link } from "react-router-dom";
import { navLinks, site } from "../../data/site";
import { BRAND_BITS } from "../../data/binary";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a className="footer-email" href={`mailto:${site.email}`}>{site.email}</a>

        <nav className="footer-links" aria-label="Footer">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span className="footer-bits" aria-hidden="true">{BRAND_BITS}</span>
      </div>
    </footer>
  );
}
