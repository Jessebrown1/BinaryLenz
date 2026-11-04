export const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// "BL" as ASCII: the brand's signature
export const BRAND_BITS = "01000010 01001100";

export function binaryIndex(i) {
  return (i + 1).toString(2).padStart(3, "0");
}

export function toBinary(text) {
  return [...text].map((char) => char.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
}
