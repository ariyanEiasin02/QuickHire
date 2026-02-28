"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "@/styles/Dashboard.scss";

const mainNav = [
  { href: "/dashboard",              label: "Dashboard",        icon: "fi-rr-grid-alt",    badge: 0 },
  { href: "/dashboard/applications", label: "All Applicants",   icon: "fi-rr-users-alt",   badge: 0 },
  { href: "/dashboard/jobs",         label: "Job Listing",      icon: "fi-rr-briefcase",   badge: 0 },
];

const settingsNav = [
  { href: "#", label: "Settings",   icon: "fi-rr-settings" },
  { href: "#", label: "Help Center", icon: "fi-rr-interrogation" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="qh-loading-spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
      </div>
    );
  }

  const firstName = user.name.split(" ")[0];
  const today = new Date();
  const greeting = today.getHours() < 12 ? "Good morning" : today.getHours() < 17 ? "Good afternoon" : "Good evening";
  const dateLabel = today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="sb-logo">
          <div className="sb-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </div>
          <span>Quick<em>Hire</em></span>
        </div>

        <div className="sb-section">
          <nav className="sb-nav">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`sb-link${pathname === link.href ? " active" : ""}`}
              >
                <i className={`fi ${link.icon}`} />
                <span>{link.label}</span>
                {link.badge > 0 && <em className="sb-badge">{link.badge}</em>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="sb-section sb-settings-section">
          <p className="sb-section-label">Settings</p>
          <nav className="sb-nav">
            {settingsNav.map((link) => (
              <a key={link.label} href={link.href} className="sb-link">
                <i className={`fi ${link.icon}`} />
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="sb-user">
          <div className="su-avatar">{firstName.charAt(0).toUpperCase()}</div>
          <div className="su-info">
            <p className="su-name">{user.name}</p>
            <p className="su-role">Admin</p>
          </div>
          <button className="su-logout" onClick={logout} title="Sign out">
            <i className="fi fi-rr-sign-out-alt" />
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="qh-topbar">
          <div className="qh-tb-left">
            <div className="qh-company-picker">
              <div className="qcp-avatar">
                <i className="fi fi-rr-building" />
              </div>
              <div className="qcp-text">
                <span className="qcp-label">Company</span>
                <span className="qcp-name">QuickHire <i className="fi fi-rr-angle-small-down" /></span>
              </div>
            </div>
          </div>

          <div className="qh-tb-right">
            <button className="qh-tb-notif" title="Notifications">
              <i className="fi fi-rr-bell" />
              <span className="notif-dot" />
            </button>
            <Link href="/dashboard/jobs" className="qh-tb-cta">
              <i className="fi fi-rr-plus" />
              Post a job
            </Link>
          </div>
        </header>

        <div className="qh-greeting-bar">
          <div>
            <h1 className="qhg-title">{greeting}, {firstName}</h1>
            <p className="qhg-sub">Here is your job listings statistic report from {dateLabel}</p>
          </div>
          <div className="qhg-date">
            <i className="fi fi-rr-calendar" />
            {dateLabel}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
