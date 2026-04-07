import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

/* ─── Zoofstore-themed inline styles (mirrors LoginPage) ──────── */
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
  leftPanel: {
    width: "38%",
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
  perks: {
    marginTop: "36px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  perk: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#666666",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
  },
  perkDot: {
    width: "6px",
    height: "6px",
    background: "#ffffff",
    flexShrink: 0,
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 48px",
    background: "#fafafa",
    overflowY: "auto",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
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
    marginBottom: "32px",
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
  inputError: {
    borderColor: "#cc0000",
  },
  formGroup: {
    marginBottom: "18px",
  },
  /* two-column row for password fields */
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
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
    transition: "background 0.15s",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "28px",
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
    margin: "22px 0",
  },
  footerRow: {
    display: "flex",
    justifyContent: "center",
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
  strengthBar: {
    height: "3px",
    background: "#e0e0e0",
    marginTop: "6px",
    position: "relative",
    overflow: "hidden",
  },
  strengthFill: (level) => ({
    height: "100%",
    width: level === 0 ? "0%" : level === 1 ? "33%" : level === 2 ? "66%" : "100%",
    background: level === 1 ? "#cc0000" : level === 2 ? "#e07800" : level === 3 ? "#007700" : "transparent",
    transition: "width 0.3s, background 0.3s",
  }),
};

/* password strength scorer */
const scorePassword = (pw) => {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

const strengthLabel = ["", "Weak", "Fair", "Strong"];

/* focusable input */
const ZInput = ({ type, placeholder, value, onChange, required, hasError }) => {
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
        ...(hasError ? S.inputError : {}),
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

/* ─── Main component ──────────────────────────────────────────── */
const RegisterPage = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [btnHovered, setBtnHovered] = useState(false);

  const pwStrength = scorePassword(password);
  const pwMismatch = confirmPassword.length > 0 && password !== confirmPassword;

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
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.data?.msg || error.error || "Registration failed. Please try again."
      );
    }
  };

  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={S.page}>
        {/* ── Top bar ── */}
        <div style={S.topBar}>
          <a href="/" style={S.brand}>ZOOF</a>
          <span style={S.topNav}>Best Quality · Fast Delivery · Online Payment</span>
        </div>

        {/* ── Main body ── */}
        <div style={S.body}>
          {/* Left dark panel */}
          <div style={S.leftPanel}>
            <div style={S.leftDecor} />
            <p style={S.tagline}>Join the squad</p>
            <h2 style={S.headline}>
              Create
              <span style={S.headlineAccent}>YOUR ACCOUNT</span>
            </h2>
            <div style={S.dividerLine} />
            <p style={S.leftBody}>
              Register to track orders, save wishlists, and unlock exclusive member deals.
            </p>
            <div style={S.perks}>
              {["Order tracking & history", "Exclusive member discounts", "Wishlist & saved items", "Fast checkout"].map(
                (p) => (
                  <div key={p} style={S.perk}>
                    <span style={S.perkDot} />
                    {p}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right form panel */}
          <div style={S.rightPanel}>
            <div style={S.card}>
              <h3 style={S.formTitle}>Register</h3>
              <p style={S.formSubtitle}>Create your free account today</p>

              {errorMessage && (
                <div style={S.alert}>
                  <span>{errorMessage}</span>
                  <button style={S.alertClose} onClick={() => setErrorMessage("")}>×</button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div style={S.formGroup}>
                  <label style={S.formLabel}>Full Name</label>
                  <ZInput
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
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

                {/* Password row — two columns */}
                <div style={S.twoCol}>
                  <div style={S.formGroup}>
                    <label style={S.formLabel}>Password</label>
                    <ZInput
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {/* strength bar */}
                    {password.length > 0 && (
                      <div style={S.strengthBar}>
                        <div style={S.strengthFill(pwStrength)} />
                      </div>
                    )}
                    {password.length > 0 && (
                      <span
                        style={{
                          fontSize: "9px",
                          textTransform: "uppercase",
                          letterSpacing: "0.14em",
                          color: pwStrength === 1 ? "#cc0000" : pwStrength === 2 ? "#e07800" : "#007700",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {strengthLabel[pwStrength]}
                      </span>
                    )}
                  </div>

                  <div style={S.formGroup}>
                    <label style={S.formLabel}>Confirm Password</label>
                    <ZInput
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      hasError={pwMismatch}
                    />
                    {pwMismatch && (
                      <span
                        style={{
                          fontSize: "9px",
                          textTransform: "uppercase",
                          letterSpacing: "0.14em",
                          color: "#cc0000",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        Passwords don't match
                      </span>
                    )}
                  </div>
                </div>

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
                      Creating Account...
                    </>
                  ) : (
                    "Create Account →"
                  )}
                </button>
              </form>

              <div style={S.divider} />

              <div style={S.footerRow}>
                <span>
                  Already have an account?{" "}
                  <Link to="/login" style={S.link}>Sign In</Link>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={S.bottomBar}>
          © 2025 ZOOFSTORE · All Rights Reserved · Dhaka, Bangladesh
        </div>
      </div>
    </>
  );
};

export default RegisterPage;