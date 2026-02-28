import Link from 'next/link'
import React from 'react'

const SectionTop = () => {
  return (
    <div className="d-flex justify-content-between align-items-center section-top">
        <h2>Feature <span>Jobs</span></h2>
        <Link href="/jobs" className="view-all">
          Show all jobs <i className="fi fi-rr-arrow-small-right"></i>
        </Link>  
    </div>
  )
}

export default SectionTop