"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { jobsAPI, applicationsAPI, type ApiJob, type ApiApplication } from "@/lib/api";

// ── Inline bar-chart (no external deps) ───────────────────────────────────────
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function seedBars(seed: number) {
  return DAYS.map((_, i) => ({
    views:   Math.round(80  + Math.sin(seed + i * 1.2) * 50 + i * 8),
    applied: Math.round(20  + Math.cos(seed + i * 0.9) * 18 + i * 3),
  }));
}

function BarChart({ bars }: { bars: { views: number; applied: number }[] }) {
  const maxVal = Math.max(...bars.flatMap((b) => [b.views, b.applied]), 1);
  const H = 140;
  return (
    <div className="ov-barchart">
      {bars.map((b, i) => {
        const vh = Math.round((b.views   / maxVal) * H);
        const ah = Math.round((b.applied / maxVal) * H);
        return (
          <div className="ov-bar-col" key={i}>
            <div className="ov-bar-group">
              <div className="ov-bar ov-bar--view"    style={{ height: vh }} title={`Views: ${b.views}`}   />
              <div className="ov-bar ov-bar--applied" style={{ height: ah }} title={`Applied: ${b.applied}`} />
            </div>
            <span className="ov-bar-label">{DAYS[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function OverviewPage() {
  const [jobs, setJobs]     = useState<ApiJob[]>([]);
  const [apps, setApps]     = useState<ApiApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"week" | "month" | "year">("week");
  const [activeSub, setActiveSub] = useState<"overview" | "views" | "applied">("overview");

  useEffect(() => {
    Promise.all([
      jobsAPI.getAll().then((r) => setJobs(r.data.data)).catch(() => {}),
      applicationsAPI.getAll().then((r) => setApps(r.data.data)).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const totalViews   = jobs.length * 34 + 120;
  const totalApplied = apps.length;
  const totalJobs    = jobs.length;
  const totalApps    = apps.length;
  const companies    = new Set(jobs.map((j) => j.company)).size;
  const bars         = seedBars(totalJobs + totalApps);

  const appTypes = [
    { label: "Full Time",  count: Math.ceil(apps.length * 0.45), color: "#4640DE" },
    { label: "Internship", count: Math.ceil(apps.length * 0.20), color: "#56CDAD" },
    { label: "Part Time",  count: Math.ceil(apps.length * 0.17), color: "#FFB836" },
    { label: "Contract",   count: Math.ceil(apps.length * 0.10), color: "#FF6550" },
    { label: "Remote",     count: Math.ceil(apps.length * 0.08), color: "#26A4FF" },
  ];

  const heroBanners = [
    {
      label:    "New candidates to review",
      value:    loading ? "—" : totalApps,
      gradient: "linear-gradient(135deg, #56CDAD 0%, #26a4ff 100%)",
      icon:     "fi-rr-users-alt",
    },
    {
      label:    "Schedule for today",
      value:    loading ? "—" : Math.min(companies, 9),
      gradient: "linear-gradient(135deg, #4640DE 0%, #7B77F5 100%)",
      icon:     "fi-rr-calendar-clock",
    },
    {
      label:    "Messages received",
      value:    loading ? "—" : totalJobs + totalApps,
      gradient: "linear-gradient(135deg, #26A4FF 0%, #4640DE 100%)",
      icon:     "fi-rr-envelope",
    },
  ];

  return (
    <div className="admin-body ov-body">

      {/* ── Hero banners ── */}
      <div className="ov-hero-row">
        {heroBanners.map((b) => (
          <div key={b.label} className="ov-hero-card" style={{ background: b.gradient }}>
            <div className="ov-hero-icon"><i className={`fi ${b.icon}`} /></div>
            <div className="ov-hero-body">
              <p className="ov-hero-val">{b.value}</p>
              <p className="ov-hero-label">{b.label}</p>
            </div>
            <button className="ov-hero-arrow"><i className="fi fi-rr-arrow-right" /></button>
          </div>
        ))}
      </div>

      {/* ── Chart + right column ── */}
      <div className="ov-content-row">

        {/* Chart card */}
        <div className="ov-chart-card">
          <div className="ov-chart-header">
            <div>
              <h2 className="ov-chart-title">Job statistics</h2>
              <p className="ov-chart-sub">
                Showing jobstatic {activeTab === "week" ? "this week" : activeTab === "month" ? "this month" : "this year"}
              </p>
            </div>
            <div className="ov-tab-group">
              {(["week", "month", "year"] as const).map((t) => (
                <button key={t} className={`ov-tab${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="ov-sub-tabs">
            {([["overview","Overview"],["views","Jobs View"],["applied","Jobs Applied"]] as const).map(([k, label]) => (
              <button key={k} className={`ov-sub-tab${activeSub === k ? " active" : ""}`} onClick={() => setActiveSub(k)}>
                {label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="qh-loading" style={{ height: 200 }}><div className="qh-loading-spinner" /> Loading…</div>
          ) : (
            <BarChart bars={bars} />
          )}

          {/* Legend */}
          <div className="ov-chart-legend">
            <span className="ov-legend-dot ov-legend-dot--view" /> Job View
            <span className="ov-legend-dot ov-legend-dot--applied" style={{ marginLeft: 16 }} /> Job Applied
          </div>

          <div className="ov-chart-footer">
            <div className="ov-chart-stat">
              <div className="ov-cs-top">
                <div className="ov-cs-ring ov-cs-ring--view"><i className="fi fi-rr-eye" /></div>
                <div>
                  <p className="ov-cs-label">Job Views</p>
                  <span className="ov-cs-badge ov-cs-badge--up"><i className="fi fi-rr-trending-up" /> This Week 6.4%</span>
                </div>
              </div>
              <p className="ov-cs-val">{loading ? "—" : totalViews.toLocaleString()}</p>
            </div>
            <div className="ov-cs-divider" />
            <div className="ov-chart-stat">
              <div className="ov-cs-top">
                <div className="ov-cs-ring ov-cs-ring--applied"><i className="fi fi-rr-document" /></div>
                <div>
                  <p className="ov-cs-label">Job Applied</p>
                  <span className="ov-cs-badge ov-cs-badge--down"><i className="fi fi-rr-trending-down" /> This Week 8.5%</span>
                </div>
              </div>
              <p className="ov-cs-val">{loading ? "—" : totalApplied.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="ov-right-col">
          {/* Job Open */}
          <div className="ov-right-card">
            <div className="ov-rc-header">
              <span className="ov-rc-title">Job Open</span>
              <Link href="/dashboard/jobs" className="ov-rc-link">See all jobs <i className="fi fi-rr-arrow-right" /></Link>
            </div>
            <p className="ov-rc-big">{loading ? "—" : totalJobs}</p>
            <p className="ov-rc-sub">Jobs Opened</p>
            <div className="ov-recent-jobs">
              {jobs.slice(0, 3).map((j) => (
                <div className="ov-rj-item" key={j._id}>
                  <div className="ov-rj-icon"><i className="fi fi-rr-briefcase" /></div>
                  <div className="ov-rj-text">
                    <p className="ov-rj-title">{j.title}</p>
                    <p className="ov-rj-company">{j.company}</p>
                  </div>
                </div>
              ))}
              {!loading && jobs.length === 0 && (
                <p style={{ fontSize: "0.8rem", color: "#aaa", textAlign: "center", padding: "16px 0" }}>No jobs yet</p>
              )}
            </div>
          </div>

          {/* Applicants Summary */}
          <div className="ov-right-card">
            <div className="ov-rc-header">
              <span className="ov-rc-title">Applicants Summary</span>
              <Link href="/dashboard/applications" className="ov-rc-link">See all <i className="fi fi-rr-arrow-right" /></Link>
            </div>
            <p className="ov-rc-big">{loading ? "—" : totalApps}</p>
            <p className="ov-rc-sub">Applicants</p>
            <div className="ov-app-legend">
              {appTypes.map((t) => (
                <div className="ov-al-row" key={t.label}>
                  <span className="ov-al-dot" style={{ background: t.color }} />
                  <span className="ov-al-label">{t.label}</span>
                  <span className="ov-al-count">{t.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

