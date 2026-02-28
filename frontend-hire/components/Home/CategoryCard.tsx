import React from "react";
import styles from "./CategoryCard.module.scss";

interface CategoryCardProps {
  title: string;
  jobs: number;
  icon: React.ReactNode;
  active?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, jobs, icon, active = false }) => {
  return (
    <div className={`${styles.card} ${active ? styles.active : ""}`}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.footer}>
          <span className={styles.jobs}>{jobs} jobs available</span>
          <span className={styles.arrow}>&#8594;</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;