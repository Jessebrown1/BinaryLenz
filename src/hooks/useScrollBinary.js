import { useEffect } from "react";
import { prefersReducedMotion } from "../data/binary";

const TARGETS = "main h1, main h2, main h3, main p, main legend, main li, main .offer-more, main .btn, main .text-link, main .project-category, main .contact-direct span, main .contact-direct a";
// Keep anything people must be able to read or press at the very end of a page
const SKIP = ".cta, .not-found, .contact-form, .project-bits, .devices";

const START = 0.3; // element top at 30% of the screen: first letters flip
const END = 0.1; // element top at 10%, just under the nav: all binary
const MIN_SPAN = 140; // px of scrolling, so items near the page top still change gradually

const noise = (n) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

function collect() {
  const items = [];
  document.querySelectorAll(TARGETS).forEach((el, index) => {
    if (el.closest(SKIP)) return;
    const chars = el.classList.contains("binary-text") ? [...el.querySelectorAll(".bt-char")] : null;
    const nodes = [];
    if (!chars) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) nodes.push({ node: walker.currentNode, text: walker.currentNode.nodeValue });
    }
    items.push({ el, chars, nodes, seed: index * 97 + 1, progress: 0, from: 0, to: 0, width: 0, height: 0 });
  });
  return items;
}

function measure(item, viewport) {
  const rect = item.el.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  item.width = rect.width;
  item.height = rect.height;
  item.from = Math.max(top - viewport * START, 24);
  item.to = Math.max(top - viewport * END, item.from + MIN_SPAN);
}

function apply(item, progress, flicker) {
  const { el, chars, nodes, seed } = item;
  const bit = (i) => (noise(i + seed + flicker) > 0.5 ? "1" : "0");
  const flipped = (i) => noise(i * 1.7 + seed) < progress;

  if (chars) {
    chars.forEach((char, i) => {
      const on = flipped(i);
      char.classList.toggle("bit-on", on);
      if (on) char.lastChild.textContent = bit(i);
    });
  } else {
    // Digits wrap differently from letters: pin the box so nothing below or beside it moves
    const pinned = progress > 0;
    el.style.boxSizing = pinned ? "border-box" : "";
    el.style.minHeight = pinned ? `${item.height}px` : "";
    el.style.maxHeight = pinned ? `${item.height}px` : "";
    el.style.minWidth = pinned ? `${item.width}px` : "";
    el.style.overflow = pinned ? "hidden" : "";
    nodes.forEach(({ node, text }) => {
      node.nodeValue = progress > 0 ? text.replace(/[^\s→·]/g, (c, i) => (flipped(i) ? bit(i) : c)) : text;
    });
  }
  item.progress = progress;
}

// Text turns into 0s and 1s as it scrolls off the top, and back into letters on the way down
export default function useScrollBinary(pageKey) {
  useEffect(() => {
    if (prefersReducedMotion) return;
    const items = collect();
    let frame = null;

    const update = () => {
      frame = null;
      const y = window.scrollY;
      const flicker = Math.floor(y / 36);
      items.forEach((item) => {
        const progress = Math.min(1, Math.max(0, (y - item.from) / (item.to - item.from)));
        if (progress !== item.progress) apply(item, progress, flicker);
      });
    };
    const onScroll = () => {
      frame ??= requestAnimationFrame(update);
    };
    const remeasure = () => {
      items.forEach((item) => apply(item, 0, 0));
      items.forEach((item) => measure(item, window.innerHeight));
      update();
    };

    remeasure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", remeasure);
    document.fonts?.ready.then(remeasure);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", remeasure);
      items.length = 0;
    };
  }, [pageKey]);
}
