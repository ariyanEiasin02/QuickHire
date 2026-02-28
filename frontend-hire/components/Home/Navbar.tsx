"use client";
import React, { useState } from "react";
import Link from "next/link";
import "@/styles/Navbar.scss";
import Image from "next/image";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="qh-navbar">
      <div className="container">
        <div className="navbar-inner">

          <Link href="/" className="qh-logo">
           <Image src="/Logo.png" alt="Logo" width={152} height={36} />
          </Link>
          <ul className="qh-nav-links">
            <li>
              <Link href="/jobs">Find Jobs</Link>
            </li>
            <li>
              <Link href="/companies">Browse Companies</Link>
            </li>
          </ul>
          <div className="qh-auth">
            <Link href="/login" className="btn-login">
              Login
            </Link>
            <Link href="/signup" className="btn-signup">
              Sign Up
            </Link>
          </div>
          <button
            className="qh-toggler"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <ul className={`qh-mobile-menu ${menuOpen ? "open" : ""}`}>
          <li>
            <Link href="/jobs" onClick={() => setMenuOpen(false)}>
              Find Jobs
            </Link>
          </li>
          <li>
            <Link href="/companies" onClick={() => setMenuOpen(false)}>
              Browse Companies
            </Link>
          </li>
          <li className="mobile-auth">
            <Link href="/login" className="btn-login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link href="/signup" className="btn-signup" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
