import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

/* ─── Zoofstore-themed inline styles ─────────────────────────── */
const S = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif",
  },
  /* top bar matching Zoofstore black header */
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
  /* main content */
  body: {
    flex: 1,
    display: "flex",
    alignItems: "stretch",
  },
  /* left panel — dark brand strip */
  leftPanel: {
    width: "42%",
    background: "#111111",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px 48px",
    position: "relative",
    overflow: "hidden",
  },
  leftDecor: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "120px",
    height: "100%",
    background:
      "repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(255,255,255,0.04) 7px, rgba(255,255,255,0.04) 8px)",
    pointerEvents: "none",
  },
  tagline: {
    color: "#555555",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    marginBottom: "16px",
  },
  headline: {
    color: "#ffffff",
    fontWeight: 800,
    fontSize: "clamp(36px, 4vw, 56px)",
    textTransform: "uppercase",
    lineHeight: 1.0,
    marginBottom: "24px",
    letterSpacing: "0.04em",
  },
  headlineAccent: {
    color: "#ffffff",
    display: "block",
    fontWeight: 400,
    fontSize: "0.55em",
    letterSpacing: "0.22em",
    color: "#888888",
  },
  dividerLine: {
    width: "40px",
    height: "3px",
    background: "#ffffff",
    marginBottom: "28px",
  },
  leftBody: {
    color: "#777777",
    fontSize: "14px",
    lineHeight: 1.7,
    maxWidth: "300px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  badge: {
    marginTop: "40px",
    display: "inline-block",
    border: "1px solid #333333",
    color: "#666666",
    fontSize: "10px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    padding: "8px 16px",
  },
  /* right panel — form */
  rightPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 48px",
    background: "#fafafa",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
  },
  formLabel: {
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "#111111",
    marginBottom: "6px",
    display: "block",
  },
  formTitle: {
    fontSize: "28px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#111111",
    marginBottom: "6px",
  },
  formSubtitle: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "#999999",
    marginBottom: "36px",
  },
  input: {
    width: "100%",
    border: "2px solid #e0e0e0",
    borderRadius: "0",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none",
    background: "#ffffff",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
    display: "block",
  },
  inputFocus: {
    borderColor: "#111111",
  },
  formGroup: {
    marginBottom: "20px",
  },
  btn: {
    width: "100%",
    background: "#111111",
    color: "#ffffff",
    border: "none",
    borderRadius: "0",
    padding: "14px",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    cursor: "pointer",
    transition: "background 0.15s, color 0.15s",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  btnHover: {
    background: "#333333",
  },
  btnDisabled: {
    background: "#666666",
    cursor: "not-allowed",
  },
  alert: {
    border: "2px solid #cc0000",
    background: "#fff5f5",
    color: "#cc0000",
    padding: "10px 14px",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alertClose: {
    background: "none",
    border: "none",
    color: "#cc0000",
    cursor: "pointer",
    fontSize: "16px",
    lineHeight: 1,
    padding: "0",
    fontFamily: "inherit",
  },
  divider: {
    borderTop: "1px solid #e8e8e8",
    margin: "24px 0",
  },
  footerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#888888",
  },
  link: {
    color: "#111111",
    textDecoration: "none",
    fontWeight: 700,
    borderBottom: "1px solid #111111",
    paddingBottom: "1px",
  },
  spinner: {
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    display: "inline-block",
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

/* small focusable input component */
const ZInput = ({ type, placeholder, value, onChange, required }) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        ...S.input,
        ...(focused ? S.inputFocus : {}),
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

/* ─── Main component ──────────────────────────────────────────── */
const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  useEffect(() => {
    if (errorMessage) {
      const t = setTimeout(() => setErrorMessage(""), 3000);
      return () => clearTimeout(t);
    }
  }, [errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.data?.msg || error.error || "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      {/* inject keyframe for spinner */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={S.page}>


        {/* ── Main body ── */}
        <div style={S.body}>
          {/* Left dark panel */}
          <div style={S.leftPanel}>
            <div style={S.leftDecor} />
            <p style={S.tagline}>Welcome back</p>
            <h2 style={S.headline}>
              Your
              <span style={S.headlineAccent}>ACCOUNT</span>
            </h2>
            <div style={S.dividerLine} />
            <p style={S.leftBody}>
              Sign in to manage your orders, track deliveries, and access exclusive deals.
            </p>
            <span style={S.badge}>⚽ Season 25 / 26 Now Live</span>
          </div>

          {/* Right form panel */}
          <div style={S.rightPanel}>
            <div style={S.card}>
              <h3 style={S.formTitle}>Sign In</h3>
              <p style={S.formSubtitle}>Enter your credentials to continue</p>

              {errorMessage && (
                <div style={S.alert}>
                  <span>{errorMessage}</span>
                  <button style={S.alertClose} onClick={() => setErrorMessage("")}>
                    ×
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={S.formGroup}>
                  <label style={S.formLabel}>Email Address</label>
                  <ZInput
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div style={S.formGroup}>
                  <label style={S.formLabel}>Password</label>
                  <ZInput
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div style={{ marginTop: "28px" }}>
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      ...S.btn,
                      ...(isLoading ? S.btnDisabled : btnHovered ? S.btnHover : {}),
                    }}
                    onMouseEnter={() => setBtnHovered(true)}
                    onMouseLeave={() => setBtnHovered(false)}
                  >
                    {isLoading ? (
                      <>
                        <span style={S.spinner} />
                        Signing In...
                      </>
                    ) : (
                      "Sign In →"
                    )}
                  </button>
                </div>
              </form>

              <div style={S.divider} />

              <div style={S.footerRow}>
                <span>
                  New customer?{" "}
                  <Link to="/register" style={S.link}>
                    Create Account
                  </Link>
                </span>
                <Link to="/forgot-password" style={{ ...S.link, color: "#888888", borderColor: "#888888", fontWeight: 400 }}>
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </>
  );
};

export default LoginPage;