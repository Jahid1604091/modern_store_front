import React from "react";
import "./css/Featurehighlights.css";

/**
 * FeatureHighlights
 * Drop this between the Slider and the product sections.
 *
 * Props:
 *   features – array of { icon (Bootstrap icon class), title, subtitle }
 *              Falls back to default 3-feature set if omitted.
 */

const DEFAULT_FEATURES = [
  {
    icon: "bi bi-patch-check-fill",
    title: "Best Quality",
    subtitle: "Finest quality products in Bangladesh",
  },
  {
    icon: "bi bi-credit-card-2-front",
    title: "Online Payment",
    subtitle: "We accept bKash & card payments",
  },
  {
    icon: "bi bi-truck",
    title: "Fast Delivery",
    subtitle: "Quick courier delivery nationwide",
  },
];

const FeatureHighlights = ({ features = DEFAULT_FEATURES }) => {
  return (
    <div className="feature-highlights">
      <div className="feature-highlights-inner">
        {features.map((feat, idx) => (
          <div className="feature-item" key={idx}>
            <div className="feature-icon">
              <i className={feat.icon} />
            </div>
            <div className="feature-text">
              <h5>{feat.title}</h5>
              <p>{feat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;