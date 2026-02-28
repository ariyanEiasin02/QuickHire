import React from "react";
import Link from "next/link";
import { featuredJobs } from "@/data/jobs";
import JobCard from "@/components/shared/JobCard";
import "@/styles/FeaturedJobs.scss";
import SectionTop from "../Common/SectionTop";

const FeaturedJobs = () => (
  <section className="qh-featured-jobs">
    <div className="container">
     <SectionTop title="Featured" link="/jobs" span="Jobs" />
      <div className="featured-grid">
        {featuredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedJobs;
