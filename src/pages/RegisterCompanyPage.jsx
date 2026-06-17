import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterCompanyMutation, useGetPlansQuery } from "../slices/userApiSlice";

const PLAN_ORDER = ["trial", "starter", "professional", "enterprise"];

const PLAN_STYLES = {
  trial:        { badge: "#64748b", border: "#cbd5e1", accent: "#f8fafc" },
  starter:      { badge: "#2563eb", border: "#93c5fd", accent: "#eff6ff" },
  professional: { badge: "#7c3aed", border: "#c4b5fd", accent: "#f5f3ff" },
  enterprise:   { badge: "#d97706", border: "#fcd34d", accent: "#fffbeb" },
};

const RegisterCompanyPage = () => {
  const navigate = useNavigate();
  const [registerCompany, { isLoading }] = useRegisterCompanyMutation();
  const { data: plansData } = useGetPlansQuery();

  const plans = plansData?.data || {};

  const [selectedPlan, setSelectedPlan] = useState("trial");
  const [form, setForm] = useState({ company_name: "", name: "", email: "", password: "", confirm_password: "" });
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1 = plan selection, 2 = account details

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      const res = await registerCompany({
        company_name: form.company_name,
        name: form.name,
        email: form.email,
        password: form.password,
        plan: selectedPlan,
      }).unwrap();
      // Redirect to the admin dashboard after successful registration
      navigate("/welcome", { state: { token: res.token, company: res.data?.company } });
    } catch (err) {
      setError(err?.data?.message || err?.data?.msg || "Registration failed. Please try again.");
    }
  };

  const selectedPlanData = plans[selectedPlan];

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: "#111", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ color: "#fff", fontWeight: 800, fontSize: "20px", textDecoration: "none", letterSpacing: "0.08em" }}>
          ModernStore
        </Link>
        <span style={{ color: "#aaa", fontSize: "12px" }}>
          Already have a store?{" "}
          <Link to="/login" style={{ color: "#fff", textDecoration: "underline" }}>Sign in</Link>
        </span>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#111", margin: 0 }}>Start your online store</h1>
          <p style={{ color: "#64748b", marginTop: "8px", fontSize: "16px" }}>
            Choose a plan, create your account, and launch in minutes.
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginBottom: "36px" }}>
          {[1, 2].map((s) => (
            <React.Fragment key={s}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "14px",
                background: step >= s ? "#2563eb" : "#e2e8f0",
                color: step >= s ? "#fff" : "#94a3b8",
              }}>
                {s}
              </div>
              {s < 2 && <div style={{ width: "60px", height: "2px", background: step > s ? "#2563eb" : "#e2e8f0" }} />}
            </React.Fragment>
          ))}
        </div>

        {step === 1 ? (
          <>
            <h2 style={{ textAlign: "center", fontSize: "20px", fontWeight: 700, color: "#1e293b", marginBottom: "24px" }}>
              1. Choose your plan
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
              {PLAN_ORDER.map((key) => {
                const plan = plans[key];
                if (!plan) return (
                  <div key={key} style={{ border: "2px solid #e2e8f0", borderRadius: "12px", padding: "20px", background: "#f8fafc" }}>
                    <div style={{ height: "80px", background: "#e2e8f0", borderRadius: "6px", animation: "pulse 1.5s infinite" }} />
                  </div>
                );
                const style = PLAN_STYLES[key] || PLAN_STYLES.trial;
                const isSelected = selectedPlan === key;
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedPlan(key)}
                    style={{
                      border: `2px solid ${isSelected ? style.badge : style.border}`,
                      borderRadius: "12px", padding: "20px", background: isSelected ? style.accent : "#fff",
                      cursor: "pointer", transition: "all 0.15s", boxShadow: isSelected ? "0 0 0 3px " + style.badge + "22" : "none",
                      position: "relative",
                    }}
                  >
                    {isSelected && (
                      <div style={{
                        position: "absolute", top: "-10px", right: "12px",
                        background: style.badge, color: "#fff",
                        fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "9999px",
                        letterSpacing: "0.08em",
                      }}>
                        Selected
                      </div>
                    )}
                    <div style={{ fontWeight: 700, fontSize: "16px", color: "#1e293b", marginBottom: "4px" }}>{plan.label}</div>
                    <div style={{ fontSize: "24px", fontWeight: 800, color: style.badge, marginBottom: "12px" }}>
                      {plan.price_monthly === 0 ? "Free" : `৳${plan.price_monthly?.toLocaleString()}`}
                      {plan.price_monthly > 0 && <span style={{ fontSize: "13px", fontWeight: 400, color: "#94a3b8" }}>/mo</span>}
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "13px", color: "#475569", lineHeight: 2 }}>
                      <li>✓ Up to {plan.max_users === 999 ? "Unlimited" : plan.max_users} staff users</li>
                      <li>✓ Up to {plan.max_products === 99999 ? "Unlimited" : plan.max_products} products</li>
                      {plan.features?.pos && <li>✓ POS system</li>}
                      {plan.features?.excel_export && <li>✓ Excel export</li>}
                      {plan.features?.api_access && <li>✓ API access</li>}
                      {plan.features?.custom_domain && <li>✓ Custom domain</li>}
                    </ul>
                  </div>
                );
              })}
            </div>
            {selectedPlan === "trial" && (
              <p style={{ textAlign: "center", color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
                Free 14-day trial — no credit card required.
              </p>
            )}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px",
                  padding: "14px 40px", fontSize: "15px", fontWeight: 700, cursor: "pointer",
                }}
              >
                Continue with {selectedPlanData?.label || selectedPlan} →
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                2. Create your account
              </h2>
              <button
                onClick={() => setStep(1)}
                style={{ background: "none", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "4px 12px", fontSize: "12px", cursor: "pointer", color: "#64748b" }}
              >
                ← Change plan
              </button>
            </div>

            {/* Plan summary */}
            {selectedPlanData && (
              <div style={{
                background: PLAN_STYLES[selectedPlan]?.accent || "#f0f9ff",
                border: `1px solid ${PLAN_STYLES[selectedPlan]?.border || "#bae6fd"}`,
                borderRadius: "8px", padding: "12px 16px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px",
              }}>
                <span style={{ fontWeight: 700, color: PLAN_STYLES[selectedPlan]?.badge, fontSize: "14px" }}>
                  {selectedPlanData.label}
                </span>
                <span style={{ color: "#64748b", fontSize: "13px" }}>
                  {selectedPlanData.price_monthly === 0
                    ? "Free 14-day trial"
                    : `৳${selectedPlanData.price_monthly?.toLocaleString()}/month`}
                </span>
                <span style={{ color: "#94a3b8", fontSize: "13px" }}>·</span>
                <span style={{ color: "#64748b", fontSize: "13px" }}>
                  Up to {selectedPlanData.max_users === 999 ? "Unlimited" : selectedPlanData.max_users} users,{" "}
                  {selectedPlanData.max_products === 99999 ? "Unlimited" : selectedPlanData.max_products} products
                </span>
              </div>
            )}

            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#b91c1c", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", fontSize: "14px" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: "12px", padding: "28px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                    Store / Company Name *
                  </label>
                  <input
                    required type="text" placeholder="e.g. Acme Sports Store"
                    value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                    style={{ width: "100%", border: "1.5px solid #d1d5db", borderRadius: "7px", padding: "10px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                    Your Name *
                  </label>
                  <input
                    required type="text" placeholder="John Doe"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={{ width: "100%", border: "1.5px solid #d1d5db", borderRadius: "7px", padding: "10px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ marginTop: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                  Email Address *
                </label>
                <input
                  required type="email" placeholder="you@yourstore.com"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ width: "100%", border: "1.5px solid #d1d5db", borderRadius: "7px", padding: "10px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                    Password *
                  </label>
                  <input
                    required type="password" placeholder="Min. 6 characters"
                    value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                    style={{ width: "100%", border: "1.5px solid #d1d5db", borderRadius: "7px", padding: "10px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                    Confirm Password *
                  </label>
                  <input
                    required type="password" placeholder="Re-enter password"
                    value={form.confirm_password} onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
                    style={{ width: "100%", border: "1.5px solid #d1d5db", borderRadius: "7px", padding: "10px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <button
                type="submit" disabled={isLoading}
                style={{
                  width: "100%", marginTop: "24px", background: isLoading ? "#93c5fd" : "#2563eb",
                  color: "#fff", border: "none", borderRadius: "8px", padding: "14px",
                  fontSize: "15px", fontWeight: 700, cursor: isLoading ? "not-allowed" : "pointer",
                }}
              >
                {isLoading ? "Creating your store..." : "Create Store & Start Free Trial →"}
              </button>

              <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", marginTop: "16px" }}>
                By registering you agree to our{" "}
                <Link to="/return-refund" style={{ color: "#2563eb" }}>Terms of Service</Link>.
              </p>
            </form>

            <p style={{ textAlign: "center", color: "#64748b", fontSize: "14px", marginTop: "20px" }}>
              Already have a store?{" "}
              <Link to="/login" style={{ color: "#2563eb", fontWeight: 600 }}>Sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterCompanyPage;
