import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../slices/userApiSlice";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    try {
      await resetPassword({ token, password }).unwrap();
      setDone(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err?.data?.message || "Invalid or expired reset link.");
    }
  };

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 16px" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111", marginBottom: "8px" }}>Reset Password</h1>
        <p style={{ color: "#64748b", marginBottom: "28px", fontSize: "14px" }}>Enter your new password below.</p>

        {done ? (
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px", padding: "16px", color: "#15803d" }}>
            Password reset successful! Redirecting to login...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#b91c1c", borderRadius: "8px", padding: "12px", marginBottom: "16px", fontSize: "14px" }}>
                {error}
              </div>
            )}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontWeight: 600, fontSize: "13px", color: "#374151", marginBottom: "6px" }}>New Password</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters"
                style={{ width: "100%", border: "1.5px solid #d1d5db", borderRadius: "7px", padding: "10px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: 600, fontSize: "13px", color: "#374151", marginBottom: "6px" }}>Confirm Password</label>
              <input required type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Re-enter password"
                style={{ width: "100%", border: "1.5px solid #d1d5db", borderRadius: "7px", padding: "10px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
            </div>
            <button type="submit" disabled={isLoading}
              style={{ width: "100%", background: "var(--clr-primary-5)", color: "#fff", border: "none", borderRadius: "8px", padding: "12px", fontSize: "15px", fontWeight: 700, cursor: isLoading ? "not-allowed" : "pointer" }}>
              {isLoading ? "Resetting..." : "Set New Password"}
            </button>
            <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px" }}>
              <Link to="/login" style={{ color: "var(--clr-primary-5)" }}>← Back to Login</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
