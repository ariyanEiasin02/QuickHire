"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/Footer.scss";

const aboutLinks = ["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"];
const resourceLinks = ["Help Docs", "Guide", "Updates", "Contact Us"];

const socialIcons = [
  { icon: "fi-brands-facebook", href: "#", label: "Facebook" },
  { icon: "fi-brands-instagram", href: "#", label: "Instagram" },
  { icon: "fi-brands-dribbble", href: "#", label: "Dribbble" },
  { icon: "fi-brands-linkedin", href: "#", label: "LinkedIn" },
  { icon: "fi-brands-twitter-alt", href: "#", label: "Twitter" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="qh-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
                <Image src="/footer.png" alt="Logo" width={152} height={36} />
            </Link>
            <p className="footer-brand-desc">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">About</h4>
            <ul>
              {aboutLinks.map((link) => (
                <li key={link}>
                  <Link href="#">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Resources</h4>
            <ul>
              {resourceLinks.map((link) => (
                <li key={link}>
                  <Link href="#">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-newsletter">
            <h4 className="footer-col-title">Get job notifications</h4>
            <p className="footer-newsletter-desc">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email Address"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">{new Date().getFullYear()} @ QuickHire. All rights reserved.</p>
          <div className="footer-socials">
            {socialIcons.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="social-icon"
                aria-label={s.label}
                rel="noreferrer"
              >
                <i className={`fi ${s.icon}`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
