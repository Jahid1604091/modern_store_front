import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../slices/userApiSlice";

const ForgotPasswordPage = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await forgotPassword({ email }).unwrap();
      setSent(true);
    } catch (err) {
      setError(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 16px" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111", marginBottom: "8px" }}>Forgot Password</h1>
        <p style={{ color: "#64748b", marginBottom: "28px", fontSize: "14px" }}>
          Enter your email and we'll send a reset link.
        </p>

        {sent ? (
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px", padding: "16px", color: "#15803d" }}>
            Check your inbox! If that email exists, a reset link has been sent.
            <br />
            <Link to="/login" style={{ color: "#15803d", fontWeight: 700, marginTop: "12px", display: "block" }}>← Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#b91c1c", borderRadius: "8px", padding: "12px", marginBottom: "16px", fontSize: "14px" }}>
                {error}
              </div>
            )}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontWeight: 600, fontSize: "13px", color: "#374151", marginBottom: "6px" }}>
                Email Address
              </label>
              <input
                required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{ width: "100%", border: "1.5px solid #d1d5db", borderRadius: "7px", padding: "10px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button
              type="submit" disabled={isLoading}
              style={{ width: "100%", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", padding: "12px", fontSize: "15px", fontWeight: 700, cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
            <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "#64748b" }}>
              <Link to="/login" style={{ color: "#2563eb" }}>← Back to Login</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
