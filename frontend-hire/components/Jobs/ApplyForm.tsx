"use client";
import React, { useState } from "react";
import { applicationsAPI } from "@/lib/api";
import "@/styles/ApplyForm.scss";

interface ApplyFormProps {
  jobId: string;
  jobTitle: string;
  company: string;
}

interface FormState {
  name: string;
  email: string;
  resumeUrl: string;
  coverNote: string;
}

const ApplyForm = ({ jobId, jobTitle, company }: ApplyFormProps) => {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", resumeUrl: "", coverNote: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) {
      e.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!form.resumeUrl.trim()) {
      e.resumeUrl = "Resume URL is required.";
    } else {
      try { new URL(form.resumeUrl); } catch {
        e.resumeUrl = "Enter a valid URL (e.g. https://drive.google.com/â€¦).";
      }
    }
    if (!form.coverNote.trim()) e.coverNote = "Cover note is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
    setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiError("");
    try {
      await applicationsAPI.submit({
        job:        jobId,
        name:       form.name,
        email:      form.email,
        resumeLink: form.resumeUrl,
        coverNote:  form.coverNote,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Failed to submit application. Please try again.";
      setApiError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="apply-success">
        <div className="apply-success__icon">
          <i className="fi fi-rr-check-circle" />
        </div>
        <h3>Application Submitted!</h3>
        <p>
          Thank you for applying to <strong>{jobTitle}</strong> at{" "}
          <strong>{company}</strong>. We&apos;ll review your profile and get
          back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="apply-form" onSubmit={handleSubmit} noValidate>
      {apiError && (
        <div className="apply-api-error">
          <i className="fi fi-rr-exclamation" />
          {apiError}
        </div>
      )}

      {/* Full Name */}
      <div className="apply-form__field">
        <label htmlFor="name">Full Name <span className="required">*</span></label>
        <div className={`input-wrap ${errors.name ? "input-wrap--error" : ""}`}>
          <i className="fi fi-rr-user input-icon" />
          <input
            id="name" name="name" type="text"
            placeholder="e.g. Sarah Johnson"
            value={form.name} onChange={handleChange}
            autoComplete="name" disabled={submitting}
          />
        </div>
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      {/* Email */}
      <div className="apply-form__field">
        <label htmlFor="email">Email Address <span className="required">*</span></label>
        <div className={`input-wrap ${errors.email ? "input-wrap--error" : ""}`}>
          <i className="fi fi-rr-envelope input-icon" />
          <input
            id="email" name="email" type="email"
            placeholder="e.g. sarah@example.com"
            value={form.email} onChange={handleChange}
            autoComplete="email" disabled={submitting}
          />
        </div>
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      {/* Resume URL */}
      <div className="apply-form__field">
        <label htmlFor="resumeUrl">Resume Link <span className="required">*</span></label>
        <div className={`input-wrap ${errors.resumeUrl ? "input-wrap--error" : ""}`}>
          <i className="fi fi-rr-link input-icon" />
          <input
            id="resumeUrl" name="resumeUrl" type="url"
            placeholder="https://drive.google.com/your-resume"
            value={form.resumeUrl} onChange={handleChange}
            disabled={submitting}
          />
        </div>
        {errors.resumeUrl && <span className="field-error">{errors.resumeUrl}</span>}
        <span className="field-hint">Google Drive, Dropbox, LinkedIn, or any public URL</span>
      </div>

      {/* Cover Note */}
      <div className="apply-form__field">
        <label htmlFor="coverNote">Cover Note <span className="required">*</span></label>
        <div className={`input-wrap input-wrap--textarea ${errors.coverNote ? "input-wrap--error" : ""}`}>
          <textarea
            id="coverNote" name="coverNote" rows={5}
            placeholder="Tell us why you're a great fit for this roleâ€¦"
            value={form.coverNote} onChange={handleChange}
            disabled={submitting}
          />
        </div>
        {errors.coverNote && <span className="field-error">{errors.coverNote}</span>}
        <span className="char-count">{form.coverNote.length} / 1000</span>
      </div>

      <button type="submit" className="apply-submit" disabled={submitting}>
        {submitting ? (
          <><span className="spinner-border spinner-border-sm me-2" />Submittingâ€¦</>
        ) : (
          <>Apply Now <i className="fi fi-rr-paper-plane" /></>
        )}
      </button>
    </form>
  );
};

export default ApplyForm;
