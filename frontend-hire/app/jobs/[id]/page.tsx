import { notFound } from "next/navigation";
import { jobDetails } from "@/data/jobs";
import Navbar from "@/components/Home/Navbar";
import ApplyForm from "@/components/Jobs/ApplyForm";
import "@/styles/JobDetail.scss";

export async function generateStaticParams() {
  return jobDetails.map((job) => ({ id: String(job.id) }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params;
  const job = jobDetails.find((j) => j.id === Number(id));
  if (!job) notFound();

  return (
    <div className="qh-job-detail">
      <div className="jd-hero">
        <div className="container">
          <div className="jd-hero__inner">
            <div className="jd-hero__left">
              <div
                className="jd-logo"
                style={{ background: job.logoBg, color: job.logoColor }}
              >
                {job.logo}
              </div>
              <div className="jd-hero__meta">
                <h1>{job.title}</h1>
                <div className="jd-company-row">
                  <span className="jd-company">{job.company}</span>
                  <span className="jd-type-badge">{job.type}</span>
                </div>
                <div className="jd-location-row">
                  <i className="fi fi-rr-map-marker" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            <a href="#apply" className="jd-apply-btn">
              Apply Now <i className="fi fi-rr-arrow-right" />
            </a>
          </div>
        </div>
      </div>

      <div className="jd-body">
        <div className="container">
          <div className="jd-grid">
            <main className="jd-main">
              <section className="jd-section">
                <h2>About the Role</h2>
                <p>{job.about}</p>
              </section>
            </main>

            <aside className="jd-sidebar">
              <div className="jd-apply-section" id="apply">
                <h3>Apply for this Position</h3>
                <p>Fill in the form below and we&apos;ll get back to you.</p>
                <ApplyForm jobTitle={job.title} company={job.company} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
