import React, { useState } from "react";
import "./css/Announcementbar.css";

/**
 * Announcementbar
 * Props:
 *   message    – string or JSX (optional, uses default if omitted)
 *   promoCode  – string  (optional)
 *   dismissible – bool (default true)
 */
const Announcementbar = ({
  message,
  promoCode = "SAVE15",
  dismissible = true,
}) => {
  const [visible, setVisible] = useState(true);

  const handleCopy = () => {
    navigator.clipboard?.writeText(promoCode);
  };

  if (!visible) return null;

  return (
    <div className="announcement-bar">
      {message ?? (
        <>
          🎉 Get <strong>15% Discount</strong> on all products — use code{" "}
          <span
            className="promo-code"
            onClick={handleCopy}
            title="Click to copy"
          >
            {promoCode}
          </span>{" "}
          at checkout
        </>
      )}

      {dismissible && (
        <button
          className="announce-close"
          onClick={() => setVisible(false)}
          aria-label="Close announcement"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Announcementbar;