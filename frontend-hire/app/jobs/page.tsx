import SectionTop from '@/components/Common/SectionTop'
import JobCard from '@/components/shared/JobCard'
import { featuredJobs } from '@/data/jobs'
import "@/styles/FeaturedJobs.scss";
import React from 'react'


const page = () => {
  return (
     <section className="qh-featured-jobs">
    <div className="container">
     <SectionTop title="All" span="Jobs" />
      <div className="featured-grid">
        {featuredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  </section>
  )
}

export default page