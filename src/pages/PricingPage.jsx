import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetPlansQuery } from "../slices/userApiSlice";

const PLAN_ORDER = ["trial", "starter", "professional", "enterprise"];

const PLAN_COLORS = {
  trial:        { bg: "#f8fafc", border: "#cbd5e1", badge: "#64748b", btn: "#475569" },
  starter:      { bg: "#eff6ff", border: "#3b82f6", badge: "#2563eb", btn: "#2563eb" },
  professional: { bg: "#f5f3ff", border: "#8b5cf6", badge: "#7c3aed", btn: "#7c3aed", popular: true },
  enterprise:   { bg: "#fffbeb", border: "#f59e0b", badge: "#d97706", btn: "#d97706" },
};

const CHECK = "✓";
const CROSS = "✗";

const FeatureRow = ({ label, plans, planOrder }) => (
  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#374151" }}>{label}</td>
    {planOrder.map((key) => {
      const val = plans[key]?.features?.[label.toLowerCase().replace(/\s+/g, "_")] ??
                  plans[key]?.features?.[label.toLowerCase().replace(/[\s/]/g, "_")];
      return (
        <td key={key} style={{ padding: "12px", textAlign: "center", fontSize: "16px", color: val ? "#16a34a" : "#d1d5db" }}>
          {val !== undefined ? (val ? CHECK : CROSS) : "–"}
        </td>
      );
    })}
  </tr>
);

const PricingPage = () => {
  const { data: plansData, isLoading } = useGetPlansQuery();
  const plans = plansData?.data || {};

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "#111", color: "#fff", padding: "64px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "42px", fontWeight: 800, margin: 0 }}>Simple, transparent pricing</h1>
        <p style={{ color: "#94a3b8", marginTop: "12px", fontSize: "18px" }}>
          Start free. Upgrade when you're ready.
        </p>
      </div>

      {/* Plan cards */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px" }}>
        {isLoading ? (
          <div style={{ textAlign: "center", color: "#94a3b8", padding: "48px" }}>Loading plans...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {PLAN_ORDER.map((key) => {
              const plan = plans[key];
              if (!plan) return null;
              const colors = PLAN_COLORS[key];
              return (
                <div
                  key={key}
                  style={{
                    border: `2px solid ${colors.border}`,
                    borderRadius: "16px",
                    background: colors.bg,
                    padding: "28px 24px",
                    position: "relative",
                    boxShadow: colors.popular ? "0 4px 24px rgba(124,58,237,0.15)" : "none",
                  }}
                >
                  {colors.popular && (
                    <div style={{
                      position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                      background: colors.badge, color: "#fff", fontSize: "11px", fontWeight: 700,
                      padding: "4px 14px", borderRadius: "9999px", letterSpacing: "0.08em",
                    }}>
                      MOST POPULAR
                    </div>
                  )}

                  <div style={{ fontWeight: 700, fontSize: "18px", color: "#111", marginBottom: "4px" }}>{plan.label}</div>
                  <div style={{ fontSize: "32px", fontWeight: 800, color: colors.badge, lineHeight: 1.1 }}>
                    {plan.price_monthly === 0 ? "Free" : `৳${plan.price_monthly?.toLocaleString()}`}
                    {plan.price_monthly > 0 && (
                      <span style={{ fontSize: "14px", fontWeight: 400, color: "#94a3b8" }}>/month</span>
                    )}
                  </div>
                  {key === "trial" && (
                    <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>14-day trial, no card needed</p>
                  )}

                  <hr style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "16px 0" }} />

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "13px", color: "#374151", lineHeight: 2 }}>
                    <li>
                      <strong>{plan.max_users === 999 ? "Unlimited" : plan.max_users}</strong> staff users
                    </li>
                    <li>
                      <strong>{plan.max_products === 99999 ? "Unlimited" : plan.max_products}</strong> products
                    </li>
                    {Object.entries(plan.features || {}).map(([feat, enabled]) => (
                      <li key={feat} style={{ color: enabled ? "#374151" : "#d1d5db" }}>
                        <span style={{ color: enabled ? "#16a34a" : "#d1d5db", marginRight: "6px", fontWeight: 700 }}>
                          {enabled ? CHECK : CROSS}
                        </span>
                        {feat.replace(/_/g, " ")}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/start?plan=${key}`}
                    style={{
                      display: "block", textAlign: "center", marginTop: "20px",
                      background: colors.btn, color: "#fff", borderRadius: "8px",
                      padding: "12px", fontSize: "14px", fontWeight: 700, textDecoration: "none",
                    }}
                  >
                    {key === "trial" ? "Start Free Trial" : `Get ${plan.label}`}
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* FAQ section */}
        <div style={{ marginTop: "80px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#111", textAlign: "center", marginBottom: "40px" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { q: "Can I upgrade or downgrade at any time?", a: "Yes. You can switch plans instantly from your admin dashboard. Changes apply immediately." },
              { q: "What happens when my trial expires?", a: "After 14 days, your store goes into read-only mode. Upgrade to a paid plan to continue selling." },
              { q: "Do you offer refunds?", a: "We offer a 7-day money-back guarantee on all paid plans, no questions asked." },
              { q: "Is there a setup fee?", a: "No setup fees, ever. You only pay the monthly plan price." },
              { q: "Can I add more products later?", a: "Yes. Upgrade your plan to increase your product and user limits instantly." },
              { q: "How do I cancel?", a: "You can cancel anytime from your subscription settings. No lock-in contracts." },
            ].map(({ q, a }) => (
              <div key={q} style={{ background: "#f8fafc", borderRadius: "10px", padding: "20px 24px" }}>
                <p style={{ fontWeight: 700, color: "#111", fontSize: "15px", marginBottom: "8px" }}>{q}</p>
                <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "72px", padding: "48px", background: "#111", borderRadius: "16px", color: "#fff" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, margin: 0 }}>Ready to launch your store?</h2>
          <p style={{ color: "#94a3b8", marginTop: "12px", marginBottom: "28px" }}>
            Join thousands of store owners using ModernStore to run their business.
          </p>
          <Link
            to="/start"
            style={{
              background: "#fff", color: "#111", borderRadius: "8px", padding: "14px 36px",
              fontSize: "15px", fontWeight: 800, textDecoration: "none", letterSpacing: "0.04em",
            }}
          >
            Start Free Trial →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
