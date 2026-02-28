import React from "react";
import Link from "next/link";
import type { ApiJob } from "@/lib/api";

const CATEGORY_PALETTE: Record<string, { bg: string; color: string; badgeBg: string; badgeColor: string }> = {
  technology:  { bg: "#e8f0ff", color: "#4640DE", badgeBg: "rgba(70,64,222,0.08)",  badgeColor: "#4640DE" },
  marketing:   { bg: "#fff8e1", color: "#f59e0b", badgeBg: "rgba(255,184,54,0.08)", badgeColor: "#FFB836" },
  design:      { bg: "#fce4ec", color: "#e91e63", badgeBg: "rgba(86,205,173,0.08)",  badgeColor: "#56CDAD" },
  business:    { bg: "#e8f5e9", color: "#388e3c", badgeBg: "rgba(70,64,222,0.08)",  badgeColor: "#4640DE" },
  finance:     { bg: "#e0f7fa", color: "#0097a7", badgeBg: "rgba(0,151,167,0.08)",  badgeColor: "#0097a7" },
  healthcare:  { bg: "#fdf3e3", color: "#e65100", badgeBg: "rgba(255,101,80,0.08)", badgeColor: "#FF6550" },
  education:   { bg: "#ede7f6", color: "#5e35b1", badgeBg: "rgba(94,53,177,0.08)",  badgeColor: "#5e35b1" },
  engineering: { bg: "#e3f2fd", color: "#1565c0", badgeBg: "rgba(70,64,222,0.08)",  badgeColor: "#4640DE" },
};

const getTheme = (category: string) =>
  CATEGORY_PALETTE[category.toLowerCase()] ?? {
    bg: "#f5f7ff", color: "#4640DE", badgeBg: "rgba(70,64,222,0.08)", badgeColor: "#4640DE",
  };

interface Props { job: ApiJob }

const ApiLatestJobCard = ({ job }: Props) => {
  const theme = getTheme(job.category);
  const initials = job.company.split(" ").slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join("");

  return (
    <Link href={`/jobs/${job._id}`} className="latest-card">
      <div
        className="company-logo"
        style={{ background: theme.bg, color: theme.color, fontFamily: "Clash Display, sans-serif", fontWeight: 700 }}
      >
        {initials}
      </div>
      <div className="latest-card__info">
        <h3 className="latest-job-title">{job.title}</h3>
        <p className="latest-job-meta">
          {job.company}
          <span className="dot"> • </span>
          {job.location}
        </p>
        <div className="latest-card__tags">
          <span
            className="job-tag"
            style={{ color: theme.badgeColor, borderColor: theme.badgeColor, background: theme.badgeBg }}
          >
            {job.category}
          </span>
          <span className="job-tag" style={{ color: "#FF6550", borderColor: "#FF6550", background: "rgba(255,101,80,0.06)" }}>
            Full Time
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ApiLatestJobCard;
