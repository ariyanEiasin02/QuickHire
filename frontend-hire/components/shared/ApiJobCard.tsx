import React from "react";
import Link from "next/link";
import type { ApiJob } from "@/lib/api";

// deterministic colour palette from category string
const CATEGORY_PALETTE: Record<string, { bg: string; color: string; badgeBg: string; badgeColor: string }> = {
  technology:  { bg: "#e8f0ff", color: "#4640DE", badgeBg: "rgba(70,64,222,0.1)",  badgeColor: "#4640DE" },
  marketing:   { bg: "#fff3e0", color: "#f57c00", badgeBg: "rgba(245,124,0,0.1)",  badgeColor: "#f57c00" },
  design:      { bg: "#fce4ec", color: "#e91e63", badgeBg: "rgba(233,30,99,0.1)",  badgeColor: "#e91e63" },
  business:    { bg: "#e8f5e9", color: "#388e3c", badgeBg: "rgba(56,142,60,0.1)",  badgeColor: "#388e3c" },
  finance:     { bg: "#e0f7fa", color: "#0097a7", badgeBg: "rgba(0,151,167,0.1)",  badgeColor: "#0097a7" },
  healthcare:  { bg: "#fdf3e3", color: "#e65100", badgeBg: "rgba(230,81,0,0.1)",   badgeColor: "#e65100" },
  education:   { bg: "#ede7f6", color: "#5e35b1", badgeBg: "rgba(94,53,177,0.1)",  badgeColor: "#5e35b1" },
  engineering: { bg: "#e3f2fd", color: "#1565c0", badgeBg: "rgba(21,101,192,0.1)", badgeColor: "#1565c0" },
};

const getTheme = (category: string) =>
  CATEGORY_PALETTE[category.toLowerCase()] ?? {
    bg: "#f5f7ff",
    color: "#4640DE",
    badgeBg: "rgba(70,64,222,0.1)",
    badgeColor: "#4640DE",
  };

interface ApiJobCardProps {
  job: ApiJob;
}

const ApiJobCard = ({ job }: ApiJobCardProps) => {
  const theme = getTheme(job.category);
  const initials = job.company
    .split(" ")
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");

  return (
    <Link href={`/jobs/${job._id}`} className="job-card">
      <div className="job-card__top">
        <div
          className="company-logo"
          style={{ background: theme.bg, color: theme.color, width: 48, height: 48, fontSize: "1.1rem" }}
          aria-label={job.company}
        >
          {initials}
        </div>
        <span className="job-type">{job.category}</span>
      </div>

      <div className="job-card__body">
        <h3 className="job-title">{job.title}</h3>
        <p className="job-meta">
          {job.company}
          <span className="dot"> · </span>
          {job.location}
        </p>
        <p className="job-desc">
          {job.description.length > 100
            ? `${job.description.slice(0, 100)}…`
            : job.description}
        </p>
      </div>

      <div className="job-card__tags">
        <span
          className="tag-badge"
          style={{ background: theme.badgeBg, color: theme.badgeColor }}
        >
          {job.category}
        </span>
        <span className="tag-badge tag-badge--neutral">Full Time</span>
      </div>
    </Link>
  );
};

export default ApiJobCard;
