import React from "react";
import Link from "next/link";
import { latestJobs } from "@/data/jobs";
import LatestJobCard from "@/components/shared/LatestJobCard";
import "@/styles/LatestJobs.scss";
import SectionTop from "../Common/SectionTop";

const LatestJobs = () => {
  const col1 = latestJobs.slice(0, 4);
  const col2 = latestJobs.slice(4, 8);

  return (
    <section className="qh-latest-jobs">
      <div className="container">
       <SectionTop title="Latest" link="/jobs" span="Jobs" />
        <div className="latest-grid">
          <div className="latest-col">
            {col1.map((job) => (
              <LatestJobCard key={job.id} job={job} />
            ))}
          </div>
          <div className="latest-col">
            {col2.map((job) => (
              <LatestJobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
