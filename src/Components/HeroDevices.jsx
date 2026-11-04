import React from "react";
import { BRAND_BITS } from "../data/binary";

const bytes = BRAND_BITS.split(" ");

// Drawn in CSS, so the hero needs no image download
export default function HeroDevices() {
  return (
    <div className="devices" aria-hidden="true">
      <div className="device-browser">
        <div className="browser-bar">
          <i /><i /><i />
          <span>yourbrand.com</span>
        </div>
        <div className="browser-body">
          <span className="ui-block ui-title" />
          <span className="ui-block ui-line" />
          <span className="ui-block ui-button" />
          <div className="ui-cols">
            <span className="ui-block" />
            <span className="ui-block" />
            <span className="ui-block" />
          </div>
        </div>
      </div>

      <div className="device-phone">
        <div className="phone-card" />
        <div className="phone-bits">
          <span>
            {Array.from({ length: 16 }, (_, i) => (
              <React.Fragment key={i}>
                {bytes[i % 2]}
                <br />
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
