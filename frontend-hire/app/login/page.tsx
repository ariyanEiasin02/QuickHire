"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authAPI } from "@/lib/api";
import "@/styles/Login.scss";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<"user" | "admin">("user");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await authAPI.register(form.name, form.email, form.password, role);
        await login(form.email, form.password);
      }
      const stored = JSON.parse(localStorage.getItem("qh_user") || "{}");
      router.push(stored.role === "admin" ? "/admin" : "/");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="ll-logo">
          <div className="ll-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#4640DE" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </div>
          <span>QuickHire</span>
        </div>
        <h2>Your Next Career Move Starts Here</h2>
        <p>Join thousands of professionals finding their dream jobs on QuickHire every day.</p>
        <div className="ll-tags">
          <span>10,000+ Jobs</span>
          <span>500+ Companies</span>
          <span>Free to Use</span>
          <span>Verified Listings</span>
        </div>
      </div>

      <div className="login-right">
        <div className="lr-inner">
          <div className="lr-header">
            <h1>{mode === "login" ? "Welcome back" : "Create account"}</h1>
            <p>
              {mode === "login"
                ? "Sign in to access your QuickHire account."
                : "Get started for free — no credit card required."}
            </p>
          </div>

          <div className="lr-toggle">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => { setMode("login"); setError(""); }}
            >
              Login
            </button>
            <button
              type="button"
              className={mode === "register" ? "active" : ""}
              onClick={() => { setMode("register"); setError(""); }}
            >
              Register
            </button>
          </div>

          <form className="lr-form" onSubmit={handleSubmit} noValidate>
            {mode === "register" && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrap">
                  <i className="fi fi-rr-user" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. Sarah Johnson"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrap">
                <i className="fi fi-rr-envelope" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. sarah@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <i className="fi fi-rr-lock" />
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  placeholder={mode === "register" ? "At least 6 characters" : "Your password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPw((p) => !p)}
                  tabIndex={-1}
                >
                  <i className={`fi ${showPw ? "fi-rr-eye-crossed" : "fi-rr-eye"}`} />
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div className="form-group">
                <label>Account Role</label>
                <div className="role-select">
                  <label className={role === "user" ? "selected" : ""}>
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={role === "user"}
                      onChange={() => setRole("user")}
                    />
                    <i className="fi fi-rr-user" />
                    Job Seeker
                  </label>
                  <label className={role === "admin" ? "selected" : ""}>
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={role === "admin"}
                      onChange={() => setRole("admin")}
                    />
                    <i className="fi fi-rr-shield-check" />
                    Admin
                  </label>
                </div>
              </div>
            )}

            {error && (
              <div className="lr-error">
                <i className="fi fi-rr-exclamation" />
                {error}
              </div>
            )}

            <button type="submit" className="lr-submit" disabled={loading}>
              {loading ? (
                "Please wait..."
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <i className="fi fi-rr-arrow-right" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
