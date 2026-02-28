"use client";
import React, { useEffect, useState } from "react";
import { jobsAPI, type ApiJob } from "@/lib/api";
import ApiLatestJobCard from "@/components/shared/ApiLatestJobCard";
import "@/styles/LatestJobs.scss";
import SectionTop from "../Common/SectionTop";

const LatestJobs = () => {
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobsAPI.getAll()
      .then((res) => setJobs(res.data.data.slice(0, 8)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const col1 = jobs.slice(0, 4);
  const col2 = jobs.slice(4, 8);

  return (
    <section className="qh-latest-jobs">
      <div className="container">
        <SectionTop title="Latest" link="/jobs" span="Jobs" />
        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-5" style={{ color: "#999" }}>
            <p>No jobs yet — post some from the admin panel.</p>
          </div>
        ) : (
          <div className="latest-grid">
            <div className="latest-col">
              {col1.map((job) => <ApiLatestJobCard key={job._id} job={job} />)}
            </div>
            <div className="latest-col">
              {col2.map((job) => <ApiLatestJobCard key={job._id} job={job} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
