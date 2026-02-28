"use client";
import React, { useEffect, useState, useCallback } from "react";
import { jobsAPI, type ApiJob } from "@/lib/api";
import RichEditor from "@/components/RichEditor";

const CATEGORIES = [
  "Technology", "Marketing", "Design", "Business",
  "Finance", "Healthcare", "Education", "Engineering", "Other",
];

interface JobForm {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
}

const EMPTY: JobForm = {
  title: "", company: "", location: "", category: "Technology", description: "",
};
const stripHtml = (html: string, maxLen = 80) => {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > maxLen ? text.slice(0, maxLen) + "â€¦" : text;
};

export default function JobsPage() {
  // Listen for global open-job-modal event
  useEffect(() => {
    const handler = () => openCreate();
    window.addEventListener("open-job-modal", handler);
    return () => window.removeEventListener("open-job-modal", handler);
  }, []);
  const [jobs, setJobs]               = useState<ApiJob[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");
  const [search, setSearch]           = useState("");
  const [showModal, setShowModal]     = useState(false);
  const [editingJob, setEditingJob]   = useState<ApiJob | null>(null); 
  const [form, setForm]               = useState<JobForm>(EMPTY);
  const [formErrors, setFormErrors]   = useState<Partial<JobForm>>({});
  const [submitting, setSubmitting]   = useState(false);
  const [deletingId, setDeletingId]   = useState<string | null>(null);

  const fetchJobs = useCallback(() => {
    setLoading(true);
    jobsAPI.getAll()
      .then((r) => setJobs(r.data.data))
      .catch(() => setError("Failed to load jobs. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const openCreate = () => {
    setEditingJob(null);
    setForm(EMPTY);
    setFormErrors({});
    setShowModal(true);
  };

  const openEdit = (job: ApiJob) => {
    setEditingJob(job);
    setForm({
      title:       job.title,
      company:     job.company,
      location:    job.location,
      category:    job.category,
      description: job.description,
    });
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setError(""); };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setFormErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleDescChange = (html: string) => {
    setForm((p) => ({ ...p, description: html }));
    if (html.replace(/<[^>]*>/g, "").trim()) {
      setFormErrors((p) => ({ ...p, description: undefined }));
    }
  };
  const validate = () => {
    const errs: Partial<JobForm> = {};
    if (!form.title.trim())    errs.title    = "Job title is required.";
    if (!form.company.trim())  errs.company  = "Company name is required.";
    if (!form.location.trim()) errs.location = "Location is required.";
    if (!form.description.replace(/<[^>]*>/g, "").trim())
      errs.description = "Description is required.";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (editingJob) {
        await jobsAPI.update(editingJob._id, form);
      } else {
        await jobsAPI.create(form);
      }
      closeModal();
      fetchJobs();
    } catch {
      setError(editingJob ? "Failed to update job." : "Failed to create job. Ensure you are logged in as admin.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this job listing?")) return;
    setDeletingId(id);
    try {
      await jobsAPI.remove(id);
      setJobs((p) => p.filter((j) => j._id !== id));
    } catch {
      setError("Failed to delete job.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase()) ||
    j.category.toLowerCase().includes(search.toLowerCase()) ||
    j.location.toLowerCase().includes(search.toLowerCase())
  );

  const isEditMode = editingJob !== null;

  return (
    <>
      <div className="admin-body">
        {error && (
          <div className="qh-alert-danger">
            <i className="fi fi-rr-exclamation" />
            {error}
            <button className="qh-alert-close" onClick={() => setError("")}>
              <i className="fi fi-rr-cross-small" />
            </button>
          </div>
        )}

        <div className="jm-mini-stats">
          {[
            { label: "Total Jobs",   value: jobs.length, icon: "fi-rr-briefcase",  color: "#4640DE", bg: "rgba(70,64,222,0.1)" },
            { label: "Companies",    value: new Set(jobs.map((j) => j.company)).size, icon: "fi-rr-building", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
            { label: "Categories",   value: new Set(jobs.map((j) => j.category)).size, icon: "fi-rr-apps",     color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
            { label: "Locations",    value: new Set(jobs.map((j) => j.location)).size, icon: "fi-rr-map-marker",color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
          ].map((s) => (
            <div className="jm-mini-card" key={s.label}>
              <div className="jm-mini-icon" style={{ background: s.bg }}>
                <i className={`fi ${s.icon}`} style={{ color: s.color }} />
              </div>
              <div>
                <p className="jm-mini-val">{loading ? "â€”" : s.value}</p>
                <p className="jm-mini-label">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-content-card">
          <div className="acc-header">
            <h2>All Listings</h2>
            <div className="acc-search">
              <i className="fi fi-rr-search" />
              <input
                type="text"
                placeholder="Search title, company, locationâ€¦"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="acc-search-clear" onClick={() => setSearch("")}>
                  <i className="fi fi-rr-cross-small" />
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="qh-loading">
              <div className="qh-loading-spinner" />
              Loading jobsâ€¦
            </div>
          ) : filtered.length === 0 ? (
            <div className="qh-empty">
              <i className="fi fi-rr-briefcase" />
              <p>{search ? "No results match your search." : "No jobs yet. Post the first one!"}</p>
              {search && (
                <button className="qh-empty-btn" onClick={() => setSearch("")}>Clear search</button>
              )}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="qh-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Posted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((job, idx) => (
                    <tr key={job._id}>
                      <td className="tbl-idx">{idx + 1}</td>
                      <td className="tbl-title">{job.title}</td>
                      <td>{job.company}</td>
                      <td>
                        <span className="tbl-location">
                          <i className="fi fi-rr-map-marker" />
                          {job.location}
                        </span>
                      </td>
                      <td>
                        <span className={`tbl-badge ${job.category.toLowerCase()}`}>
                          {job.category}
                        </span>
                      </td>
                      <td className="tbl-desc">
                        {stripHtml(job.description)}
                      </td>
                      <td className="tbl-date">
                        <div className="tbl-date-inner">
                          <i className="fi fi-rr-calendar" />
                          {new Date(job.createdAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </div>
                      </td>
                      <td>
                        <div className="tbl-actions">
                          <button
                            className="icon-btn view"
                            title="Edit job"
                            onClick={() => openEdit(job)}
                          >
                            <i className="fi fi-rr-edit" />
                          </button>
                          <button
                            className="icon-btn danger"
                            title="Delete job"
                            onClick={() => handleDelete(job._id)}
                            disabled={deletingId === job._id}
                          >
                            <i className={`fi ${deletingId === job._id ? "fi-rr-spinner spin" : "fi-rr-trash"}`} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!loading && filtered.length > 0 && (
            <div className="acc-footer">
              Showing <strong>{filtered.length}</strong> of <strong>{jobs.length}</strong> jobs
              {search && <> matching &ldquo;<em>{search}</em>&rdquo;</>}
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="qh-modal qh-modal--wide">
            <div className="qm-header">
              <div className="qm-header-left">
                <div className="qm-header-icon">
                  <i className={`fi ${isEditMode ? "fi-rr-edit" : "fi-rr-file-add"}`} />
                </div>
                <div>
                  <h3>{isEditMode ? "Edit Job Listing" : "Post New Job"}</h3>
                  <p className="qm-header-sub">
                    {isEditMode ? `Editing: ${editingJob!.title}` : "Fill in all fields to create a new listing"}
                  </p>
                </div>
              </div>
              <button className="qm-close-btn" onClick={closeModal}>
                <i className="fi fi-rr-cross-small" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="qm-body">
                <div className="qm-field">
                  <label className="form-label">
                    <i className="fi fi-rr-briefcase" /> Job Title
                    <span className="form-required">*</span>
                  </label>
                  <input
                    name="title"
                    className={`form-control${formErrors.title ? " is-invalid" : ""}`}
                    placeholder="e.g. Senior Frontend Developer"
                    value={form.title}
                    onChange={handleChange}
                  />
                  {formErrors.title && <p className="field-error">{formErrors.title}</p>}
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="qm-field">
                      <label className="form-label">
                        <i className="fi fi-rr-building" /> Company
                        <span className="form-required">*</span>
                      </label>
                      <input
                        name="company"
                        className={`form-control${formErrors.company ? " is-invalid" : ""}`}
                        placeholder="e.g. Acme Corp"
                        value={form.company}
                        onChange={handleChange}
                      />
                      {formErrors.company && <p className="field-error">{formErrors.company}</p>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="qm-field">
                      <label className="form-label">
                        <i className="fi fi-rr-map-marker" /> Location
                        <span className="form-required">*</span>
                      </label>
                      <input
                        name="location"
                        className={`form-control${formErrors.location ? " is-invalid" : ""}`}
                        placeholder="e.g. Remote / London, UK"
                        value={form.location}
                        onChange={handleChange}
                      />
                      {formErrors.location && <p className="field-error">{formErrors.location}</p>}
                    </div>
                  </div>
                </div>

                <div className="qm-field">
                  <label className="form-label">
                    <i className="fi fi-rr-apps" /> Category
                  </label>
                  <div className="cat-pill-grid">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className={`cat-pill${form.category === cat ? " active" : ""}`}
                        onClick={() => setForm((p) => ({ ...p, category: cat }))}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="qm-field">
                  <label className="form-label">
                    <i className="fi fi-rr-document" /> Job Description
                    <span className="form-required">*</span>
                  </label>
                  <RichEditor
                    value={form.description}
                    onChange={handleDescChange}
                    placeholder="Describe the role, responsibilities, qualifications and benefitsâ€¦"
                    error={!!formErrors.description}
                  />
                  {formErrors.description && (
                    <p className="field-error">{formErrors.description}</p>
                  )}
                </div>
              </div>

              <div className="qm-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? (
                    <><span className="qm-spinner" />
                    {isEditMode ? "Savingâ€¦" : "Postingâ€¦"}</>
                  ) : (
                    <><i className={`fi ${isEditMode ? "fi-rr-check" : "fi-rr-plus"}`} />
                    {isEditMode ? "Save Changes" : "Post Job"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
