import React from "react";
import Link from "next/link";
import type { FeaturedJob } from "@/data/jobs";
import TagBadge from "@/components/shared/TagBadge";
import CompanyLogo from "@/components/shared/CompanyLogo";

interface JobCardProps {
  job: FeaturedJob;
}

const JobCard = ({ job }: JobCardProps) => (
  <Link href={`/jobs/${job.id}`} className="job-card">
    <div className="job-card__top">
      <CompanyLogo
        logo={job.logo}
        logoBg={job.logoBg}
        logoColor={job.logoColor}
        company={job.company}
      />
      <span className="job-type">{job.type}</span>
    </div>
    <div className="job-card__body">
      <h3 className="job-title">{job.title}</h3>
      <p className="job-meta">
        {job.company}
        <span className="dot"> · </span>
        {job.location}
      </p>
      <p className="job-desc">{job.description}</p>
    </div>
    <div className="job-card__tags">
      {job.tags.map((tag) => (
        <TagBadge key={tag.label} tag={tag} />
      ))}
    </div>
  </Link>
);

export default JobCard;
