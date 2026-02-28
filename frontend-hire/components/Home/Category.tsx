import React from "react";
import CategoryCard from "./CategoryCard";
import styles from "./Category.module.scss";
import SectionTop from "../Common/SectionTop";

const DesignIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

const SalesIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <circle cx="6" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="2" r="2" fill="currentColor" stroke="none" />
    <circle cx="18" cy="8" r="2" fill="currentColor" stroke="none" />
  </svg>
);

const MarketingIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 11l19-9-9 19-2-8-8-2z" />
  </svg>
);

const FinanceIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const TechnologyIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const EngineeringIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const BusinessIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const HRIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const categories = [
  { title: "Design", jobs: 235, icon: <DesignIcon />, active: false },
  { title: "Sales", jobs: 756, icon: <SalesIcon />, active: false },
  { title: "Marketing", jobs: 140, icon: <MarketingIcon />, active: true },
  { title: "Finance", jobs: 325, icon: <FinanceIcon />, active: false },
  { title: "Technology", jobs: 436, icon: <TechnologyIcon />, active: false },
  { title: "Engineering", jobs: 542, icon: <EngineeringIcon />, active: false },
  { title: "Business", jobs: 211, icon: <BusinessIcon />, active: false },
  { title: "Human Resource", jobs: 346, icon: <HRIcon />, active: false },
];

const Category = () => {
  return (
    <section className={styles.section}>
      <div className="container">
       <SectionTop title="Categories" span="popular" link="/jobs" />
        <div className={styles.grid}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              title={cat.title}
              jobs={cat.jobs}
              icon={cat.icon}
              active={cat.active}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;