"use client";
import React, { useEffect, useState } from "react";
import { jobsAPI, type ApiJob } from "@/lib/api";
import ApiJobCard from "@/components/shared/ApiJobCard";
import "@/styles/FeaturedJobs.scss";
import SectionTop from "../Common/SectionTop";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobsAPI.getAll()
      .then((res) => setJobs(res.data.data.slice(0, 8)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="qh-featured-jobs">
      <div className="container">
        <SectionTop title="Featured" link="/jobs" span="Jobs" />
        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-5" style={{ color: "#999" }}>
            <p>No jobs available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="featured-grid" style={{ marginTop: 48 }}>
            {jobs.map((job) => (
              <ApiJobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;
