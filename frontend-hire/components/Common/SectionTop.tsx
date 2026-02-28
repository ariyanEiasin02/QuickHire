import link from 'next/link';
import Link from 'next/link'
import React from 'react'
interface SectionTopProps {
  title: string;
  link: string;
  span: string;
}
const SectionTop = ({title, link, span }: SectionTopProps) => {
  return (
    <div className="d-flex justify-content-between align-items-center section-top">
        <h2>{title} <span>{span}</span></h2>
        <Link href={link} className="view-all">
          Show all jobs <i className="fi fi-rr-arrow-small-right"></i>
        </Link>  
    </div>
  )
}

export default SectionTop