import React from "react";
import Link from "next/link";
import type { LatestJob } from "@/data/jobs";
import TagBadge from "@/components/shared/TagBadge";
import CompanyLogo from "@/components/shared/CompanyLogo";

interface LatestJobCardProps {
  job: LatestJob;
}

const LatestJobCard = ({ job }: LatestJobCardProps) => (
  <Link href={`/jobs/${job.id}`} className="latest-card">
    <CompanyLogo
      logo={job.logo}
      logoBg={job.logoBg}
      logoColor={job.logoColor}
      company={job.company}
      size={52}
      radius={10}
    />
    <div className="latest-card__info">
      <h3 className="latest-job-title">{job.title}</h3>
      <p className="latest-job-meta">
        {job.company}
        <span className="dot"> • </span>
        {job.location}
      </p>
      <div className="latest-card__tags">
        {job.tags.map((tag) => (
          <TagBadge key={tag.label} tag={tag} pill />
        ))}
      </div>
    </div>
  </Link>
);

export default LatestJobCard;
