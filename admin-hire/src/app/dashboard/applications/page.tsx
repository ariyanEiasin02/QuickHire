"use client";
import React, { useEffect, useState } from "react";
import { applicationsAPI, type ApiApplication } from "@/lib/api";

export default function ApplicationsPage() {
  const [apps, setApps] = useState<ApiApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState<{ name: string; note: string } | null>(null);

  useEffect(() => {
    applicationsAPI.getAll()
      .then((r) => setApps(r.data.data))
      .catch(() => setError("Failed to load applications. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = apps.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  const getJobTitle = (app: ApiApplication) => {
    if (typeof app.job === "object" && app.job !== null) return app.job.title;
    return "—";
  };

  return (
    <>
      <div className="admin-body">
        {error && (
          <div className="qh-alert-danger">
            <i className="fi fi-rr-exclamation" />
            {error}
          </div>
        )}

        <div className="admin-content-card">
          <div className="acc-header">
            <h2>All Applications</h2>
            <div className="acc-search">
              <i className="fi fi-rr-search" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="qh-loading">
              <div className="spinner-border spinner-border-sm text-primary me-2" />
              Loading applications...
            </div>
          ) : filtered.length === 0 ? (
            <div className="qh-empty">
              <i className="fi fi-rr-user-check" />
              <p>{search ? "No results match your search." : "No applications received yet."}</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="qh-table">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Email</th>
                    <th>Applied For</th>
                    <th>Resume</th>
                    <th>Date</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((app) => (
                    <tr key={app._id}>
                      <td>{app.name}</td>
                      <td style={{ fontSize: "0.85rem" }}>{app.email}</td>
                      <td>{getJobTitle(app)}</td>
                      <td>
                        <a
                          href={app.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="at-btn at-btn--outline"
                          style={{ padding: "5px 12px", fontSize: "0.78rem" }}
                        >
                          <i className="fi fi-rr-link" />
                          View
                        </a>
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "#aaa" }}>
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          className="icon-btn view"
                          title="View cover note"
                          onClick={() => setSelectedNote({ name: app.name, note: app.coverNote })}
                        >
                          <i className="fi fi-rr-eye" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedNote && (
        <div className="modal-overlay" onClick={() => setSelectedNote(null)}>
          <div className="qh-modal" onClick={(e) => e.stopPropagation()}>
            <div className="qm-header">
              <h3>Cover Note — {selectedNote.name}</h3>
              <button onClick={() => setSelectedNote(null)}>
                <i className="fi fi-rr-cross-small" />
              </button>
            </div>
            <div className="qm-body">
              <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#555", whiteSpace: "pre-wrap" }}>
                {selectedNote.note}
              </p>
            </div>
            <div className="qm-footer">
              <button className="btn-cancel" onClick={() => setSelectedNote(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
