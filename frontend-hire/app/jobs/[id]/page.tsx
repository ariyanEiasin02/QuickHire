"use client";
import React, { useEffect, useState, use } from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import ApplyForm from "@/components/Jobs/ApplyForm";
import { jobsAPI, type ApiJob } from "@/lib/api";
import "@/styles/JobDetail.scss";

const CATEGORY_PALETTE: Record<string, { bg: string; color: string }> = {
  technology:  { bg: "#e8f0ff", color: "#4640DE" },
  marketing:   { bg: "#fff8e1", color: "#f59e0b" },
  design:      { bg: "#fce4ec", color: "#e91e63" },
  business:    { bg: "#e8f5e9", color: "#388e3c" },
  finance:     { bg: "#e0f7fa", color: "#0097a7" },
  healthcare:  { bg: "#fdf3e3", color: "#e65100" },
  education:   { bg: "#ede7f6", color: "#5e35b1" },
  engineering: { bg: "#e3f2fd", color: "#1565c0" },
};

const getTheme = (cat: string) =>
  CATEGORY_PALETTE[cat.toLowerCase()] ?? { bg: "#f5f7ff", color: "#4640DE" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function JobDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [job, setJob]       = useState<ApiJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    jobsAPI.getById(id)
      .then((res) => setJob(res.data.data))
      .catch((err) => {
        if (err?.response?.status === 404) setMissing(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
          <div className="spinner-border text-primary" />
        </div>
        <Footer />
      </>
    );
  }

  if (missing || !job) return notFound();

  const theme = getTheme(job.category);
  const initials = job.company.split(" ").slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join("");

  return (
    <>
      <Navbar />
      <div className="qh-job-detail">
        {/* Hero */}
        <div className="jd-hero">
          <div className="container">
            <div className="jd-hero__inner">
              <div className="jd-hero__left">
                <div
                  className="jd-logo"
                  style={{ background: theme.bg, color: theme.color, fontFamily: "Clash Display, sans-serif", fontWeight: 700 }}
                >
                  {initials}
                </div>
                <div className="jd-hero__meta">
                  <h1>{job.title}</h1>
                  <div className="jd-company-row">
                    <span className="jd-company">{job.company}</span>
                    <span className="jd-type-badge">Full Time</span>
                  </div>
                  <div className="jd-location-row">
                    <i className="fi fi-rr-map-marker" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
              <a href="#apply" className="jd-apply-btn">
                Apply Now <i className="fi fi-rr-arrow-right" />
              </a>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="jd-body">
          <div className="container">
            <div className="jd-grid">
              <main className="jd-main">
                <section className="jd-section">
                  <h2>About the Role</h2>
                  <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>{job.description}</p>
                </section>

                <section className="jd-section" style={{ marginTop: 32 }}>
                  <h2>Job Details</h2>
                  <div className="jd-details-grid">
                    <div className="jd-detail-item">
                      <i className="fi fi-rr-building" />
                      <div>
                        <p className="jd-detail-label">Company</p>
                        <p className="jd-detail-value">{job.company}</p>
                      </div>
                    </div>
                    <div className="jd-detail-item">
                      <i className="fi fi-rr-map-marker" />
                      <div>
                        <p className="jd-detail-label">Location</p>
                        <p className="jd-detail-value">{job.location}</p>
                      </div>
                    </div>
                    <div className="jd-detail-item">
                      <i className="fi fi-rr-apps" />
                      <div>
                        <p className="jd-detail-label">Category</p>
                        <p className="jd-detail-value">{job.category}</p>
                      </div>
                    </div>
                    <div className="jd-detail-item">
                      <i className="fi fi-rr-calendar" />
                      <div>
                        <p className="jd-detail-label">Posted</p>
                        <p className="jd-detail-value">
                          {new Date(job.createdAt).toLocaleDateString("en-US", {
                            year: "numeric", month: "long", day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </main>

              <aside className="jd-sidebar">
                <div className="jd-apply-section" id="apply">
                  <h3>Apply for this Position</h3>
                  <p>Fill in the form below and we&apos;ll get back to you.</p>
                  <ApplyForm jobId={job._id} jobTitle={job.title} company={job.company} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
