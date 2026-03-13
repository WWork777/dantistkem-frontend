import Link from "next/link";
import React from "react";
import styles from "./Breadcrumbs.module.scss";

interface BreadcrumbStep {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbStep[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
      <div className={styles.breadcrumbItem}>
        <Link href="/" className={styles.link}>
          <span>Главная</span>
        </Link>
        <span className={styles.separator}>/</span>
      </div>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className={styles.breadcrumbItem}>
            {!isLast && item.href ? (
              <Link href={item.href} className={styles.link}>
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className={styles.currentPage} aria-current="page">{item.label}</span>
            )}
            {!isLast && <span className={styles.separator}>/</span>}
          </div>
        );
      })}
    </nav>

    // <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
    //     <div className={styles.breadcrumbItem}>
    //         <Link href="/" className={styles.link}>
    //         <span>Главная</span>
    //         </Link>
    //         <span className={styles.separator}>/</span>
    //     </div>
    //     <div className={styles.breadcrumbItem}>
    //         <span className={styles.currentPage} aria-current="page">
    //         Цены
    //         </span>
    //     </div>
    // </nav>
  );
}