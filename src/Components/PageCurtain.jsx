import React, { useState } from "react";
import { BinaryText } from "./Motion";
import { BRAND_BITS } from "../data/binary";

// Slides over the page, shows the destination name decoding from binary, then lifts away.
// state: "cover" (moving in or holding), "lift" (moving out), "idle" (parked below the screen)
export default function PageCurtain({ state, label }) {
  const [seen, setSeen] = useState(label);
  if (state === "cover" && seen !== label) setSeen(label);

  return (
    <div className={`curtain curtain-${state}`} aria-hidden="true">
      <BinaryText key={seen} className="curtain-label" text={seen} />
      <span className="curtain-bits">{BRAND_BITS}</span>
      <span className="curtain-line" />
    </div>
  );
}
