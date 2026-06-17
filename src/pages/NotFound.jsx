import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const S = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif",
  },
  topBar: {
    background: "#111111",
    padding: "14px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    letterSpacing: "0.12em",
  },
  brand: {
    color: "#ffffff",
    fontWeight: 800,
    fontSize: "22px",
    textTransform: "uppercase",
    textDecoration: "none",
    letterSpacing: "0.18em",
  },
  topNav: {
    color: "#aaaaaa",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
  },
  body: {
    flex: 1,
    display: "flex",
    alignItems: "stretch",
  },
  /* Giant 404 left panel */
  leftPanel: {
    width: "50%",
    background: "#111111",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "60px 56px",
    position: "relative",
    overflow: "hidden",
  },
  gridDecor: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },
  bigNumber: {
    fontSize: "clamp(120px, 16vw, 200px)",
    fontWeight: 800,
    lineHeight: 0.85,
    color: "transparent",
    WebkitTextStroke: "2px #333333",
    letterSpacing: "-0.04em",
    userSelect: "none",
    position: "relative",
    zIndex: 1,
  },
  dividerLine: {
    width: "48px",
    height: "3px",
    background: "#ffffff",
    margin: "28px 0",
    position: "relative",
    zIndex: 1,
  },
  errorCode: {
    color: "#555555",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    marginBottom: "12px",
    position: "relative",
    zIndex: 1,
  },
  headline: {
    color: "#ffffff",
    fontWeight: 800,
    fontSize: "clamp(28px, 3.5vw, 44px)",
    textTransform: "uppercase",
    lineHeight: 1.05,
    letterSpacing: "0.06em",
    position: "relative",
    zIndex: 1,
  },
  headlineDim: {
    display: "block",
    fontWeight: 400,
    color: "#666666",
    fontSize: "0.6em",
    letterSpacing: "0.2em",
  },
  /* Right panel */
  rightPanel: {
    flex: 1,
    background: "#fafafa",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px 56px",
  },
  label: {
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: "#999999",
    marginBottom: "16px",
  },
  message: {
    fontSize: "clamp(15px, 1.6vw, 18px)",
    color: "#333333",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    lineHeight: 1.7,
    maxWidth: "380px",
    marginBottom: "40px",
    fontWeight: 500,
  },
  linksTitle: {
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: "#aaaaaa",
    marginBottom: "14px",
  },
  quickLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
    marginBottom: "40px",
  },
  quickLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #e8e8e8",
    textDecoration: "none",
    color: "#111111",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    transition: "padding-left 0.15s",
    cursor: "pointer",
  },
  arrow: {
    color: "#bbbbbb",
    fontSize: "16px",
    transition: "color 0.15s, transform 0.15s",
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    background: "#111111",
    color: "#ffffff",
    border: "none",
    borderRadius: "0",
    padding: "14px 28px",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    textDecoration: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.15s",
  },
  btnPrimaryHover: {
    background: "#333333",
  },
  bottomBar: {
    background: "#111111",
    padding: "10px 32px",
    textAlign: "center",
    color: "#444444",
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.16em",
  },
};

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop All Products", to: "/products" },
  { label: "Your Cart", to: "/cart" },
  { label: "FAQ", to: "/faq" },
  { label: "Shipping Info", to: "/shipping-info" },
];

const QuickLink = ({ label, to }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      style={{
        ...S.quickLink,
        paddingLeft: hovered ? "10px" : "0",
        color: hovered ? "#111111" : "#333333",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span>{label}</span>
      <span style={{ ...S.arrow, color: hovered ? "#111111" : "#bbbbbb", transform: hovered ? "translateX(4px)" : "none" }}>
        →
      </span>
    </Link>
  );
};

const NotFoundPage = () => {
  const [btnHovered, setBtnHovered] = useState(false);
  const [tick, setTick] = useState(0);

  /* subtle number flicker effect */
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={S.page}>
      {/* Main body */}
      <div style={S.body}>
        {/* Left dark panel */}
        <div style={S.leftPanel}>
          <div style={S.gridDecor} />
          <p style={S.errorCode}>Error · Page Not Found</p>
          <div
            style={{
              ...S.bigNumber,
              WebkitTextStroke: tick % 2 === 0 ? "2px #333333" : "2px #444444",
              transition: "all 0.6s ease",
            }}
          >
            404
          </div>
          <div style={S.dividerLine} />
          <h2 style={S.headline}>
            Wrong
            <span style={S.headlineDim}>SIDE OF THE PITCH</span>
          </h2>
        </div>

        {/* Right panel */}
        <div style={S.rightPanel}>
          <p style={S.label}>Oops — something went wrong</p>
          <p style={S.message}>
            The page you're looking for has been moved, removed, or never existed. Let's get you back on the field.
          </p>

          <p style={S.linksTitle}>Quick Navigation</p>
          <div style={S.quickLinks}>
            {QUICK_LINKS.map((l) => (
              <QuickLink key={l.to} label={l.label} to={l.to} />
            ))}
          </div>

          <Link
            to="/"
            style={{
              ...S.btnPrimary,
              ...(btnHovered ? S.btnPrimaryHover : {}),
            }}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
          >
            ← Back to Home
          </Link>
        </div>
      </div>

    </div>
  );
};

export default NotFoundPage;