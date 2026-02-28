import React from "react";

interface CompanyLogoProps {
  logo: string;
  logoBg: string;
  logoColor: string;
  company: string;
  size?: number;
  radius?: number;
}

const CompanyLogo = ({ logo, logoBg, logoColor, company, size = 48, radius = 8 }: CompanyLogoProps) => (
  <div
    className="company-logo"
    style={{
      background: logoBg,
      color: logoColor,
      width: size,
      height: size,
      borderRadius: radius,
      minWidth: size,
    }}
    aria-label={company}
  >
    {logo}
  </div>
);

export default CompanyLogo;
