import React from "react";
import { Link, useLocation } from "react-router-dom";

const STEPS = [
  { num: 1, title: "Add your first products", desc: "Go to your admin dashboard and create product listings with photos, pricing, and inventory.", link: null },
  { num: 2, title: "Set up categories", desc: "Organize your products into categories so customers can browse easily.", link: null },
  { num: 3, title: "Configure company settings", desc: "Add your logo, address, payment methods, and store policies.", link: null },
  { num: 4, title: "Share your store", desc: "Copy your storefront URL and start sharing it with customers.", link: null },
];

const GetStartedPage = () => {
  const { state } = useLocation();
  const company = state?.company;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)", color: "#fff", padding: "64px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
        <h1 style={{ fontSize: "36px", fontWeight: 800, margin: 0 }}>
          {company ? `${company.company_name} is live!` : "Your store is ready!"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", marginTop: "10px", fontSize: "16px" }}>
          {company?.trial_ends_at
            ? `You're on a free trial — 14 days to explore everything.`
            : "Let's get you set up."}
        </p>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px" }}>
        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "48px" }}>
          {[
            { label: "Open Admin Panel", href: "http://localhost:5173", icon: "⚙️", primary: true },
            { label: "View Subscription", href: "/pricing", icon: "👑" },
            { label: "Browse Store", href: "/", icon: "🛍️" },
            { label: "Login to Admin", href: "http://localhost:5173/login", icon: "🔐" },
          ].map(({ label, href, icon, primary }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                padding: "20px 16px", borderRadius: "12px", textDecoration: "none",
                background: primary ? "#2563eb" : "#fff",
                color: primary ? "#fff" : "#374151",
                border: `2px solid ${primary ? "#2563eb" : "#e2e8f0"}`,
                fontWeight: 600, fontSize: "14px", textAlign: "center",
                boxShadow: primary ? "0 4px 12px rgba(37,99,235,0.25)" : "none",
              }}
            >
              <span style={{ fontSize: "28px" }}>{icon}</span>
              {label}
            </a>
          ))}
        </div>

        {/* Setup checklist */}
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111", marginBottom: "20px" }}>
          Setup checklist
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {STEPS.map(({ num, title, desc }) => (
            <div
              key={num}
              style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: "10px", padding: "18px 20px", display: "flex", gap: "16px" }}
            >
              <div style={{
                width: "32px", height: "32px", minWidth: "32px", borderRadius: "50%",
                background: "#eff6ff", color: "#2563eb", fontWeight: 800, fontSize: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {num}
              </div>
              <div>
                <p style={{ fontWeight: 700, color: "#111", margin: "0 0 4px 0", fontSize: "15px" }}>{title}</p>
                <p style={{ color: "#64748b", margin: 0, fontSize: "13px", lineHeight: 1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trial upgrade nudge */}
        {company?.subscription_plan === "trial" && (
          <div style={{ marginTop: "40px", background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontWeight: 700, fontSize: "16px", color: "#92400e", margin: "0 0 8px 0" }}>
              👑 You're on a free trial
            </p>
            <p style={{ color: "#78350f", fontSize: "14px", margin: "0 0 16px 0" }}>
              Upgrade anytime to unlock more users, products, and features.
            </p>
            <Link
              to="/pricing"
              style={{ background: "#d97706", color: "#fff", borderRadius: "8px", padding: "10px 28px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}
            >
              View Plans & Upgrade
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetStartedPage;
