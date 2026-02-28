"use client";
import React, { useState } from "react";
import "@/styles/ApplyForm.scss";

interface ApplyFormProps {
  jobTitle: string;
  company: string;
}

interface FormState {
  name: string;
  email: string;
  resumeUrl: string;
  coverNote: string;
}

const ApplyForm = ({ jobTitle, company }: ApplyFormProps) => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    resumeUrl: "",
    coverNote: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.resumeUrl.trim()) {
      newErrors.resumeUrl = "Resume URL is required.";
    } else {
      try { new URL(form.resumeUrl); } catch {
        newErrors.resumeUrl = "Enter a valid URL (e.g. https://...).";
      }
    }
    if (!form.coverNote.trim()) newErrors.coverNote = "Cover note is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
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
      <div className="apply-form__field">
        <label htmlFor="name">
          Full Name <span className="required">*</span>
        </label>
        <div className={`input-wrap ${errors.name ? "input-wrap--error" : ""}`}>
          <i className="fi fi-rr-user input-icon" />
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Sarah Johnson"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="apply-form__field">
        <label htmlFor="email">
          Email Address <span className="required">*</span>
        </label>
        <div className={`input-wrap ${errors.email ? "input-wrap--error" : ""}`}>
          <i className="fi fi-rr-envelope input-icon" />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. sarah@example.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="apply-form__field">
        <label htmlFor="resumeUrl">
          Resume Link <span className="required">*</span>
        </label>
        <div className={`input-wrap ${errors.resumeUrl ? "input-wrap--error" : ""}`}>
          <i className="fi fi-rr-link input-icon" />
          <input
            id="resumeUrl"
            name="resumeUrl"
            type="file"
            placeholder="https://drive.google.com/your-resume"
            value={form.resumeUrl}
            onChange={handleChange}
          />
        </div>
        {errors.resumeUrl && <span className="field-error">{errors.resumeUrl}</span>}
      </div>

      <div className="apply-form__field">
        <label htmlFor="coverNote">
          Cover Note <span className="required">*</span>
        </label>
        <div className={`input-wrap input-wrap--textarea ${errors.coverNote ? "input-wrap--error" : ""}`}>
          <textarea
            id="coverNote"
            name="coverNote"
            rows={5}
            placeholder="Tell us why you're a great fit for this role..."
            value={form.coverNote}
            onChange={handleChange}
          />
        </div>
        {errors.coverNote && <span className="field-error">{errors.coverNote}</span>}
        <span className="char-count">{form.coverNote.length} / 1000</span>
      </div>

      <button type="submit" className="apply-submit">
        Apply Now <i className="fi fi-rr-paper-plane" />
      </button>
    </form>
  );
};

export default ApplyForm;
