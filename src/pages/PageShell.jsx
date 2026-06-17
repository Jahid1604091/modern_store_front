import React from "react";
import { Link } from "react-router-dom";

/* ─── Shared styles ───────────────────────────────────────────── */
export const S = {
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
  /* Hero banner below topbar */
  hero: {
    background: "#111111",
    padding: "52px 64px 44px",
    position: "relative",
    overflow: "hidden",
  },
  heroGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },
  heroEyebrow: {
    color: "#555555",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    marginBottom: "10px",
    position: "relative",
    zIndex: 1,
  },
  heroTitle: {
    color: "#ffffff",
    fontWeight: 800,
    fontSize: "clamp(32px, 4vw, 52px)",
    textTransform: "uppercase",
    lineHeight: 1.0,
    letterSpacing: "0.06em",
    marginBottom: "14px",
    position: "relative",
    zIndex: 1,
  },
  heroLine: {
    width: "40px",
    height: "3px",
    background: "#ffffff",
    marginBottom: "16px",
    position: "relative",
    zIndex: 1,
  },
  heroSub: {
    color: "#666666",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    position: "relative",
    zIndex: 1,
  },
  /* Breadcrumb */
  breadcrumb: {
    padding: "12px 64px",
    background: "#f5f5f5",
    borderBottom: "1px solid #e8e8e8",
    display: "flex",
    gap: "8px",
    alignItems: "center",
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "#aaaaaa",
  },
  breadcrumbLink: {
    color: "#888888",
    textDecoration: "none",
    fontWeight: 700,
  },
  breadcrumbSep: { color: "#cccccc" },
  breadcrumbActive: { color: "#111111", fontWeight: 700 },
  /* Layout */
  layout: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
  },
  sidebar: {
    width: "240px",
    flexShrink: 0,
    borderRight: "1px solid #e8e8e8",
    padding: "40px 0",
    position: "sticky",
    top: 0,
    alignSelf: "flex-start",
  },
  sidebarLabel: {
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: "#aaaaaa",
    padding: "0 28px",
    marginBottom: "12px",
  },
  sidebarLink: (active) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "11px 28px",
    fontSize: "12px",
    fontWeight: active ? 700 : 500,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    textDecoration: "none",
    color: active ? "#111111" : "#666666",
    borderLeft: active ? "3px solid #111111" : "3px solid transparent",
    background: active ? "#f7f7f7" : "transparent",
    transition: "all 0.12s",
  }),
  /* Main content */
  main: {
    flex: 1,
    padding: "48px 64px",
    maxWidth: "820px",
  },
  section: {
    marginBottom: "44px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#111111",
    marginBottom: "6px",
    paddingBottom: "10px",
    borderBottom: "2px solid #111111",
    display: "inline-block",
  },
  sectionBody: {
    marginTop: "18px",
    color: "#444444",
    fontSize: "14px",
    lineHeight: 1.85,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  infoCard: {
    border: "2px solid #e8e8e8",
    padding: "20px 24px",
    marginTop: "16px",
    background: "#fafafa",
  },
  infoCardTitle: {
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "#111111",
    marginBottom: "8px",
  },
  infoCardBody: {
    fontSize: "13px",
    color: "#666666",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    lineHeight: 1.7,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "16px",
    fontSize: "12px",
  },
  th: {
    background: "#111111",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    padding: "10px 14px",
    textAlign: "left",
    fontWeight: 700,
  },
  td: {
    padding: "10px 14px",
    borderBottom: "1px solid #e8e8e8",
    color: "#444444",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    verticalAlign: "top",
  },
  tdAlt: {
    padding: "10px 14px",
    borderBottom: "1px solid #e8e8e8",
    color: "#444444",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    background: "#f9f9f9",
    verticalAlign: "top",
  },
  tag: (color) => ({
    display: "inline-block",
    padding: "2px 10px",
    fontSize: "9px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    background: color === "green" ? "#eafaf0" : color === "red" ? "#fff0f0" : "#f5f5f5",
    color: color === "green" ? "#007700" : color === "red" ? "#cc0000" : "#666666",
    border: `1px solid ${color === "green" ? "#b0e0b0" : color === "red" ? "#f0b0b0" : "#dddddd"}`,
  }),
  faqItem: {
    borderBottom: "1px solid #e8e8e8",
    padding: "18px 0",
  },
  faqQ: {
    fontSize: "13px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#111111",
    marginBottom: "8px",
  },
  faqA: {
    fontSize: "13px",
    color: "#666666",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    lineHeight: 1.75,
  },
  contactBox: {
    border: "2px solid #111111",
    padding: "24px 28px",
    marginTop: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
    flexWrap: "wrap",
  },
  contactBoxText: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "#666666",
  },
  contactBoxTitle: {
    fontSize: "16px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#111111",
    marginBottom: "4px",
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "#111111",
    color: "#ffffff",
    border: "none",
    borderRadius: "0",
    padding: "12px 22px",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    textDecoration: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    flexShrink: 0,
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

const NAV_LINKS = [
  { label: "Shipping Info", to: "/shipping-info" },
  { label: "Returns & Refunds", to: "/return-refund" },
  { label: "FAQ", to: "/faq" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];

/* ─── Shared page shell ───────────────────────────────────────── */
export const PageShell = ({ active, eyebrow, title, subtitle, children }) => {
  return (
  <div style={S.page}>
    {/* Hero */}
    <div style={S.hero}>
      <div style={S.heroGrid} />
      <p style={S.heroEyebrow}>{eyebrow || "Customer Service"}</p>
      <h1 style={S.heroTitle}>{title}</h1>
      <div style={S.heroLine} />
      <p style={S.heroSub}>{subtitle}</p>
    </div>

    {/* Breadcrumb */}
    <div style={S.breadcrumb}>
      <Link to="/" style={S.breadcrumbLink}>Home</Link>
      <span style={S.breadcrumbSep}>›</span>
      <span style={S.breadcrumbLink}>Customer Service</span>
      <span style={S.breadcrumbSep}>›</span>
      <span style={S.breadcrumbActive}>{title}</span>
    </div>

    {/* Layout */}
    <div style={S.layout}>
      {/* Sidebar */}
      <nav style={S.sidebar}>
        <p style={S.sidebarLabel}>Support</p>
        {NAV_LINKS.map((l) => (
          <Link key={l.to} to={l.to} style={S.sidebarLink(l.label === active)}>
            {l.label}
            {l.label === active && <span style={{ fontSize: "14px" }}>→</span>}
          </Link>
        ))}
      </nav>

      {/* Page content */}
      <main style={S.main}>{children}</main>
    </div>
  </div>
  );
};

export default PageShell;