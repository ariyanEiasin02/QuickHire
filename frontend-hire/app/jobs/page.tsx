"use client";
import React, { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import ApiJobCard from "@/components/shared/ApiJobCard";
import { jobsAPI, type ApiJob } from "@/lib/api";
import "@/styles/FeaturedJobs.scss";
import "@/styles/JobsListing.scss";

const CATEGORIES = ["All", "Technology", "Marketing", "Design", "Business", "Finance", "Healthcare", "Education", "Engineering", "Other"];

export default function JobsPage() {
  const [jobs, setJobs]         = useState<ApiJob[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("");
  const [inputVal, setInputVal] = useState("");

  const fetchJobs = useCallback(() => {
    setLoading(true);
    setError("");
    jobsAPI.getAll({
      search:   search   || undefined,
      category: category === "All" ? undefined : category,
      location: location || undefined,
    })
      .then((r) => setJobs(r.data.data))
      .catch(() => setError("Could not load jobs. Please check your connection."))
      .finally(() => setLoading(false));
  }, [search, category, location]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(inputVal.trim());
  };

  const handleClear = () => {
    setSearch(""); setInputVal(""); setCategory("All"); setLocation("");
  };

  const isFiltered = search || category !== "All" || location;

  return (
    <>
      <Navbar />
      <section className="jl-header">
        <div className="container">
          <h1>
            Find Your <span>Dream Job</span>
          </h1>
          <p>Browse {loading ? "…" : jobs.length} opportunities from top companies</p>

          <form className="jl-search-bar" onSubmit={handleSearch}>
            <div className="jlsb-input-wrap">
              <i className="fi fi-rr-search" />
              <input
                type="text"
                placeholder="Job title, company, or keyword"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
            </div>

            <div className="jlsb-input-wrap">
              <i className="fi fi-rr-map-marker" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button type="submit" className="jlsb-btn">
              <i className="fi fi-rr-search" /> Search
            </button>
          </form>
        </div>
      </section>
      <section className="jl-body">
        <div className="container">
          <div className="jl-cats">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`jl-cat-pill${category === cat ? " active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
            {isFiltered && (
              <button className="jl-cat-pill jl-cat-clear" onClick={handleClear}>
                <i className="fi fi-rr-cross-small" /> Clear
              </button>
            )}
          </div>

          {error ? (
            <div className="jl-error">
              <i className="fi fi-rr-exclamation" />
              <p>{error}</p>
              <button onClick={fetchJobs}>Retry</button>
            </div>
          ) : loading ? (
            <div className="jl-spinner">
              <div className="spinner-border text-primary" />
              <p>Loading jobs…</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="jl-empty">
              <i className="fi fi-rr-briefcase" />
              <h3>No jobs found</h3>
              <p>Try adjusting your search or filters.</p>
              <button onClick={handleClear}>Clear filters</button>
            </div>
          ) : (
            <>
              <p className="jl-count">
                Showing <strong>{jobs.length}</strong> job{jobs.length !== 1 ? "s" : ""}
                {isFiltered ? " for your search" : ""}
              </p>
              <div className="row">
                {jobs.map((job) => (
                <div className="col-lg-3">
                      <ApiJobCard key={job._id} job={job} />
                </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
