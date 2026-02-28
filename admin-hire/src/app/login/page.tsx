"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "@/styles/Login.scss";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Both fields are required."); return; }
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? (err as Error)?.message
        ?? "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <aside className="login-panel">
        <div className="lp-logo">
          <div className="lp-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </div>
          <span>Quick<em>Hire</em></span>
        </div>

        <div className="lp-content">
          <h2>Admin Control Center</h2>
          <p>Manage job listings, review applications, and oversee the QuickHire platform from one place.</p>
        </div>

        <div className="lp-chips">
          <div className="chip"><i className="fi fi-rr-briefcase" />Manage all job postings</div>
          <div className="chip"><i className="fi fi-rr-user-check" />Review applications</div>
          <div className="chip"><i className="fi fi-rr-chart-histogram" />Live dashboard stats</div>
          <div className="chip"><i className="fi fi-rr-shield-check" />Admin-only access</div>
        </div>
      </aside>

      <div className="login-form-side">
        <div className="lfs-inner">
          <div className="lfs-badge">
            <i className="fi fi-rr-shield-check" />
            Admin Portal
          </div>
          <h1>Sign in to Admin</h1>
          <p className="lfs-sub">Enter your admin credentials to access the dashboard.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="lfs-input-wrap">
                <i className="fi fi-rr-envelope input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@quickhire.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="lfs-input-wrap">
                <i className="fi fi-rr-lock input-icon" />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  autoComplete="current-password"
                />
                <button type="button" className="eye-btn" onClick={() => setShowPw((p) => !p)} tabIndex={-1}>
                  <i className={`fi ${showPw ? "fi-rr-eye-crossed" : "fi-rr-eye"}`} />
                </button>
              </div>
            </div>

            {error && (
              <div className="lfs-error mb-3">
                <i className="fi fi-rr-exclamation" />
                {error}
              </div>
            )}

            <button type="submit" className="lfs-submit" disabled={loading}>
              {loading ? "Signing in..." : <><span>Sign In</span><i className="fi fi-rr-arrow-right" /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
