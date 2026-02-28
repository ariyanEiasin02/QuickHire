"use client";
import React from "react";
import Image from "next/image";
import SearchBar from "@/components/Home/SearchBar";
import "@/styles/Hero.scss";

const popularTags = ["UI Designer", "UX Researcher", "Android", "Admin"];

const Hero = () => {
  return (
    <section className="qh-hero">
      <div className="container">
        <div className="row align-items-center g-0">
          <div className="col-lg-6 hero-left">
            <h1 className="hero-heading">
              Discover more than
              <span className="highlight">5000+ Jobs</span>
            </h1>
            <p className="hero-sub">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            <SearchBar onSearch={(kw, loc) => console.log(kw, loc)} />
            <div className="popular-tags">
              <span className="label">Popular :</span>
              {popularTags.map((tag, i) => (
                <React.Fragment key={tag}>
                  <a href="#" className="tag">{tag}</a>
                  {i < popularTags.length - 1 && (
                    <span className="tag-comma">,</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="col-lg-6 hero-right d-none d-lg-block">
            <div className="hero-bg-blob" />
            <div className="hero-pattern">
              <Image
                src="/Pattern.png"
                alt=""
                fill
                sizes="(max-width: 991px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "right center" }}
                priority
                aria-hidden="true"
              />
            </div>
            <div className="hero-img-wrap">
              <Image
                src="/admin.png"
                alt="Professional job seeker"
                width={500}
                height={540}
                priority
                sizes="(max-width: 767px) 90vw, (max-width: 991px) 60vw, 46vw"
                style={{ objectFit: "contain", objectPosition: "bottom center" }}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
